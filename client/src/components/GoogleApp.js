import LoginButton from "./GoogleLogin"
import LogoutButton from "./GoogleLogout"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react'
import { gapi } from 'gapi-script'
import axios from 'axios'
import AuthContext from "../context/AuthProvider";
// import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode"
import { GoogleLogin } from 'react-google-login'
import Profile from './Profile'


// import Login from "./Login";

// const clientId = "1077671935526-e6mu705tptsm57l6p1ajpom0umt43a1p.apps.googleusercontent.com"

// const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'

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




	useEffect((req, res) => {
		axios.get("http://localhost:3001/working") 						// dev
		// axios.get("/working")									// heroku
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

	// ========================================================
// SHOWPASSWORDS
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

		axios.post('http://localhost:3001/checkPassword', {    // Development
		// axios.post('/checkPassword', {			     // Heroku
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
		console.log(user, pwd);
	};
	// ============================
	// .then(res => {
	// 	console.log(res)
	// 	setNotification(res.data.message)
	// })
	// const checkPassword = (props) => {
	// 		axios.get('/checkPassword', {
	// 		// axios.get('http://localhost:3001/checkPassword', {
	// 			password: props.password,
	// 			user: props.data,
	// 			iv: props.iv,
	// 		}).then((response) => {
	// 			setPasswordList(
	// 				passwordList.map((val) => {
	// 					return val.password === props.password ? 
	// 					{
	// 						id: val.id,
	// 						password: val.password,
	// 						user: response.data,
	// 					} : val;
	// 				})
	// 				);
	// 			}).catch((err)=> {
	// 					if (!err?.response) {
	// 						setErrMsg('No Server Response');
	// 					} else if (err.response?.status === 400) {
	// 						setErrMsg('Missing Username or Password');
	// 					} else if (err.response?.status === 401) {
	// 						setErrMsg('Unauthorized');
	// 					} else {
	// 						setErrMsg('Login Failed');
	// 					};
	// 		});
	// 	}
	// }

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

	return (
		<>
		{user ? (
			<section>
			<div className="App">
				<h1>You are logged in!</h1>
				<br />
				<div>
				<Profile user={user} setUser={setUser} />
				</div>
				<p><Link to='/register'>Go to your Profile</Link></p>
			</div>
		</section>
		) : (
			<section>
				<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
				<h1>Sign In</h1>
				<form onSubmit={() => handleSubmit }>
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
				{/* <div className='App'> */}
				Log in with your Google Account
				<br />
				<br />
				{/* <div id="signInDiv">
				<br/>
				 
					<LogoutButton/>
					<LoginButton setUser={setUser} user={user}/>
				</div> */}
				{/* <div className="app"> */}
					{user ? (
						<Profile user={user} setUser={setUser} />
					) : (
						<LoginButton setUser={setUser} />
					)}
						{/* <GoogleLogin setUser={setUser} setSuccess={true}/> */}
					{/* </div> */}
				{/* </div> */}
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
				
			</section>
		)}
			{success ? (
				// <Routes>
				// 	<Route exact path="/success" element={<RegisterSuccess/>}/>
				// </Routes>
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
				// <section>
				// 	<h1>You are logged in!</h1>
				// 	<br />
				// 	<p>
				// 		<Link to='/Profile'>Go to your Profile</Link>
				// 	</p>
				// </section>
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
					<div className="App">
						{/* <Link to='/googleapp'>Google Login</Link> */}
						Log in with your Google Account
						{/* <div id="signInDiv"></div> */}
						<LoginButton />
						{/* <GoogleLogin 
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
						}} /> */}
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

				</section>
			)}
		</>
	)
}

export default App