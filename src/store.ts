import {createStore, combineReducers} from 'redux'

import {reducer as cityReducer} from './model/city'
import {reducer as miscReducer} from './model/misc'

const root = combineReducers({city: cityReducer, misc: miscReducer})

export const store = createStore(root)

export type Root = ReturnType<typeof store.getState>
