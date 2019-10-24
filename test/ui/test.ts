/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import { ElementHandle } from 'puppeteer';

const { setDefaultOptions } = require('expect-puppeteer');

const timeout = 5 * 1000;

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
    await page.goto('http://localhost:8080/lab?reset');
    await sleep(1000);
  });

  it('should show JupyterLab logo', async () => {
    expect.assertions(1);
    await expect(page).toMatchElement('#jp-MainLogo', { visible: true } as any);
  });

  it("show be able to show 'Data Explorer' tab", async () => {
    expect.assertions(2);
    await expect(page).toClick('[title="Data Explorer"]');
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
