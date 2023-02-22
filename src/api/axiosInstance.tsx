import axios, { AxiosHeaders } from "axios";
import jwtDecode from "jwt-decode";

import { Cookies } from "react-cookie";
import { API_URLS, host } from "./api_constants";

const cookies = new Cookies();
let accessToken: string | null = localStorage.getItem('jwt'); // не обновляется

const axiosInstance = axios.create({
    baseURL: host,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
});

axiosInstance.interceptors.request.use(async req => {
    if (req.url === 'account/login')
        return req; //TODO прибраться здесь

    console.log('access token', accessToken);
    if (!accessToken) {
        accessToken = localStorage.getItem('jwt');
        req.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const decodedJwt: { exp: number } = jwtDecode(accessToken);
    const isExpired: boolean = decodedJwt.exp * 1000 < Date.now();
    if (!isExpired) return req;

    console.log('old refreshToken', cookies.get('refreshToken'));

    const response = await axios.post(host + API_URLS.REFRESH, {
        refreshToken: cookies.get('refreshToken')
    }).then(tokens => {
        console.log('token', tokens);
        localStorage.removeItem('jwt');
        localStorage.setItem('jwt', tokens.data.token);
        cookies.set('refreshToken', tokens.data.refreshToken);
        console.log('new refreshToken', tokens.data.refreshToken);
        accessToken = tokens.data.token;
    });

    req.headers['Authorization'] = `Bearer ${accessToken}`; //переустанавливаем

    return req;
})

export default axiosInstance;