import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CurrentUserContextProvider } from './contexts/CurrentUser';
import { CurrentDataContextProvider } from './contexts/CurrentData';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserContextProvider>
    <CurrentDataContextProvider>
      <App />
      </CurrentDataContextProvider>
    </CurrentUserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
