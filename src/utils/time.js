export function timestampToDateString(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
}