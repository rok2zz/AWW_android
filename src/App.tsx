import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackParamList } from './types/stack';
import notifee, { EventType } from '@notifee/react-native';
import RootStack from './screens/RootStack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const store = configureStore({ reducer: rootReducer })

function App(): React.JSX.Element {
	const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null)


	useEffect(() => {
		return notifee.onForegroundEvent(async ({ type, detail }) => {
		})
	}, []);

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
