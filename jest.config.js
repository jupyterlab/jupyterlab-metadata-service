const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  rootDir: "src",

  // Needed for jest-screenshots
  // https://yarnpkg.com/en/package/@rws-air/jestscreenshot
  testRunner: "jest-circus/runner",

  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "../jest-environment.js",
  setupFilesAfterEnv: ["expect-puppeteer"],
  transform: {
    ...tsjPreset.transform
  }
};
