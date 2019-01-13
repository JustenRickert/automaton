import {Reducer} from 'redux'
import {sample} from 'lodash'
import uuid from 'uuid'

import {AutomatonState} from './automaton'

export const BASIC_ROBOT = 'robot/basic'
export const UTILITY_ROBOT = 'robot/utility'

type RobotTypes = typeof BASIC_ROBOT | typeof UTILITY_ROBOT

export interface Robot {
  id: string
  type: RobotTypes
  description: string
  birthTime: number
  abilityToSearch: number
}

export interface BasicRobot extends Robot {
  type: typeof BASIC_ROBOT
}

const stubBasicRobot = (): BasicRobot => ({
  type: BASIC_ROBOT,
  id: uuid(),
  description: "Standard issue robot. Lots of these you'll likely see.",
  birthTime: Date.now(),
  abilityToSearch: 0.05
})

export interface UtilityRobot extends Robot {
  type: typeof UTILITY_ROBOT
}

const stubUtilityRobot = (): UtilityRobot => ({
  type: UTILITY_ROBOT,
  id: uuid(),
  description:
    'Slightly better than the standard issue robot. Must be kept content with something to work on, otherwise they will walk around making tasks for themselves.',
  birthTime: Date.now(),
  abilityToSearch: 0.25
})

export type RobotUnion = BasicRobot | UtilityRobot

type CreateRandomRobot = {
  type: 'ROBOTS/RandomRobot'
  automatonKnowldege: number
}

export const createRandomEligibleRobot = (
  automaton: AutomatonState
): CreateRandomRobot => {
  return {
    type: 'ROBOTS/RandomRobot',
    automatonKnowldege: automaton.knowledge
  }
}

const possibleRobots = [
  {automatonKnowledgeRequirement: 0, factory: stubBasicRobot},
  {automatonKnowledgeRequirement: 15, factory: stubUtilityRobot}
]

type SendSearchExpedition = {
  type: 'ROBOTS/SendSearchExpedition'
  [BASIC_ROBOT]?: number
  [UTILITY_ROBOT]?: number
}

const sendSearchExpedition = (numbers: {
  [BASIC_ROBOT]?: number
  [UTILITY_ROBOT]?: number
}): SendSearchExpedition => ({
  ...numbers,
  type: 'ROBOTS/SendSearchExpedition'
})

const defaultState = {
  basics: [] as BasicRobot[],
  utilities: [] as UtilityRobot[]
}

export type RobotsState = typeof defaultState

const toStateName = (type: RobotTypes): keyof RobotsState => {
  switch (type) {
    case BASIC_ROBOT:
      return 'basics'
    case UTILITY_ROBOT:
      return 'utilities'
  }
}

type Action = CreateRandomRobot | SendSearchExpedition

export const reducer: Reducer<RobotsState, Action> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case 'ROBOTS/SendSearchExpedition': {
      const {[BASIC_ROBOT]: basics, [UTILITY_ROBOT]: utilities} = action
      return {
        ...state,
        basics: state.basics.slice(basics),
        utilities: state.utilities.slice(utilities)
      }
    }
    case 'ROBOTS/RandomRobot': {
      const {factory} = sample(
        possibleRobots.filter(
          ({automatonKnowledgeRequirement}) =>
            automatonKnowledgeRequirement <= action.automatonKnowldege
        )
      )!
      const newRobot = factory()
      const key = toStateName(newRobot.type)
      return {
        ...state,
        [key]: [...state[key], newRobot]
      }
    }
  }
  return state
}
