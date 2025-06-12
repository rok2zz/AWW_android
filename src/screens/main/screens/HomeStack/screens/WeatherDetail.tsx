import { Alert, Dimensions, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProp, HomeStackParamList, MainTabNavigationProp } from "../../../../../types/stack";
import { useEffect, useState } from "react";
import { Forecasts, Weather } from "../../../../../slices/weather";
import WeatherIcon from "../../../../../components/WeatherIcon";
import Svg, { Circle, Path } from "react-native-svg";
import { getAirQuality, getAirQuarityColor, getMoonPhase } from "../../../../../hooks/funcions";

// svg 
import LeftArrow from '../../../../../assets/imgs/common/chevron_left_white.svg'
import LocationIcon from '../../../../../assets/imgs/weather/icon_location_white.svg'
import Quater from '../../../../../assets/imgs/weather/img_quater.svg'
import Arrow from '../../../../../assets/imgs/weather/img_arrow.svg'
import Full from '../../../../../assets/imgs/weather/icon_moon_full.svg'
import New from '../../../../../assets/imgs/weather/icon_moon_new.svg'
import FirstQuarter from '../../../../../assets/imgs/weather/icon_moon_first_quarter.svg'
import ThirdQuarter from '../../../../../assets/imgs/weather/icon_moon_third_quater.svg'
import WaningGibbous from '../../../../../assets/imgs/weather/icon_moon_waning_gibbous.svg'
import WaxingGibbous from '../../../../../assets/imgs/weather/icon_moon_waxing_gibbous.svg'
import WaningCrescent from '../../../../../assets/imgs/weather/icon_moon_waning_crescent.svg'
import WaxingCrescent from '../../../../../assets/imgs/weather/icon_moon_waxing_crescent.svg'
import { PlaceLocation } from "../../../../../slices/location";


interface Props {
    route: RouteProp<HomeStackParamList, 'WeatherDetail'>
}

interface sunPhase {
    sunX: number,
    sunY: number,
    ratio: number,
    angle: number
}

const WeatherDetail = ({ route }: Props): JSX.Element => {
    const navigation = useNavigation<HomeStackNavigationProp>();
    const weather: Weather = route.params?.weather;
    const [showHeader, setShowHeader] = useState<boolean>(false);
    const [windWidth, setWindWidth] = useState<number>(0);

    const [sunPhase, setSunPhase] = useState<sunPhase>({
        sunX: 0,
        sunY: 0,
        ratio: 0,
        angle: 0
    });    

    const arcWidth = Dimensions.get('window').width - 100; // 원의 지름
    const radius = arcWidth / 2 - 10; // 반지름: padding 고려
    const arcLength = Math.PI * radius;
    const centerX = arcWidth / 2;
    const centerY = radius + 20;
    const arcPath = `M ${10} ${radius + 20} A ${radius} ${radius} 0 0 1 ${arcWidth - 10} ${radius + 20}`;

    useEffect(() => {
        if (weather.dailyForecasts) {
            const now = new Date();
            const hour = now.getHours();
            const sunRiseHour = new Date(weather.dailyForecasts[0]?.sunRise ?? '').getHours();
            const sunSetHour = new Date(weather.dailyForecasts[0]?.sunSet ?? '').getHours();
            const ratio = (hour - sunRiseHour) / (sunSetHour - sunRiseHour);

            const clampedRatio = Math.max(0, Math.min(1, ratio));
            const angle = Math.PI * clampedRatio;
            const baseX = centerX + radius * Math.cos(Math.PI - angle);
            const baseY = centerY - radius * Math.sin(Math.PI - angle);

            // 아크 위의 점에서 바깥 방향 (법선 벡터)
            const normalX = Math.sin(Math.PI - angle);
            const normalY = Math.cos(Math.PI - angle);

            // 보정된 원 중심
            const sunX = baseX + normalX * 5;
            const sunY = baseY + normalY * 5;

            setSunPhase({
                sunX,
                sunY,
                ratio: clampedRatio,
                angle
            })
        }
    },[weather])

    const handleScroll = (e: any) => {
        const offsetY = e.nativeEvent.contentOffset.y;

        if (offsetY > 200) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    }

    const MoonIcon = ( {moonPhase } : { moonPhase : string }): JSX.Element => {
        switch (moonPhase) {
            case 'New':
                return <New width={ 20 } height={ 20 } />
            case 'WaxingCrescent':
                return <WaxingCrescent width={ 20 } height={ 20 } />
            case 'FirstQuarter':
                return <FirstQuarter width={ 20 } height={ 20 } />
            case 'WaxingGibbous':
                return <WaxingGibbous width={ 20 } height={ 20 } />
            case 'Full':
                return <Full width={ 20 } height={ 20 } />
            case 'WaningGibbous':
                return <WaningGibbous width={ 20 } height={ 20 } />
            case 'LastQuarter':
                return <ThirdQuarter width={ 20 } height={ 20 } />
            case 'WaningCrescent':
                return <WaningCrescent width={ 20 } height={ 20 } />
            default: 
                return <></>
        }     
    }

    const getSunPhase = (time: string) => {
        const hour = new Date(time).getHours();
        const minutes = new Date(time).getMinutes();

        return hour < 12 ? ('오전 ' + hour + ':' + (minutes < 10 ? '0' + minutes : minutes)) : '오후 ' + (hour - 12)+ ':' + (minutes < 10 ? '0' + minutes : minutes);
    }

    return (
        <View style={ styles.wrapper }>
            <StatusBar backgroundColor='#98b5c3' />
            <View style={ styles.rowContainer }>
                <Pressable style={{ padding: 20 }} onPress={ () => navigation.goBack() }>
                    <LeftArrow />
                </Pressable>
                
                { weather && weather.locationKey !== '' && showHeader &&
                    <View style={ styles.rowContainer }>
                        <LocationIcon style={{ marginRight: 5 }} width={ 20 } height={ 20 } />
                        <Text style={[ styles.regularText, { marginRight: 10 }]}>{ weather.locationName }</Text>
                        <WeatherIcon index={ weather.weatherIcon } size={ 30 } />
                        <Text style={[ styles.extraBoldText, { fontSize: 20, marginRight: 5 }]}>{ weather.temperature.value.toFixed(0) }°</Text> 
                        <Text style={[ styles.regularText, { fontSize: 14 }]}>{ weather.dailyForecasts[0].shortPhrase }</Text>
                    </View>
                }
            </View>

            { weather.locationKey !== '' && 
                <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false } onScroll={ handleScroll }>
                    {/* 요약 */}
                    <View style={ styles.titleContainer }>
                        <View style={[ styles.rowContainer ]}>
                            <LocationIcon style={{ marginRight: 5 }} />
                            <Text style={[ styles.regularText ]}>{ weather.locationName }</Text>
                        </View>

                        <View style={[ styles.rowContainer, { marginBottom: 5 }]}>
                            <WeatherIcon index={ weather.weatherIcon } size={ 80 } />
                            <Text style={[ styles.extraBoldText ]}>{ weather.temperature.value.toFixed(0) }°</Text> 
                        </View>

                        <Text style={[ styles.regularText, { marginBottom: 5 }]}>{ weather.dailyForecasts[0].shortPhrase }</Text>
                        <Text style={[ styles.regularText, { marginBottom: 5 }]}>최저 { weather.temperature.minimum.toFixed(0) }° / 최고 { weather.temperature.maximum.toFixed(0) }°</Text>        
                    </View>

                    {/* 시간별 날씨 */}
                    <View style={ styles.contents }>
                        <View style={ styles.contentsTitle }>
                            <Text style={[ styles.regularText, { fontSize: 16 }]}>시간별 날씨</Text>
                        </View>
                        <ScrollView style={{ marginTop: 20, marginHorizontal: 5 }} horizontal showsHorizontalScrollIndicator={ false }>
                            <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
								{ weather.hourlyForecasts && weather.hourlyForecasts.map((item: Forecasts, index: number) => {
                                    const getTime = (): string => {
                                        const hour = new Date(item.dateTime).getHours();

                                        return hour < 12 ? '오전 ' + hour + '시' : '오후 ' + (hour - 12) + '시';
                                    }

									return (
										<View key={ index }>
											<View style={ styles.hourlyWeather }>
												<Text style={[ styles.regularText, { fontSize: 12, marginBottom: 13 }]}>{ getTime() }</Text>
												<WeatherIcon index={ item.weatherIcon } size={ 40 } />
												<Text style={[ styles.regularText, { marginTop: 10 }]}>{ item.temperature?.toFixed(0) }°</Text>
											</View>
										</View>
									)
								})}
							</ScrollView>
                        </ScrollView>
                    </View>

                    {/* 요일별 날씨 */}
                    <View style={ styles.contents }>
                        <View style={ styles.contentsTitle }>
                            <Text style={[ styles.regularText, { fontSize: 16 }]}>일별 예보</Text>
                        </View>

                        { weather.dailyForecasts && weather.dailyForecasts.map((item: Forecasts, index: number) => {
                            const getDay = (): string => {
                                const day = new Date(item.dateTime).getDay();
                                const days = ['일', '월', '화', '수', '목', '금', '토'];

                                return days[day];
                            }

                            const getDate = (): string => {
                                const date = new Date(item.dateTime).getDate();
                                const month = new Date(item.dateTime).getMonth() + 1;

                                return `${month}.${date < 10 ? '0' + date : date}`;
                            }

                            return (
                                <View style={ styles.dailyWeather } key={ index }> 
                                        <View style={{ width: 130 }}>
                                            { index === 0 ? <Text style={ styles.regularText }>오늘</Text> : 
                                                <View style={ styles.rowContainer}>
                                                    <Text style={[ styles.regularText, { marginRight: 15 } ]}>{ getDay() }</Text> 
                                                    <Text style={[ styles.regularText, { fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }]}>{ getDate() }</Text>
                                                </View>
                                            }
                                        </View>
                                    <View style={[ styles.rowContainer, { flex: 1, justifyContent: 'space-between'}]}>
                                        <WeatherIcon index={ item.weatherIcon } size={ 30 } />
                                        <Text style={[ styles.regularText, { color: 'rgba(255, 255, 255, 0.5)' }]}>{ item.minimum?.toFixed(0) ?? 0 }°</Text>
                                        <Text style={[ styles.regularText ]}>{ item.maximum?.toFixed(0) ?? 0 }°</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                    {/* 기타 날씨 */}
                    { weather.indexes &&
                        <View style={ styles.contents }>
                            <View style={ styles.contentsTitle }>
                                <Text style={[ styles.regularText, { fontSize: 16 }]}>대기 및 지수</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                {/* <View style={[ styles.rowContainer, { marginBottom: 10, justifyContent: 'space-between' }]}>
                                    <Text style={ styles.regularText }>주의보</Text>
                                    <View style={ styles.rowContainer }>
                                        <Text style={[ styles.regularText, { marginRight: 5, color: 'rgba(255, 255, 255, 0.5)' }]}>{ weather.indexes.relativeHumidity ?? 0 }%</Text>
                                        <Text style={ styles.regularText }>{ getAirQuality(weather.indexes.relativeHumidity ?? 0) }</Text>
                                    </View>                                
                                </View> */}

                                <View style={[ styles.rowContainer, { marginBottom: 10, justifyContent: 'space-between' }]}>
                                    <Text style={ styles.regularText }>미세먼지</Text>
                                    <View style={ styles.rowContainer }>
                                        <Text style={[ styles.regularText, { marginRight: 5, color: 'rgba(255, 255, 255, 0.5)' }]}>{ weather.indexes.pm10Value ?? 0 }㎍/m³</Text>
                                        <Text style={[ styles.regularText, { color: getAirQuarityColor(weather.indexes.pm10Grade ?? 0) }]}>{ getAirQuality(weather.indexes.pm10Grade ?? 0) }</Text>
                                    </View>                                
                                </View>

                                <View style={[ styles.rowContainer, { marginBottom: 10, justifyContent: 'space-between' }]}>
                                    <Text style={ styles.regularText }>초미세먼지</Text>
                                    <View style={ styles.rowContainer }>
                                        <Text style={[ styles.regularText, { marginRight: 5, color: 'rgba(255, 255, 255, 0.5)' }]}>{ weather.indexes.pm25Value ?? 0 }㎍/m³</Text>
                                        <Text style={[ styles.regularText, { color: getAirQuarityColor(weather.indexes.pm25Grade ?? 0) }]}>{ getAirQuality(weather.indexes.pm25Grade ?? 0) }</Text>
                                    </View>                                
                                </View>

                                <View style={[ styles.rowContainer, { marginBottom: 10, justifyContent: 'space-between' }]}>
                                    <Text style={ styles.regularText }>가시거리</Text>
                                    <View style={ styles.rowContainer }>
                                        <Text style={[ styles.regularText, { marginRight: 5, color: 'rgba(255, 255, 255, 0.5)' }]}>{ weather.indexes.visibility ?? 0 }km</Text>
                                        <Text style={ styles.regularText }>{ getAirQuality(weather.indexes.visiblityGrade ?? 0) }</Text>
                                    </View>                               
                                </View>

                                <View style={[ styles.rowContainer, { marginBottom: 10, justifyContent: 'space-between' }]}>
                                    <Text style={ styles.regularText }>자외선</Text>
                                    <View style={ styles.rowContainer }>
                                        <Text style={[ styles.regularText, { marginRight: 5, color: 'rgba(255, 255, 255, 0.5)' }]}>{ weather.indexes.uvIndex ?? 0 }</Text>
                                        <Text style={ styles.regularText }>{ getAirQuality(weather.indexes.uvIndexGrade ?? 0) }</Text>
                                    </View>                                
                                </View>

                                <View style={[ styles.rowContainer, { marginBottom: 10, justifyContent: 'space-between' }]}>
                                    <Text style={ styles.regularText }>습도</Text>
                                    <View style={ styles.rowContainer }>
                                        <Text style={[ styles.regularText, { marginRight: 5, color: 'rgba(255, 255, 255, 0.5)' }]}>{ weather.indexes.relativeHumidity ?? 0 }%</Text>
                                        <Text style={ styles.regularText }>{ getAirQuality(weather.indexes.relativeHumidity ?? 0) }</Text>
                                    </View>
                                </View>

                                <View style={[ styles.rowContainer, { marginBottom: 10, justifyContent: 'space-between' }]}>
                                    <Text style={ styles.regularText }>강수량</Text>
                                    <View style={ styles.rowContainer }>
                                        <Text style={[ styles.regularText, { marginRight: 5, color: 'rgba(255, 255, 255, 0.5)' }]}>{ weather.indexes.relativeHumidity ?? 0 }mm</Text>
                                        <Text style={ styles.regularText }>{ getAirQuality(weather.indexes.relativeHumidity ?? 0) }</Text>
                                    </View>                                
                                </View>
                            </View>
                        </View>
                    }

                    {/* 일조시간 및 풍속 */}
                    { weather.dailyForecasts && weather.dailyForecasts.length > 0 && 
                        <View style={ styles.contents }>
                            <View style={ styles.contentsTitle }>
                                <Text style={[ styles.regularText, { fontSize: 16 }]}>일조시간 및 풍속</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <View style={ [ styles.rowContainer, { justifyContent: 'flex-end' }]}>
                                    <Text style={[ styles.regularText, { fontSize: 12, marginRight: 5 }]}>{ getMoonPhase(weather.dailyForecasts[0]?.moonPhase ?? '') }</Text>   
                                    <MoonIcon moonPhase={ weather.dailyForecasts[0].moonPhase ?? ''} />
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <Svg width={ arcWidth } height={ centerY + 15 }>
                                        <Path
                                            d={arcPath}
                                            stroke="rgba(255, 255, 255, 0.5)"
                                            strokeWidth={ 5 }
                                            fill="none"
                                            strokeLinecap="square"
                                        />
                                        
                                       {/* 진행 아크 */}
                                        <Path
                                            d={arcPath}
                                            stroke="#fff"
                                            strokeWidth={ 5 }
                                            fill="none"
                                            strokeLinecap="square"
                                            strokeDasharray={arcLength + 10}
                                            strokeDashoffset={arcLength * (1 - sunPhase.ratio)}
                                        />

                                        {/* 3. 원 */}
                                        <Circle
                                            cx={ sunPhase.sunX }
                                            cy={ sunPhase.sunY }
                                            r={7}
                                            fill="#ffffff"
                                        />
                                    </Svg>

                                    <View style={[ styles.windPhase ]}
                                        onLayout={ e => setWindWidth(e.nativeEvent.layout.width) }
                                    >
                                        <View style={{ width: 100, alignItems: 'flex-end', marginRight: 10 }}>
                                            <Text style={[ styles.regularText, { fontSize: 12 }]}>{ weather.indexes.windDirection }풍</Text>
                                            <Text style={[ styles.regularText, { fontSize: 12 }]}>{ weather.indexes.windDegrees }°</Text>
                                        </View>

                                        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                                            <Quater width={ arcWidth / 2.5 } height={ arcWidth / 2.5 }/>

                                            <View style={ styles.windDirection }>
                                                <Arrow style={{ transform: [{ rotate: `${(weather.indexes.windDegrees + 180) % 360}deg` }] }} width={ arcWidth / 3.5 } height={ arcWidth / 3.5 } />
                                                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={[ styles.regularText, { marginBottom: -3, fontSize: 20 }]}>{ weather.indexes.windSpeed.toFixed(1) }</Text>
                                                    <Text style={[ styles.regularText, { fontSize: 12 }]}>m/s</Text>
                                                </View>
                                            </View>
                                        </View>
                                        

                                        <View style={{ width: 100, alignItems: 'flex-start', marginLeft: 10 }}>
                                            <Text style={[ styles.regularText, { fontSize: 12, color: 'rgba(255, 255, 255, 0.5)'} ]}>기압</Text>
                                            <Text style={[ styles.regularText, { fontSize: 12 }]}>{ Math.round(weather.indexes.pressure).toLocaleString() } hPa</Text>
                                        </View>
                                    </View>

                                    <View style={[ styles.sunPhase, { width: arcWidth - 50 }]}>
                                        <View style={{ alignItems: 'flex-start' }}>
                                            <Text style={[ styles.regularText, { fontSize: 10, color: 'rgba(255, 255, 255, 0.5)' }]}>일출</Text>
                                            <Text style={[ styles.regularText, { fontSize: 12 }]}>{ getSunPhase(weather.dailyForecasts[0]?.sunRise ?? '') }</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={[ styles.regularText, { fontSize: 10, color: 'rgba(255, 255, 255, 0.5)' }]}>일몰</Text>
                                            <Text style={[ styles.regularText, { fontSize: 12 }]}>{ getSunPhase(weather.dailyForecasts[0]?.sunSet ?? '') }</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    <View style={{ marginBottom: 150 }}></View>
                </ScrollView>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        backgroundColor: '#98b5c3'
    },
    container: {
        marginHorizontal: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',

        marginTop: 5,
        marginBottom: 60
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#ffffff'
    },
    extraBoldText: {
        includeFontPadding: false,
        fontSize: 80,
        fontFamily: 'NotoSansKR-ExtraBold',

        color: '#ffffff'
    },
    contents: {
        padding: 20,
        marginBottom: 20,

        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    contentsTitle: {
        paddingBottom: 14,

        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.25)'
    },
    hourlyWeather: {
		alignItems: 'center',
		marginRight: 15,
	},
    dailyWeather: {
        flexDirection: 'row',
        paddingVertical: 15,

        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.25)'
    },
    windPhase: {
        alignItems: 'center',
        justifyContent: 'space-between',

        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
    },
    windDirection: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sunPhase: {
        position: 'absolute',
        left: 35,
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default WeatherDetail