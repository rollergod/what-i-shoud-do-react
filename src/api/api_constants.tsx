
export const host: string = "http://localhost:5058/api/";

export const enum API_URLS {
    REGISTER = `account/register`,
    LOGIN = `account/login`,
    PRIVATE_METHOD = 'private/getOkMessage',
    REFRESH = 'account/refreshToken',
    GET_ME = 'private/getMe'
};