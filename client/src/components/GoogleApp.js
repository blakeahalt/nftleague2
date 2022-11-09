/* eslint-disable @typescript-eslint/no-unused-vars */
import LoginButton from './GoogleLogin2';
import LogoutButton from './GoogleLogout';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
// import GoogleLogin from "react-google-login";
import jwt_decode from 'jwt-decode';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

// import Login from "./Login";

// const clientId = "1077671935526-e6mu705tptsm57l6p1ajpom0umt43a1p.apps.googleusercontent.com"
const clientId =
    '1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com';
const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'

function App() {
    const [notification, setNotification] = useState('');

    useEffect((req, res) => {
        // axios.get("http://localhost:3001/working")  			// dev
        axios
            .get('/working') //heroku
            .then((res) => {
                console.log(res);
                setNotification(res.data.message);
            });
    }, []);

    function handleCallbackResponse(response) {
        console.log('Encoded JWT ID token: ' + response.credentials);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                '1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com',
            callback: handleCallbackResponse,
        });

        //  google.accounts.id.renderButton(
        //   document.getElementById("signInDiv"),
        //   { theme: "outline", size: "large"}
        //  )
    }, []);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId:
                    '1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: 'NFTLeague',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId:
                '1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com',
            scope: 'email',
            plugin_name: 'NFTLeague',
        });
    });

    // var accessToken = gapi.auth.getToken().access_token

    // From Login.js ========================================================================================
    // const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    // const pwdRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate.push('/added');
        }
    });

    const onSuccess = (res) => {
        console.log('LOGIN SUCCESS! Current user: ', res.profileObj);
    };

    const onFailure = (res) => {
        console.log('LOGIN FAILED! Current user: ', res);
    };

    // function handleLoginForm() {
    //  const email = userRef.current.value
    //  const password = pwdRef.current.value
    //  // const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

    //  fetch('http://localhost:3001/GoogleApp', {
    //      method: 'POST',
    //      headers: {
    //          Accept: 'application/json',
    //          'Content-Type': 'application/json',
    //      },
    //      body: JSON.stringify({
    //          email: email,
    //          // password: hashedPassword,
    //          password: password,
    //      }),
    //  })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);

        try {
            const response = await axios.post(
                LOGIN_URL,
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
    };
    // From Login.js ========================================================================================

    return (
        <>
            {success ? (
                // <Routes>
                //  <Route exact path="/success" element={<RegisterSuccess/>}/>
                // </Routes>
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/Profile">Go to your Profile</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? 'errmsg' : 'offscreen'}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
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
                    <div className="App">
                        Log in with your Google Account
                        {/* <div id="signInDiv"></div> */}
                        <GoogleLogin
                            clientId={clientId}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse.credential);
                                var decoded = jwt_decode(
                                    credentialResponse.credential
                                );
                                console.log(decoded);
                                setSuccess(true);
                                setUser(decoded);
                                console.log('Login Success!');
                            }}
                            onFailure={() => {
                                console.log('Login Failed');
                            }}
                        />
                        <li>
                            localhost: WORKING - clicks through to appropriate
                            page
                        </li>
                        <li>work.local: pop-up is BLANK</li>
                        <li>heroku: pop-up is BLANK</li>
                        <LoginButton />
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                                setSuccess(true);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            setUser={setUser}
                            setSuccess={true}
                        />
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse.credential);
                                var decoded = jwt_decode(
                                    credentialResponse.credential
                                );
                                console.log(decoded);
                                setSuccess(true);
                                console.log('Login Success!');
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        {/* // data-theme="filled_blue"
                        // onSuccess={onSuccess}
                        // onFailure={onFailure}
                        // cookiePolicy={'single_host_origin'}
                        // isSignedIn={true}
                        // data-callback={handleCallbackResponse()}
                        // data-context="signin"
                        // data-ux_mode="popup"
                        // data-itp_support="true"
                        // data-type="standard"
                        // data-shape="rectangular"
                        // data-text="signin_with"
                        // data-size="large"
                        // data-client_id={clientId}
                        // data-logo_alignment="left" */}
                        {/* <div id="g_id_onload"
                            data-client_id="1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"
                            data-context="signin"
                            data-ux_mode="redirect"
                            data-login_uri="http://localhost:3000"
                            data-itp_support="false">
                        </div>
                    
                        <div class="g_id_signin"
                            data-type="standard"
                            data-shape="rectangular"
                            data-theme="filled_blue"
                            data-text="signin_with"
                            data-size="large"
                            data-logo_alignment="left">
                        </div>
                        </LoginButton> */}
                        <li>
                            localhost:consoles LOGIN SUCCESS! Current user:
                            consoles correct data info, NO redirect
                        </li>
                        <li>
                            work.local: pop-up (Access blocked: NFTLeague’s
                            request is invalid){' '}
                        </li>
                        <li>
                            heroku: pop-up flashes BLANK, consoles LOGIN
                            FAILED!(pop_up_closed_by_user)
                        </li>
                        <LogoutButton redirectUri="http://localhost:3000/profile" />
                        <br />
                    </div>
                    <p>
                        Need an Account?
                        <br />
                        <span className="line">
                            {/*put router link here*/}
                            {/* <a href="/register">Sign Up</a> */}
                            <Link to="/register">Sign Up</Link>
                        </span>
                        {/* <span>Your new SALT: {salt}</span> */}
                        <br />
                        {/* <span>
                        Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
                    </span> */}
                    </p>
                    <p>
                        axios.get('/googleapp') status: <i>{notification}</i>
                    </p>
                    <br />
                </section>
            )}
        </>
    );
}

export default App;
