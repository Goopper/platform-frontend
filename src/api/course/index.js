import { request } from '..';

//获取课程列表
export function getCourseList() {
  return request({
    url: '/course',
    method: 'get'
  });
}

// 获取小组列表
export function getGroupList() {
    return request({
    url: '/group',
    method: 'get'
  });
}
export function getStuentList(courseId = null, groupId = null, orderId = 1) {
  return request({
    url: `/student/${courseId}/${groupId}/${orderId}`,
    method: 'get'
  });
}