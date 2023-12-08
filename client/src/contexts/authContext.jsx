/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import usePersistedState from "../hooks/usePersistedState";
import Path from '../paths';

const AuthContext = createContext();

export function AuthProvider({
    children,
}) {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const loginSubmitHandler = async (values) => {


        const result = await authService.login(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('username', result.username);
        localStorage.setItem('user_img', result.img);
        localStorage.setItem('user_type', result.type);
        localStorage.setItem('user_id', result._id);

        navigate(Path.Home);
    };

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('username', result.username);
        localStorage.setItem('user_img', result.img);
        localStorage.setItem('user_type', result.type);
        localStorage.setItem('user_id', result._id);

        navigate(Path.Home);
    };

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('user_img');
        localStorage.removeItem('user_type');
        localStorage.removeItem('user_id');
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContext.displayName = 'AuthContext';

export default AuthContext;
