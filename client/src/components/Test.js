import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Test = () => {
  const [notification, setNotification] = useState("")
  const [data, setData] = useState("")

    useEffect((req, res) => {
      axios.get("/test")   //"http://localhost:3001/test"
      .then(res => {
        console.log(res)
        setNotification(res.data.message)
        // setData(res.data)
      })
    }, [])


return(
	<div className="test">
		<h3>h3 from Test.js</h3>
      <ul>
      axios.get('/test') status: {notification}
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

    //    axios.post('http://work.local:3001/test', {
    //    name: 'Joe',
    //    email: 'joe@msn.com'
    //  })
    //      .then((response) => {
    //        console.log(response);
    //      })
    //      .catch((error) => {
    //        console.log(error);
    //      });
}


export default Test