import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/stack"
import { useEffect } from "react"
import Home from "./main/screens/Home"
import Test from "./screens/Test"
import MainTab from "./\bmain/MainTab"

const Stack = createNativeStackNavigator<RootStackParamList>()

export const version = '0.0.1'

const RootStack = (): JSX.Element => {
	// const isFirst = useIsFirst()

	return (
		<Stack.Navigator>
			<Stack.Screen name='MainTab' component={ MainTab } options={{ headerShown: false }} />

			<Stack.Screen name='Test' component={ Test } />	
		</Stack.Navigator>	
	)
}

export default RootStack
