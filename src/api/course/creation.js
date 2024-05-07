import { request } from '..';

export function getCourseCreationInfo(id) {
    return request({
        url: `/course/creation/${id}`,
        method: 'get'
    });
}

export function getSectionCreationInfo(id) {
    return request({
        url: `/section/creation/${id}`,
        method: 'get'
    });
}

export function getTaskCreationInfo(id) {
    return request({
        url: `/task/creation/${id}`,
        method: 'get'
    });
}

export function getTaskSubmitTypes() {
    return request({
        url: '/task/submit/type',
        method: 'get'
    });
}