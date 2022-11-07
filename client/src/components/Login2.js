import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';

function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const { setAuth } = useContext(AuthContext);

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

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (props) => {
        // e.preventDefault();
        console.log(user, pwd);

        axios
            .get('/checkPassword', {
                // axios.get('http://localhost:3001/checkPassword', {
                password: props.password,
                user: props.data,
                iv: props.iv,
            })
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ user, pwd, roles, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
            })
            .catch((err) => {
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
            });
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>{/* <a href="#">Go to Home</a> */}</p>
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
                    <form onSubmit={handleSubmit}>
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
                    <p>
                        Need an Account?
                        <br />
                        <span className="line">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default Login;
