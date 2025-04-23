import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { ScheduleStackParamList } from "../../../../types/stack"
import ScheduleDetail from "./screens/ScheduleDetail"
import ScheduleHome from "./screens/ScheduleHome"
import ScheduleIndex from "./screens/ScheduleIndex"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

const ScheduleStack = (): JSX.Element => {

	return (
		<Stack.Navigator>
			<Stack.Screen name='ScheduleIndex' component={ ScheduleIndex } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleHome' component={ ScheduleHome } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleDetail' component={ ScheduleDetail } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default ScheduleStack
