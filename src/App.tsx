import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackParamList } from './types/stack';
import notifee, { EventType } from '@notifee/react-native';
import RootStack from './screens/RootStack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

const store = configureStore({ reducer: rootReducer })

function App(): React.JSX.Element {
	const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null)


	useEffect(() => {
		return notifee.onForegroundEvent(async ({ type, detail }) => {
		})
	}, []);

	// useEffect(() => {
	// 	// 광고 설정 먼저 구성
	// 	mobileAds()
	// 		.setRequestConfiguration({
	// 		maxAdContentRating: MaxAdContentRating.PG,
	// 		tagForChildDirectedTreatment: true,
	// 		tagForUnderAgeOfConsent: true,
	// 		testDeviceIdentifiers: ['EMULATOR'], // 기기 테스트 ID
	// 	})
	// 	.then(() => {
	// 		// 설정 완료 후 SDK 초기화
	// 		return mobileAds().initialize();
	// 	})
	// 	.then(adapterStatuses => {
	// 		console.log('✅ Google Mobile Ads SDK 초기화 완료', adapterStatuses);
	// });
	// }, []);

	// const permissionTracking = async () => {
	// 	const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
	// 	if (result === RESULTS.DENIED) {
	// 	// The permission has not been requested, so request it.
	// 	await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
	// 	}

	// 	const adapterStatuses = await mobileAds().initialize();
	
	// }




	return (
		<Provider store={ store }>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer ref={ navigationRef }>
					<RootStack />
				</NavigationContainer>
			</GestureHandlerRootView>
		</Provider>
	);
}

export default App;
