import { React } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

// import axios from 'axios'

const Notification = () => {
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
		</div >
	)
}
// };

export default Notification