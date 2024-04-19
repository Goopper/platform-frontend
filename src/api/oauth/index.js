import { request } from '..';

export function getGitHubOAuthUrl() {
    return request({
        method: 'get',
        url: '/oauth/github/url?redirectUrl=http://localhost:3000/oauth/callback/github',
    });
}

export function getGitHubOAuthAccount(code) {
    return request({
        method: 'get',
        url: `/oauth/github/auth?code=${code}`,
    });
}

export function oAuthLogin(provider, id) {
    var payload = new FormData();
    payload.append('oauthId', id);

    return request({
        method: 'post',
        url: `/oauth/login/${provider}`,
        data: payload,
    });
}