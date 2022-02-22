window.onload = () => {
  console.log(window.location.href);
  const url = window.location.href;
  if (url === 'https://edition.cnn.com/') {
    const inputElement = createFormElement();
    // inputElement.addEventListener('keypress', (event) => {
    //   if (event.code === 'Enter') {
    //     const text = inputElement.value;
    //     console.log(text);
    //   }
    // });
    const parentEl = document.querySelector('.pg-wrapper') as HTMLDivElement;
    parentEl.prepend(inputElement);
  }
};

const createFormElement = () => {
  // Move this to it's own class. Create interface for modal requiring a template element
  const input = document.createElement('input');
  input.style.cssText = `width: 200px; height: 50px; background-color: yellow; position: absolute; top: 30px; left: 30px; z-index: 2`;
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'searchTerm');
  input.setAttribute('name', 'searchTerm');
  return input;
};
