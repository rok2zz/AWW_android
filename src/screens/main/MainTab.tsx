import React from 'react';
import { MainTabParamList } from '../../types/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarm from './screens/Alarm';
import Routine from './screens/Routine';
import ScheduleStack from './screens/scheduleStack/ScheduleStack';
import BottomTabBar from '../../components/tabBar/BottomTabBar';
import Search from './screens/Search';
import Setting from './screens/Setting';
import Home from './screens/Home';

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTab = (): React.JSX.Element => {
	
	return (
		<Tab.Navigator initialRouteName='Home' tabBar={ (props) => <BottomTabBar { ...props } /> } >
            <Tab.Screen name='Home' component={ Home } options={{ headerShown: false }} />
            <Tab.Screen name='Search' component={ Search } options={{ headerShown: false }} />
            <Tab.Screen name='Alarm' component={ Alarm } options={{ headerShown: false }} />
            <Tab.Screen name='ScheduleStack' component={ ScheduleStack } options={{ headerShown: false }} />
            {/* <Tab.Screen name='Routine' component={ Routine } options={{ headerShown: false }} /> */}
            <Tab.Screen name='Setting' component={ Setting } options={{ headerShown: false }} />
        </Tab.Navigator>
	);
}

export default MainTab;
