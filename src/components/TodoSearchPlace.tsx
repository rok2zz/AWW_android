import { useState } from "react";   
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native"
import { Payload } from "../types/api";
import { useWeather } from "../hooks/useWeather";
import { Location } from "../slices/location";

import Delete from '../assets/imgs/common/icon_search_delete.svg';
import SearchIcon from '../assets/imgs/common/icon_search_gray.svg';


const TodoSearchPlace = (): JSX.Element => {
    const { searchPlace } = useWeather();
    const [searchText, setSearchText] = useState<string>('');
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [placeList, setPlaceList] = useState<Location[]>([]);

    const handleSearch = async () => {
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

    return (
        <View style={ styles.wrapper }>
            <View style={{ alignItems: 'center' }}>
                <View style={ styles.bar } />
            </View>

            <View style={ styles.searchContainer }>
				<View style={[ styles.rowContainer, { flex: 1 }]}>
					<TextInput style={ styles.search } placeholder="장소 또는 주소를 입력하세요" placeholderTextColor="#aaaaaa" returnKeyType="done" autoCapitalize='none' editable={ true } multiline={ false }
						value={ searchText } keyboardType="default" onChangeText={(text: string): void => setSearchText(text) } onSubmitEditing={ handleSearch }  />
				</View>

				{ searchText && searchText !== '' &&
					<View style={ styles.rowContainer }>
						<Pressable onPress={ clearSearchText }>
							<Delete />
						</Pressable>
						<Pressable onPress={ handleSearch }>
							<SearchIcon style={{ marginLeft: 10, marginRight: 15 }} />
						</Pressable>
					</View>
				}
			</View>        
            <ScrollView showsVerticalScrollIndicator={ false } >
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        paddingHorizontal: 20,

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
    }
})

export default TodoSearchPlace;