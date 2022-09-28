import { React, useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

const Profile = () => {
  const { user, isLoading } = useAuth0();
  const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		// axios.get("http://localhost:3001/working")  	// dev
		axios.get("/working")				//heroku
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const AuthLogoutButton = () => {
    const { logout } = useAuth0();
  
    return (
        // <button onClick={() => logout()}>
        //   Sign Out
        // </button>
        <button onClick={() => logout({ returnTo: "http://localhost:3000/googleapp"})}>
          Sign Out
        </button>
      )
  };

  return (
    <div>
      <article className='column'>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
          <ul>
            {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]} </li>)}
          </ul>
        {/* {JSON.stringify(user)} */}
      </article>
      <div>
        <AuthLogoutButton/>
      </div>

      {/* // <div>
      //   <img src={user.picture} alt={user.name} />
      //   <h2>{user.name}</h2>
      //   <p>{user.email}</p>
      // </div> */}
      <p>axios.get('/profile') status: <i>{notification}</i></p>
      </div>
    )
};

export default Profile;