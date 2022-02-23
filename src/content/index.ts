import { MessageFromContent } from '../common/types';
import { waitForElement, postMessage } from '../common/utils';

(async function () {
  try {
    await waitForElement('body');
    const url = window.location.href;
    if (url.startsWith('https://news.ycombinator.com')) {
      const createFormElement = () => {
        const input = document.createElement('input');
        input.style.cssText = `width: 200px; height: 50px; background-color: yellow; position: absolute; top: 30px; left: 30px; z-index: 2`;
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'searchTerm');
        input.setAttribute('name', 'searchTerm');
        return input;
      };
      const inputElement = createFormElement();
      inputElement.addEventListener('keypress', (event) => {
        if (event.code === 'Enter') {
          const text = inputElement.value;
          postMessage<MessageFromContent>({ type: 'changeTab', text });
        }
      });
      const parentEl = document.querySelector('body') as HTMLElement;
      parentEl.prepend(inputElement);
    }
  } catch (error) {
    console.log(error);
  }
})();
