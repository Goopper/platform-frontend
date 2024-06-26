import { request } from '..';

export function getMessageList(page = 1, title = null, typeId = null) {
    let url = `/message?page=${page}`;
    if (title) {
        url += `&title=${title}`;
    }
    if (typeId) {
        url += `&typeId=${typeId}`;
    }
    return request({
        url: url,
        method: 'get'
    });
}

export function receiveOneMessage(id) {
    return request({
        url: `/message/receive/${id}`,
        method: 'get'
    });
}

export function getMessageTypes() {
    return request({
        url: '/message/type',
        method: 'get'
    });
}