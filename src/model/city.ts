import {Reducer} from 'redux'
import {uniqueId, Omit} from 'lodash'

import {updateAtKey, updateThe} from './util'

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
  items: {
    knowledge: number
    education: number
    indoctrination: number
  }
}

type State = typeof defaultState
const defaultState = {
  focusedCityIndex: 0,
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
      description: 'A city of unhappy peasants',
      items: {
        knowledge: 0,
        education: 0,
        indoctrination: 0
      }
    },
    {
      place: {
        name: 'Dark Place',
        description: 'A place to dark'
      },
      population: 10,
      description: 'A city of creepy thinkers',
      items: {
        knowledge: 0,
        education: 0,
        indoctrination: 0
      }
    }
  ]
})

export const FOCUS_CITY = 'CITY/focus'

type FocusCityAction = {
  type: typeof FOCUS_CITY
  city: City
}

export const focusCity = (city: City): FocusCityAction => ({
  city,
  type: FOCUS_CITY
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
  city: {
    population,
    description,
    items: {knowledge: 0, education: 0, indoctrination: 0}
  }
})

const CITY_EDUCATE = 'CITY/Educate'

type ProduceKnowledgeAction = {
  type: typeof CITY_EDUCATE
  city: City
}

export const learnCity = (city: City): ProduceKnowledgeAction => ({
  city,
  type: CITY_EDUCATE
})

const getUniqueId = (takenIds: {id: string}[], prefix?: string): string => {
  const id = uniqueId(prefix)
  return takenIds.some(takenId => takenId.id === id)
    ? getUniqueId(takenIds, prefix)
    : id
}

const places = (state: State) => state.cities.map(city => city.place)

export const reducer: Reducer<
  State,
  AddCityAction | SetCitiesAction | ProduceKnowledgeAction | FocusCityAction
> = (state = defaultState, action) => {
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
    case FOCUS_CITY: {
      const index = state.cities.indexOf(action.city)
      return {
        ...state,
        focusedCityIndex: index === state.focusedCityIndex ? -1 : index
      }
    }
    case CITY_EDUCATE: {
      return {
        ...state,
        cities: updateThe(state.cities, action.city, city => ({
          ...city,
          items: {
            ...city.items,
            knowledge: city.items.knowledge + 1
          }
        }))
      }
    }
  }
  return state
}
