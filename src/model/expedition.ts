import {Reducer} from 'redux'
import {Omit} from 'lodash'

import {RobotUnion} from './robots'
import {Item, allItems, rock, plantMatter, ROCK, PLANT_MATTER} from './item'
import {partitionRobots} from './util'

const meetsRequirements = (item: Item, robots: RobotUnion[]) =>
  item.requiredRobots.every(requirement =>
    Boolean(robots.find(robot => robot.type === requirement))
  )

const calculateFindability = (robots: RobotUnion[], item: Item) => {
  const allowed = meetsRequirements(item, robots)
  return !allowed
    ? 0
    : robots.reduce((sum, robot) => sum + robot.abilityToSearch, 0) /
        item.rarity
}

const SEARCH_EXPEDITION = 'EXPEDITION/StartSearch'

type SearchExpedition = {
  type: typeof SEARCH_EXPEDITION
  robots: RobotUnion[]
  findableItems: (Omit<Item, 'amount'> & {findability: number})[]
  time: number
  startTime: number
}

export const startSearchExpedition = (
  robots: RobotUnion[]
): SearchExpedition => ({
  robots,
  type: SEARCH_EXPEDITION,
  findableItems: allItems.map(item => ({
    ...item,
    findability: calculateFindability(robots, item)
  })),
  time: 90,
  startTime: Date.now()
})

const END_SEARCH_EXPEDITION = 'EXPEDITION/EndSearch'

type EndSearchExpedition = {
  type: typeof END_SEARCH_EXPEDITION
  searchExpedition: SearchExpedition
}

export const endSearchExpedition = (
  searchExpedition: SearchExpedition
): EndSearchExpedition => ({
  type: END_SEARCH_EXPEDITION,
  searchExpedition
})

const defaultState = {
  expeditions: [] as SearchExpedition[]
}

export type ExpeditionState = typeof defaultState

type ExpeditionAction = SearchExpedition | EndSearchExpedition

export const reducer: Reducer<ExpeditionState, ExpeditionAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case END_SEARCH_EXPEDITION: {
      return {
        ...state,
        expeditions: state.expeditions.filter(
          expedition => expedition !== action.searchExpedition
        )
      }
    }
    case SEARCH_EXPEDITION: {
      return {
        ...state,
        expeditions: state.expeditions.concat(action)
      }
    }
  }
  return state
}
