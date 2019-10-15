const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  rootDir: "src",
  preset: "jest-puppeteer",
  
  //  Needed for jest-screenshots
  testRunner: 'jest-circus/runner',
  
  testEnvironment: '../jest-environment.js',
  transform: {
    ...tsjPreset.transform
  }
};
