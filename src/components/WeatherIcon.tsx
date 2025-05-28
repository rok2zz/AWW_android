import { Image, StyleSheet, View } from "react-native"


import Sunny from '../assets/imgs/weather/icon_weather_sunny.svg'
import Half from '../assets/imgs/weather/icon_weather_sunny_cloud.svg'
import Cloud from '../assets/imgs/weather/icon_weather_cloud.svg'
import Rain from '../assets/imgs/weather/icon_weather_rain.svg'


const WeatherIcon = ({ index, size }: { index: number, size: number }): JSX.Element => {
    return (
        <View>
            {/* { index === 1 && <Image source={ weatherIcons[index]} style={{ width: 50, height: 50 }} />} */}
            { (index > 0 && index < 4) && <Sunny style={ styles.icon } width={ size } height={ size } /> }
            { ((index > 3 && index < 6) || (index > 19 && index < 24)) && <Half style={ styles.icon } width={ size } height={ size } /> }
            { ((index > 5 && index < 12) || (index > 32 && index < 39)) && <Cloud style={ styles.icon } width={ size } height={ size } /> }
            { ((index > 11 && index < 19) || (index > 38 && index < 43) || index === 25 || index === 29) && <Rain style={ styles.icon } width={ size } height={ size } /> }
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