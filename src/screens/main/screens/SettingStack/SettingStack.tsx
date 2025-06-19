import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SettingStackParamList } from "../../../../types/stack"
import Setting from "./screens/Setting"
import Favorite from "./screens/Favorite"
import SearchFavoriteLocation from "./screens/SearchFavoriteLocation"
import PrivacyPolicy from "./screens/PrivacyPolicy"


const Stack = createNativeStackNavigator<SettingStackParamList>()

const SettingStack = (): JSX.Element => {

	return (
		<Stack.Navigator>
            <Stack.Screen name='Setting' component={ Setting } options={{ headerShown: false }} />
            <Stack.Screen name='Favorite' component={ Favorite } options={{ headerShown: false }} />
            <Stack.Screen name='SearchFavoriteLocation' component={ SearchFavoriteLocation } options={{ headerShown: false }} />
            <Stack.Screen name='PrivacyPolicy' component={ PrivacyPolicy } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default SettingStack
