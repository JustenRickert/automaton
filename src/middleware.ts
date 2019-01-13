import {Middleware} from 'redux'

import {Root} from './store'
import {SendSearchExpedition, BASIC_ROBOT, UTILITY_ROBOT} from './model/robots'
import {startSearchExpedition} from './model/expedition'

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
      setTimeout(
        () => console.log('SHOULD FINISH SEARCH EXPEDITION'),
        searchExpedition.time
      )
    }
    return payload
  }
}
