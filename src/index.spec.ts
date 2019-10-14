const { setDefaultOptions } = require("expect-puppeteer");

const timeout = 10 * 1000;

jest.setTimeout(timeout);
setDefaultOptions({ timeout });

describe("JupyterLab", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/lab");
  });

  it("should show JupyterLab logo", async () => {
    expect.assertions(1);
    await expect(page).toMatchElement("#jp-MainLogo");
  });

  it("show be able to click on datasets", async () => {
    expect.assertions(2);
    await expect(page).toClick('[title="Data Explorer"]');
    await expect(page).toMatch("Datasets");
  });
});
