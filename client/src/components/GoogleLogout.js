import { GoogleLogout } from 'react-google-login'

const clientId="1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com"

function GLogout() {

	const onSuccess = () => {
		console.log("Log Out successful!");
	}

	return (
		<div>
			<GoogleLogout
				clientId={clientId}
				buttonText={"Logout"}
				onLogoutSuccess={onSuccess}
			/>
		</div>
	)
}

export default GLogout