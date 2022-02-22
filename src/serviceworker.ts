type Result = { id: number; containsString: boolean };

const setTitle = (text: string) => {
  if (!document.title || typeof text !== 'string') return false;
  return document.title.toLowerCase().includes(text.toLowerCase());
};
chrome.runtime.onMessage.addListener((event) => {
  if (event.type === 'enterpress') {
    const text = event.payload;
    chrome.tabs.query({}, async (tabs) => {
      let count = tabs.length;
      const values = new Promise<Result[]>((resolve) => {
        const results: Result[] = [];
        tabs.forEach(({ id }) => {
          if (id) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            chrome.scripting.executeScript(
              {
                target: { tabId: id },
                func: setTitle,
                args: [text],
              },
              (value: any) => {
                if (!chrome.runtime.lastError?.message) {
                  if (value && value[0])
                    results.push({ id, containsString: value[0].result });
                  count--;
                  if (count === 0) {
                    resolve(results);
                  }
                } else {
                  console.warn(chrome.runtime.lastError.message);
                }
              },
            );
          }
        });
      });
      // First get the values
      // Then iterate through them and set the active tab to that id
      const tab = (await values).find(
        ({ containsString }: { containsString: boolean }) => containsString,
      );
      console.log(chrome.runtime.lastError);
      const tabId = tab?.id;
      if (tabId) {
        console.log(chrome.runtime.lastError);
        chrome.tabs.update(tabId, { active: true });
      }
    });
  }
});
