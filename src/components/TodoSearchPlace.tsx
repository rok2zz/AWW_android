import { useEffect, useState } from "react";   
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Payload } from "../types/api";
import { useLocation, useLocationActions, useSearchedPlace } from "../hooks/useLocation";
import { PlaceLocation } from "../slices/location";
import { Shadow } from "react-native-shadow-2";
import { useNavigation } from "@react-navigation/native";
import { ScheduleNavigationProp } from "../types/stack";

// svg
import Delete from '../assets/imgs/common/icon_search_delete.svg';
import SearchIcon from '../assets/imgs/common/icon_search_gray.svg';
import Map from '../assets/imgs/schedule/icon_schedule_map.svg';

interface Props {
    type: number, // 0: 검색, 1: 지도페이지
    text?: string
}

const TodoSearchPlace = ({ type,  text }: Props): JSX.Element => {
    const navigation = useNavigation<ScheduleNavigationProp>();
    const searchedPlace = useSearchedPlace();
    const { saveSearchedPlace } = useLocationActions();
    const { searchPlace } = useLocation();
    const [searchText, setSearchText] = useState<string>('');
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [placeList, setPlaceList] = useState<PlaceLocation[]>([]);

    useEffect(() => {
        if (text && text !== '') {
            handleSearch(text);
        }
    }, [text])

    const handleSearch = async (searchText: string) => {
        if (searchText === '') return
        const payload: Payload = await searchPlace(searchText, 100);

        if (payload.locationList) {
            setPlaceList(payload.locationList);
        }

        setIsSearched(true);
    }
    
    const clearSearchText = () => {
        setSearchText('');
        setPlaceList([]);
        setIsSearched(false);
    }

    const handleSelect = (place: PlaceLocation) => {
        if (type === 0) saveSearchedPlace(place);
    }

    const handleAdd = async (place: PlaceLocation) => {
        saveSearchedPlace(place);

        navigation.goBack(); // C → A로 이동
    }

    return (
        <View style={ styles.wrapper }>
            <Shadow 
                style={ styles.container }   
                offset={[0, 0]}
                startColor="rgba(0, 0, 0, 0.1)"
                endColor="rgba(0, 0, 0, 0)"
                distance={10}
                corners={{ topStart: true, topEnd: true, bottomStart: false, bottomEnd: false }}
                sides={{ top: true, bottom: false, start: false, end: false }}
            >
                <View style={{ alignItems: 'center' }}>
                    <View style={ styles.bar } />
                </View>

                <View style={ styles.searchContainer }>
                    <View style={[ styles.rowContainer, { flex: 1 }]}>
                        <TextInput style={ styles.search } placeholder="장소 또는 주소를 입력하세요" placeholderTextColor="#aaaaaa" returnKeyType="done" autoCapitalize='none' editable={ true } multiline={ false }
                            value={ searchText } keyboardType="default" onChangeText={(text: string): void => setSearchText(text) } onSubmitEditing={ () => handleSearch(searchText) }  />
                    </View>

                        <View style={ styles.rowContainer }>
                            { searchText && searchText !== '' &&
                                <Pressable onPress={ clearSearchText }>
                                    <Delete />
                                </Pressable>
                            }
                            <Pressable onPress={ () => handleSearch(searchText) }>
                                <SearchIcon style={{ marginLeft: 10, marginRight: 15 }} />
                            </Pressable>
                        </View>
                </View>        

                <ScrollView showsVerticalScrollIndicator={ false } style={{ height: Dimensions.get('window').height / 4.5 }}>
                    { placeList && placeList.length > 0 ? (
                        <Pressable>
                            { placeList.map((item: PlaceLocation, index: number) => (
                                <Pressable style={{ backgroundColor: '#ffffff' }} key={ index } onPress={ () => handleSelect(item) }>
                                    <View style={ styles.searchList }>
                                        <View style={{ flex: 1 }}>
                                            <Text style={ styles.regularText }>{ item.placeName }</Text>
                                            <Text style={[ styles.regularText, { fontSize: 12 }]}>{ item.placeAddress }</Text>
                                        </View>
                                        { type === 0 ? (
                                            <Pressable onPress={ () => navigation.navigate('SearchPlace', { lat: item.lat, lon: item.lon, name: item.placeName ?? '' }) }>
                                                <Map />
                                            </Pressable>
                                            ) : (
                                            <Pressable style={ styles.addBtn } onPress={ () => handleAdd(item) }>
                                                <Text style={ styles.extraBoldText }>+ </Text>
                                                <Text style={[ styles.regularText, { fontSize: 16, color:'#468ce6' }]}>추가</Text>
                                            </Pressable>
                                        )}

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
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        width: Dimensions.get('window').width,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#ffffff',
    },
    bar: {
        width: 50,
        height: 6,

        marginTop: 10,
        marginBottom: 23,

        borderRadius: 10,
        backgroundColor: '#dddddd'
    },
    searchContainer: {
        flexDirection: 'row',

        marginBottom: 20,
        marginHorizontal: 20,

        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    search: {
        flex: 1,
        height: 60,

        paddingLeft: 15,
        
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',
        color: '#000000',
    },
    searchList: {
        flexDirection: 'row',

        paddingHorizontal: 20,
        paddingVertical: 10,

        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',

        color: '#999999'
    },
    extraBoldText: {
        includeFontPadding: false,
        fontSize: 20,
        fontFamily: 'NotoSansKR-ExtraBold',

        color: '#468ce6'
    },
    addBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        height: 40,
        
        paddingHorizontal: 10,

        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#468ce6',
        backgroundColor: '#ffffff'
    }
})

export default TodoSearchPlace;