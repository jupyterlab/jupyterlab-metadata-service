import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";
import { createConverter, resolveDataType } from "@jupyterlab/dataregistry";
import {
  IActiveDataset,
  IRegistry,
  reactDataType
} from "@jupyterlab/dataregistry-extension";
import { Token } from "@phosphor/coreutils";
import { expand, flatten } from "jsonld";
import React from "react";
import defaultGraph from "./defaultGraph";

type LinkedData = object;

export interface ILinkedDataProvider {
  get(url: URL): Promise<LinkedData>;
}

function findEntity(entities: Array<any>, id: URL): any {
  return entities.filter(o => o["@id"] === id.toString())[0];
}
export class LinkedDataRegistry {
  register(provider: ILinkedDataProvider): void {
    this._providers.add(provider);
  }

  /**
   * Lookup this URL in all providers and flatten the results.
   */
  async get(url: URL): Promise<LinkedData> {

    
    return findEntity(
      (await expand(
        await flatten(
          await Promise.all([...this._providers].map(p => p.get(url))),
          null
        )
      )) as Array<any>,
      url
    );
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
      get: async url => {
        return findEntity(defaultGraph, url) || {};
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
  registry: LinkedDataRegistry;
};

type ViewerState = { data: LinkedData | undefined };

class Viewer extends React.Component<ViewerProps, ViewerState> {
  readonly state: ViewerState = {
    data: undefined
  };

  async componentWillMount() {
    this.setState({ data: await this.props.registry.get(this.props.url) });
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
    dataRegistry.addConverter(
      createConverter(
        { from: resolveDataType, to: reactDataType },
        ({ url }) => ({
          type: "Linked Data",
          data: (
            <Viewer
              url={url}
              registry={registry}
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
