import { Widget } from "@phosphor/widgets";

import { Message } from "@phosphor/messaging";

import { openConnection, getDatasets } from "./connection";

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
    let btnConnect: HTMLInputElement = document.createElement("input");
    btnConnect.type = "button";
    btnConnect.value = "OpenConnection";
    btnConnect.click = openConnection;

    let divQueryResult: HTMLDivElement = document.createElement("div");

    let btnQueryAll: HTMLInputElement = document.createElement("input");
    btnQueryAll.type = "button";
    btnQueryAll.value = "Query all Datasets";
    btnQueryAll.click = async () => {
      const data = await getDatasets();
      divQueryResult.innerHTML = JSON.stringify(data);
    };

    this.node.appendChild(btnConnect);
    this.node.appendChild(btnQueryAll);
    this.node.appendChild(divQueryResult);
  }
}
