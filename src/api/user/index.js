import { request } from '..';

export function getMyBasicInfo() {
    return request({
        url: '/user',
        method: 'get'
    });
}

export function getAllUserBindsInfo() {
    return request({
        url: '/user/binds',
        method: 'get'
    });
}

export function uploadAvatarFile(file) {
    var formData = new FormData();
    formData.append('avatar', file);
    return request({
        url: '/user/avatar',
        data: formData,
        method: 'post'
    });
}

export function updateAvatar(url) {
    var formData = new FormData();
    formData.append('url', url);
    return request({
        url: '/user/avatar',
        data: formData,
        method: 'put'
    });
}

export function updateEmail(old, email) {
    var formData = new FormData();
    formData.append('old', old);
    formData.append('new', email);

    return request({
        url: '/user/email',
        data: formData,
        method: 'put'
    });
}

export function getAllDevices() {
    return request({
        url: '/user/device',
        method: 'get'
    });
}

export function updateMyPassword(oldPassword, newPassword) {
    var formData = new FormData();
    formData.append('old', oldPassword);
    formData.append('new', newPassword);

    return request({
        url: '/user/password',
        data: formData,
        method: 'put'
    });
}