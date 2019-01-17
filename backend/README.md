# JupyterLab Metadata Service - Server

All source code is written in
[TypeScript](http://www.typescriptlang.org/Handbook). See the [Style
Guide](https://github.com/jupyterlab/jupyterlab/wiki/TypeScript-Style-Guide).

All source code is formatted using [prettier](https://prettier.io).
When code is modified and committed, all staged files will be automatically
formatted using pre-commit git hooks (with help from the
[lint-staged](https://github.com/okonet/lint-staged) and
[husky](https://github.com/typicode/husky) libraries). The benefit of using a
code formatter like prettier is that it removes the topic of code style from the conversation
when reviewing pull requests, thereby speeding up the review process.

You may also use the prettier npm script (e.g. `npm run prettier`) to format the entire code base. We recommend
installing a prettier
extension for your code editor and configuring it to format your code with
a keyboard shortcut or automatically on save.

## Setting Up a Development Environment

### Creating the environment using conda

Building JupyterLab Metadata Service - Server from its GitHub source code requires Node.js.

If you use `conda`, you can get it with:

```bash
conda create -n jlab-metadata-service-server -c conda-forge --override-channels nodejs

# and activate your new environment
conda activate jlab-metadata-service-server

```

## Build and install for development

Run the following commands to install the initial project dependencies and install it in your environment.

```bash

npm install

```

Run your server using:

```bash

npm start

```

### Build and Run the Tests

To build this extesion run:

```bash
npm run build
```

At this momemnt, tests is not available.

