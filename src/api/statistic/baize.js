import { request } from '..';

export function getCourseTeachCount() {
    return request({
        url: '/statistic/baize/course/teach/count',
        method: 'get'
    });
}
export function getUserLearningTime() {
  return request({
    url: '/statistic/baize/container/open/duration/top',
    method: 'get'
  });
}
//不同日期下，不同小组（班级）的容器开启数量
export function getCourseUse() {
  return request({
    url: '/statistic/baize/group/container/open/count',
    method:'get'
  });
}
export function getGroupLearning() {
  return request({
    url: '/statistic/baize/group/course/study/time',
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