import puppeteer from 'puppeteer';
import { bootstrap } from './bootstrap';

describe('Extension e2e', () => {
  let appPage: puppeteer.Page;
  let browser: puppeteer.Browser;
  let extensionTarget: puppeteer.Target;

  const URL =
    'https://docs.google.com/document/d/1Z0IxO8x8B2xCrdSQ4KykAU3nVxtOf6KRLNR9_O7sEcQ/edit';
  beforeAll(async () => {
    const context = await bootstrap({
      appUrl: URL /*, slowMo: 50, devtools: true*/,
    });

    appPage = context.appPage;
    browser = context.browser;
    extensionTarget = context.extensionTarget;
  });

  it('should bootstrap', async () => {
    appPage;
    browser;
    extensionTarget;
    expect('stuff').toBe('stuff');
  });

  afterAll(async () => {
    await browser.close();
  });
});
