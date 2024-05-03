import { request } from '..';

export function getTeacherList() {
    return request({
        url: '/teacher',
        method: 'get'
    });
}