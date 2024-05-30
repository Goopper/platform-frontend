import { request } from '..';
import mitt from '@/plugins/mitt';
export function getAnswerByMessageId(messageId) {
    return request({
        url: '/answer/' + messageId,
        method: 'get'
    });
}

export function submitCorrect(answerId, comment, score) {
    var data = JSON.stringify({
        'id': answerId,
        'comment': comment,
        'score': score
    });

    return request({
        url: '/answer/correct',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: data 
    });
}

//提交任务答案
export function submitTaskAnswer(taskId, content, attachments) {
  
  console.log(attachments);
  return request({
    url: '/answer/submit',
    method: 'post',
    data: {
      taskId,
      content,
      attachments
    }
  });
}

//查询所有学生提交的作业
export function getAnswer({corrected, groupId, courseId, sectionName, taskName, studentName, page}) {
  if (!page) {
    page = 1; 
  }
  if (corrected == null) {
    corrected = '';
  }
  if (groupId == null) {
    groupId = '';
  }
  if (courseId == null) {
    courseId = '';
  }
  if (sectionName == null) {
    sectionName = '';
  }
  if (taskName == null) {
    taskName = '';
  }
  if (studentName == null) {
    studentName = '';
  }
  return request({
    url: '/answer',
    method: 'get',
    params: {
      corrected,
      groupId,
      courseId,
      sectionName,
      taskName,
      studentName,
      page
    }
  });
}
//根据多个id查询任务名称
export function getTaskNameByIds(ids) {
  let answerIds = ids.map(id => `answerIds=${id}`).join('&');
  return request({
    url: `/answer/batch?${answerIds}`,
    method: 'get',
  });
}
//单独批改任务
export async function TaskIndividualCorrection(answerId, comment, score) {
  const res = await request({
    url: '/answer/correct',
    method: 'post',
    data: {
      id: answerId,
      comment,
      score
    }
  });
  if (res.code == '200') {
    mitt.emit('showToast', { title: '批改完成', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '批改失败', color: 'error', icon: '$error' });
  }
}
//批量批改任务
export async function TaskBatchCorrection(answerIds,comment,score) {
  const res = await request({
    url: '/answer/correct/batch',
    method: 'post',
    data: {
      ids: answerIds,
      comment,
      score
    }
  });
  if (res.code == '200') {
    mitt.emit('showToast', { title: '批改完成', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '批改失败', color: 'error', icon: '$error' });
  }
}
//获取作业详细
export function getAnswerByCorrectId(correctId) {
    return request({
        url: '/answer/' + correctId,
        method: 'get'
    });
}
//获取已批改作业信息
export function CorrectedAnswer(correctId) {
  return request({
    url: `/answer/corrected/${correctId}`,
    method: 'get'
  });
}