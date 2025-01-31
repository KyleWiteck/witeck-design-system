import '@KyleWiteck/witeck-design/global.css';
import { themeClass } from '@KyleWiteck/witeck-design/theme';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

document.body.classList.add(themeClass);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No root element was found');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
