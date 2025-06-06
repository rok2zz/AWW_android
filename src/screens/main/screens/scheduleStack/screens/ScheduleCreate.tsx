import { Alert, Animated, Easing, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp } from "../../../../../types/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { Focus } from "../../../../../types/screen";
import { Schedule, Todo } from "../../../../../slices/schedule";
import { useSchedule } from "../../../../../hooks/useSchedule";
import { Payload } from "../../../../../types/api";
import TabHeader from "../../../../../components/header/TabHeader";
import RNDateTimePicker from "@react-native-community/datetimepicker";

//svg
import EventAdd from "../../../../../assets/imgs/schedule/icon_event_add.svg"
import SelectedLocation from "../../../../../assets/imgs/schedule/icon_location_selected.svg"
import Location from "../../../../../assets/imgs/schedule/icon_location_non_selected.svg"
import TodoDelete from "../../../../../assets/imgs/schedule/icon_todo_delete.svg"
import TodoSearchPlace from "../../../../../components/TodoSearchPlace";

interface ToggleProps {
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export interface TodoType {

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

const getNextTime = () => {
    const now = new Date();
    if (now.getMinutes() > 0) {
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        now.setHours(now.getHours() + 1);

        return now;
    }

    return now;
}

const ScheduleCreate = (): JSX.Element => {  
    const navigation = useNavigation<ScheduleNavigationProp>();
    const { createSchedule } = useSchedule();
    const dateType = 0; // 0: 12시간제, 1: 24시간제
    const [schedule, setSchedule] = useState<Schedule>({
        title: '',
        status: 1,
        
        todoList: [{
            type: 0,
            title: '',
            startTime: getNextTime().toISOString(),

            handle: true
        }]
    });
    const titleRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState<Focus>({ ref: titleRef, isFocused: false });
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
    const [targetKey, setTargetKey] = useState<'startTime' | 'endTime'>('startTime');
    
    const getStartTime = () => {
        if (schedule && schedule.todoList) {
            const start = new Date(schedule.todoList[0].startTime);
            return start.getFullYear() + '.' + (start.getMonth() + 1) + '.' + start.getDate()
        }
    }

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

    // add todo
    const addTodo = () => {
        setSchedule(prev => {
            const updatedTodos = prev.todoList!.map(todo => ({
                ...todo,
                title: todo.title.trim() === '' ? `할 일` : todo.title,
                handle: false
            }));
        
            const newTodo = { type: 0, title: '', startTime: getNextTime().toISOString(), handle: true };
        
            const sortedTodos = [...updatedTodos, newTodo].sort((a, b) => {
                const aTime = a.startTime ? new Date(a.startTime).getTime() : Infinity;
                const bTime = b.startTime ? new Date(b.startTime).getTime() : Infinity;
                return aTime - bTime;
            });
        
            return {
                ...prev,
                todoList: sortedTodos
            };
        });
    };

    // delete todo
    const deleteTodo = (index: number) => {
        Alert.alert(
            '알림',
            '할일을 삭제하시겠습니까?',
            [         
                {
                    text: '아니오',
                    onPress: () => { return },
                    style: 'cancel',
                },{
                    text: '예', 
                    onPress: async (): Promise<void> => { 
                        setSchedule(prev => {
                            const updatedTodos = prev.todoList!.filter((_, i) => i !== index);
                            return {
                                ...prev,
                                todoList: updatedTodos
                            };
                        });
                    },
                }
            ]
        )
    };

    // 수정할 할일 선택
    const handleTodoModify = (index: number) => {
        setSchedule(prev => {
            const updatedTodos = prev.todoList!.map((todo, i) => {

                return {
                    ...todo,
                    title: todo.title.trim() === '' ? '할 일' : todo.title,
                    handle: i === index
                };
            });
            
            return {
                ...prev,
                todoList: updatedTodos
            };
        });
    }

    // create schedule
    const create = async () => {
        Alert.alert(
            '알림',
            '일정을 생성하시겠습니까?',
            [
                {
                    text: '취소',
                    onPress: () => { return },
                    style: 'cancel',
                },{
                    text: '확인', 
                    onPress: async (): Promise<void> => { 
                        if (schedule.todoList && schedule.todoList.length > 0) {
                            let newSchedule = schedule;

                            for (let i = 0; i < schedule.todoList.length; i ++) {
                                if (schedule.todoList[i].title.trim() === '') {
                                    const updatedTodos = [...schedule.todoList];
                                    updatedTodos[i] = {
                                        ...updatedTodos[i],
                                        title: `할 일`,
                                    };
                                
                                    newSchedule = {
                                        ...schedule,
                                        todoList: updatedTodos,
                                    };
                                }
                            }

                            setSchedule(newSchedule);

                            const payload: Payload = await createSchedule(newSchedule);

                            if (payload.code === 200) {
                                Alert.alert('알림', '일정이 생성되었습니다.')
                                navigation.popToTop();
                            }
                        }
                    },
                }
            ],
        )
    };

    return (
        <View style={ styles.wrapper }>
            <TabHeader title="일정 추가하기" type={ 0 } isFocused={ false } before={""} />
            <TodoSearchPlace />
            <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
                <View style={[ styles.blockContainer, { paddingVertical: 0 }]}>
                    {/* title */}
                    <View style={[ styles.dateContainer, { paddingVertical: 0 }]}>
                        <TextInput style={[ styles.title, schedule.todoList && schedule.todoList.length > 0 && schedule.todoList[0].startTime !== '' && { borderBottomWidth: 0 }]} 
                            placeholder="일정 제목" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                            onFocus={ () => handleFocus(titleRef) } onBlur={ () => handleBlur(titleRef)} value={ schedule.title } keyboardType="default" multiline={ false }
                            onChangeText={(title: string): void => setSchedule(prev => ({ ...prev, title: title }))} onSubmitEditing={ () => handleBlur(titleRef) } />
                    </View>

                    { schedule.todoList && schedule.todoList.length > 0 && schedule.todoList[0].startTime !== '' && (
                        <Text style={[ styles.regularText, { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]}>{ getStartTime() }</Text>
                    )}
                    
                    {/* todolist  */}
                    { schedule.todoList && schedule.todoList.map((item: Todo, index: number) => {
                        const getTime = (item: Todo): string => {
                            const start = new Date(item.startTime);
                    
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
                    
                            if (item.endTime) {
                                const end = new Date(item.endTime);
                    
                                return formatTime(start) + ' ~ ' + formatTime(end);
                            }
                    
                            return formatTime(start);
                        }

                        const getPickedDate = (date: string, isStart: boolean) => {
                            if (!isStart) {
                                if (date === '') {
                                    return '----.--.--'
                                }
                            }

                            const time = new Date(date);
                            const year = time.getFullYear();
                            const month = time.getMonth() + 1;
                            const day = time.getDate();

                            return `${year}.${month}.${day}`;
                        }

                        const getPickedTime = (date: string, isStart: boolean) => {
                            if (!isStart) {
                                if (date === '') {
                                    return '--.--'
                                }
                            }

                            const time = new Date(date)
                            let hour = time.getHours();
                            let minute = time.getMinutes();
                            let ampm = '오전';
            
                            if (dateType === 0) {
                                ampm = hour >= 12 ? '오후' : '오전';
                                hour = hour > 12 ? hour - 12 : 0 + hour;
                
                                return ampm + ' ' + hour + ':' + (minute > 10 ? minute : '0' + minute);
                            }
                
                            return hour + ':' + (minute > 10 ? minute : '0' + minute);
                        }

                        const handlePress = (key: 'startTime' | 'endTime', mode: 'date' | 'time') => {
                            setTargetKey(key);
                            setPickerMode(mode);
                            setShowPicker(true);
                        };
                    
                        const handleChange = (_: any, selectedDate?: Date) => {
                            setShowPicker(false);

                            if (targetKey === 'endTime') {
                                const startDate = new Date(item.startTime);

                                if (selectedDate && selectedDate.getTime() < startDate.getTime()) {
                                    Alert.alert('알림', '종료시간은 시작시간보다 이전일 수 없습니다.');
                                    return;
                                };
                            };

                            if (selectedDate) {
                                if (!item.endTime) {
                                    if (selectedDate.getMinutes() > 0) {
                                        selectedDate.setMinutes(0);
                                        selectedDate.setSeconds(0);
                                        selectedDate.setMilliseconds(0);
                                        selectedDate.setHours(selectedDate.getHours() + 1);
                                    }
                                }

                                const isoString = selectedDate.toISOString();
                                
                                setSchedule(prev => {
                                    const updatedTodos = [...prev.todoList ?? []];
                                    updatedTodos[index] = {
                                        ...updatedTodos[index],
                                        [targetKey]: isoString,
                                    };

                                    const sortedTodos = updatedTodos.sort((a, b) => {
                                        const aTime = a.startTime ? new Date(a.startTime).getTime() : Infinity;
                                        const bTime = b.startTime ? new Date(b.startTime).getTime() : Infinity;

                                        return aTime - bTime;
                                    });

                                    return {
                                        ...prev,
                                        todoList: sortedTodos
                                    };
                                });
                            }
                        };

                        // 수정중인 할일
                        if (item.handle) {
                            return (
                                <View key={ index }>
                                    <View style={[ styles.dateContainer, { paddingVertical: 0 }]}>
                                        <TextInput style={[ styles.eventTitle, isFocused.ref === titleRef && isFocused.isFocused ? { borderBottomColor: '#cccccc'} : { borderBottomColor: '#cccccc'} ]} 
                                            placeholder="할 일" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                                            value={ item.title } keyboardType="default" 
                                            onChangeText={(text) => {
                                                setSchedule(prev => {
                                                    const newList = [...(prev.todoList || [])]; 
                                                    newList[index].title = text;
                                                    return { ...prev, todoList: newList };
                                                });
                                            }} />
                                    </View>
                                    <View style={[ styles.dateContainer, { alignItems: 'center', paddingVertical: 15 }]}>
                                        <Text style={[ styles.regularText, { flex: 1 }]}>시작</Text>
                                        <Pressable style={[ styles.dateBtn, { marginRight: 9 }]} onPress={ () => handlePress('startTime', 'date') }>
                                            <Text style={ styles.regularText }>{ getPickedDate(item.startTime, true) }</Text>
                                        </Pressable>
                                        <Pressable style={ styles.dateBtn } onPress={ () => handlePress('startTime', 'time') }>
                                            <Text style={ styles.regularText }>{ getPickedTime(item.startTime, true) }</Text>
                                        </Pressable>
                                        
                                        {/* <RNDateTimePicker mode="time" value={ new Date() } onChange={ changeDate } display="default"/> */}
                                    </View>
                                    <View style={[ styles.dateContainer, { alignItems: 'center', paddingVertical: 15 }]}>
                                        <Text style={[ styles.regularText, { flex: 1 }]}>종료</Text>
                                        <Pressable style={[ styles.dateBtn, { marginRight: 9 }]} onPress={ () => handlePress('endTime', 'date') }>
                                            <Text style={ styles.regularText }>{ getPickedDate(item.endTime ?? '', false) }</Text>
                                        </Pressable>
                                        <Pressable style={ styles.dateBtn } onPress={ () => handlePress('endTime', 'time') }>
                                            <Text style={ styles.regularText }>{ getPickedTime(item.endTime ?? '', false) }</Text>
                                        </Pressable>
                                    </View>
                                    <Pressable style={ styles.dateContainer }  onPress={ () => {}}>
                                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                                            { item.location ? <SelectedLocation style={ styles.icon } /> : <Location style={ styles.icon } /> }
                                        
                                            <Text style={ styles.regularText }>장소</Text>
                                        </View>
                                    </Pressable>

                                                       {/* show picker */}
                                    { showPicker && (
                                        <RNDateTimePicker
                                            mode={ pickerMode }
                                            value={ item[targetKey] ? new Date(item[targetKey]) : new Date() }
                                            onChange={ handleChange }
                                            display="default"
                                        />
                                    )}
                                </View>
                            )
                        }
                        
                        // 수정완료된 할일
                        if (schedule.todoList) {
                            return (
                                <Pressable style={[ styles.rowContainer, { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]} key={ index } onPress={ () => handleTodoModify(index) }>
                                    <View style={[ styles.rowContainer, { flex: 1 }]}>
                                        <Pressable onPress={ () =>  deleteTodo(index) }>
                                            <TodoDelete style={ styles.todoIcon } /> 
                                        </Pressable>
                                        
                                        <Text style={[ styles.regularText, { letterSpacing: -0.5 } ]}>{ item.title }</Text>
                                    </View>
                                    <Text style={[ styles.regularText, { fontSize: 14, letterSpacing: -0.5 }]}>{ getTime(item) }</Text>
                                </Pressable>
                            )
                        }
                    })}
                    
                    {/* Event add button */}
                    <Pressable style={ styles.button } onPress={ addTodo }>
                        <View style={[ styles.rowContainer, { justifyContent: 'center' }]}>
                            <EventAdd style={{ marginRight: 10 }} />
                            <Text style={[ styles.regularText, { color: '#999999', opacity: 0.5 }]}>할일 추가하기</Text>
                        </View>
                    </Pressable>

                    {/* save */}
                    { schedule.title && schedule.title !== '' ? (
                        <Pressable style={[ styles.button, { alignItems: 'center', marginVertical: 20, backgroundColor: '#468ce6' }]} onPress={ create }>
                            <Text style={[ styles.regularText, { color: '#ffffff' }]}>저장</Text>
                        </Pressable>
                    ) : (
                        <View style={{ marginBottom: 20 }}></View>
                    )}
                
                </View>
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
        fontSize: 16,
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

        includeFontPadding: false,
        fontSize: 24,
        fontFamily: 'NotoSansKR-Bold',

        color: '#333333'
    },
    eventTitle: {
        alignItems: 'center',
        flex: 1,
        height: 60,

        includeFontPadding: false,
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666',
    },
    blockContainer: {
        marginTop: 20,
        padding: 20,
        marginBottom: 150,

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
    dateBtn: {
        paddingHorizontal: 15,
        paddingVertical: 7,

        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    },
    button: {
		padding: 20,
		marginTop: 20,

		borderRadius: 10,

		backgroundColor: '#f5f5f5',
	},
})
export default ScheduleCreate;