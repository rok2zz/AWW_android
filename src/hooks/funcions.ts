import { Alert, Linking } from "react-native";
import { Todo } from "../slices/schedule";

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

// background 이미지
export const background = (index: number) => {
    if (index >= 1 && index <= 3) {
        return require('../assets/imgs/weather/background/01~03_sunny.jpg');
    } else if (index >= 4 && index <= 7) {
        return require('../assets/imgs/weather/background/04~07_cloudy.jpg');
    } else if (index === 8) {
        return require('../assets/imgs/weather/background/08_dreary.jpg');
    } else if (index === 11) {
        return require('../assets/imgs/weather/background/11_fog.jpg');
    } else if ((index >= 12 && index <= 14) || index === 18 || (index >= 39 && index <= 40)) {
        return require('../assets/imgs/weather/background/12~14,18,39~40_rain.jpg');
    } else if ((index >= 15 && index <= 17) || (index >= 41 && index <= 42)) {
        return require('../assets/imgs/weather/background/15~17,41~42_T-Storms.jpg');
    } else if (index >= 19 && index <= 23) {
        return require('../assets/imgs/weather/background/19~23_snow.jpg');
    } else if (index === 24) {
        return require('../assets/imgs/weather/background/24_ice.jpg');
    } else if (index >= 25 && index <= 29) {
        return require('../assets/imgs/weather/background/25~29_sleet.jpg');
    } else if (index === 30) {
        return  require('../assets/imgs/weather/background/30_hot.jpg');
    } else if (index === 31) {
        return require('../assets/imgs/weather/background/31_cold.jpg');
    } else if (index === 32) {
        return require('../assets/imgs/weather/background/32_Windy.jpg');
    } else if (index >= 33 && index <= 35) {
        return require('../assets/imgs/weather/background/33~35_clear.jpg');
    } else if (index >= 36 && index <= 38) {
        return require('../assets/imgs/weather/background/36~38_cloudy_night.jpg');
    } else if (index === 44) {
        return require('../assets/imgs/weather/background/44_snow_night.jpg');
    }

    return require('../assets/imgs/weather/background/01~03_sunny.jpg');
} 

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
        case 'NewMoon':
            return '삭'
        case 'WaxingCrescent':
            return '초승달'
        case 'First':
        case 'FirstQuarter':
            return '상현달'
        case 'WaxingGibbous':
            return '상현과 보름 사이'
        case 'Full':
        case 'FullMoon':
            return '보름달'
        case 'WaningGibbous':
            return '보름과 하현 사이'
        case 'Last':
        case 'LastQuarter':
            return '하현달'
        case 'WaningCrescent':
            return '그믐달'
        default: 
            return ''
    }
}

export const getSunPhase = (time: string, type: number) => {
    const hour = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();
    if (type === 0) {
        return hour < 12 ? ('오전 ' + hour + '시 ' + (minutes < 10 ? '0' + minutes : minutes)) + '분' : '오후 ' + (hour === 12 ? '0' : '') + (hour - 12)+ '시 ' + (minutes < 10 ? '0' + minutes : minutes) + '분';
    }

    return hour < 12 ? ('0' + hour + ':' + (minutes < 10 ? '0' + minutes : minutes)) : (hour + ':' + (minutes < 10 ? '0' + minutes : minutes));
}

// metric => imperial   
export const convertTemperature = (temp: number, type: number): number => {
    if (type === 0) {
        return Math.round(temp); 
    }

    return Math.round(temp * 9/5 + 32); // 켈빈에서 화씨로 변환
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

export const getPickedDate = (date: string, isStart: boolean) => {
    if (!isStart) {
        if (date === '') {
            return '----.--.--'
        }
    }

    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();

    return `${year}.${month}.${day}`;
}

export const getPickedTime = (date: string, isStart: boolean, timeType: number) => {
    if (!isStart) {
        if (date === '') {
            return '--.--'
        }
    }

    const time = new Date(date)
    let hour = time.getHours();
    let minute = time.getMinutes();
    let ampm = '오전';

    if (timeType === 0) {
        ampm = hour >= 12 ? '오후' : '오전';
        hour = hour > 12 ? hour - 12 : 0 + hour;

        return ampm + ' ' + hour + '시 ' + (minute > 10 ? minute : '0' + minute) + '분';
    }

    return (hour < 10 ? '0' + hour : hour) + ':' + (minute > 10 ? minute : '0' + minute);
}

export const getDay = (time: Date): string => {
    const day = time.getDay();
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return days[day];
}

export const getDate = (time: Date): string => {
    const date = time.getDate();
    const month = time.getMonth() + 1;

    return `${month}.${date < 10 ? '0' + date : date}`;
}

export const getTime = (item: Todo, timeType: number): string => {
    const start = new Date(item.startTime);

    const formatTime = (date: Date) => {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let ampm = '오전';

        if (timeType === 0) {
            ampm = hour >= 12 ? '오후' : '오전';
            hour = hour > 12 ? hour - 12 : 0 + hour;
    
            return ampm + ' ' + hour + '시 ' + (minute > 10 ? minute : '0' + minute) + '분';
        }
    
        return (hour < 10 ? '0' + hour : hour) + ':' + (minute > 10 ? minute : '0' + minute);
    }

    if (item.endTime) {
        const end = new Date(item.endTime);

        return formatTime(start) + ' ~ ' + formatTime(end);
    }

    return formatTime(start);
}

export const getNextTime = () => {
    const now = new Date();
    if (now.getMinutes() > 0) {
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        now.setHours(now.getHours() + 1);

        return now;
    }

    return now;
}