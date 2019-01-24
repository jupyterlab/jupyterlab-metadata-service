**[Installation](#installation)** |
**[License](#license)** |
**[Team](#team)** |
**[Getting help](#getting-help)** |

# JupyterLab Metadata Service Extension

[![Stability Experimental](https://img.shields.io/badge/stability-experimental-red.svg)](https://img.shields.io/badge/stability-experimental-red.svg)

A metadata service, client and UI for the metadata schema of [schema.org](https://schema.org/). Our plan is to build an architecture that enables everything in JupyterLab (notebooks, text files, datasets, etc.) to have metadata attached to it.

---

## Getting started

### Installation

This extension includes both a client-side JupyterLab extension and a server-side Jupyter notebook extension. Install these using the command line with

```bash
pip install jupyterlab-metadata-service
jupyter labextension install jupyterlab-metadata-service
```

If you are running Notebook 5.2 or earlier, enable the server extension by running

```bash
jupyter serverextension enable --py --sys-prefix jupyterlab-metadata-service
```

The latest versions of the following browsers are currently _known to work_:

- Firefox
- Chrome
- Safari


## Development

### Contributing

#### Backend Server

TODO: Write instructions for how to contribute to the backend server (e.g. how to run in development mode).

#### Frontend Extension

To contribute to the project, please read the [contributor documentation](CONTRIBUTING.md).

JupyterLab Metadata Service Extensions follows the Jupyter [Community Guides](https://jupyter.readthedocs.io/en/latest/community/content-community.html).

For a development install, do the following in the `frontend/` directory:
```bash
# If you don't yet have a conda environemnt for your work on this project, run these two commands:
conda create -n jlmeta -c conda-forge --override-channels nodejs jupyterlab
conda activate jlmeta

# Install JS dependencies:
jlpm install

# Register this extension with JupyterLab in development-mode:
jupyter labextension link .
```

Now you can run JupyterLab in auto-reload mode, like this:
```bash
jupyter lab --watch
```

If you modify the code in the `frontend/` folder, you'll have to rebuilt it (once rebuilt, JupyterLab will notice and do a partial re-build of itself, from the command above):
```bash
jlpm run build
```

If you don't want to run the above command every time you modify code, you can watch the source with the following command:
```bash
jlpm run watch
```


### License

JupyterLab Metadata Service extension uses a shared copyright model that enables all contributors to maintain the
copyright on their contributions. All code is licensed under the terms of the revised [BSD license](https://github.com/jupyterlab/jupyterlab-metadata-service/blob/master/LICENSE).

### Team

JupyterLab Metadata Service Extension is part of [Project Jupyter](http://jupyter.org/) and is developed by an open community.

Current maintainers of this project are listed in alphabetical order, with affiliation, and main areas of contribution:


- Brian Granger, Cal Poly (co-creator, strategy, vision, management, UI/UX design,
  architecture).
- Igor Derke, Quansight (general development, extensions)
- Ivan Ogasawara, Quansight (general development, extensions)
- Katherine Oliphant, Quansight (general development, extensions)
- Ryan Henning, Quansight (management)
- Saul Shanabrook, Quansight (general development, extensions)
- Tim George, Cal Poly (UI/UX design, strategy, management, user needs analysis)

---

## Getting help

We encourage you to ask questions on the [mailing list](https://groups.google.com/forum/#!forum/jupyter),
and participate in development discussions or get live help on [Gitter](https://gitter.im/jupyterlab/jupyterlab). Please use the [issues page](https://github.com/jupyterlab/jupyterlab-metadata-service/issues) to provide feedback or submit a bug report.
