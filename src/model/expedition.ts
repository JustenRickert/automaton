import {Reducer} from 'redux'

import {RobotUnion} from './robots'
import {Item, allItems, rock, plantMatter, ROCK, PLANT_MATTER} from './item'
import {partitionRobots} from './util'

const meetsRequirements = (item: Item, robots: RobotUnion[]) =>
  item.requiredRobots.filter(requirement =>
    Boolean(robots.find(robot => robot.type === requirement))
  )

const calculateFindability = (robots: RobotUnion[], item: Item) => {
  const allowed = meetsRequirements(item, robots)
  return (
    robots.reduce(
      (sum, robot) =>
        allowed.includes(robot.type) ? sum + robot.abilityToSearch : sum,
      0
    ) / item.rarity
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

const defaultState = {
  expeditions: [] as SearchExpedition[]
}

export type ExpeditionState = typeof defaultState

type ExpeditionAction = SearchExpedition

export const reducer: Reducer<ExpeditionState, SearchExpedition> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case SEARCH_EXPEDITION: {
      console.log('SERACH EXPEDITION SENT')
      return {
        ...state,
        expeditions: state.expeditions.concat(action)
      }
    }
  }
  return state
}
