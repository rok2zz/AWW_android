
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Setting {
    type: number // 0: metric, 1: imperial
    timeType: number // 0: 12시간제, 1: 24시간제
}

interface authState {
    androidId: string
    setting: Setting
}

const initialState: authState = {
    androidId: '',
    setting: {
        type: 0,
        timeType: 0
    }
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        saveAndroidId(state, action: PayloadAction<string>) {
            state.androidId = action.payload
        },
        saveSetting(state, action: PayloadAction<Setting>) {
            state.setting = action.payload
        },
        clear() {
            return initialState
        }
    }
})

export default authSlice.reducer
export const { saveAndroidId, saveSetting, clear } = authSlice.actions