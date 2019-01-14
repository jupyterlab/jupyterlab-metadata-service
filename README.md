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

```bash
jupyter labextension install jupyterlab-metadata-service
```

The latest versions of the following browsers are currently _known to work_:

- Firefox
- Chrome
- Safari

---

## Development

### Contributing

To contribute to the project, please read the [contributor documentation](CONTRIBUTING.md).

JupyterLab Metadata Service Extensions follows the Jupyter [Community Guides](https://jupyter.readthedocs.io/en/latest/community/content-community.html).

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
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