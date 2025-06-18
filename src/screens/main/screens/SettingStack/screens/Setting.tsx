import { Image, ImageBackground, StyleSheet, View } from "react-native"

const Setting = (): JSX.Element => {

    
    return (
        <View>
            <ImageBackground
                source={ require('../../../../../assets/imgs/weather/background/01~03_sunny.jpg')}
                style={{ width: '100%', height: 590 }}
                resizeMode="cover" 
            >
                <View style={{ flex: 1 }}></View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
})

export default Setting;