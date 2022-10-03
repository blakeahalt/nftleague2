import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { React, useState, useEffect } from "react";
import { GoogleLoginuseGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

// import { useAuth0 } from "@auth0/auth0-react";
// import LoginButton from "./GoogleLogin"



const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function Login() {
	// const [notification, setNotification] = useState("")
	const [success, setSuccess] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(false);

	// useEffect((req, res) => {
	// 	axios.get("http://localhost:3001/working")  	// dev
	// 		// axios.get("/working")					//heroku
	// 		.then(res => {
	// 			console.log(res)
	// 			setNotification(res.data.message)
	// 		})
	// }, [])

	// const login = useGoogleLogin({
	// 	onSuccess: async respose => {
	// 		try {
	// 			const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
	// 				headers: {
	// 					"Authorization": `Bearer ${respose.access_token}`
	// 				}
	// 			})
	// 			console.log("Login Success!.");
	// 			console.log(res.data)
	// 			setSuccess(true);
	// 		} catch (err) {
	// 			console.log(err)

	// 		}

	// 	}
	// });
	
	// const login = (res) => { 
	// 	axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
	// 		headers: {
	// 			"Authorization": `Bearer ${res.access_token}`
	// 				}
	// 			})
	// 			console.log("Login Success!.");
	// 			console.log(res.data)
	// 			setSuccess(true);
	// }

	const onSuccess = (res) => {
		console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
		setSuccess(true)
	}

	const onFailure = (res) => {
		console.log("LOGIN FAILED! res: ", res);
	}

	// const AuthLogoutButton = () => {
	// 	const { logout } = useAuth0();

	// 	return (
	// 		<button onClick={() => logout({ returnTo: "http://localhost:3000/googleapp" })}>
	// 			Sign Out
	// 		</button>
	// 	)
	// };

	return (
		<div id="signInButton" >
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				// onSuccess={credentialResponse => {
				// 	console.log(credentialResponse.credential);
				// 	var decoded = jwt_decode(credentialResponse.credential);
				// 	console.log(decoded)
				// 	// console.log("Login Success!!")
				// 	// setSuccess(true)
				// }}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
				// onError={() => {
				// 	console.log('Login Failed');
				// }} 
			/>
		</div>
	)
}

export default Login