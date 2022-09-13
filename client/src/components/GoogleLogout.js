import { GoogleLogout } from 'react-google-login'
import { Link } from 'react-router-dom';


const clientId="1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogout() {

	const onSuccess = () => {
		console.log("Log Out successful!");
	}

	return (
		<div>
			<Link to="/register">
			<GoogleLogout
				clientId={clientId}
				buttonText={"Logout"}
				onLogoutSuccess={onSuccess}
				/>
			</Link>
		</div>
	)
}

export default GLogout