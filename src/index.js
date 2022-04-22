import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// auth imports
import { AuthProvider } from 'react-oidc-context'
import { Log } from 'oidc-client-ts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
Log.setLogger(console)


// Auth configuration
const oidcConfig = {
	authority:
		"https://lorenzosv.demo.cloud.healthcare-uk.dxc.technology/OIDCPortal/connect/",
	client_id: "5056512717432228513",
	redirect_uri: "http://localhost:3000/one-ed/openidlogin/",
	client_secret: "5056512717432228513",
	
};


ReactDOM.render(
	<React.StrictMode>
		<AuthProvider {...oidcConfig}>
			<BrowserRouter>
				<Routes>
				<Route exact path="/" element={<App />} />

				</Routes>

			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
