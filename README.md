**[Installation](#installation)** |
**[License](#license)** |
**[Team](#team)** |
**[Getting help](#getting-help)** |

# JupyterLab Metadata Service Extension

[![Stability Experimental](https://img.shields.io/badge/stability-experimental-red.svg)](https://img.shields.io/badge/stability-experimental-red.svg)

## Project Vision

We have articulated our vision for this project as a ["Press Release from the Future"](./press_release.md). We are now pursing that vision to make it a _reality_. Have feedback or want to get involved? [Post an issue!](https://github.com/jupyterlab/jupyterlab-metadata-service/issues/new)

---

## Getting started

### Installation

This extension includes both a client-side JupyterLab extension and a server-side Jupyter notebook extension. Install these using the command line with:

```bash
pip install jupyterlab-metadata-service
jupyter labextension install jupyterlab-metadata-service
```

Note: This repo has not been published yet, so the commands above won't actually work, _yet_.

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

To contribute to the project, please read the [contributor documentation](CONTRIBUTING.md).

JupyterLab Metadata Service Extensions follows the Jupyter [Community Guides](https://jupyter.readthedocs.io/en/latest/community/content-community.html).

Follow the instructions below to set up your environment for development.

#### Clone

For now, you must develop against the bleeding-edge JupyterLab. Let's close the master JupyterLab branch, and also this branch of this repo.

```bash
git clone https://github.com/jupyterlab/jupyterlab.git
git clone -b add_graphql_apollo https://github.com/Quansight/jupyterlab-metadata-service.git
```

#### Create a fresh Conda environment

```bash
# If you already have an environment with this name:
# conda remove --name jupyterlab-metadata-service --all

conda create -n jupyterlab-metadata-service -c conda-forge notebook
source activate jupyterlab-metadata-service
```

#### Backend Server

The backend server is Apollo GraphQL. We have a JupyterLab extension that will auto-start Apollo, monitor it (and restart it if needed), and also proxy requests to Apollo through JupyterLab.

```bash
cd jupyterlab-metadata-service/backend
pip install -e .
cd jupyterlab_metadata_service_server
npm install
cd ../../..
```

#### Frontend Extension

To develop against an unreleased version of `JupyterLab` requires that you add this extension
as a package inside the `jupyterlab` repo:

```bash
cd jupyterlab
pip install -e .

jlpm run add:sibling ../jupyterlab-metadata-service/frontend

jupyter lab --watch --dev
```

Now you can edit the files in the package in `./packages/jupterlab-commenting`. Saving changes should cause JupyterLab to do an incremental re-compile, and you can refresh JupyterLab in your browser to see the changes in effect.

NOTE: Running `add:sibling` copies all the frontend files, so to commit any edits you make, copy the changes back to the `../jupyterlab-metadata-service/frontend` directory.


#### Frontend Extension (if we didn't need to build against bleeding-edge JupyterLab)

When JupyterLab officially releases version 1.0, the following will work to develop in this repo without having to clone JupyterLab master.

```bash
cd jupyterlab-metadata-service/frontend

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
- Ryan Henning, Quansight (general development, management)
- Saul Shanabrook, Quansight (general development, extensions)
- Tim George, Cal Poly (UI/UX design, strategy, management, user needs analysis)

---

## Getting help

We encourage you to ask questions on the [mailing list](https://groups.google.com/forum/#!forum/jupyter),
and participate in development discussions or get live help on [Gitter](https://gitter.im/jupyterlab/jupyterlab). Please use the [issues page](https://github.com/jupyterlab/jupyterlab-metadata-service/issues) to provide feedback or submit a bug report.
