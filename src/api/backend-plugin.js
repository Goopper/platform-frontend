import axios from 'axios';

function buildRequestBody(body) {
    if (body.type === 'none') {
        return null;
    }
    if (body.type === 'json') {
        return body.json;
    }
    if (body.type === 'form-data') {
        const formData = new FormData();
        body.formData.forEach(item => {
            if (item.type === 'text') {
                formData.append(item.key, item.value);
            } else {
                item.files.forEach(file => {
                    console.log(file);
                    formData.append(item.key, file);
                });
            }
        });
        return formData;
    }
}

export function backendPluginRequest(request) {
    console.log(request);

    const headers = request.headers.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
    }, {});
    const params = request.params.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
    }, {});
    const data = buildRequestBody(request.body);
    console.log(data);
    const config = {
        url: request.url,
        method: request.method,
        headers: headers,
        timeout: 30000,
        params: params,
        data: data
    };
    return axios(config);
}