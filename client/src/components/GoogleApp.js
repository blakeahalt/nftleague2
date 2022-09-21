import LoginButton from "./GoogleLogin"
import LogoutButton from "./GoogleLogout"
import { Link, useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react'
import { gapi } from 'gapi-script'
import axios from 'axios'
import AuthContext from "../context/AuthProvider";
// import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode"
// import Googleapp from "./GoogleApp"
// import Profile from "./Profile"
import Notification from "./Notification";


// import Login from "./Login";

// const clientId = "1077671935526-e6mu705tptsm57l6p1ajpom0umt43a1p.apps.googleusercontent.com"

// const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'

function App() {
	const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working")  //"http://localhost:3001/login"
		// axios.get("/working")  //"http://localhost:3001/login"
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

	// var accessToken = gapi.auth.getToken().access_token

	// From Login.js ========================================================================================
	// const Login = () => {
		// eslint-disable-next-line
		const { setAuth } = useContext(AuthContext);
		const userRef = useRef();
		// const pwdRef = useRef();
		const errRef = useRef();
		
		const [user, setUser] = useState('');
		const [pwd, setPwd] = useState('');
		const [errMsg, setErrMsg] = useState('');
		// eslint-disable-next-line
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
	// Login:
	// eslint-disable-next-line
	const [loginStatus, setLoginStatus] = useState("");
	// eslint-disable-next-line
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

// ======================================================================================== 9/20/20

// useEffect(() => {
// 	axios.get("http://localhost:3001/checkPassword").then((response) => {
// 	// axios.get("/checkPassword").then((response) => {
// 		if (response.data.loggedIn === true) {
// 		setLoginStatus(response.data.user[0].user);
// 			setSuccess(true)
// 		}
// 	});
// 	// return <Navigate to='/profile' />
// }, []);	

const login = () => {
	axios.get("http://localhost:3001/checkPassword")
	.then((response) => {
		if (response.data === true) {
		setLoginStatus(response.data.user[0].user);
		setSuccess(true)
		}	
		if (response.data.message) {
				setLoginStatus(response.data.message);
				setSuccess(true)
				console.log(loginStatus);
				return <Navigate to='/profile' />
			} else {
				setLoginStatus(response.data[0].user);
			}
		});
	};
//  if (success) {
// 	return <Navigate to='/profile' />
//  }


	
	// ======================================================================================== 9/20/20


// eslint-disable-next-line
	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	axios.post('http://localhost:3001/checkPassword', {    // Development
	// 		// axios.post('/checkPassword', {			     // Heroku
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
				{/* <h1>You are logged in!</h1>
				<br />
				<p>
				  <Link to='/Profile'>Go to your Profile</Link>
				</p> */}
				{/* <Router> */}
					<Routes>
						{/* <Route 
						path='/' 
						element={<Googleapp />}
						/>
						<Route 
						path='/googleapp' 
						element={<Googleapp />}
						/>
						<Route
						path='/Profile'
						element={<Profile />}
						/> */}
						<Route
						path='/' 
						element={ success ? (
						  <Navigate replace to='/Profile' />
						) : (
						   <Notification />
						)
						}
						/>
						{/* <Route
						path='/googleapp' 
						element={ success ? (
						  <Navigate replace to='/Profile' />
						) : (
						   <Notification />
						)
						}
						/> */}
					</Routes>
				{/* </Router> */}
			</section>
		) : (
			<section>
				<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
				<h1>Sign In</h1>
				<form onSubmit={() => login }>
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
				
			</section>
		)}
	</>
)
}

export default App