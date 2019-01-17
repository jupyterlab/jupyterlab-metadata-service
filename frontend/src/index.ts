import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';

/**
 * Initialization data for the jupyterlab-metadata-service extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-metadata-service',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab-metadata-service is activated!');
  }
};

export default extension;
