import { Alert, Linking } from "react-native";

export const openAppSettings = () => {
    Alert.alert(
        "알림 권한 필요",
        "앱에서 알림을 받으려면 설정에서 권한을 허용해주세요.",
        [
            { text: "취소", style: "cancel" },
            { text: "설정으로 이동", onPress: () => Linking.openSettings() }
        ]
    );
};

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

export const getAirQuality = (airQuality: number) => {
    switch (airQuality) {
        case 1:
        return '좋음';
        case 2:
        return '보통';
        case 3:
        return '나쁨';
        case 4:
        return '매우 나쁨';
        default:
        return '보통'
    }
};

export const getAirQuarityColor = (airQuality: number) => {
    switch (airQuality) {
        case 1:
        return '#50a0ff'
        case 2:
            return '#51ff00';
        case 3:
            return '#ff9600';
        case 4:
            return '#ff4c4c';
        default:
            return '#ffffff'; // 기본 색상
    }
};