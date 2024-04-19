import axios from 'axios';
import mitt from '@/plugins/mitt';
import { getLoginState } from '@/utils/auth';

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://100.116.150.108:8888',
        timeout: 30000,
        headers: {
            'G-Authorization': getLoginState(),
        }
    });
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
        if (err.response) {
            const data = err.response.data;
            // error code 400: invalid request
            if (data.code === 400) {
                mitt.emit('showToast', { title: data.message, color: 'error', icon: '$error', duration: 2000 });
            }
            // error code 403: unauthorized, redirect to login page
            if (data.code === 403) {
                mitt.emit('showToast', { title: '未登陆或登陆过期，请重新登陆', color: 'error', icon: '$error', duration: 2000 });
                window.location.href = '/login';
            }   
        } else {
            // axios error (timeout maybe)
            mitt.emit('showToast', { title: err.message, color: 'error', icon: '$error', duration: 2000 });
        }
    });
    return instance(config);
}  