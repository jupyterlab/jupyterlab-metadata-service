import { Widget } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';

import { IMetadataCommentsService } from '../metadata_iface/comments';
import { IMetadataDatasetsService } from '../metadata_iface/datasets';
import { IMetadataPeopleService } from '../metadata_iface/people';

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
   * A handle to the metadata PEOPLE interface.
   */
  people: IMetadataPeopleService;

  /**
   *
   */
  constructor(
    comments: IMetadataCommentsService,
    datasets: IMetadataDatasetsService,
    people: IMetadataPeopleService
  ) {
    super();

    this.comments = comments;
    this.datasets = datasets;
    this.people = people;

    this.id = 'jlab-metadata-service';
    this.title.label = 'Jupyterlab Metadata Service Connection';
    this.title.closable = true;
  }

  /**
   * Handle update requests for the widget.
   */
  onUpdateRequest(msg: Message): void {
    console.log(msg);
    let self = this;

    let f = async () => {
      let divQueryResult: HTMLDivElement = document.createElement('div');

      console.log('mutating JSON ...');
      const resultJSON = await this.datasets.createNewDataset({
        name: 'JSON'
      });
      console.log(resultJSON);

      const resultCSV = await this.datasets.createNewDataset({
        name: 'CSV'
      });
      console.log(resultCSV);

      console.log('quering ...');
      this.datasets.queryAllDatasets().then(data => {
        divQueryResult.innerHTML = JSON.stringify(data);
        console.log(data);
        self.node.appendChild(divQueryResult);
      });
    };
    f();
  }
}
