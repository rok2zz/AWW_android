import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useCallback, useEffect } from "react"
import { ScheduleNavigationProp, ScheduleStackParamList } from "../../../../types/stack"
import ScheduleDetail from "./screens/ScheduleDetail"
import ScheduleIndex from "./screens/ScheduleIndex"
import ScheduleCreate from "./screens/ScheduleCreate"
import SearchLocation from "./screens/SearchLocation"
import { RouteProp, StackActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

const ScheduleStack = (): JSX.Element => {
	const navigation =useNavigation<ScheduleNavigationProp>();
	const route = useRoute<any>();

	useEffect(() => {
		navigation.popToTop();
	}, [navigation, route]);

	return (
		<Stack.Navigator initialRouteName="ScheduleIndex">
			{/* <Stack.Screen name='ScheduleHome' component={ ScheduleHome } options={{ headerShown: false }} /> */}
			<Stack.Screen name='ScheduleIndex' component={ ScheduleIndex } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleDetail' component={ ScheduleDetail } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleCreate' component={ ScheduleCreate } options={{ headerShown: false }} />
			<Stack.Screen name='SearchLocation' component={ SearchLocation } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default ScheduleStack
