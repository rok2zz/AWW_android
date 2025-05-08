import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Linking, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import TopTabBar from '../../../components/tabBar/TopTabBar';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { MainTabNavigationProp, MainTabParamList } from '../../../types/stack';
import { useWeather } from '../../../hooks/useWeather';
import { Payload } from '../../../types/api';

// svg
import LeftArrow from '../../../assets/imgs/common/chevron_left.svg';
import Delete from '../../../assets/imgs/common/icon_search_delete.svg';
import SearchIcon from '../../../assets/imgs/common/icon_search.svg';
import { Location } from '../../../slices/location';

interface Props {
	route: RouteProp<MainTabParamList, 'Search'>
}

const Search = ({ route }: Props): React.JSX.Element => {
	const navigation = useNavigation<MainTabNavigationProp>();
	const beforeScreen: string = route.params?.before ?? '';
	const { searchLocation } = useWeather();
	const [tabType, setTabType] = useState<number>(0); // 0: 최근 검색, 1: 즐겨찾기
	const [searchText, setSearchText] = useState<string>('');
	const [offset, setOffset] = useState<number>(25);
	const [locationList, setLocationList] = useState<Location[]>([]);
	
	const handleBackNavigation = (): void => {
		if (beforeScreen === 'Home') {
			navigation.navigate('Home');
		}
	}

	const handleTypeChange = (type: number): void => {
		setTabType(type);
	}
	
	const handleSearch = async () => {
		const payload: Payload = await searchLocation(searchText, 100);

		if (payload.locationList) {
			setLocationList(payload.locationList);
		}
	}

	return (
		<View style={ styles.wrapper }>
			<View style={ styles.searchContainer }>
				<View style={[ styles.rowContainer, { flex: 1 }]}>
					<Pressable onPress={ handleBackNavigation }>
						<LeftArrow style={{ marginRight: 10 }} />
					</Pressable>
					<TextInput style={ styles.search } placeholder="주소 검색" placeholderTextColor="#aaaaaa" returnKeyType="done" autoCapitalize='none' editable={ true } multiline={ false }
						value={ searchText } keyboardType="default" onChangeText={(text: string): void => setSearchText(text) } onSubmitEditing={ handleSearch }  />
				</View>

				{ searchText && searchText !== '' &&
					<View style={ styles.rowContainer }>
						<Pressable onPress={ (): void => setSearchText('') }>
							<Delete />
						</Pressable>
						<Pressable onPress={ handleSearch }>
							<SearchIcon style={{ marginLeft: 20 }} />
						</Pressable>
					</View>
				}
			</View>

			<TopTabBar type={ tabType } typeChange={ handleTypeChange } tab1='최근 검색' tab2='즐겨찾기' />

			<ScrollView showsVerticalScrollIndicator={ false } style={ styles.container }>
				
			</ScrollView>
		</View>

		
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',

		paddingHorizontal: 20,
		paddingVertical: 15,
		marginBottom: 10,

		backgroundColor: '#ffffff'
	},
	search: {
		flex: 1,
		height: 50,

		includeFontPadding: false,
		fontSize: 20,
		fontFamily: 'NotoSansKR-Regular',

		color: '#000000'
	},
	wrapper: {

	},
	container: {
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		padding: 20,
		backgroundColor: 'orange',
	},
	button2: {
		padding: 20,
		backgroundColor: 'green',
	}  
})

export default Search;
