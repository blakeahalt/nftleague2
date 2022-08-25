import LoginButton from "./GoogleLogin"
import axios from 'axios'
import AuthContext from "../context/AuthProvider";
// import jwt_decode from "jwt-decode"
import { useEffect, useState, useRef, useContext } from 'react'
import { GoogleLogin } from 'react-google-login'
import { Link, useNavigate } from 'react-router-dom';


const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"
const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'


function GLogin() {

	const onSuccess = (res) => {
		console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
	}

	const onFailure = (res) => {
		console.log("LOGIN FAILED! Current user: ", res);
	}
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	// const pwdRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [notification, setNotification] = useState("")


	const navigate = useNavigate();

	useEffect((req, res) => {
		axios.get("http://localhost:3001/GoogleApp")
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])
	
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user, pwd);

		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ user, pwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					// withCredentials: true
				}
			);
			console.log(JSON.stringify(response?.data));
			//console.log(JSON.stringify(response));
			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ user, pwd, roles, accessToken });
			setUser('');
			setPwd('');
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			// errRef.current.focus();
		}
	}

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<Link to='/added'>Go to Home</Link>
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
					<div>
						{/* <Link to='/googleapp'>Google Login</Link> */}
						Log in with your Google Account
						{/* <div id="signInDiv"></div> */}
						<LoginButton />
						{/* <LogoutButton /> */}
						<br />
					</div>
					<p>
						Need an Account?
						<br />
						<span className="line">
							<Link to='/register'>Sign Up</Link>
						</span>
						{/* <span>Your new SALT: {salt}</span> */}
						<br />
						{/* <span>
						Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
					</span> */}
					</p>
					<p>axios.get('/googleapp') status: {notification}</p>
					<br />

				</section>
			)}



			<section>
				<h1>You are logged in!</h1>
				<br />
				<p>
					<Link to='/added'>Go to Home</Link>
				</p>
			</section>
			<div id="signInButton">
				<GoogleLogin
					clientId={clientId}
					buttonText="Login"
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={'single_host_origin'}
					isSignedIn={true}
				/>
			</div>
		</>
	)
}

export default GLogin