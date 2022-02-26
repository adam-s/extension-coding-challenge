export const waitForElement = (
  selector: string,
  timeout?: number,
): Promise<HTMLElement | Error> => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => undefined);

    // Query for elements matching the specified selector
    Array.from(
      document.querySelectorAll(selector) as NodeListOf<HTMLElement>,
    ).forEach((element) => {
      resolve(element);
      observer.disconnect();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    if (timeout) {
      setTimeout(() => {
        observer.disconnect();
        reject('Element did not appear');
      }, timeout);
    }
  });
};
