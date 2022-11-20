import { React, useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const clientId = process.env.REACT_APP_CLIENTID;

const Profile = () => {
    const [user, setUser] = useState({});
    const [notification, setNotification] = useState('');
    //    const [stateAuth, setStateAuth] = useState()

    useEffect((req, res) => {
        axios
            .get('http://localhost:3001/working') //dev
            .then((res) => {
                console.log(res);
                setNotification(res.data.message);
            });
    }, []);

    // useEffect(() => {
    //     console.log('Cookies access', Cookies.get('access'));
    //     console.log('Cookies refresh', Cookies.get('refresh'));
    // }, []);

    // useEffect((req, res) => {
    //     axios
    //         .get('/working') //heroku
    //         .then((res) => {
    //             console.log(res);
    //             setNotification(res.data.message);
    //         });
    // }, []);

    // function handleSignOut(e) {
    // 	setUser({})
    // 	document.getElementById("signInDiv").hidden = false
    // }

    // function handleCallbackResponse(response) {
    // 	console.log("Encoded JWT ID token: " + response.credential)
    // 	var userObject = jwt_decode(response.credential)
    // 	console.log(userObject)
    // 	setUser(userObject)
    // 	document.getElementById("signInDiv").hidden = true
    // }

    // useEffect(() => {
    // 	/* global google */
    // 	google.accounts.id.initialize({
    // 		client_id: "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com",
    // 		callback: handleCallbackResponse,
    // 	})

    // 	// google.accounts.id.renderButton(
    // 	// 	document.getElementById("signInDiv"),
    // 	// 	{ theme: "outline", size: "large"}
    // 	// )

    // }, [])

    // const logout = (response) => {
    // 	gapi.auth2.getAuthInstance().signOut();
    // 	window.sessionStorage.removeItem("access_token");
    // 	window.sessionStorage.removeItem("nama");
    // 	console.log('successfully logged out!')
    // 	 this.setState(state => ({
    // 	     isLogined: false,
    // 	     token: ''
    // 	 }),
    // 	 console.log(response)
    // 	 );
    //     }

    // useEffect(() => {
    // 	function start() {
    // 		gapi.client.init({
    // 			clientId: clientId,
    // 			scope: "email",
    // 		});
    // 	}
    // 	gapi.load("client:auth2", start);
    // 	});

    // const onSuccess = () => {
    // 	console.log("Log out successfully!");
    // 	};

    // const onFailure = response => {
    // 	console.log('FAILED', response);
    // 	};

    const onLogoutSuccess = () => {
        console.log('SUCCESSFUL LOG OUT');
        Cookies.set('access', null);
        Cookies.set('refresh', null);
    };
    //                  // return (
    //   <div className="App">
    //     <LoginButton />
    //     <LogoutButton />
    //   </div>

    return (
        <div
            className="App"
            style={{ fontSize: 35 }}
        >
            <br />
            <p style={{ textAlign: 'center' }}>
                Registered! <br /> Profile page coming soon
            </p>
            <br />
            <Link to="/cryptoslamSalesday">See the Data</Link>
            <br />
            <br />
            <Link to="/">
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutSuccess}
                    // onClick={(e) => handleSignOut(e)}
                ></GoogleLogout>
            </Link>
            <br />
            <br />
            <p>{/* axios.get('/profile') status: <i>{notification}</i> */}</p>
        </div>
        //   </div>
    );
};

export default Profile;
