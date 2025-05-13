import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TabHeader from "../../../../../components/header/TabHeader";
import { useEffect, useState } from "react";

// svg
import Location from "../../../../../assets/imgs/schedule/icon_location_mark.svg"
import TopTabBar from "../../../../../components/tabBar/TopTabBar";
import { ScheduleNavigationProp } from "../../../../../types/stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Schedule } from "../../../../../slices/schedule";
import { useCurrentScheduleList, usePastScheduleList, useSchedule } from "../../../../../hooks/useSchedule";
import { Payload } from "../../../../../types/api";

const ScheduleIndex = (): JSX.Element => {
    const navigation = useNavigation<ScheduleNavigationProp>();
    const isFocused = useIsFocused();
    const { getScheduleList } = useSchedule();
    const [tabType, setTabType] = useState<number>(0); // 0: 현재 일정, 1: 종료된 일정
    const dateType: number = 0; // 0: 12시간제, 1: 24시간제
    const currentScheduleList: Schedule[] = useCurrentScheduleList();
    const pastScheduleList: Schedule[] = usePastScheduleList();

    useEffect(() => {
        if (isFocused) {
            getSchedule();
        }
    }, [isFocused]);

    // get Schedule list
    const getSchedule = async (): Promise<void> => {
        const payload: Payload = await getScheduleList('test001');
    };

    const getTime = (item: Schedule): string => {
        const start = new Date(item.earliestStart ?? '');
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

        if (item.latestEnd) {
            const end = new Date(item.latestEnd);
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

    const handleTypeChange = (newType: number) => {
        setTabType(newType)
    }

    return (
        <>
            <TabHeader title="일정 목록" type={ 0 } isFocused={ false } before={""} />
            
            <View style={ styles.tabContainer}>
                <TopTabBar type={ tabType } typeChange={ handleTypeChange } tab1="현재 일정" tab2="종료된 일정" />
            </View>

            { tabType === 0 ? (
                <ScrollView style={ styles.wrapper } showsVerticalScrollIndicator={ false }>
                    <View style={{ marginBottom: 150 }}>
                        { currentScheduleList && currentScheduleList.length > 0 && currentScheduleList.map(( item: Schedule, index: number ) => {

                            if (item.status === 1) {
                                return (
                                    <Pressable style={ styles.container } key={ index } onPress={ () => navigation.navigate('ScheduleDetail', { id: item.id ?? 0 }) }>
                                        <Text style={ styles.boldText }>{ item.title }</Text>
                                        <Text style={[ styles.regularText, { marginBottom: 16 }]}>{ getTime(item) }</Text>
                                        { item.location && (
                                            <View style={ styles.rowContainer }>
                                                <Location style={{ marginRight: 5 }} width={ 20 } height={ 20 } />
                                                <Text style={[ styles.regularText, { fontSize: 20, marginRight: 10 }]}>{ item.location }</Text>
        
                                                { item.temperature !== undefined && (
                                                    <View style={ styles.rowContainer }>
                                                        <Text style={[ styles.boldText, { fontSize: 20, marginBottom: 0 }]}>{ item.temperature }°</Text>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </Pressable>
                                )
                            }
                        })}
                    </View>
                </ScrollView>
            ) : (
                <ScrollView style={ styles.wrapper } showsVerticalScrollIndicator={ false }>
                    <View style={{ marginBottom: 150 }}>
                        { pastScheduleList && pastScheduleList.length > 0 && pastScheduleList.map(( item: Schedule, index: number ) => {

                            if (item.status === 0) {
                                return (
                                    <Pressable style={[ styles.container, { opacity: 0.7 }]} key={ index } onPress={ () => navigation.navigate('ScheduleDetail', { id: item.id ?? 0 }) }>
                                        <Text style={ styles.boldText }>{ item.title }</Text>
                                        <Text style={[ styles.regularText, { marginBottom: 16 }]}>{ getTime(item) }</Text>
                                        { item.location && (
                                            <View style={ styles.rowContainer }>
                                                <Location style={{ marginRight: 5 }} width={ 20 } height={ 20 } />
                                                <Text style={[ styles.regularText, { fontSize: 20, marginRight: 10 }]}>{ item.location }</Text>

                                                { item.temperature !== undefined && (
                                                    <View style={ styles.rowContainer }>
                                                        <Text style={[ styles.boldText, { fontSize: 20, marginBottom: 0 }]}>{ item.temperature }°</Text>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </Pressable>
                                )
                            }
                        })}
                    </View>
                    
                </ScrollView>
            )}
            
        </>

    )
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        padding: 20,
        marginTop: 20,
        marginHorizontal: 20,

        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    tabContainer: {
        borderTopWidth: 1,
        borderTopColor: '#cccccc'
    },
    boldText: {
		includeFontPadding: false,
        fontSize: 24,
        fontFamily: 'NotoSansKR-Bold',

        marginBottom: 16,

        color: '#333333'
    },
    regularText: {
		includeFontPadding: false,
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

})

export default ScheduleIndex;