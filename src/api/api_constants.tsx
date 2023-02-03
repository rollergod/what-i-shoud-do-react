
export const host: string = "http://localhost:5058/api/";

export const API_URLS: { REGISTER: string, LOGIN: string, PRIVATE_METHOD: string, REFRESH: string } = {
    REGISTER: `account/register`,
    LOGIN: `account/login`,
    PRIVATE_METHOD: 'private/getOkMessage',
    REFRESH: 'account/refreshToken'
};