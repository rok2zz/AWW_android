import { Animated, Easing, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp } from "../../../../../types/stack";
import { SafeAreaView } from "react-native-safe-area-context";

//svg
import LeftArrow from "../../../../../assets/imgs/common/chevron_left.svg"
import { useEffect, useRef, useState } from "react";
import { Focus } from "../../../../../types/screen";



interface ToggleProps {
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

// list with toggle component
const Toggle = ({ value, setValue }: ToggleProps): JSX.Element => {
    const [enabled, setEnabled] = useState<boolean>(value)
    const [toggleAniValue, setToggleAniValue] = useState(new Animated.Value(0))

    const toggleSwitch = (): void => { 
        setEnabled(previousState => !previousState)   
    }

    useEffect(() => {
        Animated.timing(toggleAniValue, {
          toValue: enabled ? 1 : 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start()

        setValue(enabled)
    }, [enabled])

    const color: string = enabled ? 'green' : '#b4b4b4'

    const moveSwitchToggle = toggleAniValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 18]
    })
    
    return (
        <Pressable style={[ styles.toggleContainer, { backgroundColor: color } ]} onPress={ toggleSwitch }>
            <Animated.View style={[ styles.toggleWheel, { transform: [{ translateX: moveSwitchToggle }]}]}></Animated.View>
        </Pressable>
    )
}

const ScheduleSetting = (): JSX.Element => {  
    const navigation = useNavigation<ScheduleNavigationProp>();
    const [title, setTitle] = useState<string>('');
    const [allday, setAllday] = useState<boolean>(false);
    const [dDay, setDDay] = useState<boolean>(false);
    const titleRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState<Focus>({ ref: titleRef, isFocused: false });

    useEffect(() => {
        console.log(allday)
    }, [allday]);

    // 선택한 입력칸 포커스
    const handleFocus = (ref: React.RefObject<TextInput>) => {
        setIsFocused({
            ref: ref,
            isFocused: true
        })
    };

    // 포커스 해제
    const handleBlur = (ref: React.RefObject<TextInput>) => {
        setIsFocused({
            ref: ref,
            isFocused: false
        })
    };

    // header
    const Header = (): JSX.Element => {
        return (
            <SafeAreaView style={ styles.header } edges={['top']}>
                <Pressable style={ styles.arrow } onPress={ () => navigation.goBack() }>
                    <LeftArrow /> 
                </Pressable>
                <Pressable style={ styles.registerBtn } onPress={ () => { }}>
                    <Text style={ styles. boldText }>등록</Text>
                </Pressable>
            </SafeAreaView>
        );
    };

    return (
        <View style={ styles.wrapper }>
            <Header />
            <View style={ styles.container }>
                <View style={ styles.rowContainer }>
                    <TextInput style={[ styles.title, isFocused.ref === titleRef && isFocused.isFocused ? { borderBottomColor: '#cccccc'} : { borderBottomColor: '#cccccc'} ]} 
                        placeholder="일정 제목" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                        onFocus={ () => handleFocus(titleRef) } onBlur={ () => handleBlur(titleRef)} value={ title } keyboardType="default"
                        onChangeText={(title: string): void => setTitle(title) } onSubmitEditing={ () => handleBlur(titleRef) } />
                </View>

                <View style={[ styles.blockContainer, { paddingVertical: 0 }]}>
                    <View style={ styles.dateContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>하루종일</Text>
                        </View>
                        <Toggle value={ allday } setValue={ setAllday }/>
                    </View>
                    <View style={ styles.dateContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>시작</Text>
                        </View>
                    </View>
                    <View style={[ styles.dateContainer, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>종료</Text>
                        </View>
                    </View>
                </View>

                <View style={ styles.blockContainer}> 
                    <View style={ styles.rowContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>위치</Text>
                        </View>
                    </View>
                </View>

                <View style={ styles.blockContainer}> 
                    <View style={ styles.rowContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>저장 캘린더</Text>
                        </View>
                    </View>
                </View>

                <View style={ styles.blockContainer}> 
                    <View style={ styles.rowContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>D-day 날씨 알림</Text>
                        </View>
                        <Toggle value={ dDay } setValue={ setDDay }/>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    arrow: {
        padding: 20,
    },
    registerBtn: {
        padding: 15,
        marginRight: 15
    },
    boldText: {
        includeFontPadding: false,
        fontSize: 16,
        fontFamily: 'Pretendard-Bold',

        color: '#121619'
    },
    container: {
        marginHorizontal: 20,
    },
    rowContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        height: 60,

        paddingHorizontal: 10,

        includeFontPadding: false,
        fontSize: 25,
        fontFamily: 'Pretendard-Regular',

        color: '#121619'
    },
    blockContainer: {
        marginTop: 20,
        padding: 20,

        borderRadius: 10,
        backgroundColor: '#cccccc'
    },
    dateContainer: {
        flexDirection: 'row',

        paddingVertical: 20,

        borderBottomColor: '#aaaaaa',
        borderBottomWidth: 1
    },
    toggleContainer: {
        width: 50,
        height: 28,

        paddingLeft: 3,
        
        borderRadius: 15,
        justifyContent: 'center',
    },
    toggleWheel: {
        width: 24,
        height: 24,

        borderRadius: 12.5,
        backgroundColor: 'white'
    },
})
export default ScheduleSetting;