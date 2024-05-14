import { request } from '..';

export function getCourseTeachCount() {
    return request({
        url: '/statistic/baize/course/teach/count',
        method: 'get'
    });
}