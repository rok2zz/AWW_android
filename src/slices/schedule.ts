import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ScheduleList {
    id: number,
    title: string,
    start: string,
    end?: string,
    
    status?: number,

    location?: string, 
    temperature?: number,
    todo?: Todo[]
}

export interface Todo {
    id: number,
    title: string,
    start: string,
    end: string,

    location?: string,
    temperature?: number
}

interface ScheduleState {
    mainScheduleList?: ScheduleList[],
    scheduleList?: ScheduleList[],
}

const initialState: ScheduleState = {
    mainScheduleList: []
}

const scheduleSlice = createSlice ({
    name: 'schedule',
    initialState,
    reducers: {
        saveMainScheduleList(state, action: PayloadAction<ScheduleList[]>) {
            state.mainScheduleList = action.payload
        },
        saveScheduleList(state, action: PayloadAction<ScheduleList[]>) {
            state.scheduleList = action.payload
        },
        clearWeather() {
            return initialState
        }
    }
})

export default scheduleSlice.reducer
export const { saveMainScheduleList, saveScheduleList, clearWeather } = scheduleSlice.actions