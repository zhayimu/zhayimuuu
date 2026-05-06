import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix for "Cannot set property fetch of #<Window> which has only a getter"
(function() {
  var originalFetch = window.fetch;
  try {
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get: function() { return originalFetch; },
      set: function(v) { originalFetch = v; }
    });
  } catch (e) {}
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
