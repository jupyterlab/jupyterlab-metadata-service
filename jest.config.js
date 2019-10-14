const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  rootDir: "src",
  preset: "jest-puppeteer",
  transform: {
    ...tsjPreset.transform
  }
};
