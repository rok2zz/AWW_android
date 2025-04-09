import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackParamList } from './types/stack';
import notifee, { EventType } from '@notifee/react-native';
import RootStack from './screens/RootStack';

// const store = configureStore({ reducer: rootReducer })

function App(): React.JSX.Element {
	const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null)


	useEffect(() => {
		return notifee.onForegroundEvent(async ({ type, detail }) => {
		})
	}, []);

	return (
		// <Provider store={ store }>
			<NavigationContainer ref={ navigationRef }>
				<RootStack />
			</NavigationContainer>
		// </Provider>
	);
}

export default App;
