export default class DeviceOS {
    constructor(id, name, icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    static WINDOWS = new DeviceOS(1, 'Windows', 'mdi-microsoft-windows');
    static MACOS = new DeviceOS(2, 'macOS', 'mdi-apple-finder');
    static LINUX = new DeviceOS(3, 'Linux', 'mdi-linux');
    static ANDROID = new DeviceOS(4, 'Android', 'mdi-android');
    static IOS = new DeviceOS(5, 'iOS', 'mdi-apple-ios');
    static UNKNOWN = new DeviceOS(6, 'Unknown', 'mdi-help');

    static getDeviceOSByName(target) {
        const names = Object.getOwnPropertyNames(this);
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const desc = Object.getOwnPropertyDescriptor(this, name);
            if (desc.value && target.includes(desc.value.name)) {
                return desc.value;
            }
        }
        return this.UNKNOWN;
    }
}
