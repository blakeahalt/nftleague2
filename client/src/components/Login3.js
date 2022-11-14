import Cookies from 'js-cookie';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogout } from 'react-google-login';
import jwt_decode from 'jwt-decode';
// import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import LoginButton from './GoogleLogin';
import LogoutButton from './GoogleLogout';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { gapi } from 'gapi-script';
import AuthContext from '../context/AuthProvider';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'
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

    useEffect((req, res) => {
        axios
            .get('http://localhost:3001/working') // dev
            // axios
            //     .get('/working') //heroku
            .then((res) => {
                console.log(res);
                setNotification(res.data.message);
            });
    }, []);

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
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    // const refresh = (refreshToken) => {
    //     console.log('Refreshing token!');

    //     return new Promise((resolve, reject) => {
    //         axios
    //             .post('http://localhost:3001/refresh', { token: refreshToken })
    //             .then((res) => {
    //                 if (res.data.success === false) {
    //                     setErr('Login again');
    //                     // set message and return.
    //                     resolve(false);
    //                 } else {
    //                     const { accessToken } = res.data;
    //                     Cookies.set('access', accessToken);
    //                     resolve(accessToken);
    //                 }
    //             });
    //     });
    // };

    // const requestLogin = async (accessToken, refreshToken) => {
    //     console.log(accessToken, refreshToken);
    //     return new Promise((resolve, reject) => {
    //         axios
    //             .post(
    //                 'http://localhost:3001/protected',
    //                 {},
    //                 { headers: { authorization: `Bearer ${accessToken}` } }
    //             )
    //             .then(async (data) => {
    //                 if (data.data.success === false) {
    //                     if (data.data.message === 'User not authenticated') {
    //                         setErr('Login again');
    //                         // set err message to login again.
    //                     } else if (
    //                         data.data.message === 'Access token expired'
    //                     ) {
    //                         const accessToken = await refresh(refreshToken);
    //                         return await requestLogin(
    //                             accessToken,
    //                             refreshToken
    //                         );
    //                     }

    //                     resolve(false);
    //                 } else {
    //                     // protected route has been accessed, response can be used.
    //                     setErr('Protected route accessed!');
    //                     resolve(true);
    //                 }
    //             });
    //     });
    // };

    // const handleChange = (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value });
    //     console.log(user);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     axios.post('http://localhost:5000/login', { user }).then((data) => {
    //         const { accessToken, refreshToken } = data.data;

    //         Cookies.set('access', accessToken);
    //         Cookies.set('refresh', refreshToken);
    //     });
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // axios
        //     .post('http://localhost:3001/login', {
        //         // dev
        //         // axios
        //         //     .post('/login', {
        //         // heroku
        //         user: user,
        //         pwd: pwd,
        //     })
        await axios
            .post(
                'http://localhost:3001/login',
                {
                    user,
                    pwd,
                }
                // { withCredentials: true }
            )

            .then((data) => {
                const accessToken = data.data.accessToken;
                const refreshToken = data.data.refreshToken;
                console.log('/login data:', accessToken, refreshToken);
                Cookies.set('access', accessToken);
                Cookies.set('refresh', refreshToken);
                if (data.status === 200) {
                    console.log(
                        `/googleapp response status 200 accessToken: ${data.data.accessToken}`
                    );
                    // setJWTToken(response.data.token);
                    // const accessToken = jwt.sign(
                    //     `${user}`,
                    //     process.env.REACT_APP_JWTSECRET,
                    //     { expiresIn: '1h' }
                    // );
                    // const refreshToken = jwt.sign(
                    //     `${user}`,
                    //     process.env.REACT_APP_REFRESH_TOKEN_SECRET,
                    //     { expiresIn: '1h' }
                    // );
                    // localStorage.setItem('token', response.data.token);
                    // response.json(`${accessToken}`);
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

    //             console.log('1', response);
    //             // console.log('2', response?.data);
    //             // console.log('3', response?.data.arg2pw);
    //             if (response.status === 200) {
    //                 console.log(
    //                     `/googleapp response status 200 accessToken: ${response.data.accessToken}`
    //                 );
    //                 // setJWTToken(response.data.token);
    //                 // const accessToken = jwt.sign(
    //                 //     `${user}`,
    //                 //     process.env.REACT_APP_JWTSECRET,
    //                 //     { expiresIn: '1h' }
    //                 // );
    //                 // const refreshToken = jwt.sign(
    //                 //     `${user}`,
    //                 //     process.env.REACT_APP_REFRESH_TOKEN_SECRET,
    //                 //     { expiresIn: '1h' }
    //                 // );
    //                 // localStorage.setItem('token', response.data.token);
    //                 // response.json(`${accessToken}`);
    //                 setSuccess(true);
    //                 setCatchUser(user);
    //                 setUser('');
    //                 setPwd('');
    //             }
    //         })
    //         .catch((err) => {
    //             if (!err?.response) {
    //                 setErrMsg('No Server Response');
    //             } else if (err.response?.status === 400) {
    //                 setErrMsg('Missing Username or Password');
    //             } else if (err.response?.status === 409) {
    //                 setErrMsg('Username Not Found');
    //             } else if (err.response?.status === 401) {
    //                 setErrMsg('Incorrect Password');
    //             } else {
    //                 setErrMsg('Login Failed');
    //             }
    //             // errRef.current.focus(); //don't use...was causing an error
    //             console.log('ErRor', err);
    //         });
    // };

    // const hasAccess = async (accessToken, refreshToken) => {
    //     if (!refreshToken) return null;

    //     if (accessToken === undefined) {
    //         // generate new accessToken
    //         accessToken = await refresh(refreshToken);
    //         return accessToken;
    //     }

    //     return accessToken;
    // };

    // const protect = async (e) => {
    //     let accessToken = Cookies.get('access');
    //     let refreshToken = Cookies.get('refresh');

    //     accessToken = await hasAccess(accessToken, refreshToken);

    //     if (!accessToken) {
    //         // Set message saying login again.
    //     } else {
    //         await requestLogin(accessToken, refreshToken);
    //     }
    // };
    return (
        <>
            {success ? (
                <section>
                    <div className="App">
                        {googleSuccess ? (
                            <>
                                <h1>Logged in with Google Account:</h1>
                                <h1>{user.name}</h1>
                                <br />
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
                // {success ? (
                //     <section>
                //         <h1>Success!</h1>
                //         <p>
                //             <Link to="/">Login</Link>
                //         </p>
                //         <p>
                //             <Link to="/profile">Visit Your Profile</Link>
                //         </p>
                //         <p>Added User: {catchUser}</p>

                //         <p>
                //             axios.get('/register') status: <i>{notification}</i>
                //         </p>
                //     </section>
                // ) : (
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
                                console.log('res', res);
                                console.log('jwt-decoded', decoded);
                                window.localStorage.setItem(
                                    'token',
                                    decoded.exp
                                );
                                console.log(decoded.aud);
                                setSuccess(true);
                                setGoogleSuccess(true);
                                // setUser(decoded);
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
            )}
        </>
    );
}

export default App;

//     return (
//         <div className="App">
//             <form
//                 action=""
//                 onChange={handleChange}
//                 onSubmit={handleSubmit}
//             >
//                 <input
//                     name="email"
//                     type="email"
//                     placeholder="Email address"
//                 />
//                 <br />
//                 <br />

//                 <input
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                 />
//                 <br />
//                 <br />
//                 <input
//                     type="submit"
//                     value="Login"
//                 />
//                 <br />
//                 <br />
//             </form>
//             {err}
//             <button onClick={protect}>Access Protected Content</button>
//         </div>
//     );
// }

// export default App;