/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

const { defaults: tsjPreset } = require('ts-jest/presets');

const config = {
  preset: 'jest-puppeteer',
  rootDir: '.',

  // Needed for jest-screenshots
  testRunner: 'jest-circus/runner',

  testEnvironment: './jest-environment.js',
  transform: {
    ...tsjPreset.transform
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/test/**/test*.ts?(x)'],
  testPathIgnorePatterns: ['/build/', '/lib/', '/node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json'
    }
  }
};

/**
 * Exports.
 */
module.exports = config;
