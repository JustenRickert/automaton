import {createStore, combineReducers} from 'redux'

import {reducer} from './model/city'

const root = combineReducers({city: reducer})

export const store = createStore(root)

export type Root = ReturnType<typeof store.getState>
