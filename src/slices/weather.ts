import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Forecasts {
    dateTime: string,
    shortPhrase: string,
    weatherIcon: number,
    temperature?: number,
    minimum?: number,
    maximum?: number,
    precipitationProbability?: number,
}

export interface Weather {
    locationKey: string,
    locationName: string,
    weatherText: string,
    weatherIcon: number,
    temperature: {
        value: number,
        minimum: number,
        maximum: number
    },

    dailyForecasts: Forecasts[],
    hourlyForecasts: Forecasts[],

    airQuality: {
        pm10Grade: string
    }
}

interface WeatherState {
    key?: string,
    currentWeather: Weather,
    favoriteLocationWeather?: Weather[],

    lastUpdateWeather: string
}

const initialState: WeatherState = {
    key: '',
    currentWeather: {
        locationKey: '',
        locationName: '',
        weatherText: '',
        weatherIcon: 0,
        temperature: {
            value: 0,
            minimum: 0,
            maximum: 0
        },
    
        dailyForecasts: [],
        hourlyForecasts: [],
    
        airQuality: {
            pm10Grade: '1'
        }
    },

    lastUpdateWeather: new Date().toString(),
}

const weatherSlice = createSlice ({
    name: 'weather',
    initialState,
    reducers: {
        saveFavoriteLocationWeather(state, action: PayloadAction<Weather[]>) {
            state.favoriteLocationWeather = action.payload
        },
        saveCurrentWeather(state, action: PayloadAction<Weather>) {
            state.currentWeather = action.payload}
        ,
        saveLastUpdateWeather(state, action: PayloadAction<string>) {
            state.lastUpdateWeather = action.payload
        },
        clearWeather() {
            return initialState
        }
    }
})

export default weatherSlice.reducer
export const { saveFavoriteLocationWeather, saveCurrentWeather, saveLastUpdateWeather, clearWeather } = weatherSlice.actions