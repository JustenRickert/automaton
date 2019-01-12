import {Root} from './store'

export const selectCity = (root: Root) =>
  root.city.focusedCityIndex === -1
    ? null
    : root.city.cities[root.city.focusedCityIndex]
