import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp } from "../../../../../types/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { Focus } from "../../../../../types/screen";

//svg
import LeftArrow from "../../../../../assets/imgs/common/chevron_left.svg"
import Start from "../../../../../assets/imgs/schedule/icon_date_start.svg"
import End from "../../../../../assets/imgs/schedule/icon_date_end.svg"
import EventAdd from "../../../../../assets/imgs/schedule/icon_event_add.svg"
import TabHeader from "../../../../../components/header/TabHeader";

interface ToggleProps {
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ScheduleEvent {
    event: string,
    startTime: Date,
    endTime: Date,
}

export interface Schedule {
    
}

// list with toggle component
const Toggle = ({ value, setValue }: ToggleProps): JSX.Element => {
    const [enabled, setEnabled] = useState<boolean>(value)
    const [toggleAniValue, setToggleAniValue] = useState(new Animated.Value(0))

    const toggleSwitch = (): void => { 
        setEnabled(previousState => !previousState);
    }

    useEffect(() => {
        Animated.timing(toggleAniValue, {
          toValue: enabled ? 1 : 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();

        setValue(enabled);
    }, [enabled]);

    const color: string = enabled ? 'green' : '#b4b4b4';

    const moveSwitchToggle = toggleAniValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 18]
    });
    
    return (
        <Pressable style={[ styles.toggleContainer, { backgroundColor: color } ]} onPress={ toggleSwitch }>
            <Animated.View style={[ styles.toggleWheel, { transform: [{ translateX: moveSwitchToggle }]}]}></Animated.View>
        </Pressable>
    )
}

const ScheduleCreate = (): JSX.Element => {  
    const navigation = useNavigation<ScheduleNavigationProp>();
    const [type, setType] = useState<number>(0); // 0: 조회하기 1: 수정하기
    const [title, setTitle] = useState<string>('');
    const [scheduleEvent, setScheduleEvent] = useState<ScheduleEvent[]>()
    const [allday, setAllday] = useState<boolean>(false);
    const [dDay, setDDay] = useState<boolean>(false);
    const titleRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState<Focus>({ ref: titleRef, isFocused: false });

    // 선택한 입력칸 포커스
    const handleFocus = (ref: React.RefObject<TextInput>) => {
        setIsFocused({
            ref: ref,
            isFocused: true
        });
    };

    // 포커스 해제
    const handleBlur = (ref: React.RefObject<TextInput>) => {
        setIsFocused({
            ref: ref,
            isFocused: false
        });
    };

    return (
        <View style={ styles.wrapper }>
            <TabHeader title="일정 추가하기" type={ 0 } isFocused={ false } before={""} />
            <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
                <View style={[ styles.blockContainer, { paddingVertical: 0 }]}>
                    {/* title */}
                    <View style={[ styles.dateContainer, { paddingVertical: 0 }]}>
                        <TextInput style={[ styles.title, isFocused.ref === titleRef && isFocused.isFocused ? { borderBottomColor: '#cccccc'} : { borderBottomColor: '#cccccc'} ]} 
                            placeholder="일정 제목" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                            onFocus={ () => handleFocus(titleRef) } onBlur={ () => handleBlur(titleRef)} value={ title } keyboardType="default" 
                            onChangeText={(title: string): void => setTitle(title) } onSubmitEditing={ () => handleBlur(titleRef) } />
                    </View>
                    
                    {/* <View style={ styles.dateContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>하루종일</Text>
                        </View>
                        <Toggle value={ allday } setValue={ setAllday }/>
                    </View> */}

                    <View style={[ styles.dateContainer, { paddingVertical: 0 }]}>
                        <TextInput style={[ styles.eventTitle, isFocused.ref === titleRef && isFocused.isFocused ? { borderBottomColor: '#cccccc'} : { borderBottomColor: '#cccccc'} ]} 
                            placeholder="할일 제목" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                            onFocus={ () => handleFocus(titleRef) } onBlur={ () => handleBlur(titleRef)} value={ title } keyboardType="default" 
                            onChangeText={(title: string): void => setTitle(title) } onSubmitEditing={ () => handleBlur(titleRef) } />
                    </View>

                    <View style={ styles.dateContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            {/* <Start style={ styles.icon } /> */}
                            <Text style={ styles.regularText }>시작</Text>
                        </View>
                        <View>
                            <Text></Text>
                        </View>
                    </View>
                    <View style={ styles.dateContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            {/* <End style={ styles.icon } /> */}
                            <Text style={ styles.regularText }>종료</Text>
                        </View>
                    </View>

                    {/* Event add button */}
                    <Pressable style={[ styles.button, { padding: 15 }]} onPress={ () => {} }>
                        <View style={[ styles.rowContainer, { justifyContent: 'center' }]}>
                            <EventAdd style={{ marginRight: 10 }} />
                            <Text style={[ styles.regularText, { color: '#999999', opacity: 0.5 }]}>할일 추가하기</Text>
                        </View>
                    </Pressable>
                </View>

                {/* <View style={ styles.blockContainer}> 
                    <View style={ styles.rowContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>저장 캘린더</Text>
                        </View>
                    </View>
                </View> */}

                {/* <View style={ styles.blockContainer}> 
                    <View style={ styles.rowContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={[ styles.boldText, { lineHeight: 28 }]}>D-day 날씨 알림</Text>
                        </View>
                        <Toggle value={ dDay } setValue={ setDDay }/>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#ffffff'
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
        fontFamily: 'NotoSansKR-Bold',

        color: '#666666'
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666'
    },
    container: {
        flex: 1,

        paddingHorizontal: 20,

        backgroundColor: '#f5f5f5'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        height: 60,

        fontSize: 24,
        fontFamily: 'NotoSansKR-Bold',

        color: '#333333'
    },
    eventTitle: {
        flex: 1,
        height: 60,

        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666'
    },
    blockContainer: {
        marginTop: 20,
        padding: 20,

        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    dateContainer: {
        flexDirection: 'row',

        paddingVertical: 20,

        borderBottomColor: '#eeeeee',
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
    icon: {
        marginRight: 5
    },
    button: {
		padding: 20,
		marginVertical: 20,

		borderRadius: 10,

		backgroundColor: '#f5f5f5',
	},
})
export default ScheduleCreate;