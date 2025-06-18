import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SettingStackNavigationProp } from "../../../../../types/stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import LeftArrow from '../../../../../assets/imgs/common/chevron_left.svg';
import { useEffect, useState } from "react";
import { Payload } from "../../../../../types/api";
import { useFavoriteLocationWeather, useWeather, useWeatherActions } from "../../../../../hooks/useWeather";
import { FavoriteWeather } from "../../../../../slices/weather";
import WeatherIcon from "../../../../../components/WeatherIcon";
import DeleteBtn from '../../../../../assets/imgs/schedule/icon_todo_delete.svg';
import Hamburger from '../../../../../assets/imgs/common/icon_hamburger.svg';
import Plus from '../../../../../assets/imgs/common/icon_plus.svg';
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useLocation } from "../../../../../hooks/useLocation";
import { PlaceLocation } from "../../../../../slices/location";
import { Setting } from "../../../../../slices/auth";
import { useSetting } from "../../../../../hooks/useAuth";
import { convertTemperature } from "../../../../../hooks/funcions";

const Favorite = (): JSX.Element => {
    const navigation = useNavigation<SettingStackNavigationProp>();
    const { getPlaceWeather, getFavoriteWeather } = useWeather();
    const favoriteLocationWeather = useFavoriteLocationWeather();
    const { saveFavoriteLocationWeather } = useWeatherActions();
    const userSetting: Setting = useSetting();    
    const { modifyFavoriteLocation, addFavoriteLocation } = useLocation();
    const isFocused = useIsFocused();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [favoriteList, setFavoriteList] = useState<FavoriteWeather[]>(); 
    const [deletedList, setDeletedList] = useState<FavoriteWeather[]>([]);

    useEffect(() => {
        if (isFocused) {
            setEditMode(false);
        }
    }, [isFocused]);

    useEffect(() => {
        if (favoriteLocationWeather) {
            setFavoriteList(favoriteLocationWeather)
        }
    }, [favoriteLocationWeather])

    const handleSearch = () => {
        if (favoriteLocationWeather?.length === 5) {
            Alert.alert('알림', '즐겨찾기는 최대 5개까지 가능합니다.');
            return                
        }

        navigation.navigate('SearchFavoriteLocation')    
    }

    const handleEdit = async () => {
        if (favoriteList && favoriteList.length > 0) {
            const payload: Payload = await modifyFavoriteLocation(favoriteList, deletedList);
            if (payload.code !== 200) {
                return
            }

            setDeletedList([]);
            setEditMode(false);
            Alert.alert('알림', '수정이 완료되었습니다.');
        }
    }

    const addDeletedList = (item: FavoriteWeather) => {
        setDeletedList((prev) => [...prev, item]);
        setFavoriteList((prev) => prev?.filter(fav => fav.locationKey !== item.locationKey));
    }

    const renderItem = ({ item, drag, isActive }: RenderItemParams<FavoriteWeather>) => (
        <View style={ styles.listItem }>
            <View style={[ styles.rowContainer, { flex: 1 }]}>
                { editMode && 
                    <Pressable style={{ marginRight: 10 }} onPress={ () => addDeletedList(item) }>
                        <DeleteBtn/>
                    </Pressable>
                }
                <Text style={ styles.regularText }>{ item.locationName ?? '' }</Text>
            </View>
            
            <View style={ styles.rowContainer }>
                <Text style={[ styles.regularText, { fontSize: 16, color: '#999999' }]}></Text>
                <WeatherIcon index={ item.temperatureValue.weatherIcon } size={ 40 } />
                <Text style={[ styles.regularText, { marginLeft: 10 }]}>{ convertTemperature(item.temperatureValue.value, userSetting.type) }°</Text>

                { editMode && 
                    <Pressable style={{ marginLeft: 10 }} onPressIn={ drag }>
                        <Hamburger />
                    </Pressable>
                }
            </View>
        </View>
    );


    return (
        <View style={ styles.wrapper }>
            <View style={[ styles.rowContainer, { justifyContent: 'center', paddingVertical: 15, backgroundColor: '#ffffff' }]}>
                <Pressable style={ styles.backBtn } onPress={ () => navigation.goBack() }>
                    <LeftArrow width={ 30 } height={ 30 }/>
                </Pressable>
                <Text style={ styles.regularText }>즐겨찾기</Text>
                { editMode ? (
                    <Pressable style={ styles.editBtn } onPress={ handleEdit }>
                        <Text style={[ styles.regularText, { color: '#468ce6' }]}>완료</Text>
                    </Pressable>
                ) : (
                    <>
                        { favoriteList && favoriteList.length > 0 && 
                            <Pressable style={ styles.editBtn } onPress={ () => setEditMode(true) }>
                                <Text style={[ styles.regularText, { color: '#ef4f4f' }]}>편집</Text>
                            </Pressable>
                        }
                    </>
                )}
            </View>

            { favoriteList && favoriteList.length > 0 &&
                <DraggableFlatList data={ favoriteList }
                    onDragEnd={({ data }) => {
                        setFavoriteList(data);
                    }} 
                    keyExtractor={(item, index) => `draggable-item-${item.locationName ?? ''}-${item.locationKey}`}
                    renderItem={ renderItem }>
                </DraggableFlatList>
            }

            { !editMode && 
                <Pressable style={ styles.addBtn } onPress={ handleSearch }>
                    <Plus style={{ marginRight: 10 }} />
                    <Text style={[ styles.regularText, { color: '#999999' }]}>위치 추가하기</Text>
                </Pressable>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    regularText: {
        includeFontPadding: false,

        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',
        color: '#000000'
    },
    backBtn: {
        position: 'absolute',
        top: 0,
        left: 20,
        paddingVertical: 15,
    },
    editBtn: {
        position: 'absolute',
        top: 0,
        right: 20,
        paddingVertical: 15,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 20,
        marginHorizontal: 20,
        padding: 20,

        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: 20,
        marginTop: 20,
        marginHorizontal: 20,

        borderRadius: 10,
        backgroundColor: '#dddddd'
    }
})

export default Favorite;