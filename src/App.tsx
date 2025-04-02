import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackParamList } from './types/stack';
import notifee, { EventType } from '@notifee/react-native';import RootStack from './screens/RootStack';

// const store = configureStore({ reducer: rootReducer })

function App(): React.JSX.Element {
	const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null)

	const [loading, setLoading] = useState<boolean>(true);

	// Bootstrap sequence function
	// async function bootstrap() {
	// 	const initialNotification = await notifee.getInitialNotification();

	// 	if (initialNotification) {
	// 		console.log('Notification caused application to open', initialNotification.notification);
	// 		console.log('Press action used to open the app', initialNotification.pressAction);
	// 	}
	// }

	// useEffect(() => {
	// 	bootstrap()
	// 	.then(() => setLoading(false))
	// 	.catch(console.error);
	// }, []);

	return (
		// <Provider store={ store }>
			<NavigationContainer ref={ navigationRef }>
				<RootStack />
			</NavigationContainer>
		// </Provider>
	);
}

export default App;
