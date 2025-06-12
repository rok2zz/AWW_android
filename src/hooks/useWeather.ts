import { Alert } from "react-native";
import axios from "axios";
import { Payload } from "../types/api";
import { useDispatch, useSelector } from "react-redux";
import { Weather, saveCurrentWeather, saveFavoriteLocationWeather, saveLastUpdateWeather } from "../slices/weather";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { RootState } from "../slices";
import { renameKeys } from "./funcions";
import { NumberArray } from "react-native-svg";
import { TodoTemperatureResponse } from "../slices/schedule";
import { useAndroidId } from "./useAuth";

interface JsonsHook {
    getWeather: (lattitude: number, longitude: number, type: number) => Promise<Payload>,
    getPlaceWeather: (lattitude: number, longitude: number, startTime: string) => Promise<Payload>,
    getFavoriteWeather: () => Promise<Payload>,
}

export const useWeatherActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators({ saveCurrentWeather, saveFavoriteLocationWeather, saveLastUpdateWeather }, dispatch), [ dispatch ]);
}

export const useFavoriteLocationWeather = (): Weather[] | undefined => {
    return useSelector((state: RootState) => state.weather.favoriteLocationWeather);
}

export const useCurrentWeather = (): Weather => {
    return useSelector((state: RootState) => state.weather.currentWeather);
}

export const useLastUpdateWeather = (): string => {
    return useSelector((state: RootState) => state.weather.lastUpdateWeather);
}

export const useWeather = (): JsonsHook => {
    const url = 'http://175.126.73.103:5000'

    const language: string = 'ko-kr'
    const { saveCurrentWeather } = useWeatherActions()
    const userId = useAndroidId()

    // get weather
    const getWeather = async (lattitude: number, longitude: number, type: number): Promise<Payload> => { // 0: favorite, 1: current, 2: search
        try {
            const res: any = await axios.post(`${url}/api/weather/getMainWeather`, {
                location: {
                    lat: lattitude,
                    lon: longitude
                }
            })

            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            if (type === 1) saveCurrentWeather(res.data)
            else if (type === 2) {
                const payload: Payload = {
                    code: 200,
                    weather: res.data,
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

    // get place Weather
    const getPlaceWeather = async (lattitude: number, longitude: number, startTime: string): Promise<Payload> => {
        try {
            const res: any = await axios.post(`${url}/api/weather/getForecastByLocation`, {
                location: {
                    lat: lattitude,
                    lon: longitude
                },
                startTime: startTime
            })

            console.log(res.data)
            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            const temperatureRes: TodoTemperatureResponse = {
                temperatureTime: res.data.temperatureTime,
                temperatureValue: res.data.temperatureValue
            }

            const payload: Payload = {
                code: 200,
                todoTemperature: temperatureRes,
                locationKey: res.data.locationKey,
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

    // get favorite location weather
    const getFavoriteWeather = async (): Promise<Payload> => {
        try {
            const res: any = await axios.post(`${url}/api/weather/getFavoriteLocations`, {
                userId: userId
            })

            console.log(res.data)
            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            const temperatureRes: TodoTemperatureResponse = {
                temperatureTime: res.data.temperatureTime,
                temperatureValue: res.data.temperatureValue
            }

            const payload: Payload = {
                code: 200,
                todoTemperature: temperatureRes,
                locationKey: res.data.locationKey,
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

    return { getWeather, getPlaceWeather, getFavoriteWeather }
}

const errorHandler = (error: any): void => {
    // Alert.alert('알림', error.message ?? '서버에 연결할 수 없습니다.')
    console.log(error)
}
