import { request } from '..';

export function getCourseCreationInfo(id) {
    return request({
        url: `/course/creation/${id}`,
        method: 'get'
    });
}