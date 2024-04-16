import { request } from "..";

export function login(number, password) {
    var payload = new FormData();
    payload.append('number', number);
    payload.append('password', password);
    return request({
        method: 'post',
        url: '/login',
        data: payload
    });
}