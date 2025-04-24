import { Alert } from "react-native";
import axios from "axios";
import { Payload } from "../types/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices";
import { saveMainScheduleList, ScheduleList } from "../slices/schedule";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";

interface ScheduleHook {
    getMainScheduleList: (userId: string) => Promise<Payload>,
    createSchedule: (schedule: ScheduleList) => Promise<Payload>,
    getSchedule: (id: number) => Promise<Payload>,
}

export const useScheduleActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators({ saveMainScheduleList }, dispatch), [ dispatch ]) 
}

export const useMainScheduleList = (): ScheduleList[] | undefined => {
    return useSelector((state: RootState) => state.schedule.mainScheduleList)
}

export const useSchedule = (): ScheduleHook => {
    const language: string = 'ko-kr'

    // get ScheduleList
    const getMainScheduleList = async (userId: string): Promise<Payload> => {
        const { saveMainScheduleList } = useScheduleActions()
        
        try {
            const res: any = await axios.post(`http://192.168.1.7:5000/api/weather/getMainScheduleList?userId=${userId}`)

            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            if (res.data.scheduleList) { 


                const payload: Payload = {
                    code: 1000,
                }

                return payload
            }
        } catch (error: any) {
            errorHandler(error)
        }

        const payload: Payload = {
            code: -1,
            msg: '서버에 연결할 수 없습니다.'
        }

        return payload
    }   
    

    // create Schedule
    const createSchedule = async (schedule: ScheduleList): Promise<Payload> => {
        try {
            const res: any = await axios.get(`http://192.168.1.7:5000/api/weather/getForecasts?lat=37.715133&lon=126.734086`)
            

            const payload: Payload = {
                code: 1000
            }

            return payload
        } catch (error: any) {
            errorHandler(error)
        }

        const payload: Payload = {
            code: -1,
            msg: '서버에 연결할 수 없습니다.'
        }

        return payload
    }   

    // get schedule
    const getSchedule = async (id: number): Promise<Payload> => {
        try {
            const res: any = await axios.get(`http://192.168.1.7:5000/api/weather/getSchedule?scheduleId=${id}`)
            

            const payload: Payload = {
                code: 1000
            }

            return payload
        } catch (error: any) {
            errorHandler(error)
        }

        const payload: Payload = {
            code: -1,
            msg: '서버에 연결할 수 없습니다.'
        }

        return payload 
    }

    return { getMainScheduleList, createSchedule, getSchedule }
}

const errorHandler = (error: any): void => {
    Alert.alert('알림', error.message ?? '서버에 연결할 수 없습니다.')
    console.log(error)
}
