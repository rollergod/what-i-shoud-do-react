import axios, { AxiosHeaders } from "axios";
import jwtDecode from "jwt-decode";

import { Cookies } from "react-cookie";
import { API_URLS, host } from "./api_constants";

const cookies = new Cookies();

const axiosInstance = axios.create({
    baseURL: host,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
});

axiosInstance.interceptors.request.use(async req => {
    let accessToken: string | null = localStorage.getItem('jwt');
    if (req.url === 'account/login' || req.url === 'account/register')
        return req;

    if (!accessToken) {
        accessToken = localStorage.getItem('jwt');
        req.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const decodedJwt: { exp: number } = jwtDecode(accessToken);
    const isExpired: boolean = decodedJwt.exp * 1000 < Date.now();
    if (!isExpired) return req;


    const response = await axios.post(host + API_URLS.REFRESH, {
        refreshToken: cookies.get('refreshToken')
    }).then(tokens => {
        localStorage.removeItem('jwt');
        localStorage.setItem('jwt', tokens.data.token);
        cookies.set('refreshToken', tokens.data.refreshToken);
        accessToken = tokens.data.token;
    });

    req.headers['Authorization'] = `Bearer ${accessToken}`; // переустанавливаем

    return req;
})

export default axiosInstance;