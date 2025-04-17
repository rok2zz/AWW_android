import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { ScheduleStackParamList } from "../../../../types/stack"
import ScheduleDetail from "./screens/ScheduleDetail"
import ScheduleHome from "./screens/ScheduleHome"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

export const version = '0.0.1'

const ScheduleStack = (): JSX.Element => {
	// const isFirst = useIsFirst()

	return (
		<Stack.Navigator>
			<Stack.Screen name='ScheduleHome' component={ ScheduleHome } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleDetail' component={ ScheduleDetail } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default ScheduleStack
