import { Alert } from "react-native";
import { Payload } from "../types/api";
import { renameKeys } from "./funcions";
import axios from "axios";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { clearLocation, PlaceLocation, saveFavoriteLocation, saveSearchedPlace  } from "../slices/location";
import { RootState } from "../slices";
import { useAndroidId } from "./useAuth";
import { FavoriteWeather, saveFavoriteLocationWeather } from "../slices/weather";

interface JsonsHook {
    searchPlace: (text: string, offset: number) => Promise<Payload>,
    searchAddress: (text: string, offset: number) => Promise<Payload>,
    addFavoriteLocation: (item: FavoriteWeather) => Promise<Payload>
    modifyFavoriteLocation: (existingLocation: FavoriteWeather[], deletedLocation: FavoriteWeather[]) => Promise<Payload>
}

export const useLocationActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators({ saveFavoriteLocation, saveSearchedPlace, clearLocation }, dispatch), [ dispatch ]);
}

export const useSearchedPlace = (): PlaceLocation => { // 일정의 위치 추가
    return useSelector((state: RootState) => state.location.searchedPlace);
}

export const useLocation = (): JsonsHook => {
    const userId = useAndroidId();
    const url = 'http://175.126.73.103:5000'

    // search location
    const searchPlace = async (text: string, offset: number): Promise<Payload> => {
        const keyMap: Record<string, string> = {
            place_name: 'placeName',
            address_name: 'placeAddress',
            x: 'lon',
            y: 'lat',
        };

        try {
            const res: any = await axios.get(
                `https://dapi.kakao.com/v2/local/search/keyword.json?query=${text}`,
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

    // add favorite location
    const addFavoriteLocation = async (item: FavoriteWeather): Promise<Payload>  => {
        try {
            const res: any = await axios.post(`${url}/api/weather/addFavoriteLocation`, {
                userId: userId,
                location: item
            })
            
            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            const payload: Payload = {
                code: 200,
                id: res.data.favoriteLocationId
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

    // add favorite location
    const modifyFavoriteLocation = async (existingLocation: FavoriteWeather[], deletedLocation: FavoriteWeather[]): Promise<Payload>  => {
        const deletedId = deletedLocation.map((item) => item.id);

        try {
            const res: any = await axios.post(`${url}/api/weather/modifyFavoriteLocation`, {
                userId: userId,
                existingLocations: existingLocation,
                deletedIds: deletedId
            })

            if (res.data.code !== 200) {
                const payload: Payload = {
                    code: res.data.code ?? -1,
                    msg: '서버에 연결할 수 없습니다.'
                }

                return payload
            }

            saveFavoriteLocationWeather(existingLocation)

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

    return { searchPlace, searchAddress, addFavoriteLocation, modifyFavoriteLocation }
}
 

const errorHandler = (error: any): void => {
    Alert.alert('알림', error.message ?? '서버에 연결할 수 없습니다.')
    console.log(error)
}
