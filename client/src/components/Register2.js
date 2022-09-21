import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from 'react-router-dom'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;
// const REGISTER_URL = "http://localhost:3001/register";

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

    const [catchUser, setCatchUser] = useState('')
	const [notification, setNotification] = useState("")

	// const [passwordList, setPasswordList] = useState([])

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working")  //"http://localhost:3001/register"
		// axios.get("/working")  //"http://localhost:3001/register"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
		axios.post('http://localhost:3001/addPassword',   //remove URL when deploying a build to heroku
		// axios.post('/addPassword', {  //remove URL when deploying a build to heroku
		// {
		// 	user: user,
		// 	pwd: pwd
		// })
		JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
		.then((response)=> {
			console.log("1", response.config.data);
			console.log("2", response?.data); //prints {response: 'WORKING'} from server index.js
			// console.log(response?.accessToken);
			console.log("3", JSON.stringify(response))
			setSuccess(true)
			setCatchUser(user)
			setUser('');
			setPwd('');
			setMatchPwd('');
		}).catch ((err)=> {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed')
			}
			// errRef.current.focus();
		})
		console.log(user, pwd);
	}
	// try {
    //         const response = await axios.post(REGISTER_URL,
    //             JSON.stringify({ user, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         // TODO: remove console.logs before deployment
    //         console.log(JSON.stringify(response?.data));
    //         //console.log(JSON.stringify(response))
    //         setSuccess(true);
    //         //clear state and controlled inputs
    //         setCatchUser(user)
    //         setUser('');
    //         setPwd('');
    //         setMatchPwd('');
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 409) {
    //             setErrMsg('Username Taken');
    //         } else {
    //             setErrMsg('Registration Failed')
    //         }
    //         errRef.current.focus();
    //     }
    //     console.log(user, pwd);

    // }

    return (
        <>
            {success ? (
               <section>
               <h1>Success!</h1>
               <p>
                      <Link to="/googleapp">Login</Link>
               </p>
               <p>
                      <Link to="/profile">Visit Your Profile</Link>
               </p>
               <p>Added User: {catchUser}</p>

               <p>axios.get('/register') status: <i>{notification}</i></p>

        </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to="/googleapp">Sign in</Link>
                        </span>
                    </p>
					<p>axios.get('/register2') status: <i>{notification}</i></p>
                </section>
            )}
        </>
    )
}

export default Register