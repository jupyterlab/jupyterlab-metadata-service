**[Installation](#installation)** |
**[License](#license)** |
**[Team](#team)** |
**[Getting help](#getting-help)** |

# JupyterLab Metadata Service Extension

[![Stability Experimental](https://img.shields.io/badge/stability-experimental-red.svg)](https://img.shields.io/badge/stability-experimental-red.svg)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jupyterlab/jupyterlab-metadata-service/prototype?urlpath=lab)


```bash
jupyter labextension install @jupyterlab/metadata-extension @jupyterlab/dataregistry-extension
```


## Project Vision

We have articulated our vision for this project as a ["Press Release from the Future"](./press_release.md). We are now pursing that vision to make it a _reality_. Have feedback or want to get involved? [Post an issue!](https://github.com/jupyterlab/jupyterlab-metadata-service/issues/new)



## Development

### Contributing

To contribute to the project, please read the [contributor documentation](CONTRIBUTING.md).

JupyterLab Metadata Service Extensions follows the Jupyter [Community Guides](https://jupyter.readthedocs.io/en/latest/community/content-community.html).

Follow the instructions below to set up your environment for development.

#### Clone


```bash
git clone https://github.com/jupyterlab/jupyterlab-metada-service.git
cd jupyterlab-metada-service

// (optional) Create a fresh conda environment
// conda create -n jupyterlab-metadata-service -c conda-forge python=3.6
// conda activate jupyterlab-metadata-service

// Install Jupyterlab
pip install jupyterlab

// Build and link the data explorer packages
jlpm install
jlpm run build
jupyter labextension install . @jupyterlab/dataregistry-extension

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
