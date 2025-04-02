import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Linking, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApi } from '../../../hooks/useApi';
import Geolocation from '@react-native-community/geolocation';
import notifee, { AndroidImportance, IntervalTrigger, TimestampTrigger, TimeUnit, TriggerType } from '@notifee/react-native';

interface Location {
	lattitude: number,
	longitude: number
}

const Home = (): React.JSX.Element => {
	const { getApi } = useApi()

	const [location, setLocation] = useState<Location>({ lattitude: 0,longitude: 0 })

	useEffect(() => {
		getGeolocation()
	}, [])

	useEffect(() => {
		console.log(location)
	}, [location])

	const getGeolocation = async () => {
		if (Platform.OS === 'android') {
			const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
			console.log(granted);

			if (granted) {
				console.log('permission granted');
			} else {
				console.log('permission denied');
				try {
					const granted = await PermissionsAndroid.request(
					  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					  {
						title: '권한 요청',
						message: '권한이 필요합니다.',
						buttonNeutral: '나중에 묻기',
						buttonNegative: '취소',
						buttonPositive: '허용',
					  },
					);
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					} else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
						console.log('❌권한 요청을 차단했습니다.');
						openAppSettings();
					} else {
					  console.log('Camera permission denied');
					}
				  } catch (err) {
					console.warn(err);
				  }
			}
		  } else {
			Geolocation.requestAuthorization();
		  }

		Geolocation.getCurrentPosition(
			(position) => {
			//   console.log('위치 정보:', position);
			  setLocation({ lattitude: position.coords.latitude, longitude: position.coords.longitude })
			},
			(error) => {
			//   console.error('위치 정보를 가져오는 중 오류 발생:', error);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		  );
	}

	const openAppSettings = () => {
		Alert.alert(
			"알림 권한 필요",
			"앱에서 알림을 받으려면 설정에서 권한을 허용해주세요.",
			[
				{ text: "취소", style: "cancel" },
				{ text: "설정으로 이동", onPress: () => Linking.openSettings() }
			]
		);
	};

	const checkPermissions = async () => {
		if (Platform.OS === 'ios') {
			// requestMultiple([PERMISSIONS.IOS.NOTIFICATIONS]).then((statuses) => {
			// })
		} else if (Platform.OS === 'android') {
			const grantedNotification= await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
			if (grantedNotification) {
				console.log('Notification permission granted');
			} else {
				console.log('Notification permission denied');
				try {
					const granted = await PermissionsAndroid.request(
					  PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
					  {
						title: '권한 요청',
						message: '권한이 필요합니다.',
						buttonNeutral: '나중에 묻기',
						buttonNegative: '취소',
						buttonPositive: '허용',
					  },
					);
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					  console.log('You can use the notification');
					} else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
						console.log('❌ 사용자가 알림 권한 요청을 차단했습니다.');
						openAppSettings();
					} else {
					  console.log('Camera permission denied');
					}
				  } catch (err) {
					console.warn(err);
				  }
			}


		}
	}

	const createScheduledNotification = async () => {
		const date = new Date(Date.now());
		date.setMinutes(date.getMinutes() + 1);
		date.setSeconds(0);
		
		const channelId = await notifee.createChannel({
			id: 'default',
			name: 'Default Channel',
		  });
		// Trigger를 정의한다
		const trigger: TimestampTrigger = {
		  type: TriggerType.TIMESTAMP, // Interval과 Timestamp 중 선택
		  timestamp: date.getTime(), // 언제 알림을 띄울 것인지 시간 설정
		};
		  
		const date2 = new Date(trigger.timestamp)
		console.log(trigger.timestamp)
		console.log(date2)
		
		// Trigger Notification을 생성한다
		const triggerId = await notifee.createTriggerNotification(
		  {
			title: 'title',
			body: 'body',
			android: {
			  channelId: 'default',
			},
		  },
		  trigger,
		);
	};

	const display = async () => {
		// Request permissions (required for iOS)
		if (Platform.OS === 'ios') {
			await notifee.requestPermission();
		} else if (Platform.OS === 'android') {	
			checkPermissions();
		};

		// Create a channel (required for Android)
		const channelId = await notifee.createChannel({
			id: 'test',
			name: 'test Channel',
			importance: AndroidImportance.HIGH,
			sound: 'default',
			vibration: true
		});


		// Display a notification
		await notifee.displayNotification({
			title: 'Notification Title',
			body: 'Main body content of the notification222',
			android: {
				channelId,
				// smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
				// pressAction is needed if you want the notification to open the app when pressed
				pressAction: {
					id: 'test',
				},
			},
		});
	}

	const getTrigger = async () => {
		// await notifee.cancelTriggerNotifications()
		const triggerNotifications = await notifee.getTriggerNotifications();
		console.log(triggerNotifications[0]);
	}

	const cancelTrigger = async () => {
		await notifee.cancelTriggerNotifications()

	}
	const cancel = async () => {
		await notifee.deleteChannel('test');
	}

	return (
		<View>
			<Pressable style={ styles.button } onPress={ () => createScheduledNotification() }>
				<Text>팝업 예약</Text>
			</Pressable>
			<Pressable style={ styles.button } onPress={ () => display() }>
				<Text>팝업 요청</Text>
			</Pressable>
			<Pressable style={ styles.button2 } onPress={ () => getTrigger() }>
				<Text>트리거 확인</Text>
			</Pressable>
			<Pressable style={ styles.button2 } onPress={ () => cancelTrigger() }>
				<Text>트리거 제거</Text>
			</Pressable>
			<Pressable style={ styles.button2 } onPress={ () => cancel() }>
				<Text>채널 제거</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	
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

export default Home;
