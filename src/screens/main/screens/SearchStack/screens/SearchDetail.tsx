import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SearchStackNavigationProp, SearchStackParamList } from "../../../../../types/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NaverMapMarkerOverlay, NaverMapView } from "@mj-studio/react-native-naver-map";
import { useEffect, useState } from "react";


//svg 
import LeftArrow from '../../../../../assets/imgs/common/chevron_left.svg';
import EmptyStar from '../../../../../assets/imgs/common/empty_star.svg';
import { useWeather } from "../../../../../hooks/useWeather";
import { Payload } from "../../../../../types/api";
import { Weather } from "../../../../../slices/weather";


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
    const { getWeather } = useWeather();
    const latitude: number = route.params?.lat ?? 0;
    const longitude: number = route.params?.lon ?? 0;
    const locationName: string = route.params?.name ?? '';

    const [weather, setWeather] = useState<Weather>();

    useEffect(() => {
        if (locationName === '') {
            getCurrentWeather
        }
    }, [])

    const getCurrentWeather = async () => {
        const payload: Payload = await getWeather(latitude, longitude, 0);

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
                        >   
                            <NaverMapMarkerOverlay
                                latitude={ Number(latitude) }
                                longitude={ Number(longitude) }
                                image={ require('../../../../../assets/imgs/common/map_pin.png')}
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

                        {/* <Text style={{}}>미세먼지</Text> */}
                    </View>

                    <View style={[ styles.rowContainer, { marginTop: 10 }]}>

                        <View >
                            <Text style={ styles.regularText }></Text>
                            <Text style={ styles.regularText }></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {

    },
    titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',

		paddingHorizontal: 20,
		paddingVertical: 15,
		marginBottom: 10,

		backgroundColor: '#ffffff'
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
    }
})

export default SearchDetaik;