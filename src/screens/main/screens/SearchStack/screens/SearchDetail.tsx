import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { HomeStackNavigationProp, SearchStackNavigationProp, SearchStackParamList } from "../../../../../types/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NaverMapMarkerOverlay, NaverMapView } from "@mj-studio/react-native-naver-map";
import { useEffect, useState } from "react";
import { getAirQuality, getAirQuarityColor } from "../../../../../hooks/funcions";
import { useWeather } from "../../../../../hooks/useWeather";
import { Payload } from "../../../../../types/api";
import { Weather } from "../../../../../slices/weather";
import WeatherIcon from "../../../../../components/WeatherIcon";

//svg 
import LeftArrow from '../../../../../assets/imgs/common/chevron_left.svg';
import EmptyStar from '../../../../../assets/imgs/common/empty_star.svg';
import Plus from '../../../../../assets/imgs/schedule/icon_event_add.svg';



interface Props {
    route: RouteProp<SearchStackParamList, 'SearchDetail'>
}

interface location {
    latitude: number;
    longitude: number;
    name: string;
}

const SearchDetaik = ({ route }: Props): JSX.Element => {
    const navigation = useNavigation<SearchStackNavigationProp>();
    const homeNavigation = useNavigation<HomeStackNavigationProp>();
    const { getWeather } = useWeather();
    const latitude: number = route.params?.lat ?? 0;
    const longitude: number = route.params?.lon ?? 0;
    const locationName: string = route.params?.name ?? '';

    const [weather, setWeather] = useState<Weather>();

    useEffect(() => {
        if (locationName !== '') {
            console.log('asdf')
            getCurrentWeather()
        }
    }, [])

    const getCurrentWeather = async () => {
        const payload: Payload = await getWeather(latitude, longitude, 2);
        console.log(payload)
        if (payload.code === 200) {
            setWeather(payload.weather);
        }
    }


    return (
        <View style={ styles.wrapper }>
            <View style={ styles.titleContainer }>
				<View style={[ styles.rowContainer ]}>
					<Pressable onPress={ () => navigation.goBack() }>
						<LeftArrow style={{ marginRight: 10 }} />
					</Pressable>
                    <Text style={ styles.title }>{ locationName }</Text>
				</View>
			</View>
            <ScrollView showsVerticalScrollIndicator={ false } >
                { locationName !== '' && 
                    <View style={ styles.mapContainer }>
                        <NaverMapView
                            style={{ flex: 1, height: 440 }}
                            camera={{
                                latitude: Number(latitude),
                                longitude: Number(longitude),
                                zoom: 12
                            }}
                            onTapMap={ (e) => {
                                console.log('onTapMap', e); } }
                        >   
                            <NaverMapMarkerOverlay
                                latitude={ Number(latitude) }
                                longitude={ Number(longitude) }
                                width={24}
                                height={34}
                            />
                        </NaverMapView>
                    </View>
                }
                <View style={ styles.infoContainer }>
                    <View style={{ alignItems: 'center' }}>
                        <View style={ styles.bar }></View>
                    </View>
                    <View style={ styles.rowContainer }>
                        <View style={[ styles.rowContainer, { flex: 1 }]}>
                            <EmptyStar style={{ marginRight: 5 }} />
                            <Text style={ styles.regularText }>{ locationName }</Text>
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

                    <Pressable style={ styles.button } onPress={ () => homeNavigation.navigate('HomeStack' as any, { screen: 'WeatherDetail', params: { weather: weather! }}) }>
                        <Plus style={{ marginRight: 5, transform: [{ translateY: 2 }] }} />
                        <Text style={[ styles.regularText, { color: '#999999' }]}>날씨 상세보기</Text>
                    </Pressable>
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

export default SearchDetaik;