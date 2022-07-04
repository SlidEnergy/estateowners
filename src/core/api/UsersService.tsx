import AuthService from "../auth/AuthService";
import {http} from "../http-common";

export class UsersService {
    static async getList() {
        const auth = AuthService.getAuth();

        if(!auth)
            return;

        const response = await http.get('/users', {headers: { 'Authorization': 'Bearer ' + auth.token}});
        return response.data;
    }

    static async getById(id: string) {
        const auth = AuthService.getAuth();

        if(!auth)
            return;

        const response = await http.get('/users/' + id, {headers: { 'Authorization': 'Bearer ' + auth.token}});
        return response.data;
    }
}