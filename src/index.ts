import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from "@jupyterlab/application";

function activate(app: JupyterFrontEnd, labShell: ILabShell): void {
  console.log("metadata!")
}

export default [
  {
    activate,
    id: "jupyterlab-metadata-service",
    requires: [ILabShell],
    autoStart: true
  }
] as JupyterFrontEndPlugin<any>[];
