
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface authState {
    androidId: string
}

const initialState: authState = {
    androidId: ''
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        saveAndroidId(state, action: PayloadAction<string>) {
            state.androidId = action.payload
        },
        clear() {
            return initialState
        }
    }
})

export default authSlice.reducer
export const { saveAndroidId, clear } = authSlice.actions