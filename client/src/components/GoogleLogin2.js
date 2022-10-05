// import { GoogleLogin, GoogleLogout } from 'react-google-login'
// import { React, useState, useEffect } from "react";
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios'
// import jwt_decode from "jwt-decode";
// // import { useAuth0 } from "@auth0/auth0-react";
// // import LoginButton from "./GoogleLogin"



// const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

// function Login() {
//     // const [notification, setNotification] = useState("")
//     const [success, setSuccess] = useState(false);
//     const [isSignedIn, setIsSignedIn] = useState(false);
//     const [user, setUser] = useState({});


//     const login = useGoogleLogin({
//            onSuccess: async respose => {
//                   try {
//                          const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//                                 headers: {
//                                        "Authorization": `Bearer ${respose.access_token}`
//                                 }
//                          })
//                          console.log("Login Success!.");
//                          console.log(res.data)
//                          setSuccess(true);
//                   } catch (err) {
//                          console.log(err)

//                   }

//            }
//     });

//     const onSuccess = () => {
//            console.log("LOGIN SUCCESS! Current user: ");
//     }

//     const onFailure = (res) => {
//            console.log("LOGIN FAILED! res: ", res);
//     }

//     // const AuthLogoutButton = () => {
//     //     const { logout } = useAuth0();

//     //     return (
//     //            <button onClick={() => logout({ returnTo: "http://localhost:3000/googleapp" })}>
//     //                   Sign Out
//     //            </button>
//     //     )
//     // };

//     return (
//            <div id="signInButton" >
//                   <GoogleLogin
//                          clientId={clientId}
//                          buttonText="Login?"
//                          // onSuccess={credentialResponse => {
//                          //     console.log(credentialResponse.credential);
//                          //     var decoded = jwt_decode(credentialResponse.credential);
//                          //     console.log(decoded)
//                          //     setUser(decoded)
//                          //     console.log("Login Success!!")
//                          //     setSuccess(true)
//                          // }}
//                          onSuccess={login}
//                          onFailure={onFailure}
//                          cookiePolicy={'single_host_origin'}
//                          isSignedIn={true}
//                          // onError={() => {
//                          //     console.log('Login Failed');
//                          // }} 
//                   />
//            </div>
//     )
// }

// export default Login


// import { GoogleLogin } from 'react-google-login'
// import { Link } from 'react-router-dom';
// import jwt_decode from "jwt-decode"



// const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

// function GLogin() {

//        const onSuccess = (res) => {
//               console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
//        }

//        const onFailure = (res) => {
//               console.log("LOGIN FAILED! Current user: ", res);
//        }

//     function handleCallbackResponse(response) {
//            console.log("Encoded JWT ID token: " + response.credentials);
//            var userObject = jwt_decode(response.credential)
//            console.log(userObject);
//        }
//        return (
//            // <>
//            <div id="g_id_signin">
//                   <GoogleLogin
//                   clientId={clientId}
//                   buttonText="Login"
//                   onSuccess={onSuccess}
//                   onFailure={onFailure}
//                   cookiePolicy={'single_host_origin'}
//                   isSignedIn={true}
//                   data-client_id={clientId}
//                   data-theme="filled_blue"
//                   data-context="signin"
//                   data-ux_mode="popup"
//                   data-itp_support="true"
//                   data-type="standard"
//                   data-shape="rectangular"
//                   data-text="signin_with"
//                   data-size="large"
//                   data-logo_alignment="left">

//            </GoogleLogin>
//                   </div>
//        )


//     // return( 
//     //     <>
//     //     <div id="g_id_onload"
//     //            data-client_id="1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"
//     //            data-context="signin"
//     //            data-callback={handleCallbackResponse}
//     //            data-ux_mode="popup"
//     //            data-login_uri="http://localhost:3000/profile"
//     //            data-itp_support="true">
//     //     </div>
//     //     {/* <div
//     //            clientId={clientId}
//     //            buttonText="Login"
//     //            onSuccess={onSuccess}
//     //            onFailure={onFailure}
//     //            cookiePolicy={'single_host_origin'}
//     //            isSignedIn={true} >
//     //     </div> */}

//     //     <div className="g_id_signin"
//     //            data-type="standard"
//     //            data-shape="rectangular"
//     //            data-theme="filled_blue"
//     //            data-text="signin_with"
//     //            data-size="large"
//     //            data-logo_alignment="left">
//     //     </div>
//     // </>
//     // )
// }

// export default GLogin






// // <div id="g_id_onload"
// //      data-client_id="1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"
// //      data-context="signin"
// //      data-ux_mode="popup"
// //      data-callback="function handleCallbackResponse(response) {         console.log("Encoded JWT ID token: " + response.credentials);         var userObject = jwt_decode(response.credential)         console.log(userObject);     }"
// //      data-auto_prompt="false">
// // </div>

// // <div class="g_id_signin"
// //      data-type="standard"
// //      data-shape="rectangular"
// //      data-theme="filled_blue"
// //      data-text="signin_with"
// //      data-size="small"
// //      data-logo_alignment="left">
// // </div>





// import { GoogleLogin } from 'react-google-login'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';


const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogin() {
       const [success, setSuccess] = useState(false);
       const [isSignedIn, setIsSignedIn] = useState(false);
       const [user, setUser] = useState({});


       const login = useGoogleLogin({
		onSuccess: async response => {
			try {
				const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
					headers: {
						"Authorization": `Bearer ${response.access_token}`
					}
				})
				console.log("Login Success!.");
				console.log(res.data)
                            console.log(response.credential);
                                var decoded = jwt_decode(response.credential);
                                console.log(decoded);
                                setSuccess(true);
                                setUser(decoded)
                                console.log("Login Success!")
			} catch (err) {
				console.log(err)

			}

		}
	});

       function handleSetSuccess(e){
              e.preventDefault();
              setSuccess(true)
       }


       const {OAuth2Client} = require('google-auth-library');
       const client = new OAuth2Client(clientId);
              async function verify(res) {
                const ticket = await client.verifyIdToken({
                     idToken: res.credential,
                     audience: clientId,
              });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
              // If request specified a G Suite domain:
              // const domain = payload['hd'];
              }
       verify().catch(console.error);
       console.log(client);


       const onSuccess = (res) => {
              console.log("LOGIN SUCCESS! Current user: ", jwt_decode(res.credential).name);
              // <button onClick={handleSetSuccess}/>
              setUser(jwt_decode(res.credential).name)
              // {handleSetSuccess()}

              // axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
		// 			headers: {
		// 				"Authorization": `Bearer ${res.access_token}`
		// 			}
		// 		})
				console.log("Login Success!!!!!!.");
				// console.log(res.data)
                            console.log(res.credential);
                                var decoded = jwt_decode(res.credential);
                                console.log(decoded);
                                setSuccess(true);
                                setUser(decoded)
                                console.log("Login Success!")
       }

       const onFailure = (res) => {
              console.log("LOGIN FAILED! Current user: ", res);
       }

       return (
              // <div id="signInButton">
              // <>
              //        <Link 
              //               to="/profile"
              //               />
                     <GoogleLogin

                            clientId={clientId}
                            buttonText="Login"
                            onSuccess={onSuccess}
                            // onSuccess={login}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            // onSuccess={credentialResponse => {
                            //     console.log(credentialResponse.credential);
                            //     var decoded = jwt_decode(credentialResponse.credential);
                            //     console.log(decoded);
                            //     setSuccess(true);
                            //     setUser(decoded)
                            //     console.log("Login Success!")
                            //  }}
                            onFailure={onFailure}
                            // setSuccess={setSuccess}
                            // setUser={setUser}
                            // onClick={()=>handleSetSuccess}
                            // setSuccess={handleSetSuccess}
                            // {handleSetSuccess()}

                     />
              // </>
       )
}

// function SetSuccess({ onClick }) {
//        return(
//               <div>
//                      <SetSuccess onClick={() =>}
//               </div>
//        )
// }

export default GLogin


