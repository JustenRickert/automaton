import {Reducer} from 'redux'

export type Route = 'store' | 'cities'

const ROUTE_CHANGE = 'MISC/ChangeRoute'

type ChangeRouteAction = {
  type: typeof ROUTE_CHANGE
  route: Route
}

export const changeRoute = (route: Route): ChangeRouteAction => ({
  route,
  type: ROUTE_CHANGE
})

type State = typeof defaultState
const defaultState = {
  route: 'cities' as Route
}

export const reducer: Reducer<State, ChangeRouteAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case ROUTE_CHANGE:
      return {...state, route: action.route}
  }
  return state
}
