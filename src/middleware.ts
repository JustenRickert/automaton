import {Middleware} from 'redux'

import {Root} from './store'
import {
  SendSearchExpedition,
  returnSearchExpeditionRobots,
  BASIC_ROBOT,
  UTILITY_ROBOT
} from './model/robots'
import {startSearchExpedition, endSearchExpedition} from './model/expedition'
import {sendItemsToAutomaton} from './model/automaton'

export const expeditionMiddleware: Middleware<{}, Root> = ({
  dispatch,
  getState
}) => {
  return next => (action: SendSearchExpedition) => {
    const payload = next(action)
    if (action.type === 'ROBOTS/SendSearchExpedition') {
      const searchExpedition = dispatch(
        startSearchExpedition(payload.expeditionRobots)
      )
      setTimeout(() => {
        dispatch(endSearchExpedition(searchExpedition))
        const {foundItems} = dispatch(
          returnSearchExpeditionRobots({
            findableItems: searchExpedition.findableItems,
            robots: searchExpedition.robots,
            lossChance: 0.1 // TODO(Maybe?) thread through other actions
          })
        )
        dispatch(sendItemsToAutomaton(foundItems))
      }, searchExpedition.time)
    }
    return payload
  }
}
