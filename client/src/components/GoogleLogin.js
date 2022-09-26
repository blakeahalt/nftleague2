import { GoogleLogin } from 'react-google-login'
import { React, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import LoginButton from "./GoogleLogin"
import axios from 'axios'


const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogin() {
	const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working" || "/working")  //"http://localhost:3001/login"
			// axios.get("/working")  //"http://localhost:3001/login"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])



	const onSuccess = (res) => {
		console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
		
		// <section>
		// 	<h1>Success!</h1>
		// 	<p>
		// 		<Link to="/profile">Visit Your Profile</Link>
		// 	</p>

		// 	<p>axios.get('/register') status: <i>{notification}</i></p>

		// </section>
	}

	const onFailure = (res) => {
		console.log("LOGIN FAILED! Current user: ", res);

		// return (
		// 	<div id="signInButton">
		// 	<Link to="/profile">
		// 	<GoogleLogin
		// 		clientId={clientId}
		// 		buttonText="Login"
		// 		onSuccess={onSuccess}
		// 		onFailure={onFailure}
		// 		cookiePolicy={'single_host_origin'}
		// 		isSignedIn={true}
		// 		/>
		// 	</Link>
		// 	</div>
		// )
	}

	const AuthLogoutButton = () => {
		const { logout } = useAuth0();

		return (
		    // <button onClick={() => logout()}>
		    //   Sign Out
		    // </button>
		    <button onClick={() => logout({ returnTo: "http://localhost:3000/googleapp" })}>
		      Sign Out
		    </button>
		  )
	     };

	// return (
	// 	// onSuccess ? (
	// 	// <section>
	// 	// 	{/* <p>
	// 	// 		<Link to="/googleapp">Login</Link>
	// 	// 	</p> */}
	// 	// 		<Link to="/profile">Visit Your Profile</Link>
	// 	// 	<h1>Success!</h1>
	// 	// 	<AuthLogoutButton/>

	// 	// 	<p>axios.get('/register') status: <i>{notification}</i></p>

	// 	// </section>
	// 	// ) : (
	// 		<div id="signInButton">
	// 		<Link to="/profile">
	// 		<GoogleLogin
	// 			clientId={clientId}
	// 			buttonText="Login"
	// 			onSuccess={onSuccess}
	// 			onFailure={onFailure}
	// 			cookiePolicy={'single_host_origin'}
	// 			isSignedIn={true}
	// 			/>
	// 		</Link>
		
	// 		</div>
	// 			// onSuccess(false)
	// // )
	// )
	return (
		<>
		{onSuccess ? (
			<section>
				<h1>Google Login Success!!</h1>
				{/* <div id="signInButton" > */}
				{/* <Link to="/profile"> */}
				<GoogleLogin
					clientId={clientId}
					buttonText="Login"
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={'single_host_origin'}
					isSignedIn={true}
					/>
				{/* </Link> */}
				<AuthLogoutButton/>
				{/* </div> */}
			</section>

			) : (
				
			<div id="signInButton" >
				<Link to="/profile">
				<GoogleLogin
					clientId={clientId}
					buttonText="Login"
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={'single_host_origin'}
					isSignedIn={true}
					/>
				</Link>
			</div>	)}
	</>
	)
}

export default GLogin