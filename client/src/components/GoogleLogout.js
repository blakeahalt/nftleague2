import { React, useState } from "react";
import { GoogleLogout } from 'react-google-login'
import LogoutButton from "./GoogleLogout"

import { Link } from 'react-router-dom';


const clientId="1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogout() {
	// const [success, setSuccess] = useState(false);

	const onSuccess = () => {
		console.log("Log Out successful!");
	}
	
	// if (onSuccess) {
		// onSuccess(true)
		return (
			onSuccess ? (
				<div id="signOutButton">
					<Link to="/profile">
					<GoogleLogout 			
						clientId={clientId}
						buttonText={"Logout"}
						onSuccess={onSuccess}
						/>
					</Link>
				</div>
			) : (
				<div id="signOutButton">
				<GoogleLogout 			
					clientId={clientId}
					buttonText={"Logout"}
					onSuccess={onSuccess}
					/>
				</div>
				)
			)
	} 
export default GLogout