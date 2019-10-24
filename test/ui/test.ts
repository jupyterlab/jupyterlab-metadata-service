/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import { ElementHandle } from 'puppeteer';

const { setDefaultOptions } = require('expect-puppeteer');

const timeout = 15 * 1000;

jest.setTimeout(timeout);
setDefaultOptions({ timeout });

async function getXPath(xpath: string): Promise<ElementHandle<Element>> {
  await page.waitForXPath(xpath);
  const elements = await page.$x(xpath);
  expect(elements.length).toBe(1);
  return elements[0];
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
describe('JupyterLab', () => {
  beforeAll(async () => {
    // Load JupyterLab:
    await page.goto('http://localhost:8080/lab?reset');

    // NOTE: depending on system resource constraints, this may NOT be enough time for JupyterLab to load and get "settled", so to speak. If CI tests begin inexplicably failing due to timeout failures, may want to consider increasing the sleep duration...
    await sleep(3000);

    // Attempt to find the data explorer tab on the page (all tests essentially presume that we can load the data explorer via the tab bar button):
    const el = await page.$('[title="Data Explorer"]');
    if (el !== null) {
      // Clicking on the data explorer tab should open the data explorer, thus allowing us to test data explorer UI interactions:
      el.click();
    } else {
      console.log('Unable to find expected tab.');
    }
  });

  it('should show JupyterLab logo', async () => {
    expect.assertions(1);
    await expect(page).toMatchElement('#jp-MainLogo', { visible: true } as any);
  });

  it("show be able to show 'Data Explorer' tab", async () => {
    expect.assertions(1);
    await expect(page).toMatchElement('.jl-explorer-heading', {
      text: 'Datasets',
      visible: true
    } as any);
  });

  it('should see files marker', async () => {
    expect.assertions(1);
    await expect(page).toMatchElement('h3', {
      text: 'file:///',
      visible: true
    } as any);
  });

  it('should be able to expand files', async () => {
    expect.assertions(1);
    const filebutton = await getXPath('//button[../h3/text()="file:///"]');
    await filebutton.click();
  });

  it('should see datasets.yml marker', async () => {
    expect.assertions(1);
    await expect(page).toMatchElement('h3', {
      text: 'datasets.yml',
      visible: true
    } as any);
  });

  it('should be able to expand datasets.yml', async () => {
    expect.assertions(1);
    const datasetsButton = await getXPath(
      '//button[../h3/text()="datasets.yml"]'
    );
    await datasetsButton.click();
  });

  it('should show datasets label', async () => {
    expect.assertions(1);
    await expect(page).toMatchElement('h3', {
      text: 'A Publication',
      visible: true
    } as any);
  });

  it("show be able to show 'Data Browser' tab", async () => {
    expect.assertions(2);
    await expect(page).toClick('[title="Data Browser"]');
    await expect(page).toMatchElement('.jl-dr-browser', {
      text: 'Follow active?',
      visible: true
    } as any);
  });
});
