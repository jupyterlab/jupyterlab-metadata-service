/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import { expand, flatten } from "jsonld";
import { Token } from "@phosphor/coreutils";
import { JupyterFrontEndPlugin } from "@jupyterlab/application";
import { LinkedDataThunk } from './types';
import { findEntity } from './find_entity';

/**
 * Interface describing a linked data "provider".
 *
 * @private
 */
interface ILinkedDataProvider {
	/**
	 * Returns a thunk to fetch the linked data associated with a specified URL.
	 *
	 * ## Notes
	 *
	 * -  If no information is associated with a specified URL, the method should return `null`.
	 *
	 * @param url - URL
	 * @returns a function returning a promise which resolves linked data
	 */
	get(url: URL): LinkedDataThunk | null;
}

/**
 * Linked data registry class.
 *
 * @private
 */
class LinkedDataRegistry {
	/**
	 * Registers a linked data provider.
	 *
	 * @param provider - linked data provider
	 */
	register(provider: ILinkedDataProvider): void {
		this._providers.add(provider);
	}

	/**
	 * Returns a promise for resolving linked data associated with a specified URL.
	 *
	 * ## Notes
	 *
	 * -  If a URL is not associated with linked data, the method returns `null`.
	 *
	 * @param url - URL
	 * @returns a function returning a promise which resolves linked data
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

	/**
	 * List of linked data "providers".
	 */
	private _providers = new Set<ILinkedDataProvider>();
}

/**
 * Linked data registry token.
 *
 * @private
 */
const LinkedDataRegistryToken = new Token("LinkedDataRegistry");

/**
 * Activates the plugin.
 *
 * @private
 * @returns a linked data registry
 */
function activate() {
	return new LinkedDataRegistry();
}

/**
 * Plugin registration data.
 */
const extension: JupyterFrontEndPlugin<LinkedDataRegistry> = {
	id: "jupyterlab-metadata-service:linked-data-registry",
	activate: activate,
	autoStart: true,
	requires: [],
	provides: LinkedDataRegistryToken
};

/**
 * Exports.
 */
export { LinkedDataRegistry };
export { LinkedDataRegistryToken };
export default extension;
