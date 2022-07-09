import React, {useState} from 'react';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';
import {useFetching} from "../hooks/useFetching";
import {IAuth} from "../context/AuthContext";
import AuthService from "../core/auth/AuthService";
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import Loader from "../components/loader/loader";

const Login = () => {
    const botName = "EstateOwnersBot";
    const [logInFetching, isLoading, error] = useFetching<Promise<IAuth | undefined>>(async (user) => {
        return await AuthService.loginByTelegram(user);
    });
    const {setAuth} = useAuth();

    const navigate = useNavigate();

    async function OnAuth(user: TelegramUser) {
        const result = await logInFetching(user);

        if (!result) {
            // show error
            console.log("Не удалось войти в систему");
            return;
        }

        setAuth(result);
        navigate('/home');
    }

    return (
        <div>
            <TelegramLoginButton botName="SlidTestBot" dataOnauth={OnAuth}></TelegramLoginButton>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader></Loader></div>
            }
            {error &&
                <div style={{marginTop: '20px'}}>
                    <h5>Произошла ошибка</h5>
                    <div>{error}</div>
                </div>
            }
        </div>
    );
};

export default Login;