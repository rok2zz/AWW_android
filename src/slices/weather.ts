import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Forecasts {
    dateTime: string,
    shortPhrase: string,
    weatherIcon: number,
    temperature?: number,
    minimum?: number,
    maximum?: number,
    precipitationProbability?: number,
    moonPhase?: string
    sunRise?: string,
    sunSet?: string
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

    indexes: {
        uvIndex: number,
        uvIndexGrade: number,
        visibility: number,
        visiblityGrade: number,
        relativeHumidity: number,
        precip1hr: number,
        pm10Grade?: number,
        pm10Value?: number,
        pm25Grade?: number,
        pm25Value?: number,
        windDirection: string,
        windDegrees: number,
        windSpeed: number,
        pressure: number
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
    
        indexes: {
            uvIndex: 0,
            uvIndexGrade: 0,
            visibility: 0,
            visiblityGrade: 0,
            relativeHumidity: 0,
            precip1hr: 0,
            pm10Grade: 0,
            pm10Value: 0,
            pm25Grade: 0,
            pm25Value: 0,
            windDirection: '',
            windDegrees: 0,
            windSpeed: 0,
            pressure: 0
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