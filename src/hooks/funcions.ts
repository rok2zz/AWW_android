// 변수명 변경
export const renameKeys = (obj: any, keyMap: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(item => renameKeys(item, keyMap));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const newKey = keyMap[key] || key;
        acc[newKey] = renameKeys(value, keyMap);
        return acc;
      }, {} as any);
    }
    return obj;
};