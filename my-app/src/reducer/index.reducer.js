import {combineReducers} from "redux"
import {primaryReducer} from "../reducer/details.reducer"
import {officialReducer} from "../reducer/details.reducer"

export const rootReducer=combineReducers({primaryReducer,officialReducer})
