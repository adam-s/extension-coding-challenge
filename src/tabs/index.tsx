import React from 'react';
import { render } from 'react-dom';
import App from './App';

// Create the shadow root
const root = document.createElement('div');
root.setAttribute('id', '#root');
root.style.cssText = `
position: absolute;
top: 0;
bottom: 0;
right: 0;
left: 0;
`;
document.body.prepend(root);
root.attachShadow({ mode: 'open' });

render(<App />, root.shadowRoot);
