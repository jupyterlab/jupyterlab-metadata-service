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
  return <>{JSON.stringify(valueObject["@value"], null, " ")}</>;
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
        {entries.map(([property, object]) => {
          // "The entries of a node object whose keys are not keywords are also called properties of the node object."
          // https://w3c.github.io/json-ld-syntax/#syntax-tokens-and-keywords
          switch (property) {
            case "@id":
              return (
                <>
                  <dt>ID:</dt>
                  <dd>
                    <a onClick={() => onClick(new URL(object))}>{object}</a>
                  </dd>
                </>
              );
            case "@type":
              return (
                <>
                  <dt>Type:</dt>
                  {(Array.isArray(object) ? object : [object]).map(type => (
                    <dd>{new URL(type).toString()}</dd>
                  ))}
                </>
              );
            default:
              let url: URL;
              try {
                url = new URL(property);
              } catch {
                console.warn(`Ignoring property ${property}`);
                return <></>;
              }
              return (
                <>
                  <dt>{url.toString()}</dt>

                  {(Array.isArray(object) ? object : [object]).map(
                    innerObject => (
                      <dd>
                        {"@value" in innerObject ? (
                          <ValueObject valueObject={innerObject} />
                        ) : (
                          <NodeObject
                            nodeObject={innerObject}
                            onClick={onClick}
                          />
                        )}
                      </dd>
                    )
                  )}
                </>
              );
          }
        })}
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
      return <span>Loading...</span>;
    }
    console.log(data);
    return <NodeObject nodeObject={data} onClick={this.props.onClick} />;
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
