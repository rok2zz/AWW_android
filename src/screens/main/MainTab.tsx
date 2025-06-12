import React, { lazy } from 'react';
import { MainTabParamList } from '../../types/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '../../components/tabBar/BottomTabBar';
import HomeStack from './screens/HomeStack/HomeStack';
import SearchStack from './screens/SearchStack/SearchStack';
import { StackActions } from '@react-navigation/native';
import SettingStack from './screens/SettingStack/SettingStack';
import ScheduleStack from './screens/ScheduleStack/ScheduleStack';

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTab = (): React.JSX.Element => {
	
    const handleTabPress = (e: any, navigation: any, route: any) => {
        const state = route.state as any;
      
        if (state && state.routes.length > 1 && state.index > 0) {
            e.preventDefault();

            navigation.dispatch({
                ...StackActions.popToTop(),
                target: state.key,
            });
        }
    }

	return (
		<Tab.Navigator initialRouteName='HomeStack' tabBar={ (props) => <BottomTabBar { ...props } />} >
            <Tab.Screen name='HomeStack' component={ HomeStack } options={{ headerShown: false }} />
            <Tab.Screen name='SearchStack' component={ SearchStack } options={{ headerShown: false }} />
            {/* <Tab.Screen name='Alarm' component={ Alarm } options={{ headerShown: false }} /> */}
            <Tab.Screen name='ScheduleStack' component={ ScheduleStack } options={{ headerShown: false, lazy: false }} />
            {/* <Tab.Screen name='Routine' component={ Routine } options={{ headerShown: false }} /> */}
            <Tab.Screen name='SettingStack' component={ SettingStack } options={{ headerShown: false, lazy: false }} />
        </Tab.Navigator>
	);
}

export default MainTab;
