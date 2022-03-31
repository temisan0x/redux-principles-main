import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './Store';

ReactDOM.render(
  <StoreProvider>
     <App /> {/* child component */}
  </StoreProvider>,
  document.getElementById('root')
);

