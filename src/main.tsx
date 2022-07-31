import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CurrentDataContextProvider } from './contexts/CurrentData';
import { CurrentUserContextProvider } from './contexts/CurrentUser';

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
