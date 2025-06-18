import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import TabHeader from "../../../../../components/header/TabHeader";
import { useState } from "react";
import { PlaceLocation } from "../../../../../slices/location";
import { Payload } from "../../../../../types/api";
import { useNavigation } from "@react-navigation/native";
import { SettingStackNavigationProp } from "../../../../../types/stack";
import { useLocation } from "../../../../../hooks/useLocation";

import Delete from '../../../../../assets/imgs/common/icon_search_delete.svg';
import SearchIcon from '../../../../../assets/imgs/common/icon_search_gray.svg';
import { useFavoriteLocationWeather, useWeather } from "../../../../../hooks/useWeather";

const SearchFavoriteLocation = (): JSX.Element => { 
    const navigation = useNavigation<SettingStackNavigationProp>();
    const { searchAddress } = useLocation();
    const { getAddFavoriteWeather } = useWeather();
    const favoriteLocationWeather = useFavoriteLocationWeather();
    const [searchText, setSearchText] = useState<string>('');
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [locationList, setLocationList] = useState<PlaceLocation[]>([]);
    
    const handleSearch = async () => {
        if (searchText === '') return
        const payload: Payload = await searchAddress(searchText, 100);

        if (payload.locationList) {
            setLocationList(payload.locationList);
        }
    }

    const handleSelect = async (item: PlaceLocation) => {
        if (isSelected) return

        setIsSelected(true);
        const payload: Payload = await getAddFavoriteWeather(item.lat, item.lon, item.locationName ?? '');
        setIsSelected(false);

        if (payload.code !== 200) {
            Alert.alert('알림', payload.msg);
            return
        }

        navigation.goBack(); 
    }

    const clearSearchText = () => {
        setSearchText('');
        setLocationList([]);
    }

    return (
        <View style={ styles.wrapper }> 
            <TabHeader title="즐겨찾기 추가" type={ 0 } isFocused={ false } before={""} />
            
            <View style={ styles.container }>
                <View style={ styles.searchContainer }>
                    <TextInput style={ styles.search } placeholder="동/읍/면을 입력하세요." placeholderTextColor="#aaaaaa" returnKeyType="done" autoCapitalize='none' editable={ true } multiline={ false }
                        value={ searchText } keyboardType="default" onChangeText={(text: string): void => setSearchText(text) } onSubmitEditing={ handleSearch }  />

                    { searchText && searchText !== '' &&
                        <View style={ styles.rowContainer }>
                            <Pressable onPress={ clearSearchText }>
                                <Delete />
                            </Pressable>
                            <Pressable onPress={ handleSearch }>
                                <SearchIcon style={{ marginHorizontal: 10 }} />
                            </Pressable>
                        </View>
                    }
                </View>

                <ScrollView showsVerticalScrollIndicator={ false } style={{  paddingBottom: 50, flexGrow: 1}}>
                    { locationList && locationList.length > 0 ? (
                        <Pressable>
                            { locationList.map((item: PlaceLocation, index: number) => (
                                <Pressable style={{ backgroundColor: '#ffffff' }} key={ index } onPress={ () => handleSelect(item) }>
                                    <View style={ styles.searchList }>
                                        <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Regular', color: '#999999' }}>{ item.locationName ?? '' }</Text>
                                    </View>
                                </Pressable>
                            ))}
                        </Pressable>
                    ) : (
                        <View>
                            <Text style={[ styles.regularText, { textAlign: 'center', marginTop: 80 }]}>검색 결과가 없습니다.</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,

        marginTop: 10,
        
        backgroundColor: '#ffffff'
    },
    searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',

		marginHorizontal: 20,
        marginTop: 20,
		
        borderRadius: 10,
        backgroundColor: '#f5f5f5'
	},
	search: {
		flex: 1,
		height: 60,

		includeFontPadding: false,
		fontSize: 20,
		fontFamily: 'NotoSansKR-Regular',

        paddingLeft: 20,

		color: '#000000',

	},
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchList: {
		flexDirection: 'row',
		alignItems: 'center',

		paddingVertical: 10,
		paddingHorizontal: 20,

		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee'
	},
	regularText: {
		includeFontPadding: false,
		fontSize: 16,
		fontFamily: 'NotoSansKR-Regular',

		color: '#000000'
	} 
});

export default SearchFavoriteLocation;