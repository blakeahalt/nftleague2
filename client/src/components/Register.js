// import { useRef, useState, useEffect } from "react";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import axios from './api/axios.js';
// import axios from 'axios';
// import { Link } from 'react-router-dom'


// // import Notification from "./components/Notification";
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{6,24}$/;
// // const REGISTER_URL = 'http://localhost:3001/register';
// // const LOGIN_URL = '/auth';


// const Register = () => {
// 	const userRef = useRef();
// 	const errRef = useRef();

// 	const [user, setUser] = useState('');
// 	const [validName, setValidName] = useState(false);
// 	const [userFocus, setUserFocus] = useState(false);

// 	const [pwd, setPwd] = useState('');
// 	const [validPwd, setValidPwd] = useState(false);
// 	const [pwdFocus, setPwdFocus] = useState(false);

// 	const [matchPwd, setMatchPwd] = useState('');
// 	const [validMatch, setValidMatch] = useState(false);
// 	const [matchFocus, setMatchFocus] = useState(false);

// 	const [errMsg, setErrMsg] = useState('');
// 	const [success, setSuccess] = useState(false);

// 	const [catchUser, setCatchUser] = useState('')
// 	const [notification, setNotification] = useState("")

// 	const [userList, setUserList] = useState([])

// 	useEffect((req, res) => {
// 		// axios.get("http://localhost:3001/working") 						// dev
// 		axios.get("/working")									// heroku
// 			.then(res => {
// 				console.log(res)
// 				setNotification(res.data.message)
// 			})
// 	}, [])

// 	useEffect(() => {
// 		userRef.current.focus();
// 	}, [])

// 	useEffect(() => {
// 		setValidName(USER_REGEX.test(user));
// 	}, [user])

// 	useEffect(() => {
// 		setValidPwd(PWD_REGEX.test(pwd));
// 		setValidMatch(pwd === matchPwd);
// 	}, [pwd, matchPwd])

// 	useEffect(() => {
// 		setErrMsg('');
// 	}, [user, pwd, matchPwd])

// 	const loadData = async() => {
// 		// const response = await axios.get("http://localhost:3001/getUser")  		// dev
// 		const response = await axios.get("/getUser")						// heroku
// 		setUserList(response.data)
// 		console.log(response.data);
// 	}

// 	useEffect(() => {
// 		loadData()
// 		console.log(userList);
// 	}, [])

// 	const userName = userList.map(function(user){
// 		return [`${user.user}`].join('')
// 	})
// 	console.log(userName);
	
// 	// let indexes = [0]
// 	// const res = indexes.map(e => userName[e])
	
// 	// const res = userName.slice()  		
// 	// console.log(res);

// 	// HANDLESUBMIT USING PROMISE
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		// if button enabled with JS hack
// 		const v1 = USER_REGEX.test(user);
// 		const v2 = PWD_REGEX.test(pwd);
// 		if (!v1 || !v2) {
// 			setErrMsg("Invalid Entry");
// 			return;
// 		}

// 		// axios.post("http://localhost:3001/addPassword", {   					// dev
// 		axios.post("/addPassword", {   								// heroku
// 			user: user,
// 			pwd: pwd
// 		}).then((response) => {
// 			console.log("1", response.config.data);
// 			console.log("2", response?.data);
// 			// console.log(response?.accessToken);
// 			console.log("3", JSON.stringify(response))
// 			console.log("4", response.config.user)
// 			setSuccess(true)
// 			setCatchUser(user)
// 			setUser('');
// 			setPwd('');
// 			setMatchPwd('');
// 		}).catch((err) => {
// 			if (!err?.response) {
// 				setErrMsg('No Server Response');
// 			} else if (err.response?.status === 409) {
// 				setErrMsg('Username Taken');
// 			} else {
// 				setErrMsg('Registration Failed')
// 			}
// 			// errRef.current.focus();
// 			console.log(user, pwd);
// 		})
// 	}

// 	// HANDLESUBMIT USING ASYNC/AWAIT 
// 	// const handleSubmit = async (e) => {
// 	// 	e.preventDefault();
// 	// 	// if button enabled with JS hack
// 	// 	const v1 = USER_REGEX.test(user);
// 	// 	const v2 = PWD_REGEX.test(pwd);
// 	// 	if (!v1 || !v2) {
// 	// 		setErrMsg("Invalid Entry");
// 	// 		return;
// 	// 	}
// 	// 	console.log(user, pwd);
// 	// 	setSuccess(true)

// 	// 	try {
// 	// 		// const response = await axios.post("http://localhost:3001/register/",
// 	// 		// 	JSON.stringify({ user, pwd }),
// 	// 		// 	{
// 	// 		// 		headers: { 'Content-Type': 'application/json' },
// 	// 		// 		// withCredentials: true
// 	// 		// 	}
// 	// 		// );
// 	// 	const response =
// 	// 		await axios.post('http://localhost:3001/addPassword', {  //remove URL when deploying a build to heroku
// 	// 		// await axios.post('/addPassword', {  //remove URL when deploying a build to heroku
// 	// 			user: user,
// 	// 			pwd: pwd
// 	// 		});
// 	// 	console.log("1", response.config.data);
// 	// 	console.log("2", response?.data); //prints {response: 'WORKING'} from server index.js
// 	// 	// console.log(response?.accessToken);
// 	// 	console.log("3", JSON.stringify(response))
// 	// 	setSuccess(true);
// 	// 	// setNotification(response.data.message)
// 	// 	//clear state and controlled inputs
// 	// 	//need value attrib on inputs for this
// 	// 	setCatchUser(user)
// 	// 	setUser('');
// 	// 	setPwd('');
// 	// 	setMatchPwd('');

// 	// 	} catch (err) {
// 	// 		if (!err?.response) {
// 	// 			setErrMsg('No Server Response');
// 	// 		} else if (err.response?.status === 409) {
// 	// 			setErrMsg('Username Taken');
// 	// 		} else {
// 	// 			setErrMsg('Registration Failed')
// 	// 		}
// 	// 		// errRef.current.focus();
// 	// 	}
// 	// }

// 	return (
// 		<>
// 			{success ? (
// 				<section>
// 					<h1>Success!</h1>
// 					<p>
// 						<Link to="/">Login</Link>
// 					</p>
// 					<p>
// 						<Link to="/profile">Visit Your Profile</Link>
// 					</p>
// 					<p>Added User: {catchUser}</p>

// 					<p>axios.get('/register') status: <i>{notification}</i></p>

// 				</section>
// 			) : (
// 				<section>
// 					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
// 					<h1>Register</h1>
// 					<form onSubmit={handleSubmit}>
// 						<label htmlFor="username">
// 							Username:
// 							<FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
// 							<FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
// 						</label>
// 						<input
// 							type="text"
// 							id="username"
// 							ref={userRef}
// 							autoComplete="off"
// 							onChange={(e) => setUser(e.target.value)}
// 							value={user}
// 							required
// 							aria-invalid={validName ? "false" : "true"}
// 							aria-describedby="uidnote"
// 							onFocus={() => setUserFocus(true)}
// 							onBlur={() => setUserFocus(false)}
// 						/>
// 						<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
// 							<FontAwesomeIcon icon={faInfoCircle} />
// 							<br />
// 							4 to 24 characters.<br />
// 							Must begin with a letter.<br />
// 							Letters, numbers, underscores, hyphens allowed.
// 						</p>


// 						<label htmlFor="password">
// 							Password:
// 							<FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
// 							<FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
// 						</label>
// 						<input
// 							type="password"
// 							id="password"
// 							onChange={(e) => setPwd(e.target.value)}
// 							value={pwd}
// 							autoComplete="off"
// 							required
// 							aria-invalid={validPwd ? "false" : "true"}
// 							aria-describedby="pwdnote"
// 							onFocus={() => setPwdFocus(true)}
// 							onBlur={() => setPwdFocus(false)}
// 						/>
// 						<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
// 							<FontAwesomeIcon icon={faInfoCircle} />
// 							<br />
// 							8 to 24 characters.<br />
// 							Must include uppercase and lowercase letters, a number and a special character.<br />
// 							Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span><span aria-label="asterisk">*</span>
// 						</p>


// 						<label htmlFor="confirm_pwd">
// 							Confirm Password:
// 							<FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
// 							<FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
// 						</label>
// 						<input
// 							type="password"
// 							id="confirm_pwd"
// 							onChange={(e) => setMatchPwd(e.target.value)}
// 							value={matchPwd}
// 							required
// 							aria-invalid={validMatch ? "false" : "true"}
// 							aria-describedby="confirmnote"
// 							onFocus={() => setMatchFocus(true)}
// 							onBlur={() => setMatchFocus(false)}
// 						/>
// 						<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
// 							<FontAwesomeIcon icon={faInfoCircle} />
// 							Must match the first password input field.
// 						</p>

// 						<button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
// 					</form>
// 					<p>
// 						Already registered?<br />
// 						<span className="line">
// 							<Link to="/googleapp">Sign In</Link>
// 						</span>
// 					</p>
// 					<br />
// 					<p>
// 						Notification Test
// 						<br />
// 						<span className="line">
// 							<Link to="/notification">Get notification message</Link>
// 							<br />
// 						</span>
// 					</p>
// 					<br />
// 					<p>axios.get('/register') status: <i>{notification}</i></p>
// 					<div>
// 						{/* {userList.length >=1 ? userList.map((user, idx) => {
// 							return <p key={idx}>{user.user}</p>
// 							}
// 						):(
// 						''
// 						)
// 						}  */}
// 					</div>
// 					<li>
// 						{userName.slice().join(',  ')}
// 					</li>
// 				</section>
// 			)}
// 		</>
// 	)
// }

// export default Register`


// ====================================================


import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios.js';
import axios from 'axios';
import { Link } from 'react-router-dom'


// import Notification from "./components/Notification";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{6,24}$/;
// const REGISTER_URL = 'http://localhost:3001/register';
// const LOGIN_URL = '/auth';


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

       const [userList, setUserList] = useState([])

       useEffect((req, res) => {
              // axios.get("http://localhost:3001/working")                                       // dev
              axios.get("/working")                                                               // heroku
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

       const loadData = async() => {
              // const response = await axios.get("http://localhost:3001/getUser")                // dev
              const response = await axios.get("/getUser")                                        // heroku
              setUserList(response.data)
              console.log(response.data);
       }

       useEffect(() => {
              loadData()
              // console.log(userList);
       }, [])

       const userName = userList.map(function(user){
              return [`${user.user}`].join('')
       })
       console.log(userName);
       
       // let indexes = [0]
       // const res = indexes.map(e => userName[e])
       
       // const res = userName.slice()           
       // console.log(res);

       // HANDLESUBMIT USING PROMISE
       const handleSubmit = (e) => {
              e.preventDefault();
              // if button enabled with JS hack
              const v1 = USER_REGEX.test(user);
              const v2 = PWD_REGEX.test(pwd);
              if (!v1 || !v2) {
                     setErrMsg("Invalid Entry");
                     return;
              }

              // axios.post("http://localhost:3001/addPassword", {                                // dev
              axios.post("/addPassword", {                                                        // heroku
                     user: user,
                     pwd: pwd
              }).then((response) => {
                     console.log("1", response.config.data);
                     console.log("2", response?.data);
                     // console.log(response?.accessToken);
                     console.log("3", JSON.stringify(response))
                     console.log("4", response.config.user)
                     setSuccess(true)
                     setCatchUser(user)
                     setUser('');
                     setPwd('');
                     setMatchPwd('');
              }).catch((err) => {
                     if (!err?.response) {
                            setErrMsg('No Server Response');
                     } else if (err.response?.status === 409) {
                            setErrMsg('Username Taken');
                     } else {
                            setErrMsg('Registration Failed')
                     }
                     // errRef.current.focus();
                     console.log(user, pwd);
              })
       }

       // HANDLESUBMIT USING ASYNC/AWAIT 
       // const handleSubmit = async (e) => {
       //     e.preventDefault();
       //     // if button enabled with JS hack
       //     const v1 = USER_REGEX.test(user);
       //     const v2 = PWD_REGEX.test(pwd);
       //     if (!v1 || !v2) {
       //            setErrMsg("Invalid Entry");
       //            return;
       //     }
       //     console.log(user, pwd);
       //     setSuccess(true)

       //     try {
       //            // const response = await axios.post("http://localhost:3001/register/",
       //            //     JSON.stringify({ user, pwd }),
       //            //     {
       //            //            headers: { 'Content-Type': 'application/json' },
       //            //            // withCredentials: true
       //            //     }
       //            // );
       //     const response =
       //            await axios.post('http://localhost:3001/addPassword', {  //remove URL when deploying a build to heroku
       //            // await axios.post('/addPassword', {  //remove URL when deploying a build to heroku
       //                   user: user,
       //                   pwd: pwd
       //            });
       //     console.log("1", response.config.data);
       //     console.log("2", response?.data); //prints {response: 'WORKING'} from server index.js
       //     // console.log(response?.accessToken);
       //     console.log("3", JSON.stringify(response))
       //     setSuccess(true);
       //     // setNotification(response.data.message)
       //     //clear state and controlled inputs
       //     //need value attrib on inputs for this
       //     setCatchUser(user)
       //     setUser('');
       //     setPwd('');
       //     setMatchPwd('');

       //     } catch (err) {
       //            if (!err?.response) {
       //                   setErrMsg('No Server Response');
       //            } else if (err.response?.status === 409) {
       //                   setErrMsg('Username Taken');
       //            } else {
       //                   setErrMsg('Registration Failed')
       //            }
       //            // errRef.current.focus();
       //     }
       // }

       return (
              <>
                     {success ? (
                            <section>
                                   <h1>Success!</h1>
                                   <p>
                                          <Link to="/">Login</Link>
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
                                                 <br />
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
                                                 autoComplete="off"
                                                 required
                                                 aria-invalid={validPwd ? "false" : "true"}
                                                 aria-describedby="pwdnote"
                                                 onFocus={() => setPwdFocus(true)}
                                                 onBlur={() => setPwdFocus(false)}
                                          />
                                          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                                 <FontAwesomeIcon icon={faInfoCircle} />
                                                 <br />
                                                 8 to 24 characters.<br />
                                                 Must include uppercase and lowercase letters, a number and a special character.<br />
                                                 Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span><span aria-label="asterisk">*</span>
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
                                                 <Link to="/googleapp">Sign In</Link>
                                          </span>
                                   </p>
                                   <br />
                                   <p>
                                          Notification Test
                                          <br />
                                          <span className="line">
                                                 <Link to="/notification">Get notification message</Link>
                                                 <br />
                                          </span>
                                   </p>
                                   <br />
                                   <p>axios.get('/register') status: <i>{notification}</i></p>
                                   <div>
                                          {/* {userList.length >=1 ? userList.map((user, idx) => {
                                                 return <p key={idx}>{user.user}</p>
                                                 }
                                          ):(
                                          ''
                                          )
                                          }  */}
                                   </div>
                                   <li>
                                          {userName.slice().join(',  ')}
                                   </li>
                            </section>
                     )}
              </>
       )
}

export default Register