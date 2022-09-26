import { React, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';


const AuthLogoutButton = () => {
  // e.preventDefault();

  const {logout} = useAuth0();
  // const [success, setSuccess] = useState(false);
    // return (
    //   <section>
		// 			<h1>Logout Success!</h1>
		// 			<p>
		// 				<Link to="/googleapp">Login</Link>
		// 			</p>
		// 			<p>
		// 				<Link to="/register">Register</Link>
		// 			</p>
		// 			{/* <p>axios.get('/AuthLogout') status: <i>{notification}</i></p> */}
    //   </section>
    // )
      // <button onClick={() => logout()}>
      //   Sign Out
      // </button>
    return (
        <>
          <Link to="/notification">
            <button onClick={() => logout({ returnTo: "http://localhost:3000/notification" })}>
                Sign Out
            </button>
          </Link>
        </>
        // , setSuccess(false)

      )
};

export default AuthLogoutButton;