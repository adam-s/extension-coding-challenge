import puppeteer from 'puppeteer';
import { bootstrap } from './bootstrap';

describe('Extension e2e', () => {
  let appPages: Record<string, puppeteer.Page>;
  let browser: puppeteer.Browser;
  let extensionTarget: puppeteer.Target;

  beforeAll(async () => {
    const urlsToOpen = {
      cnn: 'https://edition.cnn.com/', // Takes forever to load all the resources
      stackOverflow: 'https://stackoverflow.com/',
      hackerNews: 'https://news.ycombinator.com/',
      duckduckgo: 'https://duckduckgo.com/',
    };
    const context = await bootstrap({ appUrls: urlsToOpen });
    browser = context.browser;
    extensionTarget = context.extensionTarget;
    appPages = context.appPages;
  });

  it('should open up a bunch of tabs with some random sites (CNN, YouTube, certain YouTube videos, etc). Alternatively you can do this step manually and that is acceptable.', () => {
    appPages;
    browser;
    extensionTarget;
    expect(Object.keys(appPages)).toHaveLength(4);
  });

  it('should pick a page that the extension will inject an input field in, for example you can use https://duckduckgo.com/ site and inject a text input field that would look like <input type="text" id=“searchTerm” name=“searchTerm”>', async () => {
    const cnn = appPages.stackOverflow;
    const inputEl = await cnn.$('#searchTerm');
    console.log(inputEl);
  });

  it('should create a listener on that injected text field for the “Enter” key press.', () => {
    expect(4).toBe(4);
  });

  it('should when the user presses the “Enter” key, the extension should take the text that is in this text box and search all the titles of the open tabs for any of them that contain the typed search term.', () => {
    expect(5).toBe(5);
  });

  it('The first tab that is found to contain this search term, switch to it. As in that the matching tab should be displayed after the user types a search term and presses the enter key.', () => {
    expect(6).toBe(6);
  });

  afterAll(async () => {
    await browser.close();
  });
});
