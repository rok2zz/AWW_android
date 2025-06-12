import { Alert, Linking } from "react-native";

//앱 설정 오픈
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

// 날씨 정보
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

export const getMoonPhase = (moonPhase: string): string => {
    switch (moonPhase) {
        case 'New':
            return '삭'
        case 'WaxingCrescent':
            return '초승달'
        case 'FirstQuarter':
            return '상현달'
        case 'WaxingGibbous':
            return '상현과 보름 사이'
        case 'Full':
            return '보름달'
        case 'WaningGibbous':
            return '보름과 하현 사이'
        case 'LastQuarter':
            return '하현달'
        case 'WaningCrescent':
            return '그믐달'
        default: 
            return moonPhase
    }
}

// metric => imperial   
export const convertTemperature = (temp: number, type: number): number => {
    if (type === 0) {
        return Math.round(temp); 
    }

    return Math.round((temp - 273.15) * 9/5 + 32); // 켈빈에서 화씨로 변환
}

export const convertWindSpeed = (speed: number, type: number): number => {
    if (type === 0) {
        return Math.round(speed);
    }

    return Math.round(speed * 2.23694); // m/s에서 mph로 변환
}

export const convertRain = (rain: number, type: number): number => {
    if (type === 0) {
        return Math.round(rain); 
    }

    return Math.round(rain * 0.0393701); // mm에서 inch로 변환
}

export const convertSeeing = (seeing: number, type: number): number => {
    if (type === 0) {
        return Math.round(seeing);
    }
    
    return Math.round(seeing * 0.0328084); // m에서 ft로 변환
}

// 시간 표시 type 0: 12시간제, type 1: 24시간제
export const formatHour = (time: Date, type: number): string => {
    const hours = time.getHours();
    const minutes = time.getMinutes();  

    if (type === 0) {
        const ampm = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12; // 0을 12로 변환

        return `${ampm} ${formattedHours}시`;
    }

    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

export const formatTime = (time: Date, type: number): string => {
    const hours = time.getHours();
    const minutes = time.getMinutes();  

    if (type === 0) {
        const ampm = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12; // 0을 12로 변환

        return `${ampm} ${formattedHours}시`;
    }

    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}