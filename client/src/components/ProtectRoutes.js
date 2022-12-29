import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate, redirect } from 'react-router-dom';
import AuthContext from './AuthProvider';

function ProtectRoutes() {
    useEffect(() => {
        protect();
    }, []);

    const [err, setErr] = useState('');
    // const [auth, setAuth] = useState(true);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (Cookies.get('refresh', null)) {
    //         setTimeout(function () {
    //             // window.location.href = 'http://localhost:3001/login';
    //             navigate('/login');
    //         }, 2000);
    //         alert('Please Sign In For Access');
    //     }
    // });

    let accessToken = Cookies.get('access');
    let refreshToken = Cookies.get('refresh');
    // console.log('refreshToken', refreshToken);

    const protect = async () => {
        accessToken = await hasAccess(accessToken, refreshToken);

        if (!accessToken) {
            console.log('2 (protect): No Access Token - Please Sign in again.');
            // setAuthStatus(false);
        } else {
            await requestLogin(accessToken, refreshToken);
            // console.log('1 protect(accessToken):', accessToken);
        }
    };

    const refresh = (refreshToken) => {
        console.log('Refreshing token!');

        return new Promise((resolve, reject) => {
            // axios
            //     .post('http://localhost:3001/refresh', { token: refreshToken })
            //     .then((data) => {
            axios.post('/refresh', { token: refreshToken }).then((data) => {
                if (data.data.success === false) {
                    // setAuthStatus(false);
                    setErr('Login again');
                    console.log('2 (refresh): Please Log In Again');
                    resolve(false);
                } else {
                    const { accessToken } = data.data;
                    Cookies.set('access', accessToken);
                    resolve(accessToken);
                    console.log('1 (refresh): refresh token authenticated');
                }
            });
        });
    };

    const hasAccess = async (accessToken, refreshToken) => {
        // console.log('1 (hasAccess) - refreshToken Check:', refreshToken);
        // console.log('2 (hasAccess) - accessToken Check:', accessToken);
        if (!refreshToken) {
            console.log('3 (hasAccess): No refreshToken. Please Log In Again.');
        }

        if (accessToken === undefined) {
            console.log('4 (hasAccess): Generating New Token');
            accessToken = await refresh(refreshToken);
            return accessToken;
        }
        // console.log('1.1 (hasAccess) - refreshToken Check:', refreshToken);
        // console.log('2.2 (hasAccess) - accessToken Check:', accessToken);
        return accessToken;
    };

    const requestLogin = async (accessToken, refreshToken) => {
        return new Promise((resolve, reject) => {
            // axios
            //     .post(
            //         'http://localhost:3001/protected',
            //         {},
            //         { headers: { Authorization: `Bearer ${accessToken}` } }
            //     )
            axios
                .post(
                    '/protected',
                    {},
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                )
                .then(async (data) => {
                    if (data.data.success === false) {
                        if (
                            data.data.message ===
                            '(auth): User not authenticated'
                        ) {
                            // setAuthStatus(false);
                            <Navigate to="/login" />;
                            console.log(
                                '2 (requestLogin): Please Log In Again'
                            );
                        } else if (
                            data.data.message === 'Access token expired'
                        ) {
                            // setAuthStatus(true);
                            console.log(
                                '(3 requestLogin): AccessToken Expired - Generating New Tokens'
                            );
                            const accessToken = await refresh(refreshToken);
                            // return await requestLogin(
                            //     accessToken,
                            //     refreshToken
                            // );
                        }
                        resolve(false);
                    } else {
                        // setAuthStatus(true);
                        console.log('1 (requestLogin): tokens authenticated');
                        console.log(data.data.message);
                        resolve(true);
                    }
                });
        });
    };
}

export default ProtectRoutes;
