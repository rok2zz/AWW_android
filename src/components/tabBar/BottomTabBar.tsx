import { Animated, Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Fragment, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { RootStackNavigationProp } from "../../types/stack"
import { Shadow } from "react-native-shadow-2"

//svg
import Alarm from "../../assets/imgs/tabBar/icon_alarm.svg"
import Schedule from "../../assets/imgs/tabBar/icon_schedule.svg"
import Routine from "../../assets/imgs/tabBar/icon_routine.svg"
import Setting from "../../assets/imgs/tabBar/icon_setting.svg"
import Search from "../../assets/imgs/tabBar/icon_search.svg"

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element => {    
    const rootNavigation = useNavigation<RootStackNavigationProp>()
    const [position] = useState(new Animated.Value(0))

    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [height, setHeight] = useState<number>(0)

    return (
        <View style={ styles.wrapper }>
            <Shadow 
                style={ styles.container }   
                offset={[0, 0]}
                startColor="rgba(0, 0, 0, 0.1)"
                endColor="rgba(0, 0, 0, 0)"
                distance={10}
                corners={{ topStart: true, topEnd: true, bottomStart: false, bottomEnd: false }}
                sides={{ top: true, bottom: false, start: false, end: false }}
            >
                { state.routes.map((route: any , index: number) => {
                    let isFocused = state.index === index
            
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        })

            
                        if (!isFocused && !event.defaultPrevented) {
                            if (route.name === 'ShopStack') {
                                navigation.reset({ routes: [{ name: route.name }]})
                                return
                            }
                            
                            navigation.navigate(route.name)
                        }
                    }
                    
                    return (
                        <Fragment key = { index } >
                            <Pressable onPress = { onPress }>
                                <View style={ styles.tab }>
                                    { index === 0 && 
                                        <>
                                            { isFocused ? (
                                                <Search style={ styles.icon } width={ 30 } height={ 30 } /> 
                                                ) : (
                                                <Search style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            )}
                                        </>
                                    }   
                                    { index === 1 && 
                                        <>
                                            { isFocused ? (
                                                <Alarm style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            ) : (
                                                <Alarm style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            )}
                                        </>
                                    }    
                                    { index === 2 && 
                                        <>
                                            { isFocused ? (
                                                <Schedule style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            ) : (
                                                <Schedule style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            )} 
                                        </>
                                    }   
                                    { index === 3 && 
                                        <>
                                            { isFocused ? (
                                                <Routine style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            ) : (
                                                <Routine style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            )} 
                                        </>
                                    }   
                                    { index === 4 && 
                                        <>
                                            { isFocused ? (
                                                <Setting style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            ) : (
                                                <Setting style={ styles.icon } width={ 30 } height={ 30 } /> 
                                            )} 
                                        </>
                                    }   
                                    { index === 0 && <Text style={[ styles.regularText, isFocused && { fontFamily: 'NotoSansKR-Bold', color: '#121619' } ]}>검색</Text> }
                                    { index === 1 && <Text style={[ styles.regularText, isFocused && { fontFamily: 'NotoSansKR-Bold', color: '#121619' } ]}>알람</Text> }
                                    { index === 2 && <Text style={[ styles.regularText, isFocused && { fontFamily: 'NotoSansKR-Bold', color: '#121619' } ]}>일정</Text> }
                                    { index === 3 && <Text style={[ styles.regularText, isFocused && { fontFamily: 'NotoSansKR-Bold', color: '#121619' } ]}>루틴</Text> }
                                    { index === 4 && <Text style={[ styles.regularText, isFocused && { fontFamily: 'NotoSansKR-Bold', color: '#121619' } ]}>설정</Text> }
                                </View>
                            </Pressable>
                        </Fragment>
                    )
                })}
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {        
        position: 'absolute',
        bottom: 0,
    },
    container: {
        width: Dimensions.get('window').width,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: 20,
        paddingHorizontal: 50,

        backgroundColor: '#eeeeee',
    },
    tab: {
        alignItems: 'center',
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#999999'
    },
    icon: {
        marginBottom: 7
    }
})

export default BottomTabBar