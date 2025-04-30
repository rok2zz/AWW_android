import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/stack"
import { useEffect } from "react"
import Test from "./screens/Test"
import MainTab from "./\bmain/MainTab"
import DeviceInfo from "react-native-device-info"
import { useAuthActions } from "../hooks/useAuth"

const Stack = createNativeStackNavigator<RootStackParamList>()

export const version = '0.0.1'

const RootStack = (): JSX.Element => {
	const { saveAndroidId } = useAuthActions();

	useEffect(() => {
		const getDeviceId = async () => {
			const androidId = await DeviceInfo.getAndroidId(); // 안드로이드 고유 ID
			saveAndroidId(androidId);
		};

		getDeviceId();
	}, [])

	return (
		<Stack.Navigator>
			<Stack.Screen name='MainTab' component={ MainTab } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default RootStack
