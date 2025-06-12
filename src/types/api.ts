import { PlaceLocation } from "../slices/location"
import { Schedule, TodoTemperatureResponse } from "../slices/schedule"
import { Weather } from "../slices/weather"

// async storage
export interface LoginData {
    // userInfo: UserInfo,
    token?: Token
}

export interface Token {
    accessToken?: string | null,
    refreshToken?: string | null
}

// request & response
export interface Body {
    cls: string,
    method: string,
    params?: (string | boolean | number | number[] | Date | null)[]
}

export interface Response {
    data: { 
        code: number,
        msg?: string,

        scheduleList?: Schedule[],

        result?: {
        }
    }
}

export interface Payload {
    code: number,
    msg?: string,

    scheduleList?: Schedule[],
    schedule?: Schedule,
    locationList?: PlaceLocation[],
    weather?: Weather,
    todoTemperature?: TodoTemperatureResponse,
    locationKey?: string
}

// weather
export interface DailyForecasts {
    Date: string,
    Temparature: string
}

export interface Temparature {
    // daily
    Minimum?: WeatherValue,
    Maximum?: WeatherValue,

    // current
    Metric?: WeatherValue,
    Imperial?: WeatherValue
}

export interface WeatherValue {
    Value: number,
    Unit: string,
    UnitType: number
}
