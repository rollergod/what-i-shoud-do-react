import axios, { AxiosHeaders } from "axios";
import jwtDecode from "jwt-decode";

import { Cookies } from "react-cookie";
import { API_URLS, host } from "./api_constants";

const cookies = new Cookies();
let accessToken: string | null = localStorage.getItem('jwt'); // не обновляется

const axiosInstance = axios.create({
    baseURL: host,
    headers: { 'Authorization': `Bearer ${accessToken}` }
});

axiosInstance.interceptors.request.use(async req => {
    console.log(accessToken);
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
        console.log('token', tokens);
        localStorage.removeItem('jwt');
        localStorage.setItem('jwt', tokens.data.token);
        cookies.set('refreshToken', tokens.data.refreshToken);

        accessToken = tokens.data.token;
    });

    req.headers['Authorization'] = `Bearer ${accessToken}`; //переустанавливаем

    return req;
})

export default axiosInstance;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YThlNjc3Mi1mM2QzLTRiMTQtOGZhMi02MTVkNDRhMWFiNjUiLCJpYXQiOjE2NzUyOTA1MjIsIm5hbWUiOiJSb2xsZXJnb2QiLCJlbWFpbCI6IlJvbGxlcmdvZEB5YW5kZXgucnUiLCJuYmYiOjE2NzUyOTA1MjIsImV4cCI6MTY3NTI5MDU4MiwiaXNzIjoiUmVhY3RBdXRoIiwiYXVkIjoiUG9zdG1hbiJ9.Nv19Lz8W2IIPcXKCcCM9IA66hKp9uFRfwoKWgFzUwUI
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZWI4NjJjMS1iMjI5LTQ0ODUtYjEwMS1jNzk4ODRkOGUzNjEiLCJpYXQiOjE2NzUyOTA2MzQsIm5hbWUiOiJSb2xsZXJnb2QiLCJlbWFpbCI6IlJvbGxlcmdvZEB5YW5kZXgucnUiLCJuYmYiOjE2NzUyOTA2MzQsImV4cCI6MTY3NTI5MDY5NCwiaXNzIjoiUmVhY3RBdXRoIiwiYXVkIjoiUG9zdG1hbiJ9.e-QvG3jZB5XvOix8mdnbG3aMAzF2O2HCKgV-ivh-4Co