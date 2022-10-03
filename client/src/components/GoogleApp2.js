import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogout } from 'react-google-login';
import jwt_decode from "jwt-decode";
// import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"
import LoginButton from "./GoogleLogin"
import LogoutButton from "./GoogleLogout"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react'
import { gapi } from 'gapi-script'
import AuthContext from "../context/AuthProvider";
// import EncryptionHandler from './EncryptionHandler'
// const {encrypt, decrypt} = require('./EncryptionHandler')
// import GoogleLogin from "react-google-login";


const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"
const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'

function App() {

	const [notification, setNotification] = useState("")
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	// const pwdRef = useRef();
	const errRef = useRef();
	const [user, setUser] = useState({});
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();
	const [loginStatus, setLoginStatus] = useState("");
	const [catchUser, setCatchUser] = useState('')
	const [isSignedIn, setIsSignedIn] = useState(false);



	// 	const crypto = require('crypto')
	// 	const secret = 'pppppppppppppppppppppppppppppppp'

	// 	const encrypt = (password) => {
	// 	const iv = Buffer.from(crypto.randomBytes(16));
	// 	const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

	// 	const encryptedPassword = Buffer.concat([
	// 		cipher.update(password),
	// 		cipher.final()
	// 	])

	// 	return {
	// 		iv: iv.toString('hex'),
	// 		password: encryptedPassword.toString('hex')
	// 	}
	// }

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working")  			// dev
		// axios.get("/working")						//heroku
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

	function handleSignOut(e) {
		setUser({})
		document.getElementById("signInDiv").hidden = false
	}

	function handleCallbackResponse(response) {
		// console.log("Encoded JWT ID token: " + response.credential)
		var userObject = jwt_decode(response.credential)
		console.log(userObject)
		setUser(userObject)
		document.getElementById("signInDiv").hidden = true
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: clientId,
			callback: handleCallbackResponse,

		})

		google.accounts.id.renderButton(
			document.getElementById("signInDiv"),
			{ theme: "outline", size: "large"}
		)

	}, [])


	// const login = useGoogleLogin({
	// 	onSuccess: async response => {
	// 		try {
	// 			const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
	// 				headers: {
	// 					"Authorization": `Bearer ${response.access_token}`
	// 				}
	// 			})
	// 			// console.log("Login Success!");
	// 			// setSuccess(true);
	// 			// setCatchUser(user)
	// 			// console.log(res.data)
	// 		} catch (err) {
	// 			console.log(err)
	// 		}
	// 	}
	// });

	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: clientId,
				scope: "email",
				plugin_name: 'PLUGIN'
			});
		}
		gapi.load("client:auth2", start);
	}, []);

	window.gapi.load('client:auth2', () => {
		window.gapi.client.init({
		    clientId: clientId,
		    scope: "email",
		    plugin_name: 'PLUGIN'
		})
	})

	useEffect(() => {
		userRef.current.focus();
		setUser('')
	}, [])

	useEffect(() => {
		setErrMsg('');
		// setUser('')
	}, [user, pwd])

	const handleSubmit = (e) => {
		e.preventDefault();

		// axios.post('http://localhost:3001/checkPassword', {				// dev				
		axios.post('/checkPassword', {  							// heroku	
			user: user,
			pwd: pwd,
		}).then((response) => {
			if (!response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				setLoginStatus(response.data[0].message);
			}
			console.log(JSON.stringify(response?.data));
			console.log(JSON.stringify(response));
			const accessToken = response?.data?.accessToken;
			// const roles = response?.data?.roles;
			setAuth({ user, pwd, accessToken });
			setUser('');
			setPwd('');
			setSuccess(true);
		}).catch((err) => {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			// errRef.current.focus(); //don't use...was causing an error
		})
		console.log(user, pwd);
	}

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	console.log(user, pwd);

	// 	try {
	// 		const response = await axios.post(LOGIN_URL,
	// 			JSON.stringify({ user, pwd }),
	// 			{
	// 				headers: { 'Content-Type': 'application/json' },
	// 				// withCredentials: true
	// 			}
	// 		);
	// 		console.log(JSON.stringify(response?.data));
	// 		//console.log(JSON.stringify(response));
	// 		const accessToken = response?.data?.accessToken;
	// 		const roles = response?.data?.roles;
	// 		setAuth({ user, pwd, roles, accessToken });
	// 		setUser('');
	// 		setPwd('');
	// 		setSuccess(true);
	// 	} catch (err) {
	// 		if (!err?.response) {
	// 			setErrMsg('No Server Response');
	// 		} else if (err.response?.status === 400) {
	// 			setErrMsg('Missing Username or Password');
	// 		} else if (err.response?.status === 401) {
	// 			setErrMsg('Unauthorized');
	// 		} else {
	// 			setErrMsg('Login Failed');
	// 		}
	// 		// errRef.current.focus();
	// 	}
	// }

	return (
		<>
			{success ? (
				<section>
					<div className="App">
						<h1>You are logged in!</h1>
						<br />
						<div>
							<img src={user.picture} width="200" height="200" alt=''></img>
							<h3>{user.name}</h3>
						</div>
						<p><Link to='/Profile'>Go to your Profile</Link></p>
					</div>
				</section>
			) : (
				<section>
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
					<h1>Sign In</h1>
					<form onSubmit={() => handleSubmit}>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						/>
						<button>Sign In</button>
					</form>
					<br />
					<div>
					{/* <Link to='/googleapp'>Google Login</Link> */}
					Log in with your Google Account
					{/* <div id="signInDiv"></div> */}
					<LoginButton /> // localhost:consoles LOGIN SUCCESS! Current user: consoles correct data info, NO redirect
					//work.local:(window pop-up) Access blocked: NFTLeague’s request is invalid 
					<LogoutButton />  // only console.logs (successfully logged out!)
					<br />
					</div>
					<div className='App'>
						Log in with your Google Account
						<br />
						<br />
						<div id="signInDiv"><br/></div>

					</div>
						{user ? (
							// <div id="signOutButton">
							<GoogleLogout
							// clientId={clientId}
							// buttonText="Logout"
							// onLogoutSuccess={onSuccess}
							/>
							) : (
							<div className="App">
							    	<div id="signOutButton"></div> // localhost:WORKING: consoles handleCallbackResponse, NO redirect
								//work.local: blank window pop-up
								<LoginButton /> 
									//localhost: window pop-up flashes and consoles LOGIN SUCCESS! Current user: w/correct data, NO redirect
									//work.local:(window pop-up) Access blocked: NFTLeague’s request is invalid 
								<br />
								<GoogleLogin /> 
									// localhost:Uncaught TypeError: onSuccessRef.current is not a function
									//work.local: blank window pop-up
								<GoogleLogin
									onSuccess={credentialResponse => {
										console.log(credentialResponse.credential);
										var decoded = jwt_decode(credentialResponse.credential);
										console.log(decoded);
										setSuccess(true);
										setUser(decoded)
										console.log("Login Success!");
									}}
									onError={() => {
										console.log('Login Failed');
									}} /> 
									// localhost: WORKING - clicks through to appropriate page
									//work.local: blank window pop-up
								<LogoutButton /> 
								// bundle.js:1198 successfully logged out!

								<GoogleLogout /> // Uncaught TypeError: v is not a function
                                <LoginButton setUser={setUser} />
							</div>
						)}
						{/* {isSignedIn ? (
						<div id="signOutButton">
							<GoogleLogout 
								clientId={clientId} 
								buttonText="Logout" 
								onLogoutSuccess={onSuccess}>
							</GoogleLogout>
						</div>
						) : (
						<div id="signInButton" >
							<GoogleLogin
								onSuccess={credentialResponse => {
									console.log(credentialResponse.credential);
									var decoded = jwt_decode(credentialResponse.credential);
									console.log(decoded);
									setSuccess(true);
									console.log("Login Success!");
									}}
								onError={() => {
								  console.log('Login Failed');
								}} 
							/>
						</div>
						)} */}
					<p>
						Need an Account?
						<br />
						<span className="line">
							<Link to='/register'>Sign Up</Link>
						</span>
						<br />
					</p>
					<p>axios.get('/googleapp') status: <i>{notification}</i></p>
					<br />

				</section>
				)}
		</>
		)
}

export default App;