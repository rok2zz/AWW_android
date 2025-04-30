import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Schedule {
    id?: number,
    title: string,
    
    earliestStart?: string,
    earliestEnd?: string,
    latestStart?: string,
    latestEnd?: string,

    status?: number,

    location?: string, 
    temperature?: number,
    todoList?: Todo[]
}

export interface Todo {
    id?: number,
    title: string,
    start: string,
    end?: string,

    location?: string,
    temperature?: number,

    type: boolean
}

interface ScheduleState {
    mainScheduleList: Schedule[],
    scheduleList?: Schedule[],
}

const initialState: ScheduleState = {
    mainScheduleList: [{
        id: 0,
        title: '',
        earliestStart: '',
        latestStart: '',
        latestEnd: '',
    }]
}

const scheduleSlice = createSlice ({
    name: 'schedule',
    initialState,
    reducers: {
        saveMainScheduleList(state, action: PayloadAction<Schedule[]>) {
            state.mainScheduleList = action.payload
        },
        saveScheduleList(state, action: PayloadAction<Schedule[]>) {
            state.scheduleList = action.payload
        },
        clearWeather() {
            return initialState
        }
    }
})

export default scheduleSlice.reducer
export const { saveMainScheduleList, saveScheduleList, clearWeather } = scheduleSlice.actions