import React, {Component, useState, PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import {store, Root} from './store'

import {City, setCities} from './model/city'

import './App.css'

const LiCity = (props: {
  city: City
  isFocused: boolean
  onChangeFocus: (city: City) => void
}) => {
  const {city, isFocused, onChangeFocus} = props
  return (
    <li>
      <h3 className="city_title" onClick={() => onChangeFocus(city)}>
        {city.place.name} <span>({city.population})</span>
      </h3>
      {isFocused && <p>{city.description}</p>}
    </li>
  )
}

type CitiesProps = {
  cities: City[]
  focusedCity: City | null
  onChangeFocus: (city: City) => void
}

const StatelessCitiesList = (props: CitiesProps) => {
  const {cities, focusedCity, onChangeFocus} = props
  return (
    <ul>
      {cities.map(city => (
        <LiCity
          isFocused={Boolean(focusedCity && city.id === focusedCity.id)}
          onChangeFocus={onChangeFocus}
          city={city}
        />
      ))}
    </ul>
  )
}

const CitiesList = connect((state: Root) => ({
  cities: state.city.cities
}))(StatelessCitiesList)

type State = {
  focusedCity: City | null
}

export default class App extends PureComponent<{}, State> {
  readonly state: State = {focusedCity: null}

  componentDidMount() {
    store.dispatch(setCities())
  }

  toggleCityFocus = (city: City) =>
    this.setState(state => ({
      focusedCity: city === state.focusedCity ? null : city
    }))

  render() {
    const {focusedCity} = this.state
    return (
      <div className="App">
        <Provider store={store}>
          <CitiesList
            focusedCity={focusedCity}
            onChangeFocus={this.toggleCityFocus}
          />
        </Provider>
      </div>
    )
  }
}
