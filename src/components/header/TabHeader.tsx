import { useNavigation } from "@react-navigation/native"
import { Platform, Pressable, StatusBar, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { RootStackNavigationProp } from "../../types/stack"

//svg
import LeftArrow from "../../assets/imgs/common/chevron_left.svg"
import WhiteArrow from "../../assets/imgs/common/chevron_left_white.svg"


interface Props {
    title: string,
    type: number,
    isFocused: boolean
    before: string,
}

const TabHeader = ({ title, type, isFocused, before }: Props ): JSX.Element => {
    const navigation = useNavigation<RootStackNavigationProp>();

    const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
    const [fontColor, setFontColor] = useState<string>('#121619');

    useEffect(() => {
        switch (type) {
            case 0:
                setBackgroundColor('#ffffff')
                setFontColor('#121619')
                break
            case 1:
                setBackgroundColor('#272727')
                setFontColor('#ffffff')
                break
            case 2:
                setBackgroundColor('#ef7617')
                setFontColor('#ffffff')
                break
            case 3:
                setBackgroundColor('#000000')
                setFontColor('#ffffff')
                break
            case 4:
                setBackgroundColor('#f3f3f3')
                setFontColor('#121619')
                break
            case 5:
                setBackgroundColor('#1b212b')
                setFontColor('#ffffff')
        }
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(backgroundColor)   
        }
    }, [isFocused]);

    const onPress = () => {
            console.log('asdf')

        if (before === '') {
            navigation.goBack();
            return
        }
        navigation.navigate('MainTab' as any, { screen: before });
    };

    return (
        <SafeAreaView style={{ backgroundColor: backgroundColor }} edges={['top']}>
            { isFocused && <StatusBar backgroundColor={ backgroundColor } /> }
            <View style={ styles.container }>
                <Pressable style={ styles.button } onPress={ onPress }>
                    { type === 0 || type === 4 ? <LeftArrow /> : <WhiteArrow /> }
                </Pressable>
                <Text style={[ styles.title, { color: fontColor }]}>{ title }</Text>

                {/* { title === '스크린예약' && 
                    <Pressable style={ styles.manageBtn } onPress={ () => navigation.navigate('ManageReservation') }> 
                        <Text style={[ styles.btnText, { color: '#121619' }]}>예약관리</Text>
                    </Pressable>
                } */}
            </View>
        </SafeAreaView>
                
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        padding: 18,
    },
    title: {
        flex: 1,
        textAlign: 'center',

        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        paddingVertical: 19,
        marginRight: 36
    },
    manageBtn: {
        marginRight: 15
    },
    btnText: {
        includeFontPadding: false,
        fontSize: 16,
        fontFamily: 'NotoSansKR-Bold',

        color: '#121619'
    }
})

export default TabHeader