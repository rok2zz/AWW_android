import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../../../../types/stack"
import Home from "./screens/Home"
import WeatherDetail from "./screens/WeatherDetail"


const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStack = (): JSX.Element => {

	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={ Home } options={{ headerShown: false }} />
			<Stack.Screen name='WeatherDetail' component={ WeatherDetail } options={{ headerShown: false }} />
			{/* <Stack.Screen name='FavoriteWeatherDetail' component={ FavoriteWeatherDetail } options={{ headerShown: false }} /> */}
		</Stack.Navigator>	
	)
}

export default HomeStack
