import { GoogleLogin } from 'react-google-login'
import { React, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { gapi } from 'gapi-script'
import { Link } from 'react-router-dom';
import Logout from './GoogleLogout'


const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogin(props) {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [success, setSuccess] = useState(false);
	const [user, setUser] = useState({});


	// function handleCallbackResponse(response) {
	// 	console.log("Encoded JWT ID token: " + response.credentials);
	// 	var userObject = jwt_decode(response.credential)
	// 	console.log(userObject);
	//    }
	//    useEffect(() => {
	// 	/* global google */
	// 	google.accounts.id.initialize ({
	// 	    client_id: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
	// 	    callback: handleCallbackResponse
	// 	})
	// }, [])

	// useEffect(() => {
	// 	function start() {
	// 	    gapi.client.init({
	// 		 clientId: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
	// 		 scope: "email",
	// 		 plugin_name: 'NFTLeague'
	// 	    })
	// 	}
	// 	gapi.load('client:auth2', start)
	//    }, [])
      
	//    window.gapi.load('client:auth2', () => {
	// 	window.gapi.client.init({
	// 	    clientId: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
	// 	    scope: "email",
	// 	    plugin_name: 'NFTLeague'
	// 	})
	//    })
		
	function onSuccess(res) {
		console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
		props.setUser(res.profileObj)
		// setIsSignedIn(true)
		setSuccess(true)
		// isSignedIn=(true)
		// success=(true)
	}

	function onFailure(res) {
		// console.log("LOGIN FAILED! Current user: ", res);
		alert(`LOGIN ERROR: ${res}`)
	}

	return (
		<div>
			{/* <Link to="/profile"> */}
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				// onSuccess={credentialResponse => {
				// 	console.log(credentialResponse.credential);
				// 	var decoded = jwt_decode(credentialResponse.credential);
				// 	console.log(decoded);
				// 	setSuccess(true);
				// 	setUser(decoded)
				// 	console.log("Login Success!")
				// 	}}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
				setSuccess={true}
				/>
			{/* </Link> */}
		</div>
	)
}

export default GLogin