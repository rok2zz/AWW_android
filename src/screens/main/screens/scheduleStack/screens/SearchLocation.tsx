import { PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Payload } from "../../../../../types/api";
import { useEffect, useState } from "react";
import { useWeather } from "../../../../../hooks/useWeather";
import { Weather } from "../../../../../slices/weather";
import { NaverMapMarkerOverlay, NaverMapView } from "@mj-studio/react-native-naver-map";
import { useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp } from "../../../../../types/stack";
import WeatherIcon from "../../../../../components/WeatherIcon";
import { getAirQuality, getAirQuarityColor, openAppSettings } from "../../../../../hooks/funcions";


//svg
import LeftArrow from '../../../../../assets/imgs/common/chevron_left.svg';
import Geolocation from "@react-native-community/geolocation";

interface Location {
    latitude: number;
    longitude: number;
    name: string;
}

const SearchLocation = (): JSX.Element => {
    const navigation = useNavigation<ScheduleNavigationProp>();
    const { getWeather, searchPlace } = useWeather();
    const [searchText, setSearchText] = useState<string>('');
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [locationList, setLocationList] = useState<Location[]>([]);
    const [weather, setWeather] = useState<Weather>();
    const [location, setLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
        name: ''
    })

    useEffect(() => {
        getGeolocation();
    }, [])

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
			  setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, name: '' })
			},
			(error) => {
			//   console.error('위치 정보를 가져오는 중 오류 발생:', error);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		  );
	}
    
    const getCurrentWeather = async () => {
        // const payload: Payload = await getWeather(latitude, longitude, 2);
        // console.log(payload)
        // if (payload.code === 200) {
        //     setWeather(payload.weather);
        // }
    }

    const handleSearch = async () => {
            if (searchText === '') return
            const payload: Payload = await searchPlace(searchText, 100);
    
            if (payload.locationList) {
                // setLocationList(payload.locationList);
            }
    
            setIsSearched(true);
        }
    
    const clearSearchText = () => {
        setSearchText('');
        setLocationList([]);
        setIsSearched(false);
    }

    return (
        <View style={ styles.wrapper }>
            <View style={ styles.titleContainer }>
				<View style={[ styles.rowContainer ]}>
					<Pressable onPress={ () => navigation.goBack() }>
						<LeftArrow style={{ marginRight: 10 }} />
					</Pressable>
                    <Text style={ styles.title }>{ location.name }</Text>
				</View>
			</View>
            <ScrollView showsVerticalScrollIndicator={ false } >
                <View style={ styles.mapContainer }>
                    <NaverMapView
                        style={{ flex: 1, height: 440 }}
                        camera={{
                            latitude: Number(location.latitude),
                            longitude: Number(location.longitude),
                            zoom: 12
                        }}
                        onTapMap={ (e) => {
                            console.log('onTapMap', e); } }
                    >   
                        <NaverMapMarkerOverlay
                            latitude={ Number(location.latitude) }
                            longitude={ Number(location.longitude) }
                            image={ require('../../../../../assets/imgs/common/map_pin.png')}
                            width={24}
                            height={34}
                        />
                    </NaverMapView>
                </View>
                <View style={ styles.infoContainer }>
                    <View style={{ alignItems: 'center' }}>
                        <View style={ styles.bar }></View>
                    </View>
                    <View style={ styles.rowContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <Text style={ styles.regularText }>{ location.name }</Text>
                        </View>
                        <View style={ styles.rowContainer }>
                            <Text style={[ styles.regularText, { marginRight: 5, color: '#cccccc' }]}>미세먼지</Text>
                            <Text style={[ styles.regularText, { color: getAirQuarityColor(weather?.indexes?.pm10Grade ?? 0) }]}>{ getAirQuality(weather?.indexes?.pm10Grade ?? 0) }</Text>
                        </View>
                        {/* <Text style={{}}>미세먼지</Text> */}
                    </View>
                    <View style={[ styles.rowContainer, { justifyContent: 'space-between'}]}>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <WeatherIcon index={ 1 } size={ 50 } />
                            <Text style={ styles.ExtraBoldText }>{ weather?.temperature.value.toFixed(0) }°</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={ styles.regularText }></Text>
                            {/* <Text style={ styles.regularText }>{ weather?.dailyForecasts[0]?.shortPhrase ?? '' }</Text> */}
                            <Text style={ styles.regularText }>최저 { weather?.temperature.minimum.toFixed(0) }° / 최고 { weather?.temperature.maximum.toFixed(0) }°</Text>	
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        backgroundColor: '#ffffff'
    },
    container: {

    },
    titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',

		paddingHorizontal: 20,
		paddingVertical: 15,
		marginBottom: 10,
	},
	title: {
		includeFontPadding: false,
		fontSize: 20,
		fontFamily: 'NotoSansKR-Regular',

		color: '#000000'
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
    mapContainer: {

    },
    infoContainer: {
        paddingHorizontal: 20,
        marginTop: -10,

        borderTopLeftRadius: 10,   
        borderTopRightRadius: 10,

        backgroundColor: '#ffffff'
    },
    bar: {
        width: 50,
        height: 6,

        marginTop: 10,
        marginBottom: 23,

        borderRadius: 10,
        backgroundColor: '#dddddd'
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#666666'
    },
    ExtraBoldText: {
		includeFontPadding: false,
        fontSize: 60,
        fontFamily: 'NotoSansKR-ExtraBold',

        color: '#666666'
	},
	boldText: {
		includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Bold',

        color: '#666666'
	},
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: 20,

        marginTop: 20,
        marginBottom: 30,

        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    }
})

export default SearchLocation;