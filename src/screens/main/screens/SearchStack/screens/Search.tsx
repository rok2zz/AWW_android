import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import TopTabBar from '../../../../../components/tabBar/TopTabBar';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SearchStackNavigationProp, SearchStackParamList } from '../../../../../types/stack';
import { Payload } from '../../../../../types/api';
import { PlaceLocation } from '../../../../../slices/location';

// svg
import LeftArrow from '../../../../../assets/imgs/common/chevron_left.svg';
import Delete from '../../../../../assets/imgs/common/icon_search_delete.svg';
import SearchIcon from '../../../../../assets/imgs/common/icon_search.svg';
import MiniSearchIcon from '../../../../../assets/imgs/common/icon_search_mini.svg';
import { useLocation } from '../../../../../hooks/useLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { adUnitId } from '../../../../RootStack';

interface Props {
	route: RouteProp<SearchStackParamList, 'Search'>
}

const Search = ({ route }: Props): React.JSX.Element => {
	const navigation = useNavigation<SearchStackNavigationProp>();
	const beforeScreen: string = route.params?.before ?? '';
	const { searchAddress } = useLocation();
	// const [tabType, setTabType] = useState<number>(0); // 0: 최근 검색, 1: 즐겨찾기
	const [searchText, setSearchText] = useState<string>('');
	const [isSearched, setIsSearched] = useState<boolean>(false);
	const [locationList, setLocationList] = useState<PlaceLocation[]>([]);
	const insets = useSafeAreaInsets();
	const bannerRef = useRef<BannerAd>(null);
	
	// const handleTypeChange = (type: number): void => {
	// 	setTabType(type);
	// }
	
	const handleSearch = async () => {
		if (searchText === '') return
		const payload: Payload = await searchAddress(searchText, 100);

		if (payload.locationList) {
			setLocationList(payload.locationList);
		}

		setIsSearched(true);
	}

	const clearSearchText = () => {
		setSearchText('');
		setLocationList([]);
		setIsSearched(false);
	}

	return (
		<View style={ styles.wrapper }>
			
			<View style={[ styles.searchContainer, { paddingTop: insets.top }]}>
				<View style={[ styles.rowContainer, { flex: 1 }]}>
					<Pressable onPress={ () => navigation.goBack() }>
						<LeftArrow style={{ marginRight: 10 }} />
					</Pressable>
					<TextInput style={ styles.search } placeholder="동/읍/면을 입력하세요." placeholderTextColor="#aaaaaa" returnKeyType="done" autoCapitalize='none' editable={ true } multiline={ false }
						value={ searchText } keyboardType="default" onChangeText={(text: string): void => setSearchText(text) } onSubmitEditing={ handleSearch }  />
				</View>

				{ searchText && searchText !== '' &&
					<View style={ styles.rowContainer }>
						<Pressable onPress={ clearSearchText }>
							<Delete />
						</Pressable>
						<Pressable onPress={ handleSearch }>
							<SearchIcon style={{ marginLeft: 20 }} />
						</Pressable>
					</View>
				}
			</View>

			{/* { !isSearched && <TopTabBar type={ tabType } typeChange={ handleTypeChange } tab1='최근 검색' tab2='즐겨찾기' /> } */}
			

			{/* { tabType === 0 ? ( */}
			<ScrollView showsVerticalScrollIndicator={ false } style={ styles.container }>
				<View style={{ marginBottom: 10 }}>
					<BannerAd  ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
				</View>
				
				{ locationList && locationList.length > 0 ? (
					<Pressable>
						{ locationList.map((item: PlaceLocation, index: number) => (
							<Pressable style={{ backgroundColor: '#ffffff' }} key={ index } onPress={ () => navigation.navigate('SearchDetail', { lat: item.lat, lon: item.lon, name: item.locationName ?? '' }) }>
								<View style={ styles.searchList }>
									<MiniSearchIcon style={{ marginRight: 10 }} />
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
			{/* ) : (
				<ScrollView showsVerticalScrollIndicator={ false } style={ styles.container }>
					{ locationList && locationList.length > 0 ? (
							<Pressable>
								{ locationList.map((item: PlaceLocation, index: number) => (
									<Pressable key={ index } onPress={ () => navigation.navigate('SearchDetail', { lat: item.lat, lon: item.lon, name: item.locationName ?? ''  }) }>	
										<View style={ styles.searchList }>
											<MiniSearchIcon style={{ marginRight: 10 }} />
											<Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Regular', color: '#999999' }}>{ item.locationName }</Text>
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
			)} */}

			
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
	searchList: {
		flexDirection: 'row',
		alignItems: 'center',

		paddingVertical: 10,
		paddingHorizontal: 20,

		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee'
	},
	button: {
		padding: 20,
		backgroundColor: 'orange',
	},
	button2: {
		padding: 20,
		backgroundColor: 'green',
	} ,
	regularText: {
		includeFontPadding: false,
		fontSize: 16,
		fontFamily: 'NotoSansKR-Regular',

		color: '#000000'
	} 
})

export default Search;
