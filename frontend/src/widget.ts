import { Widget } from "@phosphor/widgets";

import { Message } from "@phosphor/messaging";

import { openConnection, getDatasets } from "./connection";

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

/**
 *
 */
export class MetadataWidget extends Widget {
  /**
   *
   */
  constructor() {
    super();

    this.id = "jlab-metadata-service";
    this.title.label = "Jupyterlab Metadata Service Connection";
    this.title.closable = true;

  }

  /**
   * Handle update requests for the widget.
   */
  onUpdateRequest(msg: Message): void {
    console.log(msg)
    let self = this;

    let f = async () => {
      openConnection();

      let divQueryResult: HTMLDivElement = document.createElement("div");

      console.log('quering ...');
      const data = await getDatasets();
      divQueryResult.innerHTML = JSON.stringify(data);
      console.log(data);

      self.node.appendChild(divQueryResult);
    }
    f();
  }
}
