import { Alert } from "react-native";
import axios from "axios";
import { Payload } from "../types/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices";
import { saveMainScheduleList, Schedule } from "../slices/schedule";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";

interface ScheduleHook {
    getMainScheduleList: (userId: string) => Promise<Payload>,
    createSchedule: (schedule: Schedule) => Promise<Payload>,
    getSchedule: (scheduleId: number) => Promise<Payload>,
    deleteSchedule: (scheduleId: number) => Promise<Payload>,
    endSchedule: (scheduleId: number) => Promise<Payload>,
}

export const useScheduleActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators({ saveMainScheduleList }, dispatch), [ dispatch ]);
}

export const useMainScheduleList = (): Schedule[] => {
    return useSelector((state: RootState) => state.schedule.mainScheduleList);
}

// 변수명 변경
const renameKeys = (obj: any, keyMap: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(item => renameKeys(item, keyMap));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const newKey = keyMap[key] || key;
        acc[newKey] = renameKeys(value, keyMap);
        return acc;
      }, {} as any);
    }
    return obj;
};

export const useSchedule = (): ScheduleHook => {
    const { saveMainScheduleList } = useScheduleActions()
    const language: string = 'ko-kr';

    // get ScheduleList
    const getMainScheduleList = async (userId: string): Promise<Payload> => {
        const keyMap: Record<string, string> = {
            earliest_start_time: 'earliestStart',
            earliest_end_time: 'earliestEnd',
            latest_start_time: 'latestStart',
            latest_end_time: 'latestEnd',
            created_at: 'createdAt',
            updated_at: 'updatedAt',
            created_by: 'createdBy',
            user_role: 'userRole',
        };

        try {
            const res: any = await axios.post('http://192.168.1.7:5000/api/schedule/getMainScheduleList', {
                userId: userId
            })


            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            if (res.data.scheduleList) { 
                const mappedList = renameKeys(res.data.scheduleList, keyMap)

                saveMainScheduleList(mappedList)

                const payload: Payload = {
                    code: res.data.code,
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
    
    // get schedule detail
    const getSchedule = async (scheduleId: number): Promise<Payload> => {
        const keyMap: Record<string, string> = {
            start_time: 'start',
            end_time: 'end',
            created_at: 'createdAt',
            updated_at: 'updatedAt',
            created_by: 'createdBy',
        };

        try {
            const res: any = await axios.post('http://192.168.1.7:5000/api/schedule/getSchedule', {
                scheduleId: scheduleId
            })

            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            if (res.data.schedule) { 
                const mappedSchedule = renameKeys(res.data.schedule, keyMap)

                const payload: Payload = {
                    code: res.data.code,
                    schedule: mappedSchedule
                }

                return payload
            }
        } catch (error: any) {
            errorHandler(error)
            console.log('error')
        }

        const payload: Payload = {
            code: -1,
            msg: '서버에 연결할 수 없습니다.'
        }

        return payload
    }   

    // create Schedule
    const createSchedule = async (schedule: Schedule): Promise<Payload> => {
        try {
            const res: any = await axios.post(`http://192.168.1.7:5000/api/schedule/createSchedule`, {
                type: 0,
                title: schedule.title
            })
            
            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            const payload: Payload = {
                code: 200
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

    // delete schedule
    const deleteSchedule = async (scheduleId: number): Promise<Payload> => {
        try {
            const res: any = await axios.post(`http://192.168.1.7:5000/api/schedule/modifyScheduleStatus`, {
                scheduleId: scheduleId,
                status: -1
            })
            
            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            const payload: Payload = {
                code: 200
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

    // end schedule
    const endSchedule = async (scheduleId: number): Promise<Payload> => {
        try {
            const res: any = await axios.post(`http://192.168.1.7:5000/api/schedule/modifyScheduleStatus`, {
                scheduleId: scheduleId,
                status: 0
            })            
            
            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            const payload: Payload = {
                code: 200
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

    return { getMainScheduleList, createSchedule, getSchedule, deleteSchedule, endSchedule }
}

const errorHandler = (error: any): void => {
    Alert.alert('알림', error.message ?? '서버에 연결할 수 없습니다.')
    console.log(error)
}
