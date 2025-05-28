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

interface TodoTemperature {
    dateTime: string,
    value: number | null,
    minimum: number | null,
    maximum: number | null,
    weatherIcon: number
}

export interface Todo {
    type: number,
    id?: number,
    title: string,
    startTime: string,
    endTime?: string,

    location?: string,
    lat?: number,
    lon?: number,
    temperatureValue?: TodoTemperature | null,
    temperatureTime?: string | null,

    handle: boolean
}

interface ScheduleState {
    mainScheduleList: Schedule[],
    currentScheduleList: Schedule[],
    pastScheduleList: Schedule[],
}

const initialState: ScheduleState = {
    mainScheduleList: [{
        id: 0,
        title: '',
        earliestStart: '',
        latestStart: '',
        latestEnd: '',
    }],
    currentScheduleList: [{
        id: 0,
        title: '',
        earliestStart: '',
        latestStart: '',
        latestEnd: '',
    }],
    pastScheduleList: [{
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
        saveCurrentScheduleList(state, action: PayloadAction<Schedule[]>) {
            state.currentScheduleList = action.payload
        },
        savePastScheduleList(state, action: PayloadAction<Schedule[]>) {
            state.pastScheduleList = action.payload
        },
        clearWeather() {
            return initialState
        }
    }
})

export default scheduleSlice.reducer
export const { saveMainScheduleList, saveCurrentScheduleList, savePastScheduleList, clearWeather } = scheduleSlice.actions