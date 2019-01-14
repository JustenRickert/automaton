import {Reducer} from 'redux'

import {rock, plantMatter, Item} from './item'
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

type SendExpeditionItemsToAutomaton = {
  type: 'AUTOMATON/SendItemsToAutomaton'
  foundItems: Item[]
}

export const sendItemsToAutomaton = (
  foundItems: Item[]
): SendExpeditionItemsToAutomaton => ({
  type: 'AUTOMATON/SendItemsToAutomaton',
  foundItems
})

const defaultState = {
  knowledge: 0,
  items: {
    rocks: rock(0),
    plantMatter: plantMatter(0)
  }
}

export type AutomatonState = typeof defaultState

type AutomatonAction =
  | InitAutomaton
  | TickAutomatonKnowledge
  | SendExpeditionItemsToAutomaton

export const reducer: Reducer<AutomatonState, AutomatonAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case 'AUTOMATON/SendItemsToAutomaton': {
      return {
        ...state,
        items: {
          ...(Object.keys(state.items) as (keyof typeof state.items)[]).reduce(
            (items, key) => {
              const stateItem = state.items[key]
              const foundItem = action.foundItems.find(
                item => item.type === stateItem.type
              )!
              return {
                ...items,
                [key]: {
                  ...stateItem,
                  amount: stateItem.amount + foundItem.amount
                }
              }
            },
            {} as typeof state.items
          )
        }
      }
    }
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
