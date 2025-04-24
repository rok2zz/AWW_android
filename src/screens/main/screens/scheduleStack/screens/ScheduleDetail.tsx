import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp, ScheduleStackParamList } from "../../../../../types/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { Focus } from "../../../../../types/screen";
import TabHeader from "../../../../../components/header/TabHeader";
import { ScheduleList } from "../../../../../slices/schedule";

// svg
import End from "../../../../../assets/imgs/schedule/icon_schedule_end.svg" 
import Delete from "../../../../../assets/imgs/schedule/icon_schedule_delete.svg"

interface ToggleProps {
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ScheduleEvent {
    event: string,
    startTime: Date,
    endTime: Date,
}

interface Props {
    route: RouteProp<ScheduleStackParamList, 'ScheduleDetail'>
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

const ScheduleDetail = ({ route }: Props): JSX.Element => {  
    const navigation = useNavigation<ScheduleNavigationProp>();
    const [type, setType] = useState<number>(0); // 0: 조회하기 1: 수정하기
    const dateType: number = 0 // 0: 12시간제, 1: 24시간제
    const [schedule, setSchedule] = useState<ScheduleList>(
        { 
            id: 0,
            title: 'todo 1',
            start: '2023-10-01T00:30:00.000Z',
            end: '2023-10-01T11:02:00.000Z',

            status: 1,
            todo: [{
                id: 0,
                title: '할일 1',
                start: '2023-10-01T00:30:00.000Z',
                end: '2023-10-01T05:30:00.000Z',

                location: '신사동',
                temperature: 12
            }]
        }
    );    
    const [scheduleEvent, setScheduleEvent] = useState<ScheduleEvent[]>()
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

    const getTime = (item: ScheduleList): string => {
        const start = new Date(item.start);
        const startYear = start.getFullYear();
        const startMonth = start.getMonth() + 1;
        const startDate = start.getDate(); 

        const formatTime = (date: Date) => {
            let hour = date.getHours();
            let minute = date.getMinutes();
            let ampm = '오전';

            if (dateType === 0) {
                ampm = hour >= 12 ? '오후' : '오전';
                hour = hour > 12 ? hour - 12 : 0 + hour;

                return ampm + ' ' + hour + ':' + (minute > 10 ? minute : '0' + minute);
            }

            return hour + ':' + (minute > 10 ? minute : '0' + minute);
        }

        if (item.end) {
            const end = new Date(item.end);
            const endYear = end.getFullYear();
            const endMonth = end.getMonth() + 1;
            const endDate = end.getDate();

            if (startYear === endYear && startMonth === endMonth && startDate === endDate) {
                return startYear + '.' + startMonth + '.' + startDate + ' ' + formatTime(start) + ' ~ ' + formatTime(end);
            }

            return startYear + '.' + startMonth + '.' + startDate + ' ' + formatTime(start) + ' ~ ' + endYear + '.' + endMonth + '.' + endDate + ' ' + formatTime(end);
        }

        return startYear + '.' + startMonth + '.' + startDate + ' ' + formatTime(start);
    }

    const getStartTime = () => {
        if (schedule.start) {
            const start = new Date(schedule.start);
            return start.getFullYear() + '.' + (start.getMonth() + 1) + '.' + start.getDate()
        }
    }

    // delete schedule
    const deleteSchedule = () => {
        setSchedule(prev => ({ ...prev, status: -1 }))    
    };

    return (
        <>
            <TabHeader title="일정 상세보기" type={ 0 } isFocused={ false } before={""} />
            <ScrollView style={ styles.wrapper } showsVerticalScrollIndicator={ false }>
                <View style={ styles.container }>
                    <View style={[ styles.rowContainer, { marginBottom: 26 }]}>
                        <Text style={[ styles.boldText, { flex: 1 }]}>{ schedule.title }</Text>
                        { type === 0 && 
                            <View style={ styles.modifyBtn }>
                                <Text style={[ styles.boldText, { fontSize: 16, color: '#ffffff' }]}>수정하기</Text>
                            </View>
                        }
                    </View>
                    <Text style={[ styles.regularText, { paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]}>{ getStartTime() }</Text>
                    {/* { location && (
                        <View style={ styles.rowContainer }>
                            <Location style={{ marginRight: 5 }} width={ 20 } height={ 20 } />
                            <Text style={[ styles.regularText, { fontSize: 20, marginRight: 10 }]}>{ item.location }</Text>

                            { item.temperature !== undefined && (
                                <View style={ styles.rowContainer }>
                                    <Sunny style={{ marginRight: 5 }} width={ 30 } height={ 30 } />
                                    <Text style={[ styles.boldText, { fontSize: 20, marginBottom: 0 }]}>{ item.temperature }°</Text>
                                </View>
                            )}
                        </View>
                    )} */}
                </View>

                {/* schedule end */}
                { schedule.status === 1 && 
                    <Pressable style={ styles.button } onPress={ () => setSchedule(prev => ({...prev, status: 0 }))}>
                        <End style={{ marginRight: 7 }} />
                        <Text style={[ styles.regularText, { fontSize: 20, color: '#ef4f4f'}]}>일정 종료하기</Text>
                    </Pressable>
                }

                <Pressable style={ styles.button } onPress={ deleteSchedule }>
                    <Delete style={{ marginRight: 7 }}  />
                    <Text style={[ styles.regularText, { fontSize: 20, color: '#ef4f4f'}]}>일정 삭제하기</Text>
                </Pressable>
            </ScrollView>
        </>
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
        fontSize: 24,
        fontFamily: 'NotoSansKR-Bold',

        color: '#000000'
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666'
    },
    container: {
        
        padding: 20,
        marginTop: 20,
        marginHorizontal: 20,

        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modifyBtn: {
        paddingVertical: 7,
        paddingHorizontal: 11,

        borderRadius: 10,
        backgroundColor: '#468ce6'
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

		padding: 15,
        marginHorizontal: 20,
        marginTop: 20,

		borderRadius: 10,
		backgroundColor: '#ffffff',
	}
})
export default ScheduleDetail;