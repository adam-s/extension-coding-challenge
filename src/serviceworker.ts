console.log('service worker');
type Result = { id: number; containsString: boolean };

const setTitle = (text: string) => {
  return document.title.includes(text);
};
chrome.runtime.onMessage.addListener((event) => {
  if (event.type === 'enterpress') {
    const text = event.payload;
    console.log(event);
    chrome.tabs.query({}, async (tabs) => {
      console.log(tabs);
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
                if (value && value[0])
                  results.push({ id, containsString: value[0].result });
                count--;
                if (count === 0) {
                  resolve(results);
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
      const tabId = tab?.id;
      if (tabId) {
        chrome.tabs.update(tabId, { active: true });
      }
    });
  }
});
