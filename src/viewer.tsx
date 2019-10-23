/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import React from "react";
import { LinkedData, LinkedDataThunk } from './types';
import { NodeObject } from './node_object';

/**
 * Interface describing viewer properties.
 *
 * @private
 */
interface Props {
	/**
	 * URL.
	 */
	url: URL;

	/**
	 * Callback invoked upon a "click" event.
	 *
	 * @param url - URL
	 */
	onClick: (url: URL) => void;

	/**
	 * Function returning a promise which resolves linked data.
	 */
	thunk: LinkedDataThunk;
};

/**
 * Interface describing viewer state.
 */
interface State {
	/**
	 * Linked data.
	 */
	data?: LinkedData;
};

/**
 * Component for viewing linked data.
 */
class Viewer extends React.Component<Props, State> {
	/**
	 * Viewer state.
	 */
	readonly state: State = {};

	/**
	 * Component hook invoked prior to mounting.
	 */
	async componentWillMount() {
		this.setState({ data: await this.props.thunk() });
	}

	/**
	 * Component hook invoked after updating.
	 *
	 * @param prevProps - previous properties
	 */
	componentDidUpdate(prevProps: Props) {
		if (this.props.url.toString() !== prevProps.url.toString()) {
			this.componentWillMount();
		}
	}

	/**
	 * Renders the component.
	 *
	 * @returns rendered component
	 */
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

/**
 * Exports.
 */
export { Viewer };
