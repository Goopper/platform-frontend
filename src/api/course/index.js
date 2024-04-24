import { name } from 'eslint-plugin-vue/lib/meta';
import { request } from '..';

//获取课程列表
export function getCourseList() {
  return request({
    url: '/course',
    method: 'get',
    params: {
      statusId: 2,
      name:''
    }
  });
}

// 获取小组列表
export function getGroupList() {
    return request({
    url: '/group',
    method: 'get'
  });
}
//获取学生列表
export function getStudentList(courseId = null, groupId = null, orderId = null) {
  return request({
    url: `/student/${courseId}/${groupId}/${orderId}`,
    method: 'get'
  });
}
//获取当前老师课程列表
export function getTeacherCourseList(statusId,name) {
  return request({
    url: '/course',
    method: 'get',
    params: {
      statusId,
      name
    }
  });
}

//获取课程详细信息(传入课程id)
export function getCourseInfo(courseId) {
  return request({
    url: `/course/${courseId}`,
    method: 'get',
    props: true
  });
}

//删除课程
export function deleteCourse(courseId) {
  return request({
    url: `/course/${courseId}`,
    method: 'delete'
  });
}