import { JupyterLab, JupyterLabPlugin } from "@jupyterlab/application";

import { ICommandPalette } from "@jupyterlab/apputils";

import "../style/index.css";
import { MetadataWidget } from "./widget";

/**
 * Initialization data for the jupyterlab-metadata-service extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: "jupyterlab-metadata-service",
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log(
      "JupyterLab extension jupyterlab-metadata-service is activated!"
    );

    // Create a single widget
    let widget: MetadataWidget = new MetadataWidget();

    // Add an application command
    const command: string = "jlab-metadata-service:open";
    app.commands.addCommand(command, {
      label: "Metadata Service",
      execute: async () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.addToMainArea(widget);
        }
        widget.update();
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: "Metadata" });
  }
};

export default extension;
