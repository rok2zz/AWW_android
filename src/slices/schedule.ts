import { PayloadAction, createSlice } from "@reduxjs/toolkit"

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