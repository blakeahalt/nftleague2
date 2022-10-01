import React from "react";
import LogoutButton from "./GoogleLogout";
// import "../stylesheet/Profile.css";

function Profile(props) {
	return (
		<div className="profile-card">
		<img src={props.user.imageUrl} alt="" />
		<h1>{props.user.name}</h1>
		<span>{props.user.email}</span>
		<p>Id: {props.user.googleId}</p>
		<LogoutButton setUser={props.setUser} />
		</div>
	);
	}

export default Profile;