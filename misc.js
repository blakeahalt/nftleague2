

// http://127.0.0.1:5500/client/



// GoogleApp
import LoginButton from "./GoogleLogin"
import LogoutButton from "./GoogleLogout"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react'
import { gapi } from 'gapi-script'
import axios from 'axios'
import AuthContext from "../context/AuthProvider";
// import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode"
import { response } from "express";


// import Login from "./Login";

// const clientId = "1077671935526-e6mu705tptsm57l6p1ajpom0umt43a1p.apps.googleusercontent.com"

// const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'

function App() {
	const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("/GoogleApp")
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

	function handleCallbackResponse(response) {
		console.log("Encoded JWT ID token: " + response.credentials);
		var userObject = jwt_decode(response.credential)
		console.log(userObject);
	}
	useEffect(() => {
		/* global google */
		google.accounts.id.initialize ({
			client_id: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
			callback: handleCallbackResponse
		})

		// google.accounts.id.renderButton(
		// 	document.getElementById("signInDiv"),
		// 	{ theme: "outline", size: "large"}
		// )
	}, [])
	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
				scope: "email"
			})
		}

		gapi.load('client:auth2', start)
	}, [])

	window.gapi.load('client:auth2', () => {
		window.gapi.client.init({
		    clientId: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
		    scope: "email"
		})
	})

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working")  //"http://localhost:3001/login"
		// axios.get("/GoogleApp")  //"http://localhost:3001/login"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])
	// var accessToken = gapi.auth.getToken().access_token

	// From Login.js ========================================================================================
	// const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	// const pwdRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	
	const navigate = useNavigate();
	
	
	useEffect(() => {
		userRef.current.focus();
	}, [])
	
	useEffect(() => {
		setErrMsg('');
	}, [user, pwd])
	
	useEffect(() => {
		if (localStorage.getItem('user-info')) {
			navigate.push("/added")
		}
	})
	// ========================================================
	// Login:
	const [loginStatus, setLoginStatus] = useState("");
	const [passwordList, setPasswordList] = useState([]);

	// useEffect(() => {
	// 	axios.get('http://localhost:3001/showPasswords').then((response) => {
	// 		setPasswordList(response.data)
	// 	})
	// }, [])

	// const login = () => {
	// 	axios.post('http://localhost:3001/googleapp', {    // Development
	// 	// axios.post('/login', {			     // Heroku
	// 	user: user,
	// 	pwd: pwd,
	// }).then((response) => {
	// 	if (!response.data.message) {
	// 	setLoginStatus( response.data.message);
	// 	} else {
	// 	setLoginStatus (response.data[0].message);
	// 	}
	// });
	// };	

	// function handleLoginForm() {
	// 	const email = userRef.current.value
	// 	const password = pwdRef.current.value
	// 	// const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

	// 	fetch('http://localhost:3001/GoogleApp', {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			email: email,
	// 			// password: hashedPassword,
	// 			password: password,
	// 		}),
	// 	})
	// }

	const handleSubmit = (e) => {
		e.preventDefault();

	// 	axios.post('http://localhost:3001/checkPassword', {    // Development
	// 		// axios.post('/login', {			     // Heroku
	// 		user: user,
	// 		pwd: pwd,
	// 	}).then((response) => {
	// 		if (!response.data.message) {
	// 		setLoginStatus(response.data.message);
	// 		} else {
	// 		setLoginStatus (response.data[0].message);
	// 		}
	// 		// console.log(JSON.stringify(response?.data));
	// 		//console.log(JSON.stringify(response));
	// 		// const accessToken = response?.data?.accessToken;
	// 		// const roles = response?.data?.roles;
	// 		// setAuth({ user, pwd, accessToken });
	// 		setUser('');
	// 		setPwd('');
	// 		setSuccess(true);
	// 	}).catch((err)=> {
	// 		if (!err?.response) {
	// 			setErrMsg('No Server Response');
	// 		} else if (err.response?.status === 400) {
	// 			setErrMsg('Missing Username or Password');
	// 		} else if (err.response?.status === 401) {
	// 			setErrMsg('Unauthorized');
	// 		} else {
	// 			setErrMsg('Login Failed');
	// 		}
	// 		// errRef.current.focus(); //don't use...was causing an error
	// 	})
	// 	console.log(user, pwd);
	// };	
	// ============================

	const checkPassword = (decryption) => {
			axios.get('http://localhost:3001/checkPassword', {
				password: decryption.password,
				user: response.data,
				iv: decryption.iv,
			}).then((response) => {
				setPasswordList(
					passwordList.map((val) => {
						return val.password === decryption.password ? 
						{
							id: val.id,
							password: val.password,
							user: response.data,
						} : val;
					})
					);
				}).catch((err)=> {
						if (!err?.response) {
							setErrMsg('No Server Response');
						} else if (err.response?.status === 400) {
							setErrMsg('Missing Username or Password');
						} else if (err.response?.status === 401) {
							setErrMsg('Unauthorized');
						} else {
							setErrMsg('Login Failed');
						};
			});
		}
	}

	// const decryptPassword = (encryption) => {
	// 		axios.get('http://localhost:3001/decryptPassword', {
	// 			password: encryption.password,
	// 			user: response.data,
	// 			iv: encryption.iv,
	// 		}).then((response) => {
	// 			setPasswordList(
	// 				passwordList.map((val) => {
	// 					return user === val.user ? 
	// 					{
	// 						id: val.id,
	// 						password: val.password,
	// 						user: response.data,
	// 						iv: val.iv,
	// 					} : val;
	// 				})
	// 				);
	// 			});
	// 		};
// ======================

		// try {
		// 	const response = await axios.post(LOGIN_URL,
		// 		JSON.stringify({ user, pwd }),
		// 		{
		// 			headers: { 'Content-Type': 'application/json' },
		// 			// withCredentials: true
		// 		}
		// 	);
		// 	console.log(JSON.stringify(response?.data));
		// 	//console.log(JSON.stringify(response));
		// 	const accessToken = response?.data?.accessToken;
		// 	const roles = response?.data?.roles;
		// 	setAuth({ user, pwd, roles, accessToken });
		// 	setUser('');
		// 	setPwd('');
		// 	setSuccess(true);
		// } catch (err) {
		// 	if (!err?.response) {
		// 		setErrMsg('No Server Response');
		// 	} else if (err.response?.status === 400) {
		// 		setErrMsg('Missing Username or Password');
		// 	} else if (err.response?.status === 401) {
		// 		setErrMsg('Unauthorized');
		// 	} else {
		// 		setErrMsg('Login Failed');
		// 	}
		// 	// errRef.current.focus(); //don't use...was causing an error
		// }
// }
	// From Login.js ========================================================================================

return (
	<>
		{success ? (
			// <Routes>
			// 	<Route exact path="/success" element={<RegisterSuccess/>}/>
			// </Routes>
			<section>
				<h1>You are logged in!</h1>
				<br />
				<p>
				  <Link to='/Profile'>Go to your Profile</Link>
				</p>
				<h2>Login Status: {loginStatus}</h2>

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
						// onChange={(e) => setUserReg(e.target.value)}
						onChange={(e) => setUser(e.target.value)}
						value={user}
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						// onChange={(e) => setPwdReg(e.target.value)}
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
					/>
					
					<button>Sign In</button>
					
					<div className="Passwords">
					{passwordList.map((val, key) => {
						return (
							<div className="checkPassword"
								// onClick={() => {
								// 	decryptPassword({ 
								// 		password: val.password, 
								// 		iv: val.iv, 
								// 		id: val.id })
								// 	}}
								// 	key={key} > 
								// <ul> {val.user} </ul>
								
								// onClick={() => {
								// 	decryptPassword({ 
								// 		password: val.password, 
								// 		iv: val.iv, 
								// 		id: val.id })
								// 	}}
									key={key} 
									> 
								<ul> {val.user} </ul>
							</div>
						)
					})}
					</div>
				</form>

				<br />
				
				<div>
					{/* <Link to='/googleapp'>Google Login</Link> */}
					Log in with your Google Account
					{/* <div id="signInDiv"></div> */}
					<LoginButton />
					<LogoutButton />
					<br />
				</div>
				<p>
					Need an Account?
					<br />
					<span className="line">
						{/*put router link here*/}
						{/* <a href="/register">Sign Up</a> */}
						<Link to='/register'>Sign Up</Link>
					</span>
					{/* <span>Your new SALT: {salt}</span> */}
					<br />
					{/* <span>
						Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
					</span> */}
				</p>
				<p>axios.get('/googleapp') status: <i>{notification}</i></p>
				<br />
				<h2>Login Status: {loginStatus}</h2>
				

			</section>
		)}
	</>
)
}


export default App

// ==========================================================================================
// Notification

import { React, useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Profile from "./client/src/components/Profile";

// import axios from 'axios'

const Notification = () => {
	const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working")  //"http://localhost:3001/register"
		// axios.get("/working")  //"http://localhost:3001/register"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])
	return (
		// < div className = {`message ${type}`}>{ message }</div >
		<div className="notification">
			<h3>Notification Test</h3>
			<Link to="/register">
				<button className="primary-button" id="reg_btn"><span>Back to Registration</span></button>
			</Link>
			<Link to="/googleapp">
				<button className="primary-button" id="reg_btn"><span>Back to Login</span></button>
			</Link>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<p>axios.get('/notification') status: <i>{notification}</i></p>

		</div >
	)
}
// };

export default Notification

// ==========================================================================================
// Profile

import { React, useEffect, useState } from 'react'
import '../App.css'
// import { Link } from 'react-router-dom';
import axios from 'axios'
import LogoutButton from "./GoogleLogout"


const Profile = () => {

       const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("http://localhost:3001/profile")  //"http://localhost:3001/register"
		// axios.get("/working")  //"http://localhost:3001/register"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])


       return (
              <>
              You've registered!...Profile page coming soon

              <p>axios.get('/profile') status: <i>{notification}</i></p>
              <br/>
              <br/>
              <br/>
              <br/>
              <LogoutButton />
              </>
       )
}

export default Profile

// ==========================================================================================
// Register

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios.js';
import axios from 'axios';
import { Link } from 'react-router-dom'


// import Notification from "./components/Notification";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{6,24}$/;
// const REGISTER_URL = 'http://localhost:3001/register';
// const LOGIN_URL = '/auth';


const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	const [catchUser, setCatchUser] = useState('')
	const [notification, setNotification] = useState("")

	// const [passwordList, setPasswordList] = useState([])

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working")  //"http://localhost:3001/register"
		// axios.get("/register")  //"http://localhost:3001/register"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user])

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd])

	// useEffect(() => {
	// 	axios.get('http://localhost:3001/showPasswords').then((response) => {
	// 		setPasswordList(response.data)
	// 	})
	// }, [])

	// useEffect((req, res) => {
	// 	axios.post("http://localhost:3001/register")
	// 		.then(res => {
	// 			console.log(res)
	// 			setNotification(res.data.message)
	// 		})
	// }, [])
	
	// HANDLESUBMIT USING PROMISE
	const handleSubmit = (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		axios.post('http://localhost:3001/addPassword', {  //remove URL when deploying a build to heroku
		// axios.post('/addPassword', {  //remove URL when deploying a build to heroku
			user: user,
			pwd: pwd
		})
		.then((response)=> {
			console.log("1", response.config.data);
			console.log("2", response?.data); //prints {response: 'WORKING'} from server index.js
			// console.log(response?.accessToken);
			console.log("3", JSON.stringify(response))
			setSuccess(true)
			setCatchUser(user)
			setUser('');
			setPwd('');
			setMatchPwd('');
		}).catch((err)=> {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed')
			}
			// errRef.current.focus();
		})
		console.log(user, pwd);
	}
	
	// HANDLESUBMIT USING ASYNC/AWAIT 
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	// if button enabled with JS hack
	// 	const v1 = USER_REGEX.test(user);
	// 	const v2 = PWD_REGEX.test(pwd);
	// 	if (!v1 || !v2) {
	// 		setErrMsg("Invalid Entry");
	// 		return;
	// 	}
	// 	console.log(user, pwd);
	// 	setSuccess(true)

	// 	try {
	// 		// const response = await axios.post("http://localhost:3001/register/",
	// 		// 	JSON.stringify({ user, pwd }),
	// 		// 	{
	// 		// 		headers: { 'Content-Type': 'application/json' },
	// 		// 		// withCredentials: true
	// 		// 	}
	// 		// );
	// 	const response =
	// 		await axios.post('http://localhost:3001/addPassword', {  //remove URL when deploying a build to heroku
	// 		// await axios.post('/addPassword', {  //remove URL when deploying a build to heroku
	// 			user: user,
	// 			pwd: pwd
	// 		});
	// 	console.log("1", response.config.data);
	// 	console.log("2", response?.data); //prints {response: 'WORKING'} from server index.js
	// 	// console.log(response?.accessToken);
	// 	console.log("3", JSON.stringify(response))
	// 	setSuccess(true);
	// 	// setNotification(response.data.message)
	// 	//clear state and controlled inputs
	// 	//need value attrib on inputs for this
	// 	setCatchUser(user)
	// 	setUser('');
	// 	setPwd('');
	// 	setMatchPwd('');

	// 	} catch (err) {
	// 		if (!err?.response) {
	// 			setErrMsg('No Server Response');
	// 		} else if (err.response?.status === 409) {
	// 			setErrMsg('Username Taken');
	// 		} else {
	// 			setErrMsg('Registration Failed')
	// 		}
	// 		// errRef.current.focus();
	// 	}
	// }
		
		// const decryptPassword = (encryption) => {
		// 	axios.post('http://localhost:3001/decryptPassword', {
		// 		password: encryption.password,
		// 		iv: encryption.iv,
		// 	}).then((response) => {
		// 		setPasswordList(
		// 			passwordList.map((val) => {
		// 				return val.id === encryption.id
		// 				? {
		// 					id: val.id,
		// 					password: val.password,
		// 					user: response.data,
		// 					iv: val.iv,
		// 				}
		// 				: val;
		// 			})
		// 			);
		// 		});
		// 	};
			
	return (
		<>
			{success ? (
				<section>
					<h1>Success!</h1>
					<p>
						<Link to="/googleapp">Login</Link>
					</p>
					<p>
						<Link to="/profile">Visit Your Profile</Link>
					</p>
					<p>Added User: {catchUser}</p>

					<p>axios.get('/register') status: <i>{notification}</i></p>

				</section>
			) : (
				<section>
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">
							Username:
							{/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
					<FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
						</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							<br />
							4 to 24 characters.<br />
							Must begin with a letter.<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>


						<label htmlFor="password">
							Password:
							<FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							autoComplete="off"
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							<br />
							8 to 24 characters.<br />
							Must include uppercase and lowercase letters, a number and a special character.<br />
							Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span><span aria-label="asterisk">*</span>
						</p>


						<label htmlFor="confirm_pwd">
							Confirm Password:
							<FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
						</label>
						<input
							type="password"
							id="confirm_pwd"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
					</form>
					<p>
						Already registered?<br />
						<span className="line">
							{/*put router link here*/}
							<Link to="/googleapp">Sign In</Link>
							{/* <a href="/auth">Sign In</a> */}
						</span>
					</p>
					<br />
					<p>
						Notification Test
						<br />
						<span className="line">
							<Link to="/notification">Get notification message</Link>
							<br />
							{/* <Link to="/test">Get test message</Link> */}
						</span>
					</p>
					<br />
					<p>axios.get('/register') status: <i>{notification}</i></p>

					{/* <div className="Passwords">
						{passwordList.map((val, key) => {
							return (
								<div
								className="Password"
								onClick={() => {
									decryptPassword({ password: val.password, iv: val.iv, id: val.id })
								}}
								key={key}
								> 
								<ul> {val.user} </ul>
								</div>
							)
						})}
					</div> */}
				</section>
			)}
		</>
	)
}

export default Register

// ==========================================================================================
// server.js

const express = require("express");
// eslint-disable-next-line no-unused-vars
// const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

const cors = require("cors");
// app.use(cors());
app.use(
  cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
  })
 );
// const proxy = require('http-proxy-middleware')

// module.exports = function(app) {
  //     // add other server routes to path array
  //     app.use(proxy(['/api' ], { target: 'http://localhost:5000' }));
  // } 
  
const {encrypt, decrypt} = require('./EncryptionHandler')
// =======================================
// mysql that works in development
const mysql = require('mysql2')
const db = mysql.createConnection({
  user: 'hu6etanlnbizgzv5' ,
  host: 'cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  password:'g9clxpcv1kdf5jqj',
  database: 'hzgtrybfzcvlvstf'
})

// ========================================
// JawsDB with Node.js
// const JAWSDB_URL = 'mysql://hu6etanlnbizgzv5:g9clxpcv1kdf5jqj@cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hzgtrybfzcvlvstf'
// var mysql = require('mysql');
// var connection = mysql.createConnection(JAWSDB_URL);

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();
// ==========================================


app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.resolve(__dirname, '/public')));

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

app.get("/test", (req, res) => {
  res.json({ message:"WORKING" });
});

app.post("/test", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/GoogleApp", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/notification", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/register", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/profile", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/working", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/added", (req, res) => {
  res.send(res.data.user)
  res.json({ message: "WORKING" });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });


// ====================================
// from finance.py

// const user = new User({
//   _id: generateId(),
//   name: body.name,
//   number: body.number,
// })


// const foundPerson = users.find(user => user.name === body.name)

// if (foundPerson) {
//   return response.status(400).json({
//     error: 'That name already exists'
//   })
// } else if (body.name.length < 3) {
//   return response.status(400).json({
//     error: 'Name must have at least 3 letters.'
//   })
// } else if (body.number.length < 8) {
//   return response.status(400).json({
//     error: 'Number must be at least 8 digits.'
//   })
// } else if (!body.name && !body.number) {
//   return response.status(400).json({
//     error: 'No name or number'
//   })
// } else if (!body.number) {
//   return response.status(400).json({
//     error: 'No number'
//   })
// } else if (!body.name) {
//   return response.status(400).json({
//     error: 'No name'
//   })
// }

// users = users.concat(user)
// // response.json(person)

// user.save().then(users => {
//   response.json(users)
// })
//   .catch((error) => next(error))
// })
// ===================================

app.get("/checkPassword", (req, res) => {
  // res.send(decrypt(req.body));
  // const user = req.body.user;
  // const pwd = req.body.pwd;
  // const {user, pwd} = req.body 

  const {pwd, user} = req.body 
  const decryptedPassword = decrypt(pwd)

  db.query(
      "SELECT * FROM passwords WHERE user = ? AND password = ?",
      [user, decryptedPassword.password],
      (err, result)=> {
          if (err) {
              res.send({err: err});
          } else {
            res.send("Success")
          }

        })
  
          // if (result.length > 0) {
          //     res.send(result);
          //     } else {
          //       res.send({message: 'Wut'});
          //     }
                // else({message: "Wrong username/password comination!"});
            })

// app.post('/googleapp', (req, res)=> {
//   const {user, pwd} = req.body 
  
//   db.execute('INSERT INTO passwords (user, password) VALUES (?,?)',
//       [user, pwd],
//     (err, result)=> {
//       console.log(err);
//       }
//     );
//  });

// app.post('/register', (req, res)=> {

//   const user = req.body.user;
//   const pwd = req.body.pwd;

// })


// app.post("/register", (req, res) => {
//   // console.log("user: ", req.body.user);   //prints to the terminal not console
//   // console.log("pwd: ", req.body.pwd); 
//   res.json({ message: 'WORKING' });
// });

app.post("/addPassword", (req, res) => {
  const {pwd, user} = req.body 
  const hashedPassword = encrypt(pwd)

  db.query("INSERT INTO passwords (password, user, iv) VALUES (?,?,?)", [hashedPassword.password, user, hashedPassword.iv],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Success")
    }
  })
});

  
app.get("/showPasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", 
  (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
})

// app.post("/decryptpassword", (req, res) => {
//   res.send(decrypt(req.body));
// });

// app.get("/register", (req, res) => {
//   res.json({ user: {} });
// });
// app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
  

// This route serves the React app
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "public", "index.html")));
// }

app.listen(port, () => console.log(`Server listening on port ${port}`));