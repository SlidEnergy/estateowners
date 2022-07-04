import {createContext} from "react";

export interface IAuth {
    token: string
}

export interface IAuthContext {
    isAuth: boolean,
    auth?: IAuth,
    setAuth: (auth: IAuth | undefined) => void
}

export const AuthContext = createContext<IAuthContext>( {isAuth: false, auth: undefined, setAuth: (auth) => undefined });