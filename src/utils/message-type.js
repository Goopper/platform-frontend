export default class MessageType {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    static CORRECT = new MessageType(1, '作业批改', '#c468c9');
    static CORRECT_RESULT = new MessageType(2, '批改结果', '#06ae5c');
    static NOTIFY = new MessageType(3, '通知', '#2196f3');
    static SYSTEM = new MessageType(3, '系统消息', '#e05d8d');

    static getTypeById(typeId) {
        const typeNames = Object.getOwnPropertyNames(this);
        for (let i = 0; i < typeNames.length; i++) {
            const typeName = typeNames[i];
            const typeDescriptor = Object.getOwnPropertyDescriptor(this, typeName);
            if (typeDescriptor.value && typeDescriptor.value.id === typeId) {
                return typeDescriptor.value;
            }
        }
        return undefined;
    }
}