import { request } from '..';

export function getCourseTeachCount() {
    return request({
        url: '/statistic/baize/course/teach/count',
        method: 'get'
    });
}

export function getRecentContainer() {
    return request({
        url: '/statistic/baize/container/open/recent',
        method: 'get'
    });
}

export function getStudentCourseFinishedStatus() {
    return request({
        url: '/statistic/baize/student/course/finished/status',
        method: 'get'
    });
}