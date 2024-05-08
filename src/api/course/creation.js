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

export function createSection(section, courseId) {
    return request({
        url: `/section/${courseId}`,
        method: 'post',
        data: section
    });
}

export function updateSection(section) {
    return request({
        url: '/section',
        method: 'put',
        data: section
    });
}

export function deleteSection(sectionId) {
    return request({
        url: `/section/${sectionId}`,
        method: 'delete'
    });
}

export function createTask(task, sectionId) {
    return request({
        url: `/task/${sectionId}`,
        method: 'post',
        data: task
    });
}

export function updateTask(task) {
    return request({
        url: '/task',
        method: 'put',
        data: task
    });
}

export function publishCourse(courseId) {
    return request({
        url: `/course/publish/${courseId}`,
        method: 'post'
    });
}