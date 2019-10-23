/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import { JupyterFrontEndPlugin } from "@jupyterlab/application";
import LinkedDataBrowser from './linked_data_browser';
import LinkedDataRegistry from './linked_data_registry';
import SampleProvider from './sample_provider';

export default [
  LinkedDataRegistry,
  SampleProvider,
  LinkedDataBrowser
] as JupyterFrontEndPlugin<any>[];
