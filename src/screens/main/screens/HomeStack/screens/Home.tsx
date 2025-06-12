import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, LayoutChangeEvent, Linking, PermissionsAndroid, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { HomeStackNavigationProp, MainTabNavigationProp, RootStackNavigationProp, ScheduleNavigationProp, SearchStackNavigationProp } from '../../../../../types/stack';
import { useSchedule } from '../../../../../hooks/useSchedule';
import { useAndroidId, useSetting } from '../../../../../hooks/useAuth';
import { FavoriteLocation, PlaceLocation } from '../../../../../slices/location';
import { Forecasts, Weather } from '../../../../../slices/weather';
import { Schedule } from '../../../../../slices/schedule';
import { Payload } from '../../../../../types/api';
import { useCurrentWeather, useWeather } from '../../../../../hooks/useWeather';
import { convertTemperature, formatHour, getAirQuality, getAirQuarityColor, openAppSettings } from '../../../../../hooks/funcions';
import Geolocation from '@react-native-community/geolocation';

// svg
import Dot from "../../../../../assets/imgs/common/paging_dot.svg"
import ActiveDot from "../../../../../assets/imgs/common/paging_active_dot.svg"
import FilledStar from "../../../../../assets/imgs/schedule/icon_filled_star.svg"
import Plus from "../../../../../assets/imgs/schedule/icon_plus.svg"
import ScheduleAdd from "../../../../../assets/imgs/schedule/icon_schedule_add.svg"
import WeatherIcon from '../../../../../components/WeatherIcon';
import { Setting } from '../../../../../slices/auth';



const Home = (): React.JSX.Element => {
	const navigation = useNavigation<HomeStackNavigationProp>();
    const tabNavigation = useNavigation<MainTabNavigationProp>();
	const searchNavigation = useNavigation<SearchStackNavigationProp>();
	const { getMainScheduleList } = useSchedule();
	const { getWeather } = useWeather(); 
	const userSetting: Setting = useSetting();
	const androidId: string = useAndroidId();
	const isFocused: boolean = useIsFocused();

	const [location, setLocation] = useState<PlaceLocation>({ lat: 0, lon: 0 })
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
	const [favoriteWeather, setFavoriteWeather] = useState<Weather[]>([
		// {
		// 	key: '1',
		// 	lattitude: 1,
		// 	longitude: 1,
		// 	location: '서울 신사동',
		// 	status: '맑음',
		// 	temperature: 15,
		// 	lowest: 8,
		// 	highest: 16,
		// 	dust: '매우 나쁨'
		// },
		// {
		// 	key: '2',
		// 	lattitude: 1,
		// 	longitude: 1,
		// 	location: '인천 삼산동',
		// 	status: '맑음',
		// 	temperature: 18,
		// 	lowest: 8,
		// 	highest: 16,
		// 	dust: '매우 나쁨'
		// },
	])	
	const currentWeather =  useCurrentWeather();
	const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

	useEffect(() => {
		getGeolocation();

		const interval = setInterval(() => {
			getGeolocation();
		}, 3600000);
	  
		return () => clearInterval(interval);
	}, [])

	useEffect(() => {
		if (androidId && isFocused) {
			getMainSchedule();
		}
	}, [isFocused, androidId]);

	useEffect(() => {
		if (location.lat !== 0 && location.lon !== 0 && androidId) {
			getCurrentLocationWeather();
		}
	}, [location])

	// get lat, lon
	const getGeolocation = async () => {
		if (Platform.OS === 'android') {
			const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

			if (granted) {
				console.log('permission granted');
			} else {
				console.log('permission denied');
				try {
					const granted = await PermissionsAndroid.request(
					  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					  {
						title: '권한 요청',
						message: '권한이 필요합니다.',
						buttonNeutral: '나중에 묻기',
						buttonNegative: '취소',
						buttonPositive: '허용',
					  },
					);
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					} else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
						console.log('❌권한 요청을 차단했습니다.');
						openAppSettings();
					} else {
					  console.log('Camera permission denied');
					}
				  } catch (err) {
					console.warn(err);
				  }
			}
		  } else {
			Geolocation.requestAuthorization();
		  }

		Geolocation.getCurrentPosition(
			(position) => {
			//   console.log('위치 정보:', position);
			  setLocation({ lat: position.coords.latitude, lon: position.coords.longitude })
			},
			(error) => {
			//   console.error('위치 정보를 가져오는 중 오류 발생:', error);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		  );
	}

	const getMainSchedule = async () => {
		const payload: Payload = await getMainScheduleList(androidId);

		if (payload.code === 200) {
			setScheduleList(payload.scheduleList ?? [])
		}
	};

	// 현재 위치 날씨
	const getCurrentLocationWeather = async () => {
		const payload: Payload = await getWeather(location.lat, location.lon, 1);
	}
	
	// 즐겨찾기 날씨
	const getFavoriteLocationWeather = async () => {
		const payload: Payload = await getWeather(location.lat, location.lon, 0);
	}

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
										<Pressable style={ styles.swiperContainer } key={ index } onPress={ () => {} }>
											<View style={[ styles.rowContainer, { marginBottom: 10 }]}>
												<View style={[ styles.rowContainer, { flex: 1 }]}>
													<FilledStar style={ styles.icon } />
													<Text style={ styles.boldText }>{ item.location }</Text>
												</View>
												<View style={ styles.rowContainer }>
													<Text style={[ styles.regularText, { marginRight: 5, color: '#cccccc' }]}>미세먼지</Text>
													<Text style={[ styles.regularText, { color: getAirQuarityColor(item.airQuality.pm10Grade ?? 0) }]}>{ getAirQuality(item.airQuality.pm10Grade ?? 0) }</Text>
													</View>
											</View>

											<View style={ styles.rowContainer }>
												<View style={[ styles.rowContainer, { flex: 1 }]}>
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
					<Pressable style={ styles.contents } onPress={ () => tabNavigation.navigate('SettingStack' as any, { screen: 'Favorite' }) }>
						<View style={[ styles.rowContainer, { justifyContent: 'center' }]}>
							<Plus style={{ marginRight: 10 }} />
							<Text style={[ styles.regularText, { color: '#ffffff', opacity: 0.5 }]}>즐겨찾는 위치 추가</Text>
						</View>
					</Pressable>
				)}

				{/* current area */}
				{ currentWeather && (
					<View style={[ styles.contents, { padding: 0 }]}>
						<Pressable style={{ paddingHorizontal: 20, paddingTop: 20 }} onPress={ () => navigation.navigate('WeatherDetail', { weather: currentWeather, type: 'current' }) }>
							<View style={[ styles.rowContainer, { marginBottom: 10 }]}>
								<View style={[ styles.rowContainer, { flex: 1 }]}>
									<FilledStar style={ styles.icon } />
									<Text style={ styles.boldText }>{ currentWeather.locationName }</Text>
								</View>
								<View style={ styles.rowContainer }>
									<Text style={[ styles.regularText, { marginRight: 5, color: '#cccccc' }]}>미세먼지</Text>
									<Text style={[ styles.regularText, { color: getAirQuarityColor(currentWeather.indexes?.pm10Grade ?? 0) }]}>{ getAirQuality(currentWeather.indexes?.pm10Grade ?? 0) }</Text>
								</View>
							</View>

							<View style={[ styles.rowContainer, { paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#cccccc' }]}>
								<View style={[ styles.rowContainer, { flex: 1 }]}>
									<WeatherIcon index={ 1 } size={ 50 } />
									<Text style={ styles.ExtraBoldText }>{  convertTemperature(currentWeather.temperature.value, userSetting.type) }°{ userSetting.type === 0 ? 'C' : 'F' }</Text>
								</View>
								<View style={{ width: '50%' }}>
									<Text style={ styles.regularText }>{ currentWeather.dailyForecasts[0]?.shortPhrase ?? '' }</Text>
									<Text style={ styles.regularText }>최저 { convertTemperature(currentWeather.temperature.minimum, userSetting.type) }° / 최고 { convertTemperature(currentWeather.temperature.maximum, userSetting.type) }°</Text>	
								</View>
							</View>
						</Pressable>

						<View style={{ padding: 20 }}>
							<ScrollView horizontal showsHorizontalScrollIndicator={ false }>
								{ currentWeather.hourlyForecasts.map((item: Forecasts, index: number) => {
									return (
										<View key={ index }>
											<View style={ styles.hourlyWeather }>
												<Text style={[ styles.regularText, { fontSize: 12, marginBottom: 13 }]}>{ formatHour(new Date(item.dateTime), userSetting.timeType) }</Text>
												<WeatherIcon index={ item.weatherIcon } size={ 40 } />
												<Text style={[ styles.regularText, { marginTop: 10 }]}>{ item.temperature?.toFixed(0) }°</Text>
											</View>
										</View>
									)
								})}
							</ScrollView>
						</View>
					</View>
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
									const hours = start.getHours();
									const minutes = start.getMinutes();
									const days = ['일', '월', '화', '수', '목', '금', '토'];

									if (userSetting.timeType === 0) {
										const ampm = hours >= 12 ? '오후' : '오전';
										const formattedHours = hours % 12 || 12; // 0을 12로 변환
								
										return `${start.getMonth() + 1}.${start.getDate()}(${days[start.getDay()]}) ${ampm} ${formattedHours}시 ${minutes < 10 ? '0' + minutes: minutes}분`;
									}
								
									return `${start.getMonth() + 1}.${start.getDate()}(${days[start.getDay()]}) ${hours < 10 ? '0' + hours : hours }:${minutes < 10 ? '0' + minutes: minutes}`;
								}

								if (index < 5 && item.status == 1) {
									return (
										<Pressable style={[ styles.scheduleList, (index === scheduleList.length - 1) && { borderBottomWidth: 0 }]} onPress={ () => tabNavigation.navigate('ScheduleStack' as any, { screen: 'ScheduleDetail', params: { id: item.id }}) } key={ index }>
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
		backgroundColor: '#ffffff'
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
	currentPressable: {
		padding: 20,

		
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

export default Home;
