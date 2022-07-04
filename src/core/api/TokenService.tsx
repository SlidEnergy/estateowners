import {http} from "../http-common";
import {IAuth} from "../../context/AuthContext";

export default class TokenService {
    static async get(email: string, password: string) : Promise<IAuth | undefined> {
        const response = await http.post('/token', {email, password});

        return response.data;
    }
}