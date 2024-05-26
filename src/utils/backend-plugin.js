const requestTemplate = {
  name: '未命名请求',
  method: 'GET',
  url: 'http://127.0.0.1:8888/health',
  params: [
    {
      key: '',
      value: ''
    }
  ],
  body: {
    type: 'none',
    json: '{}',
    formData: [
      {
        type: 'text',
        key: '',
        value: '',
        files: []
      }
    ]
  },
  headers: [
    {
      key: '',
      value: ''
    }
  ],
  response: undefined
};

const paramTemplate = {
  key: '',
  value: ''
};

const formDataTemplate = {
  type: 'text',
  key: '',
  value: ''
};

const headerTemplate = {
  key: '',
  value: ''
};

export function getACopy(template) {
  let target = JSON.parse(JSON.stringify(template));
  return target;
}

export function newRequestTemplate() {
  return getACopy(requestTemplate);
}

export function newParamTemplate() {
  return getACopy(paramTemplate);
}

export function newFormDataTemplate() {
  return getACopy(formDataTemplate);
}

export function newHeaderTemplate() {
  return getACopy(headerTemplate);
}