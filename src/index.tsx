import {
  JupyterFrontEndPlugin,
  ILayoutRestorer,
  JupyterFrontEnd
} from "@jupyterlab/application";

import { flatten, expand } from "jsonld";
import { Token } from "@phosphor/coreutils";
import {
  ICommandPalette,
  MainAreaWidget,
  ReactWidget,
  WidgetTracker
} from "@jupyterlab/apputils";
import React from "react";

type LinkedData = object;

export interface ILinkedDataProvider {
  get(url: URL): Promise<LinkedData>;
}

export class LinkedDataRegistry {
  register(provider: ILinkedDataProvider): void {
    this._providers.add(provider);
  }

  /**
   * Lookup this URL in all providers and flatten the results.
   */
  async get(url: URL): Promise<LinkedData> {
    return ((await expand(
      await flatten(
        await Promise.all([...this._providers].map(p => p.get(url))),
        null
      )
    )) as Array<any>).filter(o => o["@id"] === url.toString())[0];
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

const SAMPLE_DATA = new Map<string, LinkedData>();

SAMPLE_DATA.set(
  "https://github.com/Coleridge-Initiative/adrf-onto/wiki/Vocabulary#dataset381",
  {
    "@id":
      "https://github.com/Coleridge-Initiative/adrf-onto/wiki/Vocabulary#dataset381",
    "@type": ["http://purl.org/dc/dcmitype/Dataset"],
    "http://purl.org/dc/terms/alternative": [
      {
        "@language": "en",
        "@value": "EPESE"
      }
    ],
    "http://purl.org/dc/terms/description": [
      {
        "@language": "en",
        "@value":
          "A project initiated by the intramural Epidemiology, Demography and Biometry Program of the National Institute on Aging"
      }
    ],
    "http://purl.org/dc/terms/identifier": [
      {
        "@language": "en",
        "@value": "8481423"
      }
    ],
    "http://purl.org/dc/terms/publisher": [
      {
        "@id":
          "https://github.com/Coleridge-Initiative/adrf-onto/wiki/Vocabulary#duke_univ"
      }
    ],
    "http://purl.org/dc/terms/title": [
      {
        "@language": "en",
        "@value":
          "Established Populations for Epidemiologic Studies of the Elderly Project"
      }
    ],
    "http://purl.org/pav/createdOn": [
      {
        "@type": "http://www.w3.org/2001/XMLSchema#date",
        "@value": "1993-02-01"
      }
    ],
    "http://purl.org/pav/curatedBy": [
      {
        "@id":
          "https://github.com/Coleridge-Initiative/adrf-onto/wiki/Vocabulary#cornoni-huntley_j"
      }
    ],
    "http://xmlns.com/foaf/0.1/page": [
      {
        "@id": "https://www.ncbi.nlm.nih.gov/pubmed/8481423"
      }
    ]
  }
);

SAMPLE_DATA.set(
  "https://github.com/Coleridge-Initiative/adrf-onto/wiki/Vocabulary#duke_univ",
  {
    "@context": "https://schema.org",
    "@id":
      "https://github.com/Coleridge-Initiative/adrf-onto/wiki/Vocabulary#duke_univ",
    "@type": "GovernmentPermit",
    // "issuedBy": {
    //   "@type": "GovernmentOrganization",
    //   "name": "Department of Health and Mental Hygiene\""
    // },
    // "issuedThrough": {
    //   "@type": "GovernmentService",
    //   "name": "NYC Food Service Establishment Permit Service"
    // },
    name: "NYC Food Service Establishment Permit"
    // "validFor": "P1Y",
    // "validIn": {
    //   "@type": "AdministrativeArea",
    //   "name": "New York"
    // }
  }
);

const sampleProviderPlugin: JupyterFrontEndPlugin<void> = {
  activate: (_, registry: LinkedDataRegistry) => {
    registry.register({
      get: async url => {
        console.log("getting ", url);
        return SAMPLE_DATA.get(url.toString()) || {};
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
      <dl>
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
                console.log(`Ignoring property ${property}`);
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

type URLFormProps = {
  initial: URL | undefined;
  onSubmit: (url: URL | undefined) => void;
};

type URLFormState = { url: string };
class URLForm extends React.Component<URLFormProps, URLFormState> {
  readonly state: URLFormState = {
    url: this.props.initial ? this.props.initial.toString() : ""
  };

  render() {
    return (
      <form
        onSubmit={event => {
          const url = this.state.url;
          this.props.onSubmit(url === "" ? undefined : new URL(url));
          event.preventDefault();
        }}
      >
        <label>
          URL:
          <input
            type="url"
            name="url"
            value={this.state.url}
            onChange={event => this.setState({ url: event.target.value })}
          />
        </label>
        <input type="submit" value="Browse" />
      </form>
    );
  }
}

type BrowserProps = { registry: LinkedDataRegistry };

type BrowserState = { url: URL | undefined };

class Browser extends React.Component<BrowserProps, BrowserState> {
  readonly state: BrowserState = {
    url: undefined
  };

  render() {
    return (
      <div>
        <h1>Linked Data Browser</h1>
        <URLForm
          initial={this.state.url}
          onSubmit={url => this.setState({ url })}
        />
        {this.state.url ? (
          <Viewer
            url={this.state.url}
            registry={this.props.registry}
            onClick={url => this.setState({ url })}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const linkedDataBrowserPlugin: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-metadata-service:data-browser",
  autoStart: true,
  requires: [LinkedDataRegistryToken, ILayoutRestorer, ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    registry: LinkedDataRegistry,
    restorer: ILayoutRestorer,
    palette: ICommandPalette
  ) => {
    // Declare a widget variable
    let widget: MainAreaWidget<ReactWidget>;

    // Add an application command
    const command: string = "dataregistry-debugger:open";
    app.commands.addCommand(command, {
      label: "Linked Data Browser",
      execute: () => {
        if (!widget) {
          // Create a new widget if one does not exist
          const content = ReactWidget.create(<Browser registry={registry} />);
          widget = new MainAreaWidget({ content });
          widget.id = "metadata-browser";
          widget.title.label = "Linked Data Browser";
          widget.title.closable = true;
        }
        if (!tracker.has(widget)) {
          // Track the state of the widget for later restoration
          tracker.add(widget);
        }
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, "main");
        }
        widget.content.update();

        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: "Linked Data" });

    // Track and restore the widget state
    let tracker = new WidgetTracker<MainAreaWidget<ReactWidget>>({
      namespace: "metadata-browser"
    });
    restorer.restore(tracker, {
      command,
      name: () => "metadata-browser"
    });
  }
};

export default [
  linkedDataRegistryPlugin,
  sampleProviderPlugin,
  linkedDataBrowserPlugin
] as JupyterFrontEndPlugin<any>[];
