import { request } from '..';

export function getMyBasicInfo() {
    return request({
        url: '/user',
        method: 'get'
    });
}