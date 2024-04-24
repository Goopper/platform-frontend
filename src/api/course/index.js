import { data } from 'autoprefixer';
import { request } from '..';
import mitt from '@/plugins/mitt';

//获取课程列表
export function getCourseList() {
  return request({
    url: '/course',
    method: 'get',
    params: {
      statusId: 2,
      name: ''
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
export function getTeacherCourseList(statusId, name) {
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

// 应用到小组
export async function applyGroup(courseId, groupsId) {
  const err = await request({
    url: `/course/apply/${courseId}`,
    method: 'post',
    data: groupsId
  }).then((res) => {
    if (res.code == '200') {
      mitt.emit('showToast', { title: '应用成功', color: 'success', icon: '$success' });
    }
  });
}
//创建课程
export function createCourse(course) {
  return request({
    url: '/course',
    method: 'post',
    data: {
      course
    }
  });

}

//删除课程
export async function deleteCourse(courseId) {
  const err = await request({
    url: `/course/${courseId}`,
    method: 'delete'
  });
  if (err == '200') {
    mitt.emit('showToast', { title: '删除成功', color: 'success', icon: '$success' });
  } else {
  }
}