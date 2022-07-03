import axios from "axios";
const { REACT_APP_BASE_API_URL } = process.env;

export const http = axios.create({
    baseURL: `${REACT_APP_BASE_API_URL}/api/v1`,
    headers : {
        'content-type': 'application/json'
    }
})