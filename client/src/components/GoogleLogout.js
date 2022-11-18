/* eslint-disable @typescript-eslint/no-unused-vars */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gapi } from 'gapi-script';
import {
    GoogleLogin,
    GoogleLogout,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import { useAuth0 } from '@auth0/auth0-react';
import { useGoogleLogin } from '@react-oauth/google';
import LoginButton from './GoogleLogin';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const clientId = process.env.clientId;

function Logout() {
    // const [success, setSuccess] = useState(false);
    // const [isSignedIn, setIsSignedIn] = useState(false);

    // const onSuccess = () => {
    // 	gapi.auth2.getAuthInstance().signOut();
    // 	console.log("Log Out successful!");
    // }

    // const logout = response => {
    // 	window.sessionStorage.removeItem("access_token");
    // 	 window.sessionStorage.removeItem("nama");
    // 	 this.setState(state => ({
    // 	     isLogined: false,
    // 	     token: ''
    // 	 }),
    // 	 console.log(response)
    // 	 );
    //     }

    const logout = () => {
        // gapi.auth2.getAuthInstance().signOut();
        // window.sessionStorage.removeItem("access_token");
        // window.sessionStorage.removeItem("nama");
        console.log('successfully logged out!');
        Cookies.set('access', null);
        Cookies.set('refresh', null);
        //  this.setState(state => ({
        //      isLogined: false,
        //      token: ''
        //  }),
        //  );
    };

    const onSuccess = () => {
        console.log('LOG OUT SUCCESS!');
        // setIsSignedIn(true)
    };

    const onFailure = () => {
        console.log('LOGIN FAILED! Current user: ');
    };

    // const logout = () => {
    // 	console.log("logged out!");
    // 	// setIsSignedIn(false);
    //      };

    // return (

    // 	<div className="g_id_signout">
    // 		{/* <div className="g_id_signout">Sign Out */}
    // 		{/* <Link to="/register"> */}
    // 		<GoogleLogout
    // 			clientId={clientId}
    // 			buttonText={"Logout"}
    // 			onLogoutSuccess={logout}
    // 			/>
    // 		{/* </div> */}
    // 		{/* </Link> */}
    // 	</div>
    // )

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logout}
                onFailure={onFailure}
            />
        </div>
    );
}

export default Logout;
