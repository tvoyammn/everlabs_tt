import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'

import './index.scss'

const root = createRoot(document.getElementById('root'));

root.render(
<React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)
