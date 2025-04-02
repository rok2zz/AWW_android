import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import Schedule from "./screens/Schedule"
import { ScheduleStackParamList } from "../../../../types/stack"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

export const version = '0.0.1'

const ScheduleStack = (): JSX.Element => {
	// const isFirst = useIsFirst()

	return (
		<Stack.Navigator>
			<Stack.Screen name='Schedule' component={ Schedule } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default ScheduleStack
