import {Reducer} from 'redux'

import {RobotUnion} from './robots'
import {Item, allItems, rock, plantMatter, ROCK, PLANT_MATTER} from './item'
import {partitionRobots} from './util'

const meetsRequirements = (item: Item, robots: RobotUnion[]) =>
  item.requiredRobots.every(requirement =>
    Boolean(robots.find(robot => robot.type === requirement))
  )

const calculateFindability = (robots: RobotUnion[], item: Item) => {
  if (!meetsRequirements(item, robots))
    throw new Error('TODO: Should we allow this situation?')
  return (
    robots.reduce((sum, robot) => sum + robot.abilityToSearch, 0) / item.rarity
  )
}

const SEARCH_EXPEDITION = 'EXPEDITION/Search'

type SearchExpedition = {
  type: typeof SEARCH_EXPEDITION
  robots: RobotUnion[]
  findableItems: (Item & {findability: number})[]
  time: number
  startTime: number
}

const startSearchExpedition = (robots: RobotUnion[]): SearchExpedition => ({
  robots,
  type: SEARCH_EXPEDITION,
  findableItems: allItems.map(item => ({
    ...item,
    findability: calculateFindability(robots, item)
  })),
  time: 90,
  startTime: Date.now()
})

const defaultState = {
  expeditions: [] as SearchExpedition[]
}

type ExpeditionState = typeof defaultState

type ExpeditionAction = SearchExpedition

export const reducer: Reducer<ExpeditionState, SearchExpedition> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case SEARCH_EXPEDITION: {
      return {
        ...state,
        expeditions: state.expeditions.concat(action)
      }
    }
  }
  return state
}
