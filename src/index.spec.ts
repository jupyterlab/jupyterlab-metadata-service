const { setDefaultOptions } = require("expect-puppeteer");

const timeout = 10 * 1000;

jest.setTimeout(timeout);
setDefaultOptions({ timeout });

describe("JupyterLab", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/lab?reset");
  });

  it("should show JupyterLab logo", async () => {
    expect.assertions(1);
    await expect(page).toMatchElement("#jp-MainLogo");
  });

  it("show be able to show Dataset Explorer tab", async () => {
    expect.assertions(2);
    await expect(page).toClick('[title="Data Explorer"]');
    await expect(page).toMatch("Datasets");
  });

  it("should see files marker", async () => {
    expect.assertions(1);
    await expect(page).toMatchElement("h3", { text: "file:///" });
  });

  it("should be able to expand files", async () => {
    expect.assertions(2);
    const fileButtons = await page.$x('//button[../h3/text()="file:///"]');
    await expect(fileButtons.length).toBe(1);
    await expect(fileButtons[0]).toClick("button");
  });

  it("should see datasets.yml marker", async () => {
    expect.assertions(1);
    await expect(page).toMatch("datasets.yml");
  });
});
