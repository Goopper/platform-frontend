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

export function getOAuthURL(providerName) {
    return request({
        url: `/oauth/${providerName}/url?redirectUrl=http://localhost:3000/oauth/bind/github`,
        method: 'get'
    });
};

export function bindOAuth(providerName, oauthId, oauthName, isRebind = false) {
    var formData = new FormData();
    formData.append('oauthId', oauthId);
    formData.append('oauthName', oauthName);
    formData.append('isRebind', isRebind);

    return request({
        url: `/oauth/bind/${providerName}`,
        method: 'post',
        data: formData
    });
}

export function unbindOAuth(providerName) {
    return request({
        url: `/oauth/unbind/${providerName}`,
        method: 'post'
    });
}