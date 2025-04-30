import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp } from "../../../../../types/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { Focus } from "../../../../../types/screen";
import { Schedule, Todo } from "../../../../../slices/schedule";
import { useSchedule } from "../../../../../hooks/useSchedule";
import { Payload } from "../../../../../types/api";
import TabHeader from "../../../../../components/header/TabHeader";


//svg
import End from "../../../../../assets/imgs/schedule/icon_date_end.svg"
import EventAdd from "../../../../../assets/imgs/schedule/icon_event_add.svg"
import SelectedLocation from "../../../../../assets/imgs/schedule/icon_location_selected.svg"
import Location from "../../../../../assets/imgs/schedule/icon_location_non_selected.svg"
import TodoStart from "../../../../../assets/imgs/schedule/icon_todo_start.svg"
import TodoCommon from "../../../../../assets/imgs/schedule/icon_todo_common.svg"
import TodoEnd from "../../../../../assets/imgs/schedule/icon_todo_end.svg"

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

const ScheduleCreate = (): JSX.Element => {  
    const navigation = useNavigation<ScheduleNavigationProp>();
    const { createSchedule } = useSchedule();
    const dateType = 0; // 0: 12시간제, 1: 24시간제
    const [schedule, setSchedule] = useState<Schedule>({
        title: '',
        status: 1,
        
        todoList: [{
            title: '',
            start: '',
            end: '',

            type: true
        }]
    });
    const titleRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState<Focus>({ ref: titleRef, isFocused: false });
    const [titleType, setTitleType] = useState<boolean>();

    useEffect(() => {
        console.log(schedule.todoList)
    }, [schedule.todoList])

    const getStartTime = () => {
        if (schedule && schedule.todoList) {
            const start = new Date(schedule.todoList[0].start);
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

        // setSchedule(prev => ({
        //     ...prev, todoList: [...prev.todoList ?? [{ title: '', start: '', end: '', type: false }], { title: '', start: '', end: '', type: true}]
        // }));
        setSchedule(prev => {
            const updatedTodos = prev.todoList!.map(todo => ({
                ...todo,
                type: false
            }));
        
            const newTodo = { title: '', start: '', end: '', type: true };
        
            const sortedTodos = [...updatedTodos, newTodo].sort((a, b) => {
                const aTime = a.start ? new Date(a.start).getTime() : Infinity;
                const bTime = b.start ? new Date(b.start).getTime() : Infinity;
                return aTime - bTime;
            });
        
            return {
                ...prev,
                todoList: sortedTodos
            };
        });
    }

    const setDefaultTitle = (todo: Todo, index: number) => {
        if (todo.title.trim() === '') {
            setSchedule(prev => {
                const newTodoList = [...prev.todoList ?? []];
                newTodoList[index] = {
                    ...newTodoList[index],
                    title: `할 일 ${index + 1}`
                };
                return { ...prev, todoList: newTodoList };
            });
        }
    }

    // create schedule
    const create = async () => {
        const payload: Payload = await createSchedule(schedule);

        if (payload.code === 200) {
            navigation.navigate('ScheduleIndex');
        }
    }   

    return (
        <View style={ styles.wrapper }>
            <TabHeader title="일정 추가하기" type={ 0 } isFocused={ false } before={""} />
            <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
                <View style={[ styles.blockContainer, { paddingVertical: 0 }]}>
                    {/* title */}
                    <View style={[ styles.dateContainer, { paddingVertical: 0 }]}>
                        <TextInput style={[ styles.title, isFocused.ref === titleRef && isFocused.isFocused ? { borderBottomColor: '#cccccc'} : { borderBottomColor: '#cccccc'} ]} 
                            placeholder="일정 제목" placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                            onFocus={ () => handleFocus(titleRef) } onBlur={ () => handleBlur(titleRef)} value={ schedule.title } keyboardType="default" multiline={ false }
                            onChangeText={(title: string): void => setSchedule(prev => ({ ...prev, title: title }))} onSubmitEditing={ () => handleBlur(titleRef) } />
                    </View>

                    { schedule.todoList && schedule.todoList.length > 0 && schedule.todoList[0].start !== '' && (
                        <Text style={[ styles.regularText, { paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }]}>{ getStartTime() }</Text>
                    )}
                    
                    {/* todolist  */}
                    { schedule.todoList && schedule.todoList.map((item: Todo, index: number) => {
                        const getTime = (item: Todo): string => {
                            const start = new Date(item.start);
                    
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

                        if (item.type) {
                            return (
                                <View key={ index }>
                                    <View style={[ styles.dateContainer, { paddingVertical: 0 }]}>
                                        <TextInput style={[ styles.eventTitle, isFocused.ref === titleRef && isFocused.isFocused ? { borderBottomColor: '#cccccc'} : { borderBottomColor: '#cccccc'} ]} 
                                            placeholder={`할 일 ${index + 1}`} placeholderTextColor="#aaaaaa" ref={ titleRef } returnKeyType="next" autoCapitalize='none' editable={ true }
                                            value={ item.title } keyboardType="default" 
                                            onChangeText={(text) => {
                                                setSchedule(prev => {
                                                    const newList = [...(prev.todoList || [])]; 
                                                    newList[index].title = text;
                                                    return { ...prev, todoList: newList };
                                                });
                                            }} />
                                    </View>
                                    <View style={ styles.dateContainer }>
                                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                                            <Text style={ styles.regularText }>시작</Text>
                                        </View>
                                        <View>
                                            <Text></Text>
                                        </View>
                                    </View>
                                    <View style={ styles.dateContainer }>
                                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                                            <Text style={ styles.regularText }>종료</Text>
                                        </View>
                                    </View>
                                    <View style={ styles.dateContainer }>
                                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                                            { item.location ? <SelectedLocation style={ styles.icon } /> : <Location style={ styles.icon } /> }
                                        
                                            <Text style={ styles.regularText }>장소</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                        
                        if (schedule.todoList) {
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
		padding: 20,
		marginTop: 20,

		borderRadius: 10,

		backgroundColor: '#f5f5f5',
	},
})
export default ScheduleCreate;