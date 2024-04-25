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

export function getAllLearningCourse(typeId, name) {
    let url = `/student/course/current/all?name=${name}`;
    if (typeId) {
        url += `&typeId=${typeId}`;
    }
    return request({
        url: url,
        method: 'get'
    });
}

export function getAllSelectableCourses(typeId, name) {
    let url = `/student/course?name=${name}`;
    if (typeId) {
        url += `&typeId=${typeId}`;
    }
    return request({
        url: url,
        method: 'get'
    });
}