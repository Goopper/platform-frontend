import { request } from '..';

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
export function submitTaskAnswer(taskId,content,attachments) {
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