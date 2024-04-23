import { request } from '..';

export function getCurrentCourse() {
    return request({
        url: '/student/course/current',
        method: 'get'
    });
}

export function getAllLearnedYears() {
    return request({
        url: '/student/statistic',
        method: 'get'
    });
}

export function getLearnedPerformanceByYear(year) {
    return request({
        url: `/student/statistic/${year}`,
        method: 'get'
    });
}