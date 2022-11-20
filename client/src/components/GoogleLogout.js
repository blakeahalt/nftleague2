/* eslint-disable @typescript-eslint/no-unused-vars */
import { React } from 'react';
import { GoogleLogout } from 'react-google-login';
import Cookies from 'js-cookie';

const clientId = process.env.clientId;

function Logout() {
    const logout = () => {
        console.log('successfully logged out!');
        Cookies.set('access', null);
        Cookies.set('refresh', null);
    };

    const onSuccess = () => {
        console.log('LOG OUT SUCCESS!');
    };

    const onFailure = () => {
        console.log('LOGIN FAILED! Current user: ');
    };

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logout}
                onFailure={onFailure}
            />
        </div>
    );
}

export default Logout;
