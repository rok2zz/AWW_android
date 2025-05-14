import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProp, HomeStackParamList } from "../../../../../types/stack";

// svg 
import LeftArrow from '../../../../../assets/imgs/common/chevron_left_white.svg'
import LocationIcon from '../../../../../assets/imgs/weather/icon_location_white.svg'
import { useEffect, useState } from "react";
import { Forecasts } from "../../../../../slices/weather";
import WeatherIcon from "../../../../../components/WeatherIcon";

interface Props {
    route: RouteProp<HomeStackParamList, 'WeatherDetail'>
}

const WeatherDetail = ({ route }: Props): JSX.Element => {
    const navigation = useNavigation<HomeStackNavigationProp>();
    const weather = route.params?.weather;
    const [showHeader, setShowHeader] = useState<boolean>(false);

    const handleScroll = (e: any) => {
        const offsetY = e.nativeEvent.contentOffset.y;

        if (offsetY > 200) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
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
                                        const minutes = new Date(item.dateTime).getMinutes();

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

                    {/* 미세먼지 */}
                    <View style={[ styles.contents, { marginBottom: 150 }]}>
                        <View style={ styles.contentsTitle }>
                            <Text style={[ styles.regularText, { fontSize: 16 }]}>미세먼지</Text>
                        </View>
                    </View>
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
    }
})

export default WeatherDetail