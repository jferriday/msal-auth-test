import logo from './logo.svg';
import './App.css';

// auth imports
import { useMsal, useIsAuthenticated } from '@azure/msal-react'

import {loginRequest} from './auth/authConfig'
function App() {
  const { instance } = useMsal()
  const authenticated = useIsAuthenticated()

  function handleLogin() {
    instance.loginPopup(loginRequest)
      .then(response => {
        console.log(response)
        instance.setActiveAccount(response.account)
      })
      .catch(e => console.log(e))
  }

  function handleLogout() {
    instance.logoutPopup()
    .catch(e => console.log(e))
  }

  async function makeFetchCall(token) {
        console.log(token)
        const headers = new Headers()
        headers.append('Authorization', 'Bearer ' + token)
        try {
          const response = await fetch('https://auth-setup-backend.azurewebsites.net/hello', {
            headers: headers
          })
          const responseText = await response.text()
          return responseText
        } catch (e) {
          console.warn(e)
        }
  }

  function hitAPI() {
    const accessTokenRequest = {
      scopes: ["api://2ad679a9-901c-4ec7-9e78-5fd8646eb165/user_impersonation"],
      account: instance.getActiveAccount()
    }
    instance.acquireTokenSilent(accessTokenRequest)
      .then(accessTokenResponse => {
        let accessToken = accessTokenResponse.accessToken
       return makeFetchCall(accessToken)
      }
    ).then(fetchResponse => {
        console.log(fetchResponse)
      })
  }

  
  
  return (
    <div className="App">
      <h1>Auth setup</h1>
      {authenticated ? 
        <button onClick={handleLogout}>Sign Out</button>
        :
        <button onClick={handleLogin}>Sign In</button>
      }
      <button onClick={hitAPI}>Hit API</button>
    </div>
  );
}

export default App;
