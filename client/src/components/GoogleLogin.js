import { GoogleLogin } from 'react-google-login'
import { React, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useGoogleLogin } from '@react-oauth/google';
import LoginButton from "./GoogleLogin"
import axios from 'axios'
import jwt_decode from "jwt-decode";



const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogin() {
	const [notification, setNotification] = useState("")
	const [success, setSuccess] = useState(false);

	useEffect((req, res) => {
		// axios.get("http://localhost:3001/working")  	// dev
		axios.get("/working")				//heroku
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

	const login = useGoogleLogin({
		onSuccess: async respose => {
			try {
				const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
					headers: {
						"Authorization": `Bearer ${respose.access_token}`
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

	const onSuccess = (res) => {
		console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
	}

	const onFailure = (res) => {
		console.log("LOGIN FAILED! Current user: ", res);
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
			{/* <Link to="/profile"> */}
			{/* <GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
			/> */}

			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={credentialResponse => {
					console.log(credentialResponse.credential);

					var decoded = jwt_decode(credentialResponse.credential);
					console.log(decoded)
					console.log("Login Success!!")
					setSuccess(true)
					}}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
				onError={() => {
					console.log('Login Failed');
				}} />
			{/* </Link> */}
		</div>
	)
}

export default GLogin