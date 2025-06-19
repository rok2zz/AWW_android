import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FavoriteWeather, Weather } from "../slices/weather"
import { PlaceLocation } from "../slices/location"

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
	SearchStack: undefined,
	Alarm: undefined,
	ScheduleStack: undefined,
	Routine: undefined,
	SettingStack: undefined
}

export type MainTabScreenName = keyof MainTabParamList
export type MainTabNavigationProp = NativeStackNavigationProp<MainTabParamList>

export type HomeStackParamList = {
	Home: undefined,
	WeatherDetail: {
		currentWeather?: Weather,
		favoriteWeather?: FavoriteWeather,
		type: string
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
	ScheduleIndex: undefined,
	SearchPlace: {
		lat: number,
		lon: number,
		name: string,
	}
}

export type ScheduleStackScreenName = keyof ScheduleStackParamList
export type ScheduleStackNavigationProp = NativeStackNavigationProp<ScheduleStackParamList>

export type SearchStackParamList = {
	Search: {
		before?: string
	},
	SearchDetail: {
		lat: number,
		lon: number,
		name: string
	},
	
}

export type SearchStackScreenName = keyof SearchStackParamList
export type SearchStackNavigationProp = NativeStackNavigationProp<SearchStackParamList>

export type SettingStackParamList = {
	Setting: undefined,
	Favorite: undefined,
	SearchFavoriteLocation: undefined,
	PrivacyPolicy: undefined,
}

export type SettingStackScreenName = keyof SettingStackParamList
export type SettingStackNavigationProp = NativeStackNavigationProp<SettingStackParamList>