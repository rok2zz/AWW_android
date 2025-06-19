import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ScheduleStackNavigationProp, ScheduleStackParamList } from "../../../../types/stack"
import ScheduleDetail from "./screens/ScheduleDetail"
import ScheduleIndex from "./screens/ScheduleIndex"
import ScheduleCreate from "./screens/ScheduleCreate"
import SearchPlace from "./screens/SearchPlace"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import React, { useCallback } from "react"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

const ScheduleStack = (): JSX.Element => {
	const navigation = useNavigation<ScheduleStackNavigationProp>();
	const route = useRoute<any>();

	// useFocusEffect(
	// 	useCallback(() => {
	// 		navigation.navigate('ScheduleStack' as any, { screen: 'ScheduleIndex' });
	// 	}, [])
	//   );
	  
	return (
		<Stack.Navigator initialRouteName="ScheduleIndex">
			<Stack.Screen name='ScheduleIndex' component={ ScheduleIndex } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleDetail' component={ ScheduleDetail } options={{ headerShown: false }} />
			<Stack.Screen name='ScheduleCreate' component={ ScheduleCreate } options={{ headerShown: false }} />
			<Stack.Screen name='SearchPlace' component={ SearchPlace } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default ScheduleStack
