import { useRef, useState, useEffect } from 'react';
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{6,24}$/;

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'no-referrer',
    },
    withCredentials: true,
};

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [catchUser, setCatchUser] = useState('');
    const [notification, setNotification] = useState('');

    const [userList, setUserList] = useState([]);

    // useEffect((req, res) => {
    //     axios.get('http://localhost:3001/working').then((res) => {
    //         console.log(res);
    //         setNotification(res.data.message);
    //     });
    // }, []);

    // useEffect((req, res) => {
    //     axios.get('/working').then((res) => {
    //         console.log(res);
    //         setNotification(res.data.message);
    //     });
    // }, []);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    // const loadData = async () => {
    //     const response = await axios.get('http://localhost:3001/getUser'); // dev
    //     // const response = await axios.get("/getUser")                                        // heroku
    //     setUserList(response.data);
    //     console.log(response.data);
    // };

    // useEffect(() => {
    //     loadData();
    //     console.log(userList);
    // }, []);

    const userName = userList.map(function (user) {
        return [`${user.user}`].join('');
    });
    // console.log(userName);

    // HANDLESUBMIT USING PROMISE
    const handleSubmit = (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }

        // axios
        //     .post('http://localhost:3001/addPassword', {
        //         pwd: pwd,
        //         user: user,
        //     })
        axios
            .post('/addPassword', {
                pwd: pwd,
                user: user,
            })
            .then((data) => {
                // console.log('1', JSON.stringify(response));
                // console.log('2', response?.data);
                // console.log('3', response?.data.token);
                // console.log('4', response.config.data);
                // localStorage.setItem('token', response.data.token);
                // axios
                //     .post('http://localhost:3001/googlelogin', {
                //         user,
                //         pwd,
                //     })
                axios
                    .post('/googlelogin', {
                        pwd: pwd,
                        user: user,
                    })
                    .then((data) => {
                        const accessToken = data.data.accessToken;
                        const refreshToken = data.data.refreshToken;
                        Cookies.set('access', accessToken);
                        Cookies.set('refresh', refreshToken);
                        console.log(`accessToken: ${data.data.accessToken}`);
                        console.log(`refreshToken: ${data.data.refreshToken}`);
                    });
                setSuccess(true);
                setCatchUser(user);
                setUser('');
                setPwd('');
                setMatchPwd('');
            })
            .catch((err) => {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed');
                }
                console.log(user, pwd);
            });
    };

    return (
        <>
            {success ? (
                <section>
                    <div className="App">
                        <div style={{ textAlign: 'center' }}>
                            <h1>Successful Registration:</h1>
                            <h1>{catchUser}</h1>
                            <br />
                        </div>
                        <p>
                            <Link to="/Profile">Go to your Profile</Link>
                        </p>
                    </div>
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
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validName ? 'valid' : 'hide'}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validName || !user ? 'hide' : 'invalid'
                                }
                            />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p
                            id="uidnote"
                            className={
                                userFocus && user && !validName
                                    ? 'instructions'
                                    : 'offscreen'
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <br />
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validPwd ? 'valid' : 'hide'}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validPwd || !pwd ? 'hide' : 'invalid'
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            autoComplete="off"
                            required
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                pwdFocus && !validPwd
                                    ? 'instructions'
                                    : 'offscreen'
                            }
                            style={{
                                maxWidth: 240,
                                contentAlign: 'center',
                                marginLeft: 20,
                            }}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <br />
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a
                            number and a special character.
                            <br />
                            Allowed special characters:{' '}
                            <span aria-label="exclamation mark">!</span>{' '}
                            <span aria-label="at symbol">@</span>{' '}
                            <span aria-label="hashtag">#</span>{' '}
                            <span aria-label="dollar sign">$</span>{' '}
                            <span aria-label="percent">%</span>
                            <span aria-label="asterisk">*</span>
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validMatch && matchPwd ? 'valid' : 'hide'
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validMatch || !matchPwd ? 'hide' : 'invalid'
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                matchFocus && !validMatch
                                    ? 'instructions'
                                    : 'offscreen'
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button
                            className="button"
                            disabled={
                                !validName || !validPwd || !validMatch
                                    ? true
                                    : false
                            }
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>
                        Already registered?
                        <br />
                        <span className="line">
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Register;
