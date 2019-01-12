import {Reducer} from 'redux'

import {hasSharedStructured} from './util'

type InitAutomaton = {
  type: 'AUTOMATON/Init'
  storedData: string | null
}

export const initAutomaton = (): InitAutomaton => ({
  type: 'AUTOMATON/Init',
  storedData: localStorage.getItem('automaton')
})

type TickAutomatonKnowledge = {
  type: 'AUTOMATON/TickKnowledge'
}

export const tickKnowledge = (): TickAutomatonKnowledge => ({
  type: 'AUTOMATON/TickKnowledge'
})

const defaultState = {
  knowledge: 0
}

export type AutomatonState = typeof defaultState

type AutomatonAction = InitAutomaton | TickAutomatonKnowledge

export const reducer: Reducer<AutomatonState, AutomatonAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case 'AUTOMATON/TickKnowledge': {
      return {
        ...state,
        knowledge: state.knowledge + 1
      }
    }
    case 'AUTOMATON/Init':
      if (!action.storedData) {
        break
      }
      if (!hasSharedStructured(action.storedData, defaultState)) {
        return state
      }
      return JSON.parse(action.storedData)
  }
  return state
}
