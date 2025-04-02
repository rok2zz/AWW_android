import React from 'react';
import Home from './screens/Home';
import { MainTabParamList } from '../../types/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarm from './screens/Alarm';
import Routine from './screens/Routine';
import ScheduleStack from './screens/scheduleStack/ScheduleStack';

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTab = (): React.JSX.Element => {
	

	return (
		<Tab.Navigator  >
            <Tab.Screen name='Home' component={ Home } options={{ headerShown: false }} />
            <Tab.Screen name='Alarm' component={ Alarm } options={{ headerShown: false }} />
            <Tab.Screen name='ScheduleStack' component={ ScheduleStack } options={{ headerShown: false }} />
            <Tab.Screen name='Routine' component={ Routine } options={{ headerShown: false }} />
        </Tab.Navigator>
	);
}

export default MainTab;
