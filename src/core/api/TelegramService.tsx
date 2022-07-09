import {http} from "../http-common";
import {IAuth} from "../../context/AuthContext";
import {TelegramUser} from "../../components/TelegramLoginButton";

export default class TelegramService {
    static async login(user: TelegramUser) : Promise<IAuth | undefined> {
        const response = await http.post('/telegram/token', user);

        return response.data;
    }
}