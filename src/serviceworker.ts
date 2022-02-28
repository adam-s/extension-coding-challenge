import { changeTabAction } from './background/change-tab-action';
import { MessageFromContent, MessageFromBackground } from './common/types';
import { assertNever, notEmpty } from './common/utils';

chrome.runtime.onMessage.addListener(async (message: MessageFromContent) => {
  switch (message.type) {
    case 'changeTab':
      await changeTabAction(message.text);
      break;
    case 'init':
      await getAllTabsInfo();
      break;
    default:
      assertNever(message);
  }
});

const postMessageToTab = (
  tabId: number,
  message: MessageFromBackground,
  response: (response: any) => void,
): ReturnType<typeof chrome.tabs.sendMessage> => {
  return chrome.tabs.sendMessage(tabId, message, response);
};

export const getAllTabsInfo = async () => {
  chrome.tabs.query({}, async (tabs) => {
    const values = (
      await Promise.all(
        tabs.map(({ id }) => {
          return new Promise((resolve) => {
            if (id) {
              postMessageToTab(id, { type: 'info' }, (data) => {
                if (!chrome.runtime.lastError && data) resolve(data);
                resolve(null);
              });
            } else {
              resolve(null);
            }
          });
        }),
      )
    ).filter(notEmpty);
    console.log(values);
    return values;
  });
};
