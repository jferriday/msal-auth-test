import logo from './logo.svg';
import './App.css';

// auth imports
import {useAuth} from "react-oidc-context"

function App() {
  const auth = useAuth()
  function handleLogin() {
   auth.signinPopup()
  }

  function handleLogout() {
   
  }

  

  function hitAPI() {
  
  }

  
  
  return (
    <div className="App">
      <h1>Auth setup</h1>
      {auth.isAuthenticated ? 
        <button onClick={handleLogout}>Sign Out</button>
        :
        <button onClick={handleLogin}>Sign In</button>
      }
      <button onClick={hitAPI}>Hit API</button>
    </div>
  );
}

export default App;
