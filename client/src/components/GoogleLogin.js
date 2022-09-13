import { GoogleLogin } from 'react-google-login'
import { Link } from 'react-router-dom';


const clientId = "1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogin() {

	const onSuccess = (res) => {
		console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
		<Link to="/profile"></Link>

	}

	const onFailure = (res) => {
		console.log("LOGIN FAILED! Current user: ", res);
	}

	return (
		<div id="signInButton">
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
			/>
		</div>
	)
}

export default GLogin