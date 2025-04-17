
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface FavoriteLocation {
    key?: string,
    lattitude: number,
    longitude: number
}

interface LocationState {
    favoriteLocation: FavoriteLocation[]
}

const initialState: LocationState = {
    favoriteLocation: [{
        key: '0',
        lattitude: 0,
        longitude: 0
    }]
}

const locationSlice = createSlice ({
    name: 'location',
    initialState,
    reducers: {
        saveFavoriteLocation(state, action: PayloadAction<FavoriteLocation[]>) {
            state.favoriteLocation = action.payload
        },
        clearLocation() {
            return initialState
        }
    }
})

export default locationSlice.reducer
export const { saveFavoriteLocation, clearLocation } = locationSlice.actions