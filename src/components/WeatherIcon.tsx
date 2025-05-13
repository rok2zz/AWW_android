import { Image, StyleSheet, View } from "react-native"


import Sunny from '../assets/imgs/weather/icon_weather_sunny.svg'

const WeatherIcon = ({ index, size }: { index: number, size: number }): JSX.Element => {

    const weatherIcons: { [key: number]: any } = {
        1: require('../assets/imgs/weather/icon_weather_1.png'),
        // 2: require('../assets/imgs/weather/icon_weather_2.png'),
        // 3: require('../assets/imgs/weather/icon_weather_3.png'),
    };
    
    return (
        <View>
            {/* { index === 1 && <Image source={ weatherIcons[index]} style={{ width: 50, height: 50 }} />} */}
            <Sunny style={ styles.icon } width={ size } height={ size } /> 
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,

        marginRight: 5,
    }
})

export default WeatherIcon;