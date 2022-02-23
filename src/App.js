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
          const response = await fetch('https://auth-setup-ded-express.azurewebsites.net/hello', {
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
      scopes: ["api://6daff423-844d-4897-9691-6d01db37c61a/read_api"],
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
