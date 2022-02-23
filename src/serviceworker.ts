import { MessageFromContent } from './common/types';
import { assertNever, notEmpty } from './common/utils';

const setTitle = (text: string) => {
  if (!document.title || typeof text !== 'string') return false;
  return document.title.toLowerCase().includes(text.toLowerCase());
};

const changeTabAction = async (text: string) => {
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
      await chrome.tabs.update(tabId, { active: true });
    }
  });
};
chrome.runtime.onMessage.addListener(async (message: MessageFromContent) => {
  switch (message.type) {
    case 'changeTab':
      await changeTabAction(message.text);
      break;
    default:
      assertNever(message.type);
  }
});
