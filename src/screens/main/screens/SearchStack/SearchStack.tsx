import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SearchStackParamList } from "../../../../types/stack"
import Search from "./screens/Search"
import SearchDetail from "./screens/SearchDetail"


const Stack = createNativeStackNavigator<SearchStackParamList>()

const SearchStack = (): JSX.Element => {

	return (
		<Stack.Navigator>
			<Stack.Screen name='Search' component={ Search } options={{ headerShown: false }} />
			<Stack.Screen name='SearchDetail' component={ SearchDetail } options={{ headerShown: false }} />
		</Stack.Navigator>	
	)
}

export default SearchStack
