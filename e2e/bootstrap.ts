import puppeteer from 'puppeteer';

interface Options {
  devtools?: boolean;
  slowMo?: number;
  appUrls?: Record<string, string>;
}

interface Bootstrap {
  appPages: Record<string, puppeteer.Page>;
  browser: puppeteer.Browser;
  extensionTarget: puppeteer.Target;
}

type LaunchOptions = puppeteer.LaunchOptions &
  puppeteer.BrowserLaunchArgumentOptions &
  puppeteer.BrowserConnectOptions & {
    product?: puppeteer.Product;
    extraPrefsFirefox?: Record<string, unknown>;
  };

export const bootstrap = async (options: Options): Promise<Bootstrap> => {
  try {
    const { devtools = true, slowMo, appUrls } = options as Options;
    const launchOptions: LaunchOptions = {
      headless: false,
      devtools,
      args: ['--disable-extensions-except=./dist', '--load-extension=./dist'],
      ignoreDefaultArgs: ['--enable-automation'],
    };
    if (typeof slowMo !== 'undefined') Object.assign(launchOptions, { slowMo });
    const browser = await puppeteer.launch(launchOptions);
    const appPages: { [key: string]: puppeteer.Page } = {};
    if (appUrls) {
      for await (const destination of Object.keys(appUrls)) {
        appPages[destination] = await browser.newPage();
        await appPages[destination].goto(appUrls[destination], {
          waitUntil: 'load',
        });
      }
    }

    const targets = browser.targets();
    const extensionTarget = targets.find(
      (target) => target.type() === 'service_worker',
    );

    if (!extensionTarget) throw new Error('Could not find extension target');

    return {
      appPages,
      browser,
      extensionTarget,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
