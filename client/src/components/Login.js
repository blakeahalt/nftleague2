import { useRef, useState, useEffect, useContext } from 'react';
// import Register from './components/Register.js'
// import Notification from './components/Notification.js';
// import bcrypt from 'bcryptjs'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
// import GoogleApp from './components/GoogleApp'
import LoginButton from "./GoogleLogin"
import LogoutButton from "./GoogleLogout"
// import { gapi } from 'gapi-script'

// const clientId="1077671935526-e6mu705tptsm57l6p1ajpom0umt43a1p.apps.googleusercontent.com"

const LOGIN_URL = 'http://localhost:3001/login';


// const REGISTER_URL = '/register'
// const salt = bcrypt.genSaltSync(10)



const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [notification, setNotification] = useState("")
    
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    
    useEffect(() => {
        if(localStorage.getItem('user-info')) {
            navigate.push("http://localhost:3001/add")
        }
    })

    useEffect((req, res) => {
		axios.get("http://localhost:3001/login")  //"http://localhost:3001/login"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])

    // function App() {

    //     useEffect(() => {
    //         function start() {
    //             gapi.client.init({
    //                 clientId: clientId,
    //                 scope: ""
    //             })
    //         }
    
    //         gapi.load('client:auth2', start)
    //     })
	// }


	// var accessToken = gapi.auth.getToken().access_token

    function handleLoginForm() {
        const email = userRef.current.value
        const password = pwdRef.current.value
        // const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up
    
        fetch('/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            // password: hashedPassword,
            password: password,
          }),
        })
      }
    
// async function login(){

//     let item={user, pwd}
//     let result = await fetch("http://localhost:3001/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(item)
//     })
//     result = await result.json();
//     localStorage.setItem("user-info", JSON.stringify(result))
//     navigate.push("/add")
// }
     
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        
        try {
            const response = await axios.post(LOGIN_URL,
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
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                    <Link to='/notification'>Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {/* <h1>Sign In</h1> */}
                    <form onSubmit={()=> handleSubmit & handleLoginForm}>
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
                    <div>
					{/* <Link to='/googleapp'>Google Login</Link> */}
					Log in with your Google Account
					{/* <div id="signInDiv"></div> */}
					<LoginButton />
					<LogoutButton />
					<br />
				</div>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            {/* <a href="/register">Sign Up</a> */}
                            <Link to='/register'>Sign Up</Link>
                        </span>
                        {/* <span>Your new SALT: {salt}</span> */}
                        <br />
                        <span>
                        Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
                        </span>
                    </p>
                <div>
                <Link to='/googleapp'>Google Login</Link>
                </div>
                <p>axios.get('/login') status: <i>{notification}</i></p>
                </section>

            )}
        </>
    )
}

export default Login


// import { useState } from 'react';
// import axios from "axios";

// function Login(props) {

//     const [loginForm, setloginForm] = useState({
//       username: "",
//       password: ""
//     })

//     function logMeIn(event) {
//       axios({
//         method: "POST",
//         url:"/token",
//         data:{
//           username: loginForm.username,
//           password: loginForm.password
//          }
//       })
//       .then((response) => {
//         props.setToken(response.data.access_token)
//       }).catch((error) => {
//         if (error.response) {
//           console.log(error.response)
//           console.log(error.response.status)
//           console.log(error.response.headers)
//           }
//       })

//       setloginForm(({
//         username: "",
//         password: ""}))

//       event.preventDefault()
//     }

//     function handleChange(event) { 
//       const {value, name} = event.target
//       setloginForm(prevNote => ({
//           ...prevNote, [name]: value})
//       )}

//     return (
//       <div>
//         <h1>Login</h1>
//           <form className="login">
//             <div className="mb-3">
//                 <input autoComplete="off" autoFocus className="form-control mx-auto w-auto" id="username" name="username" placeholder="Username" type="text" />
//             </div>
//             <div className="mb-3">
//                 <input className="form-control mx-auto w-auto" id="password" name="password" placeholder="Password" type="password" />
//             </div>
//             <button className="btn btn-primary" type="submit">Log In</button>
//           </form>
//           {/* <form className="login">
//             <input onChange={handleChange} 
//                   type="email"
//                   text={loginForm.email} 
//                   name="email" 
//                   placeholder="Email" 
//                   value={loginForm.email} />
//             <input onChange={handleChange} 
//                   type="password"
//                   text={loginForm.password} 
//                   name="password" 
//                   placeholder="Password" 
//                   value={loginForm.password} />

//           <button onClick={logMeIn}>Submit</button>
//         </form> */}
//       </div>
//     );
// }

// export default Login;