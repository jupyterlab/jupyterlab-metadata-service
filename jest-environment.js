// Based on from https://yarnpkg.com/en/package/@rws-air/jestscreenshot

const PuppeteerEnvironment = require("jest-environment-puppeteer");
const JestScreenshot = require("@rws-air/jestscreenshot");
require("jest-circus");

class CustomEnvironment extends PuppeteerEnvironment {
  async teardown() {
    await this.global.page.waitFor(2000);
    await super.teardown();
  }

  async handleTestEvent(event, state) {
    if (event.name === "test_fn_failure") {
      const testName = state.currentlyRunningTest.name;

      const jestScreenshot = new JestScreenshot({
        page: this.global.page,
        dirName: __dirname,
        testName
      });

      await jestScreenshot.setup();
    }
  }
}

module.exports = CustomEnvironment;
