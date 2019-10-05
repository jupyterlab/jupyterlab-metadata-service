import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";
import {
  createConverter,
  resolveDataType,
  DataTypeNoArgs
} from "@jupyterlab/dataregistry";
import {
  IActiveDataset,
  IRegistry,
  reactDataType
} from "@jupyterlab/dataregistry-extension";
import { Token } from "@phosphor/coreutils";
import { expand, flatten } from "jsonld";
import React from "react";
import defaultGraph from "./defaultGraph";
import { Observable, combineLatest } from "rxjs";
import { switchMap, map } from "rxjs/operators";

type LinkedData = object;
type LinkedDataThunk = () => Promise<LinkedData>;

export interface ILinkedDataProvider {
  /**
   * Returns a thunk to fetch the linked data associated with this URL or null
   * if it does not have any information about it.
   */
  get(url: URL): LinkedDataThunk | null;
}

function findEntity(entities: Array<any>, id: URL): LinkedData | undefined {
  return entities.find(o => o["@id"] === id.toString());
}

export class LinkedDataRegistry {
  register(provider: ILinkedDataProvider): void {
    this._providers.add(provider);
  }

  /**
   * Lookup this URL in all providers and return a thunk to retreive it or null
   */
  get(url: URL): LinkedDataThunk | null {
    const thunks = [...this._providers]
      .map(p => p.get(url))
      .filter(v => v) as Array<LinkedDataThunk>;
    if (thunks.length === 0) {
      return null;
    }
    return async () =>
      findEntity(
        (await expand(
          await flatten(await Promise.all(thunks.map(t => t())), null)
        )) as Array<any>,
        url
      )!;
  }

  private _providers = new Set<ILinkedDataProvider>();
}

export const LinkedDataRegistryToken = new Token("LinkedDataRegistry");

const linkedDataRegistryPlugin: JupyterFrontEndPlugin<LinkedDataRegistry> = {
  activate: () => new LinkedDataRegistry(),
  id: "jupyterlab-metadata-service:linked-data-registry",
  requires: [],
  provides: LinkedDataRegistryToken,
  autoStart: true
};

const sampleProviderPlugin: JupyterFrontEndPlugin<void> = {
  activate: (_, registry: LinkedDataRegistry) => {
    registry.register({
      get: url => {
        const result = findEntity(defaultGraph, url);
        if (!result) {
          return null;
        }
        return async () => result;
      }
    });
  },
  id: "jupyterlab-metadata-service:sample-provider",
  requires: [LinkedDataRegistryToken],
  autoStart: true
};

/**
 * https://w3c.github.io/json-ld-syntax/#value-objects
 */
function ValueObject({ valueObject }: { valueObject: { "@value": any } }) {
  const value = valueObject["@value"];
  return (
    <span className="jl-metadata-value">
      {typeof value === "object" ? JSON.stringify(value, null, " ") : value}
    </span>
  );
}

function InternalURL({
  url,
  onClick
}: {
  url: string;
  onClick: (url: URL) => void;
}) {
  return (
    <a
      className="jl-metadata-internal-url"
      onClick={() => onClick(new URL(url))}
    >
      {url}
    </a>
  );
}

function NodeEntry({
  keyword,
  object,
  onClick
}: {
  keyword: string;
  object: object;
  onClick: (url: URL) => void;
}) {
  // "The entries of a node object whose keys are not keywords are also called properties of the node object."
  // https://w3c.github.io/json-ld-syntax/#syntax-tokens-and-keywords
  switch (keyword) {
    case "@id":
      return (
        <>
          <dt className="jl-metadata-id-keyword"></dt>
          <dd className="jl-metadata-id-field">
            <InternalURL url={(object as any) as string} onClick={onClick} />
          </dd>
        </>
      );
    case "@type":
      return (
        <>
          <dt>type</dt>
          {(Array.isArray(object) ? object : [object]).map(type => (
            <dd key={type}>
              <InternalURL url={type} onClick={onClick} />
            </dd>
          ))}
        </>
      );
    default:
      return (
        <>
          <dt>{keyword}</dt>
          {(Array.isArray(object) ? object : [object]).map(
            (innerObject, idx) => (
              <dd key={idx}>
                {"@value" in innerObject ? (
                  <ValueObject valueObject={innerObject} />
                ) : (
                  <NodeObject nodeObject={innerObject} onClick={onClick} />
                )}
              </dd>
            )
          )}
        </>
      );
  }
}

/**
 * https://w3c.github.io/json-ld-syntax/#node-objects
 */
function NodeObject({
  nodeObject,
  onClick
}: {
  nodeObject: object;
  onClick: (url: URL) => void;
}) {
  {
    const entries = Object.entries(nodeObject);
    if (entries.length === 0) {
      return <div>No properties.</div>;
    }
    return (
      <dl className="jl-metadata-node">
        {entries.map(([keyword, object]) => (
          <NodeEntry key={keyword} {...{ keyword, object, onClick }} />
        ))}
      </dl>
    );
  }
}
type ViewerProps = {
  url: URL;
  onClick: (url: URL) => void;
  thunk: LinkedDataThunk;
};

type ViewerState = { data: LinkedData | undefined };

class Viewer extends React.Component<ViewerProps, ViewerState> {
  readonly state: ViewerState = {
    data: undefined
  };

  async componentWillMount() {
    this.setState({ data: await this.props.thunk() });
  }
  componentDidUpdate(prevProps: ViewerProps) {
    if (this.props.url.toString() !== prevProps.url.toString()) {
      this.componentWillMount();
    }
  }

  render() {
    const { data } = this.state;
    if (data === undefined) {
      return <div className="jl-metadata">...</div>;
    }
    return (
      <div className="jl-metadata">
        <NodeObject nodeObject={data} onClick={this.props.onClick} />
      </div>
    );
  }
}

const linkedDataThunkDataType = new DataTypeNoArgs<LinkedDataThunk>(
  "application/x.jupyter.linked-data-thunk"
);

const jsonLDDataType = new DataTypeNoArgs<Observable<LinkedData>>(
  "application/ld+json"
);

// /**
//  * https://w3c.github.io/json-ld-syntax/#example-162-http-request-with-profile-requesting-a-compacted-document
//  */
// const jsonLDCompactedDataType = new DataTypeNoArgs<Observable<LinkedData>>(
//   "application/ld+json;profile=http://www.w3.org/ns/json-ld#compacted"
// );

const linkedDataBrowserPlugin: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-metadata-service:data-browser",
  autoStart: true,
  requires: [LinkedDataRegistryToken, IRegistry, IActiveDataset],
  activate: (
    app: JupyterFrontEnd,
    registry: LinkedDataRegistry,
    dataRegistry: IRegistry,
    active: IActiveDataset
  ) => {
    // Get linked data from all datatypes and register it in the graph:
    let currentLinkedData: Array<any> = [];
    dataRegistry.URLs$.pipe(
      switchMap(urls =>
        combineLatest(
          ...([...urls]
            .map(url => {
              const res = jsonLDDataType.getDataset(dataRegistry.getURL(url));
              if (!res) {
                return null;
              }
              return (res as Observable<{ "@id": string }>).pipe(
                map(r => ({
                  ...r,
                  // Replace with by setting base to current URL.
                  ...{ "@id": new URL(r["@id"], url).toString() }
                }))
              );
            })
            .filter(e => e !== null)
            .flat() as Array<Observable<LinkedData>>)
        )
      )
    ).subscribe({
      next: value => {
        currentLinkedData = value;
      }
    });
    registry.register({
      get: url => {
        const res = findEntity(currentLinkedData, url);
        if (!res) {
          return null;
        }
        return async () => res;
      }
    });

    dataRegistry.addConverter(
      /**
       * Convert json ld to compacted form and resolve base url, so that the @id
       * can be relative to the dataset
       *
       * https://github.com/digitalbazaar/jsonld.js/issues/329#issuecomment-532475466
       */
      // createConverter(
      //   { from: jsonLDDataType, to: jsonLDCompactedDataType },
      //   ({ data, url }) =>
      //     data.pipe(flatMap(doc => compact(doc, {}, { base: url.toString() })))
      // ),
      createConverter(
        { from: resolveDataType, to: linkedDataThunkDataType },
        ({ url }) => registry.get(url)
      ),
      createConverter(
        { from: linkedDataThunkDataType, to: reactDataType },
        ({ url, data }) => ({
          type: "Linked Data",
          data: (
            <Viewer
              url={url}
              thunk={data}
              onClick={url => active.next(url.toString())}
            />
          )
        })
      )
    );
  }
};

export default [
  linkedDataRegistryPlugin,
  sampleProviderPlugin,
  linkedDataBrowserPlugin
] as JupyterFrontEndPlugin<any>[];
