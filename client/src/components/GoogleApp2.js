// import LoginButton from "./GoogleLogin"
// import LogoutButton from "./GoogleLogout"
// import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
// import { gapi } from 'gapi-script'
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

	function handleSignOut(event) {
		setUser({})
		document.getElementById("signInDiv").hidden = false
	}

	function handleCallbackResponse(response) {
		console.log("Encoded JWT ID token: " + response.credentials);
		var userObject = jwt_decode(response.credential)
		console.log(userObject);
		setUser(userObject);
		document.getElementById("signInDiv").hidden = true
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
		<p>axios.get('/googleapp') status: <i>{notification}</i></p>
		</div>

	)
}

export default App
// ======================================================================
// return (
// 		<>
// 			{success ? (
// 				// <Routes>
// 				// 	<Route exact path="/success" element={<RegisterSuccess/>}/>
// 				// </Routes>
// 				// <section>
// 				// 	<h1>You are logged in!</h1>
// 				// 	<br />
// 				// 	<p>
// 				// 		<Link to='/Profile'>Go to your Profile</Link>
// 				// 	</p>
// 				// </section>
// 				<div className="App">
// 					<div id="signInDiv"></div>
// 					{Object.keys(user).length !== 0 &&
// 					<button onClick={(e) => handleSignOut(e)}>Sign Out</button>
//  					}

// 				{user &&
//  				<div>
//  					<h3>{user.name}</h3>
//  				</div>
//  				}
//  			</div>
// 			) : (
// 				<section>
// 					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
// 					<h1>Sign In</h1>
// 					<form onSubmit={() => handleSubmit}>
// 						<label htmlFor="username">Username:</label>
// 						<input
// 							type="text"
// 							id="username"
// 							ref={userRef}
// 							autoComplete="off"
// 							onChange={(e) => setUser(e.target.value)}
// 							value={user}
// 							required
// 						/>

// 						<label htmlFor="password">Password:</label>
// 						<input
// 							type="password"
// 							id="password"
// 							onChange={(e) => setPwd(e.target.value)}
// 							value={pwd}
// 							required
// 						/>
// 						<button>Sign In</button>
// 					</form>
// 					<br />
// 					<div className="App">
// 						{/* <Link to='/googleapp'>Google Login</Link> */}
// 						Log in with your Google Account
// 						<div id="signInDiv"></div>
// 						{/* <LoginButton /> */}
// 						<LogoutButton />
// 						<br />
// 					</div>
// 					<p>
// 						Need an Account?
// 						<br />
// 						<span className="line">
// 							{/*put router link here*/}
// 							{/* <a href="/register">Sign Up</a> */}
// 							<Link to='/register'>Sign Up</Link>
// 						</span>
// 						{/* <span>Your new SALT: {salt}</span> */}
// 						<br />
// 						{/* <span>
// 						Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
// 					</span> */}
// 					</p>
// 					<p>axios.get('/googleapp') status: <i>{notification}</i></p>
// 					<br />

// 				</section>
// 			)}
// 		</>
// 	)
// }

// export default App
// ======================================================================


// ======================================================================
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