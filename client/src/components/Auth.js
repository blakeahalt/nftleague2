import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    // const [cookies, setCookies, removeCookie] = useCookies();

    const login = async ({ user, pwd }) => {
        const res = await axios.post('/auth', {
            user: user,
            pwd: pwd,
        });

        Cookies.set('token', res.data.token); // your token
        // setCookies('name', res.data.name); // optional data

        navigate('/profile');
    };

    const logout = () => {
        ['token'].forEach((obj) => Cookies.remove(obj)); // remove data save in cookies
        navigate('/');
    };

    const value = useMemo(
        () => ({
            Cookies,
            login,
            logout,
        }),
        [Cookies]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};
