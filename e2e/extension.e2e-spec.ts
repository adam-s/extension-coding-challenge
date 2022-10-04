import puppeteer from 'puppeteer';
import { bootstrap } from './bootstrap';

describe('Extension e2e', () => {
  let appPages: Record<string, puppeteer.Page>;
  let browser: puppeteer.Browser;
  let extensionTarget: puppeteer.Target;

  beforeAll(async () => {
    const urlsToOpen = {
      // cnn: 'https://edition.cnn.com/', // Takes forever to load all the resources
      stackOverflow: 'https://stackoverflow.com/',
      hackerNews: 'https://news.ycombinator.com/',
      duckduckgo: 'https://duckduckgo.com/',
    };
    const context = await bootstrap({ appUrls: urlsToOpen, slowMo: 100 });
    browser = context.browser;
    extensionTarget = context.extensionTarget;
    appPages = context.appPages;
  });

  it('should open up a bunch of tabs with some random sites (CNN, YouTube, certain YouTube videos, etc). Alternatively you can do this step manually and that is acceptable.', () => {
    appPages;
    browser;
    extensionTarget;
    expect(Object.keys(appPages)).toHaveLength(3);

    const targets = browser
      .targets()
      .filter((target) => target.type() === 'page');
    console.log(targets);
  });

  it('should pick a page that the extension will inject an input field in, for example you can use https://duckduckgo.com/ site and inject a text input field that would look like <input type="text" id=“searchTerm” name=“searchTerm”>', async () => {
    const hackerNews = appPages.hackerNews;
    const outerHTML = await hackerNews
      .$('#searchTerm')
      .then((handle) => handle?.getProperty('outerHTML'))
      .then((outerHTML) => outerHTML?.jsonValue());
    expect(outerHTML).toMatchSnapshot();
  });

  it('should create a listener on that injected text field for the “Enter” key press.', async () => {
    await appPages.hackerNews.bringToFront();
    await appPages.hackerNews.focus('input[name="searchTerm"]');
    await appPages.hackerNews.keyboard.type('Duck');
    await appPages.hackerNews.waitForFunction(
      `document.querySelector('input[name="searchTerm"').value === 'Duck'`,
    );
    const value = await appPages.hackerNews
      .$('input[name="searchTerm"')
      .then((handle) => handle?.getProperty('value'));
    expect(await value?.jsonValue()).toBe('Duck');
  });

  it('should when the user presses the “Enter” key, the extension should take the text that is in this text box and search all the titles of the open tabs for any of them that contain the typed search term.', async () => {
    await appPages.hackerNews.keyboard.press('Enter');
    const worker = await extensionTarget?.worker();
    const tabs: globalThis.chrome.tabs.Tab[] | undefined =
      await worker?.evaluate(
        () =>
          new Promise((resolve) =>
            chrome.tabs.query({ active: true, currentWindow: true }, resolve),
          ),
      );
    console.log(tabs);
    expect(tabs?.[0].title).toContain('Duck');
    console.log(browser._targets);
  });

  afterAll(async () => {
    await browser.close();
  });
});
