import React from 'react';
import { MainTabParamList } from '../../types/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarm from './screens/Alarm';
import ScheduleStack from './screens/scheduleStack/ScheduleStack';
import BottomTabBar from '../../components/tabBar/BottomTabBar';
import Search from './screens/Search';
import Setting from './screens/Setting';
import HomeStack from './screens/HomeStack/HomeStack';

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTab = (): React.JSX.Element => {
	
	return (
		<Tab.Navigator initialRouteName='HomeStack' tabBar={ (props) => <BottomTabBar { ...props } /> } >
            <Tab.Screen name='HomeStack' component={ HomeStack } options={{ headerShown: false }} />
            <Tab.Screen name='Search' component={ Search } options={{ headerShown: false }} />
            <Tab.Screen name='Alarm' component={ Alarm } options={{ headerShown: false }} />
            <Tab.Screen name='ScheduleStack' component={ ScheduleStack } options={{ headerShown: false }} />
            {/* <Tab.Screen name='Routine' component={ Routine } options={{ headerShown: false }} /> */}
            <Tab.Screen name='Setting' component={ Setting } options={{ headerShown: false }} />
        </Tab.Navigator>
	);
}

export default MainTab;
