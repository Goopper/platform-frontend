const color =[
        '#4CAF50',
        '#FFA07A',
        '#FB8C00',
        '#7FFF00',
        '#00FFFF',
        '#FF4500',
];
export function getHashCode(str) {
      let hash = 0;
      if (str.length == 0) {
        return hash;
      }
      for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
}
export function getColor(str) {
  let hash = getHashCode(str) % 6;
  return color[hash];
}
export default {getColor};