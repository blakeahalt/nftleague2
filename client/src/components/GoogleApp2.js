import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
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
	const [passwordList, setPasswordList] = useState([]);
	
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
		axios.get("http://localhost:3001/working" || '/working') 
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

	const login = useGoogleLogin({
		onSuccess: async response => {
			try {
				const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
					headers: {
						"Authorization": `Bearer ${response.access_token}`
					}
				})
				console.log("Login Success!");
				setSuccess(true);
				console.log(res.data)
			} catch (err) {
				console.log(err)
			}
		}
	});
				
	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setErrMsg('');
		setUser('')
	}, [user, pwd])

	// useEffect(() => {
	// 	if (localStorage.getItem('user-info')) {
	// 		navigate.push("/added")
	// 	}
	// })

	const handleSubmit = (e) => {
		e.preventDefault();

		axios.post('http://localhost:3001/checkPassword'||'/checkPassword', {  				// for heroku
			user: user,
			pwd: pwd,
		}).then((response) => {
			if (!response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				setLoginStatus(response.data[0].message);
			}
			// console.log(JSON.stringify(response?.data));
			//console.log(JSON.stringify(response));
			// const accessToken = response?.data?.accessToken;
			// const roles = response?.data?.roles;
			// setAuth({ user, pwd, accessToken });
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
		// console.log(user, pwd);
	}

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<Link to='/Profile'>Go to your Profile</Link>
					</p>
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
					<div className='App'>
						Log in with your Google Account
						<div id="signInDiv">
						{/* <LoginButton /> */}
						<br/>
						<br/>
						 <GoogleLogin
								onSuccess={credentialResponse => {
								console.log(credentialResponse.credential);
								var decoded = jwt_decode(credentialResponse.credential);
								console.log(decoded)
								setSuccess(true)
							}}
							onError={() => {
									console.log('Login Failed');
								}} />
						{/* <LogoutButton /> */}
						</div>
						<br />
					</div>
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