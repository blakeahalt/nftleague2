import { useRef, useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

import AuthContext from "./AuthProvider";
import axios from 'axios';
// import {decrypt} from '../../../server/EncryptionHandler';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState("")
    const [passwordList, setPasswordList] = useState([]);

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working")  //"http://localhost:3001/login"
		// axios.get("/working")  //"http://localhost:3001/login"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

    // useEffect(() => {
	// 	axios.get("http://localhost:3001/checkpassword")  //"http://localhost:3001/login"
	// 	// axios.get("/checkpassword")  //"http://localhost:3001/login"
	// 		.then(res => {
	// 			console.log('JSON data', res)
	// 			setPasswordList(res.data)
	// 		})
	// }, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = () => {
        axios.post('http://localhost:3001/checkPassword',  
        JSON.stringify({ user, pwd }), {    // Development
        // axios.post('/checkPassword', {			     // Heroku
        		user: user,
        		pwd: pwd,
        	}).then((response) => {

                console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ user, pwd, roles, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
            
            }).catch((err)=> {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            })
    }

    // const decryptPassword = (encryption) => {
	// 		axios.post('http://localhost:3001/decryptPassword', {
	// 		// axios.post('/decryptPassword', {
	// 			password: encryption.password,
	// 			iv: encryption.iv,
	// 		}).then((response) => {
	// 			setPasswordList(
	// 				passwordList.map((val) => {
	// 					return val.id === encryption.id
	// 					? {
	// 						id: val.id,
	// 						password: val.password,
	// 						user: response.data,
	// 						iv: val.iv,
	// 					}
	// 					: val;
	// 				})
	// 				);
	// 			});
	// 		};


    return (
        <>
            {success ? (
                <section>
                      <Navigate path='/profile' />
                    {/* <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                     
                    </p> */}
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
						{/*put router link here*/}
						{/* <a href="/register">Sign Up</a> */}
						<Link to='/register'>Sign Up</Link>
					</span>
				</p>
                    <p>axios.get('/login') status: <i>{notification}</i></p>
                    {/* <div className="Passwords">
						{passwordList.map((val, key) => {
							return (
								<div
								className="Password"
								onClick={() => {
									decryptPassword({ password: val.password, iv: val.iv, id: val.id })
								}}
								key={key}
								> 
								{/* <ul> {val.user} </ul> */}
								{/* </div>
							)
						})}
					</div> */} 

                </section>
            )}
        </>
    )
}

export default Login