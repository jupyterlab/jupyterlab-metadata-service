import { Widget } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";

import { IMetadataCommentsService } from "../metadata_iface/comments";
import { IMetadataDatasetsService } from "../metadata_iface/datasets";

/**
 * Just a mock placeholder widget. Not at all the real deal.
 */
export class MetadataWidget extends Widget {
  /**
   * A handle the the metadata COMMENTS interface.
   */
  comments: IMetadataCommentsService;

  /**
   * A handle the the metadata DATASETS interface.
   */
  datasets: IMetadataDatasetsService;

  /**
   *
   */
  constructor(
    comments: IMetadataCommentsService,
    datasets: IMetadataDatasetsService
  ) {
    super();

    this.comments = comments;
    this.datasets = datasets;

    this.id = "jlab-metadata-service";
    this.title.label = "Jupyterlab Metadata Service Connection";
    this.title.closable = true;
  }

  /**
   * Handle update requests for the widget.
   */
  onUpdateRequest(msg: Message): void {
    console.log(msg);
    let self = this;

    let f = async () => {
      let divQueryResult: HTMLDivElement = document.createElement("div");

      console.log("quering ...");
      const data = await this.datasets.queryAllDatasets();
      divQueryResult.innerHTML = JSON.stringify(data);
      console.log(data);

      self.node.appendChild(divQueryResult);
    };
    f();
  }
}
