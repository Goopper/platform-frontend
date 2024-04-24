import { request } from '..';

export function login(number, password) {
    const payload = new FormData();
    payload.append('number', number);
    payload.append('password', password);
    return request({
        method: 'post',
        url: '/login',
        data: payload
    });
}

export function logout() {
    return request({
        method: 'get',
        url: '/logout'
    });
}

export function logoutDevice(deviceId) {
    const payload = new FormData();
    payload.append('tokenId', deviceId);

    return request({
        method: 'delete',
        url: '/logout',
        data: payload
    });
}