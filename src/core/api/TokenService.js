import {http} from "../http-common";

export default class TokenService {
    static async get(email, password) {
        const response = await http.post('/token', {email, password});

        return response.data;
    }
}