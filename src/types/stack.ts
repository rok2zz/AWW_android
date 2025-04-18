import { NativeStackNavigationProp } from "@react-navigation/native-stack"

// RootStack
export type RootStackParamList = {
	MainTab: undefined,
	Home: undefined,
	Test: undefined,
	AlarmSetting: undefined,
    AlarmScreen: undefined
}

export type RootStackScreenName = keyof RootStackParamList
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

// MainTab
export type MainTabParamList = {
	Home: undefined,
	Alarm: undefined,
	Schedule: undefined,
	Routine: undefined
}

export type MainTabScreenName = keyof MainTabParamList
export type MainTabNavigationProp = NativeStackNavigationProp<MainTabParamList>

export type ScheduleStackParamList = {
	ScheduleHome: undefined,
	ScheduleDetail: undefined,
	ScheduleList: undefined
}

export type ScheduleScreenName = keyof ScheduleStackParamList
export type ScheduleNavigationProp = NativeStackNavigationProp<ScheduleStackParamList>