import {FC, PropsWithChildren, useEffect, useState} from 'react';
import AuthService from "./AuthService";
import {AuthContext, IAuth} from "../../context/AuthContext";
import Loader from "../../components/loader/loader";

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const [auth, setAuth] = useState<IAuth | undefined>(undefined);

    useEffect(() => {
        const auth = AuthService.getAuth();
        setIsAuthAndAuth(auth);
    }, []);

    function setIsAuthAndAuth(auth: IAuth | undefined) {
        const value = !!(auth && auth.token);
        setIsAuth(value);

        if(value)
            setAuth(auth);
    }

    return (
        <AuthContext.Provider value={{isAuth: isAuth ?? false, auth, setAuth: setIsAuthAndAuth}}>
            {isAuth === undefined
                ? <Loader/>
                : <div>{children}</div>
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;