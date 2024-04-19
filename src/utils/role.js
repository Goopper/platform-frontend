export default class Role {
    constructor(id, name, home) {
        this.id = id;
        this.name = name;
        this.home = home;
    }

    static ROLE_ADMIN = new Role(1, 'admin', '/home/teacher');
    static ROLE_TEACHER = new Role(2, 'teacher', '/home/teacher');
    static ROLE_STUDENT = new Role(3, 'student', '/home/student');

    static getRoleById(roleId) {
        const roleNames = Object.getOwnPropertyNames(this);
        for (let i = 0; i < roleNames.length; i++) {
            const roleName = roleNames[i];
            const roleDescriptor = Object.getOwnPropertyDescriptor(this, roleName);
            if (roleDescriptor.value && roleDescriptor.value.id === roleId) {
                return roleDescriptor.value;
            }
        }
        return undefined;
    }
}
