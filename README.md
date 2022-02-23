# Extension coding challenge

Satisfies coding challenge requirements.

## Create a chrome browser extension based on Manifest Version 3 that performs the following:

1. Opens up a bunch of tabs with some random sites (CNN, YouTube, certain YouTube videos, etc). Alternatively you can do this step manually and that is acceptable.
2. Pick a page that the extension will inject an input field in, for example you can use [https://duckduckgo.com](https://duckduckgo.com/) site and inject a text input field that would look like `<input type="text" id=“searchTerm” name=“searchTerm”>`
3. Create a listener on that injected text field for the “Enter” key press.
4. When the user presses the “Enter” key, the extension should take the text that is in this text box and search all the titles of the open tabs for any of them that contain the typed search term.
5. The first tab that is found to contain this search term, switch to it. As in that the matching tab should be displayed after the user types a search term and presses the enter key.

## Features contained in the code

These address the major issues I faced previously developing a complicated chrome extension including tooling with hot reload and automated testing.

1. [Uses rollup-plugin-chrome-extension](https://github.com/extend-chrome/rollup-plugin-chrome-extension) to bootstrap tooling for manifest v3 Chrome extension development with hot reload on code changes.
2. Has a helper function `waitForElement` that emulates Puppeteers `waitForSelector` method when used in injected content scripts will wait for elements to exist before continuing the injected script code execution. Often 3rd party websites will override `window.onload` or `window.addEventListener('load', noop)` will not fire the callback on injected scripts. This features guarantees that an element will exist with a sensible timeout before continuing or throwing an error.
3. e2e tests are built using Jest and Puppeteer. The compiled extension is installed in a browser instance using browser flags options. Puppeteer allows code evaluation access to the extension background service worker script for arbitrary code execution in the service worker execution context. The test code can sit on a server out in the cloud somewhere continuously insuring that the extension interacts correctly with uncontrolled 3rd party websites immediately sending notification by SMS or email if changes to 3rd party website break the extension. For example,

  ```javascript
    it('should when the user presses the “Enter” key, the extension should take the text that is in this text box and search all the titles of the open tabs for any of them that contain the typed search term.', async () => {
      await appPages.hackerNews.keyboard.press('Enter');
      const worker = await extensionTarget?.worker();
      const tabs: globalThis.chrome.tabs.Tab[] | undefined =
        await worker?.evaluate(
          () =>
            new Promise((resolve) =>
              chrome.tabs.query({ active: true, currentWindow: true }, resolve),
            ),  // This code is run in the extension background service worker execution context where `chrome` is the `globalThis` 🔥🔥🔥
        );
      console.log(tabs);
      expect(tabs?.[0].title).toContain('Duck');
    });
  ```

### Install dependencies

```sh
yarn
```

### Run in watch mode

```sh
yarn start
```

### Test end to end

```sh
yarn test:e2e
```

### Build and test end to end

```sh
yarn test:build:e2e
```
