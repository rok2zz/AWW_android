import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Weather } from "../slices/weather"

// RootStack
export type RootStackParamList = {
	MainTab: undefined,
	AlarmSetting: undefined,
    AlarmScreen: undefined
}

export type RootStackScreenName = keyof RootStackParamList
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

// MainTab
export type MainTabParamList = {
	HomeStack: undefined,
	Search: {
		before?: string
	},
	Alarm: undefined,
	ScheduleStack: undefined,
	Routine: undefined,
	Setting: undefined
}

export type MainTabScreenName = keyof MainTabParamList
export type MainTabNavigationProp = NativeStackNavigationProp<MainTabParamList>

export type HomeStackParamList = {
	Home: undefined,
	WeatherDetail: {
		weather: Weather
	},
}

export type HomeStackScreenName = keyof HomeStackParamList
export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>

export type ScheduleStackParamList = {
	ScheduleHome: undefined,
	ScheduleCreate: undefined,
	ScheduleDetail: {
		id: number
	},
	ScheduleIndex: undefined
}

export type ScheduleScreenName = keyof ScheduleStackParamList
export type ScheduleNavigationProp = NativeStackNavigationProp<ScheduleStackParamList>