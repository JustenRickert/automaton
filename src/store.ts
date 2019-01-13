import {createStore, combineReducers, applyMiddleware, AnyAction} from 'redux'

import {reducer as automaton, AutomatonState} from './model/automaton'
import {reducer as expedition, ExpeditionState} from './model/expedition'
import {reducer as robots, RobotsState} from './model/robots'
import {expeditionMiddleware} from './middleware'

export interface Root {
  automaton: AutomatonState
  expedition: ExpeditionState
  robots: RobotsState
}

const root = combineReducers<Root>({automaton, robots, expedition})

export const store = createStore(root, applyMiddleware(expeditionMiddleware))
