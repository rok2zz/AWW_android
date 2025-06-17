import { Image, StyleSheet, View } from "react-native"

import Icon1 from '../assets/imgs/weather/weatherIcon/icon_1.svg'
import Icon2 from '../assets/imgs/weather/weatherIcon/icon_2.svg'
import Icon3 from '../assets/imgs/weather/weatherIcon/icon_3.svg'
import Icon4 from '../assets/imgs/weather/weatherIcon/icon_4.svg'
import Icon5 from '../assets/imgs/weather/weatherIcon/icon_5.svg'
import Icon6 from '../assets/imgs/weather/weatherIcon/icon_6.svg'
import Icon7 from '../assets/imgs/weather/weatherIcon/icon_7.svg'
import Icon8 from '../assets/imgs/weather/weatherIcon/icon_8.svg'
import Icon11 from '../assets/imgs/weather/weatherIcon/icon_11.svg'
import Icon12 from '../assets/imgs/weather/weatherIcon/icon_12.svg'
import Icon13 from '../assets/imgs/weather/weatherIcon/icon_13.svg'
import Icon14 from '../assets/imgs/weather/weatherIcon/icon_14.svg'
import Icon15 from '../assets/imgs/weather/weatherIcon/icon_15.svg'
import Icon16 from '../assets/imgs/weather/weatherIcon/icon_16.svg'
import Icon17 from '../assets/imgs/weather/weatherIcon/icon_17.svg'
import Icon18 from '../assets/imgs/weather/weatherIcon/icon_18.svg'
import Icon19 from '../assets/imgs/weather/weatherIcon/icon_19.svg'
import Icon20 from '../assets/imgs/weather/weatherIcon/icon_20.svg'
import Icon21 from '../assets/imgs/weather/weatherIcon/icon_21.svg'
import Icon22 from '../assets/imgs/weather/weatherIcon/icon_22.svg'
import Icon23 from '../assets/imgs/weather/weatherIcon/icon_23.svg'
import Icon24 from '../assets/imgs/weather/weatherIcon/icon_24.svg'
import Icon25 from '../assets/imgs/weather/weatherIcon/icon_25.svg'
import Icon26 from '../assets/imgs/weather/weatherIcon/icon_26.svg'
import Icon29 from '../assets/imgs/weather/weatherIcon/icon_29.svg'
import Icon30 from '../assets/imgs/weather/weatherIcon/icon_30.svg'
import Icon31 from '../assets/imgs/weather/weatherIcon/icon_31.svg'
import Icon32 from '../assets/imgs/weather/weatherIcon/icon_32.svg'
import Icon33 from '../assets/imgs/weather/weatherIcon/icon_33.svg'
import Icon34 from '../assets/imgs/weather/weatherIcon/icon_34.svg'
import Icon35 from '../assets/imgs/weather/weatherIcon/icon_35.svg'
import Icon36 from '../assets/imgs/weather/weatherIcon/icon_36.svg'
import Icon37 from '../assets/imgs/weather/weatherIcon/icon_37.svg'
import Icon38 from '../assets/imgs/weather/weatherIcon/icon_38.svg'
import Icon39 from '../assets/imgs/weather/weatherIcon/icon_39.svg'
import Icon40 from '../assets/imgs/weather/weatherIcon/icon_40.svg'
import Icon41 from '../assets/imgs/weather/weatherIcon/icon_41.svg'
import Icon42 from '../assets/imgs/weather/weatherIcon/icon_42.svg'
import Icon43 from '../assets/imgs/weather/weatherIcon/icon_43.svg'
import Icon44 from '../assets/imgs/weather/weatherIcon/icon_44.svg'

const iconMap: { [key: number]: any } = {
    1: Icon1,
    2: Icon2,
    3: Icon3,
    4: Icon4,
    5: Icon5,
    6: Icon6,
    7: Icon7,
    8: Icon8,
    11: Icon11,
    12: Icon12,
    13: Icon13,
    14: Icon14,
    15: Icon15,
    16: Icon16,
    17: Icon17,
    18: Icon18,
    19: Icon19,
    20: Icon20,
    21: Icon21,
    22: Icon22,
    23: Icon23,
    24: Icon24,
    25: Icon25,
    26: Icon26,
    29: Icon29,
    30: Icon30,
    31: Icon31,
    32: Icon32,
    33: Icon33,
    34: Icon34,
    35: Icon35,
    36: Icon36,
    37: Icon37,
    38: Icon38,
    39: Icon39,
    40: Icon40,
    41: Icon41,
    42: Icon42,
    43: Icon43,
    44: Icon44,
};

const WeatherIcon = ({ index, size }: { index: number, size: number }): JSX.Element => {
    const IconComponent = iconMap[index];

    if (!IconComponent) return <View />;

    return (
        <View>
        <IconComponent style={styles.icon} width={size} height={size} />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,

        marginRight: 5,
    }
})

export default WeatherIcon;