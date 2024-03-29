import AuthService from "../auth/AuthService";
import {http} from "../http-common";
import {Estate, EstateBindingModel} from "./EstateOwnersApi";

export class EstatesService {
    static async getList() {
        const auth = AuthService.getAuth();

        if(!auth)
            return;

        const response = await http.get('/estates/all', {headers: { 'Authorization': 'Bearer ' + auth.token}});
        return response.data;
    }

    static async getListWithAccessCheck(userId: string | undefined = undefined) {
        const auth = AuthService.getAuth();

        if(!auth)
            return;

        const response = await http.get('/estates' + (userId ? '?userId=' + userId : ''), {headers: { 'Authorization': 'Bearer ' + auth.token}});
        return response.data;
    }

    static async getById(id: number) : Promise<Estate | undefined> {
        const auth = AuthService.getAuth();

        if(!auth)
            return;

        const response = await http.get('/estates/' + id, {headers: { 'Authorization': 'Bearer ' + auth.token}});
        return response.data;
    }

    static async add(estate: EstateBindingModel, userId: string | undefined = undefined): Promise<Estate | undefined> {
        const auth = AuthService.getAuth();

        if(!auth)
            return;

        const response = await http.put('/estates' + (userId ? '?userId=' + userId : ''), estate,{headers: { 'Authorization': 'Bearer ' + auth.token}});
        return response.data;
    }
}