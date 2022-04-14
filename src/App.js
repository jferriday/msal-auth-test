import logo from "./logo.svg";
import "./App.css";

// auth imports
import { useAuth } from "react-oidc-context";

function App() {
	const auth = useAuth();

	function handleLogin() {
		auth.signinPopup();
	}

	function handleLogout() {
		auth.signoutPopup();
	}

	function getToken() {
		console.log(auth.user);
	}

	return (
		<div className="App">
			<h1>Auth setup</h1>
			{auth.isAuthenticated ? (
				<button onClick={handleLogout}>Sign Out</button>
			) : (
				<button onClick={handleLogin}>Sign In</button>
			)}
			<button onClick={getToken}>Log Token</button>
		</div>
	);
}

export default App;
