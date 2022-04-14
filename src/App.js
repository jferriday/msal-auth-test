import logo from "./logo.svg";
import "./App.css";

// auth imports
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();
  
   async function makeFetchCall(token) {
			console.log(token);
			const headers = new Headers();
			headers.append("Authorization", "Bearer " + token);
			try {
				const response = await fetch(
					"https://auth-setup-ded-express.azurewebsites.net/hello",
					{
						headers: headers,
					}
				);
				const responseText = await response.text();
				return responseText;
			} catch (e) {
				console.warn(e);
			}
		}

	function handleLogin() {
		auth.signinPopup();
	}

	function handleLogout() {
		auth.signoutPopup();
	}

  async function hitApi() {
    console.log(auth)
    const token = auth.user.id_token
    const response = await makeFetchCall(token)
    console.log(response)
	}

	return (
		<div className="App">
			<h1>Auth setup</h1>
			{auth.isAuthenticated ? (
				<button onClick={handleLogout}>Sign Out</button>
			) : (
				<button onClick={handleLogin}>Sign In</button>
			)}
			<button onClick={hitApi}>Hit API</button>
		</div>
	);
}

export default App;
