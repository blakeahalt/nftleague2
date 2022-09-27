import LoginButton from "./GoogleLogin"
// import LogoutButton from "./GoogleLogout"
// import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { gapi } from 'gapi-script'
import axios from 'axios'
// import AuthContext from "../context/AuthProvider";
// import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode"

function App() {
	const [notification, setNotification] = useState("")
	const [user, setUser] = useState({})

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working" || "/working")
			// axios.get("/GoogleApp")  //"http://localhost:3001/login"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

	function handleCallbackResponse(response) {
		console.log("Encoded JWT ID token: " + response.credentials);
		var userObject = jwt_decode(response.credential)
		console.log(userObject);
		setUser(userObject);
		document.getElementById("signInDiv").hidden = true
	}

	function handleSignOut(event) {
		setUser({})
		document.getElementById("signInDiv").hidden = false
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
			callback: handleCallbackResponse
		})

		google.accounts.id.renderButton(
			document.getElementById("signInDiv"),
			{ theme: "outline", size: "large" }
		)
		google.accounts.id.prompt()
	}, [])

	return (
		<div className="App">
			<div id="signInDiv"></div>
			{Object.keys(user).length !== 0 &&
				<button onClick={(e) => handleSignOut(e)}>Sign Out</button>
			}

			{user &&
				<div>
					<h3>{user.name}</h3>
				</div>
			}
		</div>
	)
}

export default App

// ======================================================================

// let GoogleAuth


// window.gapi.load('auth2', () => {
//     gapi.auth2.init({
//         client_id: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"
//     })
//     .then(() => {
//         console.log('google auth initialized') // This shows in the console
//         GoogleAuth = gapi.auth2.getAuthInstance() // This does not throw an error
//     }, err => {
//         console.log('google auth failed to initialize')
//         console.log(err)
//     })
// })

// const googleSignIn = () => {
// 	GoogleAuth.signIn()
// 	.then(() => {
// 	    console.log('signed in')
// 	})
// 	.catch(err => {
// 	    console.log('failed to sign in: ')
// 	    console.log(err)
// 	})
//    }

// return <LoginButton text="Log in with Google" onClick={googleSignIn} />

// }

// export default App