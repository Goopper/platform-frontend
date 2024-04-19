import { LOCAL_STORAGE_TOKEN_KEY } from './key';

// login state: jwt token

export function isLoggedIn() {
    // return true if the user is logged in
    return !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}

export function setLoginState(token) {
    // save the token to localStorage
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
}

export function getLoginState() {
    // get the token from localStorage
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}

export function clearLoginState() {
    // clear the token from localStorage
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}