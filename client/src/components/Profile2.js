import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
  const { user, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const AuthLogoutButton = () => {
    const { logout } = useAuth0();
  
    return (
        // <button onClick={() => logout()}>
        //   Sign Out
        // </button>
        <button onClick={() => logout({ returnTo: "http://localhost:3000/googleapp" })}>
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
      </div>
    )
};

export default Profile;