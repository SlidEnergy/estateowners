import TokenService from "../api/TokenService";
import {IAuth} from "../../context/AuthContext";

export default class AuthService {
    static async login(email: string, password: string) : Promise<IAuth | undefined> {
        const auth = await TokenService.get(email, password);

        if (!auth)
            return undefined;

        localStorage.setItem('auth', JSON.stringify(auth));

        return auth;
    }

    static logout() {
        localStorage.removeItem('auth');
    }

    static getAuth() : IAuth | undefined {
        const item = localStorage.getItem('auth')

        try {
            const auth = item && JSON.parse(item);
            if (auth && auth.token)
                return auth;
            else
                return undefined;
        } catch {
            return undefined;
        }
    }
}