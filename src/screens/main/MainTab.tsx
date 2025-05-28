import React from 'react';
import { MainTabParamList } from '../../types/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarm from './screens/Alarm';
import ScheduleStack from './screens/scheduleStack/ScheduleStack';
import BottomTabBar from '../../components/tabBar/BottomTabBar';
import Setting from './screens/Setting';
import HomeStack from './screens/HomeStack/HomeStack';
import SearchStack from './screens/SearchStack/SearchStack';
import { StackActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTab = (): React.JSX.Element => {
	
    const handleTabPress = (e: any, navigation: any, route: any) => {
        const state = route.state as any;
      
        if (state?.routes?.length > 1) {
          e.preventDefault();
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: state.key,
          });
        }
    }

	return (
		<Tab.Navigator initialRouteName='HomeStack' tabBar={ (props) => <BottomTabBar { ...props } /> } >
            <Tab.Screen name='HomeStack' component={ HomeStack } options={{ headerShown: false }} 
                listeners={({ navigation, route }) => ({ tabPress: (e) => handleTabPress(e, navigation, route),
            })}/>
            <Tab.Screen name='SearchStack' component={ SearchStack } options={{ headerShown: false }} 
                listeners={({ navigation, route }) => ({ tabPress: (e) => handleTabPress(e, navigation, route),
                })}/>
            <Tab.Screen name='Alarm' component={ Alarm } options={{ headerShown: false }} />
            <Tab.Screen name='ScheduleStack' component={ ScheduleStack } options={{ headerShown: false }} 
                listeners={({ navigation, route }) => ({ tabPress: (e) => handleTabPress(e, navigation, route),
                })}/>
            {/* <Tab.Screen name='Routine' component={ Routine } options={{ headerShown: false }} /> */}
            <Tab.Screen name='Setting' component={ Setting } options={{ headerShown: false }} />
        </Tab.Navigator>
	);
}

export default MainTab;
