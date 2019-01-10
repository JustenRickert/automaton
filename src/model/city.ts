import {Reducer} from 'redux'

import {uniqueId, Omit} from 'lodash'

type Place = {
  id: string
  name: string
  description: string
}

export type City = {
  id: string
  place: Place
  population: number
  description: string
}

type State = typeof defaultState
const defaultState = {
  cities: [] as City[]
}

const CITY_SET_CITIES = 'CITY/Set'

type SetCitiesAction = {
  type: typeof CITY_SET_CITIES
  cities: (Omit<City, 'id' | 'place'> & {place: Omit<Place, 'id'>})[]
}

export const setCities = (): SetCitiesAction => ({
  type: CITY_SET_CITIES,
  cities: [
    {
      place: {
        name: 'Happy Place',
        description: 'A place to happy'
      },
      population: 10,
      description: 'A city of unhappy peasants'
    }
  ]
})

const CITY_ADD_CITY = 'CITY/Add'

type AddCityAction = {
  type: typeof CITY_ADD_CITY
  place: Omit<Place, 'id'>
  city: Omit<City, 'place' | 'id'>
}

export const addCity = (
  place: {
    name: string
    description: string
  },
  description: string,
  population: number
): AddCityAction => ({
  type: CITY_ADD_CITY,
  place: place,
  city: {population, description}
})

const getUniqueId = (takenIds: {id: string}[], prefix?: string): string => {
  const id = uniqueId(prefix)
  return takenIds.some(takenId => takenId.id === id)
    ? getUniqueId(takenIds, prefix)
    : id
}

const places = (state: State) => state.cities.map(city => city.place)

export const reducer: Reducer<State, SetCitiesAction | AddCityAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case CITY_ADD_CITY: {
      return {
        ...state,
        cities: state.cities.concat({
          ...action.city,
          id: getUniqueId(state.cities, 'city'),
          place: {
            ...action.place,
            id: getUniqueId(places(state), 'place')
          }
        })
      }
    }
    case CITY_SET_CITIES: {
      return {
        ...state,
        cities: action.cities.map(city => ({
          ...city,
          id: uniqueId('city'),
          place: {
            ...city.place,
            id: uniqueId('place')
          }
        }))
      }
    }
  }
  return state
}
