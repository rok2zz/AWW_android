import { Alert, Animated, Easing, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp, ScheduleStackParamList } from "../../../../../types/stack";
import React, { useEffect, useRef, useState } from "react";
import { Focus } from "../../../../../types/screen";
import TabHeader from "../../../../../components/header/TabHeader";
import { Schedule, Todo } from "../../../../../slices/schedule";
import { useSchedule } from "../../../../../hooks/useSchedule";
import { Payload } from "../../../../../types/api";

// svg
import End from "../../../../../assets/imgs/schedule/icon_schedule_end.svg" 
import Delete from "../../../../../assets/imgs/schedule/icon_schedule_delete.svg"
import TodoStart from "../../../../../assets/imgs/schedule/icon_todo_start.svg"
import TodoCommon from "../../../../../assets/imgs/schedule/icon_todo_common.svg"
import TodoEnd from "../../../../../assets/imgs/schedule/icon_todo_end.svg"


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
    const scheduleId = route.params.id;
    const { getSchedule, deleteSchedule, endSchedule } = useSchedule();
    const [type, setType] = useState<number>(0); // 0: 조회하기 1: 수정하기
    const dateType: number = 0 // 0: 12시간제, 1: 24시간제
    const [schedule, setSchedule] = useState<Schedule>({
        id: 0,
        title: '',

        status: 1,
        todoList: [{
            id: 0,
            title: '',
            start: 'new Date()',
            end: 'new Date()',

            location: '',
            temperature: 0,
            
            type: false
        }]
    });    
    const [scheduleEvent, setScheduleEvent] = useState<ScheduleEvent[]>();
    const titleRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState<Focus>({ ref: titleRef, isFocused: false });

    useEffect(() => {
        const getScheduleDetail = async () => {
            const payload = await getSchedule(scheduleId);

            if (payload.schedule) {
                setSchedule(payload.schedule)
            }
        }

        getScheduleDetail();
    }, [])

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

    const getTime = (item: Todo): string => {
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
            console.log(end)

            return formatTime(start) + ' ~ ' + formatTime(end);
        }

        return formatTime(start);
    }

    const getStartTime = () => {
        if (schedule && schedule.todoList) {
            const start = new Date(schedule.todoList[0].start);
            return start.getFullYear() + '.' + (start.getMonth() + 1) + '.' + start.getDate()
        }
    }

    // delete schedule
    const remove = async () => {
        Alert.alert(
            '알림',
            '일정을 삭제하시겠습니까?',
            [
                {
                    text: '취소',
                    onPress: () => { return },
                    style: 'cancel',
                },{
                    text: '확인', 
                    onPress: async (): Promise<void> => { 
                        const payload: Payload = await deleteSchedule(scheduleId)
                        if (payload.code === 200) {
                            Alert.alert('알림', '일정이 삭제되었습니다.')
                            navigation.goBack();
                        }
                    },
                }
            ],
        )
    };

    // end schedule
    const end = async () => {
        Alert.alert(
            '알림',
            '일정을 종료하시겠습니까?',
            [
                {
                    text: '취소',
                    onPress: () => { return },
                    style: 'cancel',
                },{
                    text: '확인', 
                    onPress: async (): Promise<void> => { 
                        const payload: Payload = await endSchedule(scheduleId)
                        if (payload.code === 200) {
                            Alert.alert('알림', '일정이 종료되었습니다.')
                            navigation.goBack();
                        }
                    },
                }
            ],
        )

        
    }

    return (
        <View style={{ flex: 1 }}>
            <TabHeader title="일정 상세보기" type={ 0 } isFocused={ false } before={""} />
            { schedule &&
                <ScrollView showsVerticalScrollIndicator={ false } contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={ styles.wrapper }>
                        <View style={ styles.container }>
                            <View style={[ styles.rowContainer, { marginBottom: 26 }]}>
                                <Text style={[ styles.boldText, { flex: 1 }]}>{ schedule.title }</Text>
                                { type === 0 && 
                                    <Pressable style={ styles.modifyBtn } onPress={ () => setType(1) }>
                                        <Text style={[ styles.boldText, { fontSize: 16, color: '#ffffff' }]}>수정하기</Text>
                                    </Pressable>
                                }
                            </View>
    
                            { type === 0 ? (
                                // 조회
                                <View>
                                    <Text style={[ styles.regularText, { paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]}>{ getStartTime() }</Text>

                                    { schedule.todoList && schedule.todoList.length > 0 && schedule.todoList.map(( item: Todo, index: number ) => {
                                        if (schedule.todoList &&  schedule.todoList?.length > 0) {
                                            return (
                                                <View style={[ styles.rowContainer, { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]} key={ index }>
                                                    <View style={[ styles.rowContainer, { flex: 1 }]}>
                                                        { index === 0 && <TodoStart style={ styles.todoIcon } /> }
                                                        { index === schedule.todoList.length - 1 && <TodoEnd style={ styles.todoIcon } /> }
                                                        { index > 0 && index < schedule.todoList.length - 1 &&  <TodoCommon style={ styles.todoIcon } /> }

                                                        <Text style={[ styles.regularText, { letterSpacing: -0.5 } ]}>{ item.title }</Text>
                                                    </View>
                                                    <Text style={[ styles.regularText, { fontSize: 14, letterSpacing: -0.5 }]}>{ getTime(item) }</Text>
                                                </View>
                                            )
                                        }
                                    })}
                                </View>

                            ) : (
                                <View>
                                    <Text style={[ styles.regularText, { paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]}>{ getStartTime() }</Text>
                                </View>
                            )}

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
                        { type === 0 &&
                            <View>
                                { schedule.status === 1 && 
                                    <Pressable style={ styles.button } onPress={ end }>
                                        <End style={{ marginRight: 7 }} />
                                        <Text style={[ styles.regularText, { fontSize: 20, color: '#ef4f4f'}]}>일정 종료하기</Text>
                                    </Pressable>
                                }

                                <Pressable style={ styles.button } onPress={ remove }>
                                    <Delete style={{ marginRight: 7 }}  />
                                    <Text style={[ styles.regularText, { fontSize: 20, color: '#ef4f4f'}]}>일정 삭제하기</Text>
                                </Pressable>
                            </View>
                        }
                        
                    </View>
                </ScrollView>
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1 , 
        justifyContent: 'space-between', 

        marginBottom: 150 
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
    todoIcon: {
        marginRight: 10
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