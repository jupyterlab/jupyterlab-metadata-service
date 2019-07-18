import { JupyterFrontEndPlugin } from "@jupyterlab/application";

import { flatten } from "jsonld";
import { Token } from "@phosphor/coreutils";
type LinkedData = {};

export interface ILinkedDataProvider {
  get(url: URL): LinkedData;
}

export class LinkedDataRegistry {
  register(provider: ILinkedDataProvider): void {
    this._providers.add(provider);
  }

  /**
   * Lookup this URL in all providers and flatten the results.
   */
  get(url: URL): LinkedData {
    return flatten([...this._providers].map(p => p.get(url)), null);
  }

  private _providers = new Set<ILinkedDataProvider>();
}

export const LinkedDataRegistryToken = new Token("LinkedDataRegistry");

export default [
  {
    activate: () => new LinkedDataRegistry(),
    id: "jupyterlab-metadata-service:linked-data-registry",
    requires: [],
    provides: LinkedDataRegistryToken,
    autoStart: true
  }
] as JupyterFrontEndPlugin<any>[];
