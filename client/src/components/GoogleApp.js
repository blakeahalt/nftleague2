import LoginButton from './GoogleLogin';
// import LogoutButton from "./GoogleLogout"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
// import GoogleLogin from "react-google-login";
import jwt_decode from 'jwt-decode';

// import Login from "./Login";

// const clientId = "1077671935526-e6mu705tptsm57l6p1ajpom0umt43a1p.apps.googleusercontent.com"

const LOGIN_URL = 'http://localhost:3001/GoogleApp'; //'http://localhost:3001/GoogleApp'

function App() {
    const [notification, setNotification] = useState('');

    useEffect((req, res) => {
        axios.get('/GoogleApp').then((res) => {
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
    }, []);
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId:
                    '1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com',
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId:
                '1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com',
            scope: 'email',
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

    // function handleLoginForm() {
    // 	const email = userRef.current.value
    // 	const password = pwdRef.current.value
    // 	// const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

    // 	fetch('http://localhost:3001/GoogleApp', {
    // 		method: 'POST',
    // 		headers: {
    // 			Accept: 'application/json',
    // 			'Content-Type': 'application/json',
    // 		},
    // 		body: JSON.stringify({
    // 			email: email,
    // 			// password: hashedPassword,
    // 			password: password,
    // 		}),
    // 	})
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
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/added">Go to Home</Link>
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
                    <div>
                        {/* <Link to='/googleapp'>Google Login</Link> */}
                        Log in with your Google Account
                        {/* <div id="signInDiv"></div> */}
                        <LoginButton />
                        {/* <LogoutButton /> */}
                        <br />
                    </div>
                    <p>
                        Need an Account?
                        <br />
                        <span className="line">
                            <Link to="/register">Sign Up</Link>
                        </span>
                        {/* <span>Your new SALT: {salt}</span> */}
                        <br />
                        {/* <span>
						Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
					</span> */}
                    </p>
                    <p>axios.get('/googleapp') status: {notification}</p>
                    <br />
                </section>
            )}
        </>
    );
}

export default App;
