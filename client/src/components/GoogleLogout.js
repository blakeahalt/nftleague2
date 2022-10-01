import { GoogleLogout } from 'react-google-login'
import { Link } from 'react-router-dom';
import React from 'react'
// import ReactDOM from 'react-dom'
// import GoogleLogin from 'react-google-login'


const clientId="1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogout(props) {

	function onSuccess(res) {
		console.log("Log Out successful!");
		props.setUser(null);

	}

	const responseGoogle = (response) => {  console.log(response);} 
	
	// ReactDOM.render(  
	// <GoogleLogin    
	// 	clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"   
	// 	buttonText="Login"    
	// 	onSuccess={responseGoogle}    
	// 	onFailure={responseGoogle}  />,  
	
	// document.getElementById('googleButton'));

	// logout (response) {
	// 	This.setState(state => ({
	// 	  IsLogined: False,
	// 	  AccessToken: ''
	// 	}));

	
	// <GoogleLogout      
	// 	buttonText="Logout"      
	// 	onLogoutSuccess={logout}>    
	// </GoogleLogout>


	return (
		<div>
			<Link to="/register">
			<GoogleLogout
				clientId={clientId}
				buttonText={"Logout"}
				onLogoutSuccess={onSuccess}
				/>
			</Link>
		</div>
	)
}

export default GLogout

