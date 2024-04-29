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

export function teacherGetStudentLearningPerformance(name, page, groupId, courseTypeId) {
    let url = `/statistic/performance/student?studentName=${name}&page=${page}`;
    if (groupId) {
        url += `&groupId=${groupId}`;
    }
    if (courseTypeId) {
        url += `&courseTypeId=${courseTypeId}`;
    }
    return request({
        url: url,
        method: 'get'
    });
}

export function manualSelectCourse(courseId) {
    return request({
        url: `/course/select/${courseId}`,
        method: 'post'
    });
}
//修改密码
export async function changePassword(data) {
  const res = await request({
    url: '/user/student/password',
    method: 'put',
    data: data
  });
  if (res.code == '200') {
    mitt.emit('showToast', { title: '修改成功', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '修改失败', color: 'error', icon: '$error' });
  }
}