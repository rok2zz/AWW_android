import { Alert } from "react-native"
import axios from "axios";
import { Payload } from "../types/api";

interface JsonsHook {
    getApi: (lattitude: number, longitude: number) => Promise<Payload>,
    getApi2: (lattitude: number, longitude: number) => Promise<Payload>,
}

export const useApi = (): JsonsHook => {
    // get server info
    const getApi = async (lattitude: number, longitude: number): Promise<Payload> => {
        try {
            const res: any = await axios.get(`http://192.168.1.7:5000/api/weather/getCurrentConditions?lat=${lattitude}&lon=${longitude}`)
            
            console.log('asdfadd')
            console.log(res.data[0].Temperature)

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
    

    // get server info
    const getApi2 = async (lattitude: number, longitude: number): Promise<Payload> => {
        try {
            const res: any = await axios.get(`http://192.168.1.7:5000/api/weather/getForecasts?lat=37.715133&lon=126.734086`)
            
            console.log(res.data.daily)

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
    return { getApi, getApi2 }
}

const errorHandler = (error: any): void => {
    Alert.alert('알림', error.message ?? '서버에 연결할 수 없습니다.')
    console.log(error)
}
