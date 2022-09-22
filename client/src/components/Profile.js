import { React, useEffect, useState } from 'react'
import '../App.css'
// import { Link } from 'react-router-dom';
import axios from 'axios'
import LogoutButton from "./GoogleLogout"


const Profile = () => {

       const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("http://localhost:3001/working" || "/working")  //"http://localhost:3001/register"
		// axios.get("/working")  //"http://localhost:3001/register"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])


       return (
              <>
              You've registered!...Profile page coming soon

              <p>axios.get('/profile') status: <i>{notification}</i></p>
              <br/>
              <br/>
              <br/>
              <br/>
              <LogoutButton />
              </>
       )
}

export default Profile