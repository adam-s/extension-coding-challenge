import { MessageFromContent } from './common/types';

const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => {
  if (value === null || value === undefined) return false;
  return true;
};

const setTitle = (text: string) => {
  if (!document.title || typeof text !== 'string') return false;
  return document.title.toLowerCase().includes(text.toLowerCase());
};

chrome.runtime.onMessage.addListener((event: MessageFromContent) => {
  if (event.type === 'changeTab') {
    const text = event.text;
    chrome.tabs.query({}, async (tabs) => {
      const values = await Promise.all(
        tabs.map(async ({ id }) => {
          if (!id) return null;
          try {
            const value = await chrome.scripting.executeScript({
              target: { tabId: id },
              func: setTitle,
              args: [text],
            });
            if (value?.[0]?.result) {
              return { id, containsString: value[0].result };
            } else {
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        }),
      );

      const tab = values
        .filter(notEmpty)
        .map((value) => {
          return value;
        })
        .find(
          ({ containsString }: { containsString: boolean }) => containsString,
        );

      const tabId = tab?.id;
      if (tabId) {
        chrome.tabs.update(tabId, { active: true });
      }
    });
  }
});
