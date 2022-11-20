/* eslint-disable @typescript-eslint/no-unused-vars */
import { React, useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import axios from 'axios'

const Notification = () => {
    const [notification, setNotification] = useState('');

    useEffect((req, res) => {
        // axios.get("http://localhost:3001/working")  			// dev
        axios
            .get('/working') //heroku
            .then((res) => {
                console.log(res);
                setNotification(res.data.message);
            });
    }, []);
    return (
        // < div className = {`message ${type}`}>{ message }</div >
        <div className="notification">
            <h3>Notification Test</h3>
            <Link to="/register">
                <button
                    className="primary-button"
                    id="reg_btn"
                >
                    <span>Back to Registration</span>
                </button>
            </Link>
            <Link to="/login">
                <button
                    className="primary-button"
                    id="reg_btn"
                >
                    <span>Back to Login</span>
                </button>
            </Link>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>
                axios.get('/notification') status: <i>{notification}</i>
            </p>
        </div>
    );
};
// };

export default Notification;
