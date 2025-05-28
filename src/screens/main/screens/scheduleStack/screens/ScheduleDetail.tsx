import { Alert, Animated, Easing, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp, ScheduleStackParamList } from "../../../../../types/stack";
import React, { useEffect, useRef, useState } from "react";
import { Focus } from "../../../../../types/screen";
import TabHeader from "../../../../../components/header/TabHeader";
import { Schedule, Todo } from "../../../../../slices/schedule";
import { useSchedule } from "../../../../../hooks/useSchedule";
import { Payload } from "../../../../../types/api";
import RNDateTimePicker from "@react-native-community/datetimepicker";

// svg
import End from "../../../../../assets/imgs/schedule/icon_schedule_end.svg" 
import Delete from "../../../../../assets/imgs/schedule/icon_schedule_delete.svg"
import TodoStart from "../../../../../assets/imgs/schedule/icon_todo_start.svg"
import TodoCommon from "../../../../../assets/imgs/schedule/icon_todo_common.svg"
import TodoEnd from "../../../../../assets/imgs/schedule/icon_todo_end.svg"
import SelectedLocation from "../../../../../assets/imgs/schedule/icon_location_selected.svg"
import Location from "../../../../../assets/imgs/schedule/icon_location_non_selected.svg"
import EventAdd from "../../../../../assets/imgs/schedule/icon_event_add.svg"
import TodoDelete from "../../../../../assets/imgs/schedule/icon_todo_delete.svg"
import TodoModify from "../../../../../assets/imgs/schedule/icon_todo_modify.svg"
import { useAndroidId } from "../../../../../hooks/useAuth";

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
    const androidId = useAndroidId();
    const scheduleId = route.params.id ?? 0;
    const { getSchedule, modifySchedule, deleteSchedule, endSchedule } = useSchedule();
    const [type, setType] = useState<number>(0); // 0: 조회하기 1: 수정하기
    const dateType: number = 0 // 0: 12시간제, 1: 24시간제
    const [schedule, setSchedule] = useState<Schedule>({
        id: 0,
        title: '',

        status: 1,
        todoList: [{
            type: 0,
            id: 0,
            title: '',
            startTime: 'new Date()',
            endTime: 'new Date()',

            location: '',
            
            handle: false
        }]
    });    
    const [deleteIdList, setDeleteIdList] = useState<number[]>([]); // 삭제할 todo id
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
    const [targetKey, setTargetKey] = useState<'startTime' | 'endTime'>('startTime');
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

    const getStartTime = () => {
        if (schedule && schedule.todoList) {
            const start = new Date(schedule.todoList[0].startTime);
            return start.getFullYear() + '.' + (start.getMonth() + 1) + '.' + start.getDate()
        }
    }

    // add todo
    const addTodo = () => {
        const getNextTime = () => {
            const now = new Date();
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            now.setHours(now.getHours() + 1);
        
            return now;
        }

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
                        if (schedule.todoList && schedule.todoList[index].id) {
                            setDeleteIdList(prev => [...prev, schedule.todoList![index].id!])
                        }

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

    // modify schedule
    const modify = async () => { 
        Alert.alert(
            '알림',
            '일정을 저장하시겠습니까?',
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

                            const payload: Payload = await modifySchedule(androidId, newSchedule, deleteIdList)

                            if (payload.code === 200) {
                                Alert.alert('알림', '일정이 수정되었습니다.')
                                setType(0)
                            }
                        }
                    },
                }
            ],
        )
    }

    return (
        <View style={{ flex: 1 }}>
            { type === 0 ? <TabHeader title="일정 상세보기" type={ 0 } isFocused={ false } before={""} />
            : <TabHeader title="일정 수정하기" type={ 0 } isFocused={ false } before={""} />  }
            
            { schedule &&
                <ScrollView showsVerticalScrollIndicator={ false } contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={ styles.wrapper }>
                        <View style={ styles.container }>
                            { type === 0 ? (
                                <View style={[ styles.rowContainer, type === 0 && { marginBottom: 26 }]}>

                                     <Text style={[ styles.boldText, { flex: 1 }]}>{ schedule.title }</Text> 
                                 
                                    { schedule.status === 1 &&
                                        <Pressable style={ styles.modifyBtn } onPress={ () => setType(1) }>
                                            <Text style={[ styles.boldText, { fontSize: 16, color: '#ffffff' }]}>수정하기</Text>
                                        </Pressable>
                                    }
                                </View>
                            ) : (
                                <View >
                                    <TextInput style={[ styles.title, schedule.todoList && schedule.todoList.length > 0 && schedule.todoList[0].startTime !== '' && { borderBottomWidth: 0 }]} 
                                        placeholder="일정 제목" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                                        onFocus={ () => handleFocus(titleRef) } onBlur={ () => handleBlur(titleRef)} value={ schedule.title } keyboardType="default" multiline={ false }
                                        onChangeText={(title: string): void => setSchedule(prev => ({ ...prev, title: title }))} onSubmitEditing={ () => handleBlur(titleRef) } />
                                </View>
                            )}
                       
    
                            { type === 0 ? (
                                // 조회
                                <View>
                                    <Text style={[ styles.regularText, { paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]}>{ getStartTime() }</Text>

                                    { schedule.todoList && schedule.todoList.length > 0 && schedule.todoList.map(( item: Todo, index: number ) => {
                                        if (schedule.todoList &&  schedule.todoList?.length > 0) {
                                            return (
                                                <View style={[ styles.rowContainer, { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]} key={ index }>
                                                    <View style={[ styles.rowContainer, { flex: 1 }]}>
                                                        { schedule.todoList.length > 1 &&
                                                            <>
                                                            { index === 0 && <TodoStart style={ styles.todoIcon } /> }
                                                                { index === schedule.todoList.length - 1 && <TodoEnd style={ styles.todoIcon } /> }
                                                                { index > 0 && index < schedule.todoList.length - 1 &&  <TodoCommon style={ styles.todoIcon } /> }
                                                            </>
                                                            
                                                        }
                                                        <Text style={[ styles.regularText, { letterSpacing: -0.5 } ]}>{ item.title }</Text>
                                                    </View>
                                                    <Text style={[ styles.regularText, { fontSize: 14, letterSpacing: -0.5 }]}>{ getTime(item) }</Text>
                                                </View>
                                            )
                                        }
                                    })}
                                </View>

                                ) : (
                                <View style={[ styles.blockContainer, { paddingVertical: 0 }]}>
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
                                                    <View style={[ styles.dateContainer, { paddingVertical: 0, borderBottomWidth: 0 }]}>
                                                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                                                            <TodoModify style={{ marginRight: 15 }} />
                                                            <TextInput style={[ styles.eventTitle, { borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]} 
                                                            placeholder="할 일" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                                                            value={ item.title } keyboardType="default"  scrollEnabled={ false } multiline={ false }
                                                            onChangeText={(text) => {
                                                                setSchedule(prev => {
                                                                    const newList = [...(prev.todoList || [])]; 
                                                                    newList[index].title = text;
                                                                    return { ...prev, todoList: newList };
                                                                });
                                                            }} />
                                                            <Pressable onPress={ () => deleteTodo(index) }>
                                                                <TodoDelete />
                                                            </Pressable>
                                                        </View>
                                                        
                                                    </View>
                                                    <View style={{ marginLeft: 40 }}>
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
                                                        <Pressable style={ styles.dateContainer }>
                                                            <View style={[ styles.rowContainer, { flex: 1 }]}>
                                                                { item.location ? <SelectedLocation style={ styles.icon } /> : <Location style={ styles.icon } /> }
                                                            
                                                                <Text style={ styles.regularText }>장소</Text>
                                                            </View>
                                                        </Pressable>
                                                    </View>
                                                   

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
                                    <Pressable style={[ styles.button, { marginHorizontal: 0, backgroundColor: '#f5f5f5' }]} onPress={ addTodo }>
                                        <View style={[ styles.rowContainer, { justifyContent: 'center' }]}>
                                            <EventAdd style={{ marginRight: 10 }} />
                                            <Text style={[ styles.regularText, { color: '#999999', opacity: 0.5 }]}>할일 추가하기</Text>
                                        </View>
                                    </Pressable>

                                    {/* save */}
                                    { schedule.title && schedule.title !== '' ? (
                                        <Pressable style={[ styles.button, { alignItems: 'center', marginHorizontal: 0, marginVertical: 20, backgroundColor: '#468ce6' }]} onPress={ modify }>
                                            <Text style={[ styles.regularText, { color: '#ffffff' }]}>저장</Text>
                                        </Pressable>
                                    ) : (
                                        <View style={{ marginBottom: 20 }}></View>
                                    )}
                                
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

        includeFontPadding: false,
        fontSize: 24,
        fontFamily: 'NotoSansKR-Bold',

        color: '#333333',
    },
    eventTitle: {
        flex: 1,
        height: 60,

        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666'
    },
    blockContainer: {
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
	},
    dateBtn: {
        paddingHorizontal: 15,
        paddingVertical: 7,

        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    },
})
export default ScheduleDetail;