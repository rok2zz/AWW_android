import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface FavoriteWeather {
    key?: string,
    lattitude?: number,
    longitude?: number,
    location?: string,

    status?: string,
    temperature?: number,
    lowest?: number,
    highest?: number,

    dust?: string
}

interface WeatherState {
    key?: string
}

const initialState: WeatherState = {
    key: ''
}

const weatherSlice = createSlice ({
    name: 'weather',
    initialState,
    reducers: {
        saveFavoriteWeather(state, action: PayloadAction<any>) {
            state.key = action.payload
        },
        clearWeather() {
            return initialState
        }
    }
})

export default weatherSlice.reducer
export const { saveFavoriteWeather, clearWeather } = weatherSlice.actions