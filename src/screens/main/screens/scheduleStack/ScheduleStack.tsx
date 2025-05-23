import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { ScheduleStackParamList } from "../../../../types/stack"
import ScheduleDetail from "./screens/ScheduleDetail"
import ScheduleIndex from "./screens/ScheduleIndex"
import ScheduleCreate from "./screens/ScheduleCreate"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

const ScheduleStack = (): JSX.Element => {

	return (
		<Stack.Navigator>
			{/* <Stack.Screen name='ScheduleHome' component={ ScheduleHome } options={{ headerShown: false }} /> */}
			<Stack.Screen name='ScheduleIndex' component={ ScheduleIndex } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleDetail' component={ ScheduleDetail } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleCreate' component={ ScheduleCreate } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default ScheduleStack
