import { combineReducers } from 'redux'
import weather from './weather'
import schedule from './schedule'
import auth from './auth'
import location from './location'

const rootReducer = combineReducers ({
    auth,
    weather,
    schedule,
    location
})

export type RootState = ReturnType<typeof rootReducer>

declare module 'react-redux' {
    interface DefaultRootState extends RootState {} //선언시 useSelector 에서 타입 자동 추론
}

export default rootReducer