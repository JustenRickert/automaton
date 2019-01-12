import {Reducer} from 'redux'
import {sample} from 'lodash'
import uuid from 'uuid'

import {AutomatonState} from './automaton'

export interface Robot {
  id: string
  type: string
  description: string
  birthTime: number
}

interface BasicRobot extends Robot {
  type: 'robot/basic'
}

const stubBasicRobot = (): BasicRobot => ({
  type: 'robot/basic',
  id: uuid(),
  description: "Standard issue robot. Lots of these you'll likely see.",
  birthTime: Date.now()
})

interface UtilityRobot extends Robot {
  type: 'robot/utility'
}

const stubUtilityRobot = (): UtilityRobot => ({
  type: 'robot/utility',
  id: uuid(),
  description:
    'Slightly better than the standard issue robot. Must be kept content with something to work on, otherwise they will walk around making tasks for themselves.',
  birthTime: Date.now()
})

type RobotType = BasicRobot | UtilityRobot

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

const defaultState = {
  robots: [] as Robot[]
}

export type RobotsState = typeof defaultState

type Action = CreateRandomRobot

export const reducer: Reducer<RobotsState, Action> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case 'ROBOTS/RandomRobot': {
      const {factory} = sample(
        possibleRobots.filter(
          ({automatonKnowledgeRequirement}) =>
            automatonKnowledgeRequirement <= action.automatonKnowldege
        )
      )!
      return {
        ...state,
        robots: state.robots.concat(factory())
      }
    }
  }
  return state
}
