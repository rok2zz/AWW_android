import { Alert } from "react-native";
import axios from "axios";
import { Payload } from "../types/api";

interface JsonsHook {
    searchLocation: (text: string, offset: number) => Promise<Payload>,
    getMainWeather: (lattitude: number, longitude: number) => Promise<Payload>,
    getApi2: (lattitude: number, longitude: number) => Promise<Payload>,
}

export const useWeather = (): JsonsHook => {
    const language: string = 'ko-kr'
    const temperatureScale: string = 'celsius' // F: metric

    // search location
    const searchLocation = async (text: string, offset: number): Promise<Payload> => {

        try {
            const res: any = await axios.post(`http://192.168.1.7:5000/api/weather/searchLocationByText`, {
                text: text,
                offset: offset,
                language: 'ko-kr'
            })

            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            if (res.data.locationList) { 
                const payload: Payload = {
                    code: res.data.code,
                    locationList: res.data.locationList
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


    // get server info
    const getMainWeather = async (lattitude: number, longitude: number): Promise<Payload> => {
        
        try {
            const res: any = await axios.get(`http://192.168.1.7:5000/api/weather/getCurrentConditions?lat=${lattitude}&lon=${longitude}`)
            
            console.log('asdfadd')
            console.log(res.data[0].Temperature)

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

    return { searchLocation, getMainWeather, getApi2 }
}

const errorHandler = (error: any): void => {
    Alert.alert('알림', error.message ?? '서버에 연결할 수 없습니다.')
    console.log(error)
}
