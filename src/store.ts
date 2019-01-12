import {createStore, combineReducers, AnyAction} from 'redux'

import {reducer as automaton} from './model/automaton'
import {reducer as robots} from './model/robots'

const root = combineReducers({automaton, robots})

export const store = createStore(root)

export type Root = ReturnType<typeof store.getState>
