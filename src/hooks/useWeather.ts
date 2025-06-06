import { Alert } from "react-native";
import axios from "axios";
import { Payload } from "../types/api";
import { useDispatch, useSelector } from "react-redux";
import { Weather, saveCurrentWeather, saveFavoriteLocationWeather, saveLastUpdateWeather } from "../slices/weather";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { RootState } from "../slices";
import { renameKeys } from "./funcions";

interface JsonsHook {
    searchPlace: (text: string, offset: number) => Promise<Payload>,
    searchAddress: (text: string, offset: number) => Promise<Payload>,
    getWeather: (lattitude: number, longitude: number, type: number) => Promise<Payload>,
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
    const temperatureScale: string = 'celsius' // F: metric
    const { saveCurrentWeather } = useWeatherActions()

    // search location
    const searchPlace = async (text: string, offset: number): Promise<Payload> => {
        const keyMap: Record<string, string> = {
            place_name: 'locationName',
            address_name: 'placeAddress',
            x: 'lon',
            y: 'lat',
        };

        try {
            console.log(text)
            const res: any = await axios.get(
                `https://dapi.kakao.com/v2/local/search/keyword.json?query=${text}`,
                {
                    headers: {
                        Authorization: 'KakaoAK 4f0389970c58fb3c2cbaae4a0a2445e3'
                    },
                }
            );


            console.log(res.data)


            if (res.data.documents) { 
                const mappedLocationList = renameKeys(res.data.documents, keyMap);

                const payload: Payload = {
                    code: res.data.code,
                    locationList: mappedLocationList
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

    // search location
    const searchAddress = async (text: string, offset: number): Promise<Payload> => {
        const keyMap: Record<string, string> = {
            address_name: 'locationName',
            x: 'lon',
            y: 'lat',
        };

        try {
            const res: any = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${text}`,
                {
                    headers: {
                        Authorization: 'KakaoAK 4f0389970c58fb3c2cbaae4a0a2445e3'
                    },
                }
            );


            if (res.data.documents) { 
                const mappedLocationList = renameKeys(res.data.documents, keyMap);

                const payload: Payload = {
                    code: res.data.code,
                    locationList: mappedLocationList
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

    return { searchPlace, searchAddress, getWeather }
}

const errorHandler = (error: any): void => {
    Alert.alert('알림', error.message ?? '서버에 연결할 수 없습니다.')
    console.log(error)
}
