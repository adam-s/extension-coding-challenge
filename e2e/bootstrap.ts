import puppeteer from 'puppeteer';

interface Options {
  devtools?: boolean;
  slowMo?: number;
  appUrl: string;
}

interface Bootstrap {
  appPage: puppeteer.Page;
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
    const { devtools = false, slowMo, appUrl } = options as Options;
    const launchOptions: LaunchOptions = {
      headless: false,
      devtools,
      args: ['--disable-extensions-except=./dist', '--load-extension=./dist'],
      ignoreDefaultArgs: ['--enable-automation'],
    };
    if (typeof slowMo !== 'undefined') Object.assign(launchOptions, { slowMo });
    const browser = await puppeteer.launch(launchOptions);

    const appPage = await browser.newPage();
    await appPage.goto(appUrl, { waitUntil: 'networkidle2' });

    const targets = browser.targets();
    const extensionTarget = targets.find(
      (target) => target.type() === 'service_worker',
    );

    if (!extensionTarget) throw new Error('Could not find extension target');

    return {
      appPage,
      browser,
      extensionTarget,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
