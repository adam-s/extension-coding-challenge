type Result = { id: number; containsString: boolean };

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

chrome.runtime.onMessage.addListener((event) => {
  if (event.type === 'enterpress') {
    const text = event.payload;
    chrome.tabs.query({}, async (tabs) => {
      const values = await Promise.all(
        tabs.map(async ({ id }) => {
          if (!id) return null;
          try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const value = await chrome.scripting.executeScript({
              target: { tabId: id },
              func: setTitle,
              args: [text],
            });
            if (value?.[0]?.result) {
              return { id, containsString: value[0].result } as Result;
            } else {
              return null;
            }
          } catch (error) {
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
