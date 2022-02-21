import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// auth imports
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser';

import { config } from './auth/authConfig';


// auth instance setup
const pca = new PublicClientApplication(config)

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
