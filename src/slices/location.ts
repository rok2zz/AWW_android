
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface FavoriteLocation {
    key?: string,
    lattitude: number,
    longitude: number
}

export interface PlaceLocation {
    locationName?: string,
    lat: number,
    lon: number,
    locationKey?: string,
    placeName?: string,
    placeAddress?: string,
    kmaName?: string,
    id?: number
}

interface LocationState {
    favoriteLocation: PlaceLocation[]
    searchedPlace: PlaceLocation
    searchedLocation: PlaceLocation
}

const initialState: LocationState = {
    favoriteLocation: [{
        lat: 0,
        lon: 0
    }],
    searchedPlace: {
        lat: 0,
        lon: 0,
        placeName: ''
    },
    searchedLocation: {
        lat: 0,
        lon: 0,
    }
}

const locationSlice = createSlice ({
    name: 'location',
    initialState,
    reducers: {
        saveFavoriteLocation(state, action: PayloadAction<PlaceLocation[]>) {
            state.favoriteLocation = action.payload
        },
        saveSearchedPlace(state, action: PayloadAction<PlaceLocation>) {
            state.searchedPlace = action.payload
        },  
        clearLocation() {
            return initialState
        }
    }
})

export default locationSlice.reducer
export const { saveFavoriteLocation, saveSearchedPlace, clearLocation } = locationSlice.actions