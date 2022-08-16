import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Api = () => {
	const [data, setData] = useState("");

	useEffect((req, res) => {
		axios.get("http://localhost:3001/api")
		.then(res => {
			console.log(res);
			setData(res.data.message)
		})
	}, []);

return(
	<div className="api">
		<h3>From Api.js</h3>
		<ul>
		{data}
		</ul>
		<Link to="/register">
			<button className="primary-button" id="reg_btn"><span>Back to Registration</span></button>
		</Link>
		<Link to="/">
			<button className="primary-button" id="reg_btn"><span>Back to Login</span></button>
		</Link>
	</div>
)
}

export default Api