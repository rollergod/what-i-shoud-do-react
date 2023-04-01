import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import App from './App';
import { Provider } from 'react-redux';
import './index.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

