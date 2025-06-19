import { Dimensions, StyleSheet, View } from "react-native"
import { useState } from "react";
import { NaverMapMarkerOverlay, NaverMapView } from "@mj-studio/react-native-naver-map";
import { RouteProp } from "@react-navigation/native";
import { ScheduleStackParamList } from "../../../../../types/stack";
import { PlaceLocation } from "../../../../../slices/location";


//svg
import TabHeader from "../../../../../components/header/TabHeader";
import TodoSearchPlace from "../../../../../components/TodoSearchPlace";

interface Props {
    route: RouteProp<ScheduleStackParamList, 'SearchPlace'>
}

const SearchPlace = ({ route }: Props): JSX.Element => {
    const searchText = route.params?.name ?? '';
    const [location, setLocation] = useState<PlaceLocation>({
        lat: route.params?.lat ?? 0,
        lon: route.params?.lon ?? 0,
        placeName: route.params?.name ?? '',
    })

    return (
        <View style={ styles.wrapper }>
            <TabHeader title="위치 추가하기" type={ 0 } isFocused={ false } before={''} />
            <View style={ styles.placeSearchContainer }>
                <TodoSearchPlace type={ 1 } text={ searchText } />
            </View>
            <View style={ styles.mapContainer }>
                <NaverMapView
                    style={{ flex: 1, height: 440 }}
                    camera={{
                        latitude: Number(location.lat),
                        longitude: Number(location.lon),
                        zoom: 12
                    }}
                    onTapMap={ (e) => {
                        console.log('onTapMap', e); } }
                >   
                    <NaverMapMarkerOverlay
                        latitude={ Number(location.lat) }
                        longitude={ Number(location.lon) }
                        width={24}
                        height={34}
                    />
                </NaverMapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        height: Dimensions.get('window').height,

        backgroundColor: '#ffffff'
    },
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
    mapContainer: {
        height: 440,
    },
    placeSearchContainer: { 
        position: 'absolute',
        bottom: 0,
        left: 0,

        width: Dimensions.get('window').width,
        height: '50%',

        zIndex: 1
    },
    placeContainer: {
    },
})

export default SearchPlace;