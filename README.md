**[Installation](#installation)** |
**[License](#license)** |
**[Team](#team)** |
**[Getting help](#getting-help)** |

# JupyterLab Metadata Service Extension

[![Stability Experimental](https://img.shields.io/badge/stability-experimental-red.svg)](https://img.shields.io/badge/stability-experimental-red.svg)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jupyterlab/jupyterlab-metadata-service/master?urlpath=lab)

![](./docs/screenshot.png)

```bash
jupyter labextension install @jupyterlab/metadata-extension @jupyterlab/dataregistry-extension
```

This JupyterLab extension displays linked data about the resources you are interacting with in JuyterLab.
It enables other extensions to register as linked data providers to expose [JSON LD](https://json-ld.org/) about an entity,
given its URL. The linked data that is exposed is shown to the user the Linked Data viewer in the Data Browser pane.

## Project Vision

We have articulated our vision for this project as a ["Press Release from the Future"](./press_release.md). We are now pursing that vision to make it a _reality_. Have feedback or want to get involved? [Post an issue!](https://github.com/jupyterlab/jupyterlab-metadata-service/issues/new)

## Development

### Contributing

To contribute to the project, please read the [contributor documentation](CONTRIBUTING.md).

JupyterLab Metadata Service Extensions follows the Jupyter [Community Guides](https://jupyter.readthedocs.io/en/latest/community/content-community.html).

Follow the instructions below to set up your environment for development.

#### Clone

To set this up with a dev version of the data explorer:

```bash
conda create -n jupyterlab-metadata-service -c conda-forge python=3.6 jupyterlab
conda activate jupyterlab-metadata-service

git clone https://github.com/jupyterlab/jupyterlab-data-explorer.git
git clone https://github.com/jupyterlab/jupyterlab-metadata-service.git

cd jupyterlab-metadata-service

// Build and link the data explorer packages
jupyter labextension link . ../jupyterlab-data-explorer/dataregistry-extension/ ../jupyterlab-data-explorer/dataregistry/

// Run Jupyterlab
jupyter lab
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
- Ryan Henning, Quansight (general development, management)
- Saul Shanabrook, Quansight (general development, extensions)
- Tim George, Cal Poly (UI/UX design, strategy, management, user needs analysis)

---

## Getting help

We encourage you to ask questions on the [mailing list](https://groups.google.com/forum/#!forum/jupyter),
and participate in development discussions or get live help on [Gitter](https://gitter.im/jupyterlab/jupyterlab). Please use the [issues page](https://github.com/jupyterlab/jupyterlab-metadata-service/issues) to provide feedback or submit a bug report.
