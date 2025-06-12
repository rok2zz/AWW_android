import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/stack"
import { useEffect } from "react"
import MainTab from "./\bmain/MainTab"
import DeviceInfo from "react-native-device-info"
import { useAuthActions } from "../hooks/useAuth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Setting } from "../slices/auth"
import { Payload } from "../types/api"
import { PlaceLocation } from "../slices/location"
import { useLocationActions } from "../hooks/useLocation"

const Stack = createNativeStackNavigator<RootStackParamList>()

export const version = '0.0.1'

const RootStack = (): JSX.Element => {
	const { saveAndroidId, saveSetting } = useAuthActions();

	useEffect(() => {
		getDeviceId();
		getSetting();
	}, [])
	
	const getDeviceId = async () => {
		const androidId = await DeviceInfo.getAndroidId(); // 안드로이드 고유 ID
		saveAndroidId(androidId);
	};

	const getSetting = async (): Promise<void> => {
		const storageSetting: string = await AsyncStorage.getItem('Setting') ?? '';

		if (!storageSetting) return

		const setting: Setting = JSON.parse(storageSetting);
		saveSetting(setting);
	};

	return (
		<Stack.Navigator>
			<Stack.Screen name='MainTab' component={ MainTab } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default RootStack
