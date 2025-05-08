import React, { useEffect, useState } from 'react';
import { Dimensions, Image, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { MainTabNavigationProp, RootStackNavigationProp, ScheduleNavigationProp } from '../../../types/stack';
import { useSchedule } from '../../../hooks/useSchedule';
import { useAndroidId } from '../../../hooks/useAuth';
import { FavoriteLocation } from '../../../slices/location';
import { FavoriteWeather } from '../../../slices/weather';
import { Schedule } from '../../../slices/schedule';
import { Payload } from '../../../types/api';

// svg
import Dot from "../../../assets/imgs/common/paging_dot.svg"
import ActiveDot from "../../../assets/imgs/common/paging_active_dot.svg"
import FilledStar from "../../../assets/imgs/schedule/icon_filled_star.svg"
import Plus from "../../../assets/imgs/schedule/icon_plus.svg"
import ScheduleAdd from "../../../assets/imgs/schedule/icon_schedule_add.svg"
import Sunny from "../../../assets/imgs/weather/icon_sunny.svg"



const ScheduleHome = (): React.JSX.Element => {
    const tabNavigation = useNavigation<MainTabNavigationProp>();
	const { getMainScheduleList } = useSchedule();
	const androidId: string = useAndroidId();
	const isFocused: boolean = useIsFocused();

	const [favoriteLocation, setFavoriteLocation] = useState<FavoriteLocation[]>([{ key: '1', lattitude: 1, longitude: 1 },{ key: '1', lattitude: 1, longitude: 1 }])
	const [weather, setWeather] = useState<any>({
		key: '5',
		lattitude: 1,
		longitude: 1,
		location: '서울 압구정동',
		status: '맑음',
		temperature: 21,
		lowest: 8,
		highest: 23,
		dust: '매우 좋음',
	})
	const [favoriteWeather, setFavoriteWeather] = useState<FavoriteWeather[]>([
		{
			key: '1',
			lattitude: 1,
			longitude: 1,
			location: '서울 신사동',
			status: '맑음',
			temperature: 15,
			lowest: 8,
			highest: 16,
			dust: '매우 나쁨'
		},
		{
			key: '2',
			lattitude: 1,
			longitude: 1,
			location: '인천 삼산동',
			status: '맑음',
			temperature: 18,
			lowest: 8,
			highest: 16,
			dust: '매우 나쁨'
		},
	])	
	const [scheduleList, setScheduleList] = useState<Schedule[]>([]);


	useEffect(() => {
		if (androidId && isFocused) {
			getMainSchedule();
		}
	}, [isFocused, androidId]);

	const getMainSchedule = async () => {
		const payload: Payload = await getMainScheduleList('test001');

		if (payload.code === 200) {
			setScheduleList(payload.scheduleList ?? [])
		}
	};

	return (
		<View style={ styles.wrapper }>
			<ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
				{/* marked area */}
				{ favoriteWeather && favoriteWeather.length > 0 ? (
					<View style={[ styles.contents, { padding: 0, height: 160 }]}>
						<Swiper
							style={{ height: 150 }}
							paginationStyle={{ marginBottom: -10 }}
							dot={ <Dot style={{ marginHorizontal: 3 }} /> }
							activeDot={ <ActiveDot style={{ marginHorizontal: 3 }} /> }
							loop={ true }
						>
							{ favoriteWeather.map((item: any, index: number) => {

								if (index < 3) {
									return (
										<Pressable style={ styles.swiperContainer } key={ index } onPress={ () => console.log('asdf')}>
											<View style={[ styles.rowContainer, { marginBottom: 10 }]}>
												<View style={[ styles.rowContainer, { flex: 1 }]}>
													<FilledStar style={ styles.icon } />
													<Text style={ styles.boldText }>{ item.location }</Text>
												</View>
												<View style={ styles.rowContainer }>
													<Text style={[ styles.regularText, { marginRight: 5, color: '#cccccc' }]}>미세먼지</Text>
													<Text style={[ styles.regularText, { color: 'red' }]}>{ item.dust }</Text>
												</View>
											</View>

											<View style={ styles.rowContainer }>
												<View style={[ styles.rowContainer, { flex: 1 }]}>
													<Sunny style={ styles.icon } />
													<Text style={ styles.ExtraBoldText }>{ item.temperature }</Text>
												</View>
												<View>
													<Text style={ styles.regularText }>{ item.status }</Text>
													<Text style={ styles.regularText }>최저 { item.lowest }° / 최고 { item.highest }°</Text>	
												</View>
											</View>
										</Pressable>
									)
								}
							})}
						</Swiper>
					</View>
				) : (
					<Pressable style={ styles.contents }>
						<View style={[ styles.rowContainer, { justifyContent: 'center' }]}>
							<Plus style={{ marginRight: 10 }} />
							<Text style={[ styles.regularText, { color: '#ffffff', opacity: 0.5 }]}>즐겨찾는 위치 추가</Text>
						</View>
					</Pressable>
				)}


				{/* current area */}
				{ weather && (
					<Pressable style={ styles.contents }>
						<View style={[ styles.rowContainer, { marginBottom: 10 }]}>
							<View style={[ styles.rowContainer, { flex: 1 }]}>
								<FilledStar style={ styles.icon } />
								<Text style={ styles.boldText }>{ weather.location }</Text>
							</View>
							<View style={ styles.rowContainer }>
								<Text style={[ styles.regularText, { marginRight: 5, color: '#cccccc' }]}>미세먼지</Text>
								<Text style={[ styles.regularText, { color: 'red' }]}>{ weather.dust }</Text>
							</View>
						</View>

						<View style={[ styles.rowContainer, { paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#cccccc' }]}>
							<View style={[ styles.rowContainer, { flex: 1 }]}>
								<Sunny style={ styles.icon } />
								<Text style={ styles.ExtraBoldText }>{ weather.temperature }°</Text>
							</View>
							<View>
								<Text style={ styles.regularText }>맑음</Text>
								<Text style={ styles.regularText }>최저 { weather.lowest }° / 최고 { weather.highest }°</Text>	
							</View>
						</View>

						<ScrollView style={{ marginTop: 20 }} horizontal showsHorizontalScrollIndicator={ false }>
							{ Array.from({length: 10 }, (_, i) => i).map((index: number) => {
								return (
									<View  key={ index }>
										<View style={ styles.hourlyWeather }>
											<Text style={[ styles.regularText, { fontSize: 12 }]}>오후 12시</Text>
											<Text style={[ styles.regularText, { fontSize: 12 }]}>오후 12시</Text>
											<Text style={[ styles.regularText, { fontSize: 12 }]}>오후 12시</Text>
										</View>
									</View>
								)
							})}
						</ScrollView>
					</Pressable>
				)}

				{/* news */}
				{/* <View style={ styles.contents }>

				</View> */}

				{/* schedule */}
				{ scheduleList && scheduleList.length > 0 ? (
					<View style={[ styles.contents, { marginBottom: 150 }]}>
						<View style={ styles.rowContainer }>
							<Text style={[ styles.regularText, { flex: 1 }]}>일정</Text>
							<Pressable onPress={ () => tabNavigation.navigate('ScheduleStack' as any, { screen: 'ScheduleIndex' }) }>
								<Text style={[ styles.regularText, { fontSize: 12 }]}>더 보기 +</Text>
							</Pressable>
						</View>
						<View style={ styles.scheduleContainer }>
							{ scheduleList && scheduleList.length > 0 && scheduleList.map(( item: Schedule, index: number ) => {
								const getTime = (date: string): string => {
									const start = new Date(date);
									const hour = start.getHours();
									const minute = start.getMinutes();
									const days = ['일', '월', '화', '수', '목', '금', '토'];

									return `${start.getMonth() + 1}.${start.getDate()}(${days[start.getDay()]}) ${hour < 10 ? '0' + hour : hour }:${minute < 10 ? '0' + minute : minute}`;
								}

								if (index < 5 && item.status == 1) {
									return (
										<Pressable style={[ styles.scheduleList, (index === scheduleList.length - 1) && { borderBottomWidth: 0 }]} onPress={ () => tabNavigation.navigate('ScheduleStack' as any, { screen: 'Detail', id: item.id }) } key={ index }>
											<View style={[ styles.rowContainer, { padding: 20 }]}>
												<Text style={[ styles.regularText, { flex: 1, fontSize: 16 }]}>{ item.title }</Text>
												<Text style={[ styles.regularText, { fontSize: 14, color: 'rgba(255, 255, 255, 0.5)'} ]}>{ getTime(item.earliestStart ?? '') }</Text>
											</View>
										</Pressable>
									)
								}
							})}
						</View>
						<Pressable style={[ styles.contents, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} onPress={ () => tabNavigation.navigate('ScheduleStack' as any, { screen: 'ScheduleCreate' }) }>
							<View style={[ styles.rowContainer, { justifyContent: 'center' }]}>
								<ScheduleAdd style={{ marginRight: 10 }} />
								<Text style={[ styles.regularText, { color: '#ffffff', opacity: 0.5 }]}>일정 추가하기</Text>
							</View>
						</Pressable>
					</View>
				) : (
					<Pressable style={[ styles.contents, { marginBottom: 150 }]} onPress={ () => tabNavigation.navigate('ScheduleStack' as any, { screen: 'ScheduleCreate' }) }>
						<View style={[ styles.rowContainer, { justifyContent: 'center' }]}>
							<ScheduleAdd style={{ marginRight: 10 }} />
							<Text style={[ styles.regularText, { color: '#ffffff', opacity: 0.5 }]}>일정 추가하기</Text>
						</View>
					</Pressable>
				)}
				
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		marginHorizontal: 20,
	},
	contents: {
		padding: 20,
		marginTop: 20,

		borderRadius: 10,

		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	swiperContainer: {
		padding: 20,
	},
	icon: {
		width: 50,
		height: 50,
		
		marginRight: 5
	},
	miniIcon: {
		width: 40,
		height: 40
	},
	ExtraBoldText: {
		includeFontPadding: false,
        fontSize: 60,
        fontFamily: 'NotoSansKR-ExtraBold',

        color: '#ffffff'
	},
	boldText: {
		includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Bold',

        color: '#ffffff'
	},
	regularText: {
		includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#ffffff'
	},
	hourlyWeather: {
		alignItems: 'center',
		marginRight: 15,
	},
	scheduleContainer: {
		marginTop: 20,
		
		borderRadius: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
	scheduleList: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.25)',
	}
})

export default ScheduleHome;
