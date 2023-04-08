import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import App from './App';
import { Provider } from 'react-redux';
import './index.scss';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

