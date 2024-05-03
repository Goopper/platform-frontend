import { request } from '..';

export function uploadAttachment(file) { 
    var formData = new FormData();
    formData.append('upload', file);
    return request({
        url: '/attachment/upload',
        data: formData,
        method: 'post'
    });    
}

export function deleteAttachment(filename) {
    return request({
        url: '/attachment/delete?filename=' + filename,
        method: 'delete'
    });
}