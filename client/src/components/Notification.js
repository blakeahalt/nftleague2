import { React, useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

// import axios from 'axios'

const Notification = () => {
	const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("http://localhost:3001/notification")  //"http://localhost:3001/register"
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
			})
	}, [])
	return (
		// < div className = {`message ${type}`}>{ message }</div >
		<div className="notification">Holup
			<h3>Under Construction</h3>
			<Link to="/register">
				<button className="primary-button" id="reg_btn"><span>Back to Registration</span></button>
			</Link>
			<Link to="/">
				<button className="primary-button" id="reg_btn"><span>Back to Login</span></button>
			</Link>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<p>axios.get('/notification') status: {notification}</p>

		</div >
	)
}
// };

export default Notification