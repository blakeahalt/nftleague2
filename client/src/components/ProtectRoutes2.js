import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './Auth';
import Cookies from 'js-cookie';

const ProtectRoutes = () => {
    // const { Cookies } = useAuth();
    let CookieAccess = Cookies.get('refresh');
    // console.log('Cookies access', Cookies.get('access'));

    return CookieAccess !== 'null' ? (
        <Outlet />
    ) : (
        <Navigate
            to="/"
            exact
        />
    );
};

export default ProtectRoutes;
