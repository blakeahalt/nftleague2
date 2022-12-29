import Cookies from 'js-cookie';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogout } from 'react-google-login';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import LogoutButton from './GoogleLogout';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { gapi } from 'gapi-script';
import AuthContext from './AuthProvider';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOGIN_URL = 'http://localhost:3001'; //'http://localhost:3001/GoogleApp'
const clientId = process.env.REACT_APP_CLIENTID;

function App() {
    const [notification, setNotification] = useState('');
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    // const pwdRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState({});
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [googleSuccess, setGoogleSuccess] = useState(false);
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [catchUser, setCatchUser] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [JETToken, setJWTToken] = useState();
    const [err, setErr] = useState('');

    function handleSignOut(e) {
        setUser({});
        document.getElementById('signInDiv').hidden = false;
    }

    function handleCallbackResponse(response) {
        // console.log("Encoded JWT ID token: " + response.credential)
        var userObject = jwt_decode(response.credential);
        // console.log(userObject);
        setUser(userObject);
        document.getElementById('signInDiv').hidden = true;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse,
        });

        // google.accounts.id.renderButton(
        // 	document.getElementById("signInDiv"),
        // 	{ theme: "outline", size: "large"}
        // )
    }, []);

    useEffect(() => {
        userRef.current.focus();
        setUser('');
        setPwd('');
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // await axios
        //     .post('http://localhost:3001/login', { user, pwd })
        await axios
            .post('/login', { user, pwd })
            .then((data) => {
                if (data.status === 200) {
                    const accessToken = data.data.accessToken;
                    const refreshToken = data.data.refreshToken;
                    Cookies.set('access', accessToken);
                    Cookies.set('refresh', refreshToken);
                    // console.log(`accessToken: ${data.data.accessToken}`);
                    // console.log(`refreshToken: ${data.data.refreshToken}`);
                    // setAuth(data.data.refreshToken);
                    setSuccess(true);
                    setCatchUser(user);
                    setUser('');
                    setPwd('');
                }
            })
            .catch((err) => {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Not Found');
                } else if (err.response?.status === 401) {
                    setErrMsg('Incorrect Password');
                } else {
                    setErrMsg('Login Failed');
                }
                // errRef.current.focus(); //don't use...was causing an error
                console.log('ErRor', err);
            });
    };

    return (
        <>
            {success ? (
                <section
                    style={{
                        marginTop: 50,
                        contentAlign: 'center',
                    }}
                >
                    <div
                        className="Container"
                        style={{
                            marginTop: 25,
                            marginBottom: 25,
                            fontSize: 25,
                            contentAlign: 'center',
                            textAlign: 'center',
                        }}
                    >
                        {googleSuccess ? (
                            <>
                                <h1>Logged in with Google Account:</h1>
                                <h1>{user.name}</h1>
                                <div>
                                    <img
                                        src={user.picture || user.imageUrl}
                                        width="200"
                                        height="200"
                                        alt=""
                                    ></img>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <h1>Logged in:</h1>
                                <h1>{catchUser}</h1>
                                <br />
                            </div>
                        )}
                        <p>
                            <Link to="/Profile">Go to your Profile</Link>
                        </p>
                    </div>
                </section>
            ) : (
                <>
                    <section>
                        <h1 style={{ textAlign: 'center' }}>
                            NFT Collections Tracker
                        </h1>
                    </section>
                    <section>
                        <p
                            ref={errRef}
                            className={errMsg ? 'errmsg' : 'offscreen'}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                        <h1>Sign In</h1>
                        <form
                            action=""
                            // onChange={handleChange}
                            onSubmit={handleSubmit}
                        >
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
                            <button className="button">Sign In</button>
                        </form>
                        <br />
                        <br />
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: -20,
                            }}
                        ></div>
                        <div className="App">
                            <GoogleLogin
                                onSuccess={(res) => {
                                    // console.log(credentialResponse.credential);
                                    var decoded = jwt_decode(res.credential);
                                    // console.log('res', res);
                                    // console.log('jwt-decoded', decoded);
                                    // window.localStorage.setItem(
                                    //     'token',
                                    //     decoded.exp
                                    // );
                                    const user = decoded.name;
                                    const pwd = decoded.jti;
                                    // console.log('decoded.jti', decoded.jti);
                                    // axios
                                    //     .post(
                                    //         'http://localhost:3001/googlelogin',
                                    //         {
                                    //             user,
                                    //             pwd,
                                    //         }
                                    //     )
                                    axios
                                        .post('/googlelogin', {
                                            pwd: pwd,
                                            user: user,
                                        })
                                        .then((data) => {
                                            const accessToken =
                                                data.data.accessToken;
                                            const refreshToken =
                                                data.data.refreshToken;
                                            Cookies.set('access', accessToken);
                                            Cookies.set(
                                                'refresh',
                                                refreshToken
                                            );
                                            // console.log(
                                            //     `accessToken: ${data.data.accessToken}`
                                            // );
                                            // console.log(
                                            //     `refreshToken: ${data.data.refreshToken}`
                                            // );
                                        });
                                    setSuccess(true);
                                    setGoogleSuccess(true);
                                    setUser(decoded);
                                    // setUser(jwt_decode(res.credential).name)
                                    console.log(
                                        `Login Success! User: ${decoded.name}`
                                    );
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
                        <p style={{ textAlign: 'right' }}>
                            Need an Account?
                            <br />
                            <span className="line">
                                <Link to="/register">Sign Up</Link>
                            </span>
                            <br />
                        </p>
                        {/* <p>
                        axios.get('/googleapp') status: <i>{notification}</i>
                    </p>
                    <br /> */}
                    </section>
                </>
            )}
        </>
    );
}

export default App;
