export default class OAuthProvider {
    constructor(id, name, icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    static GITHUB = new OAuthProvider(1, 'GitHub', 'mdi-github');

    static getOAuthProviderById(id) {
        const names = Object.getOwnPropertyNames(this);
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const desc = Object.getOwnPropertyDescriptor(this, name);
            if (desc.value && desc.value.id === id) {
                return desc.value;
            }
        }
        return undefined;
    }
}
