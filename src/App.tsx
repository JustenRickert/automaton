import React, {Component, useState, PureComponent} from 'react'
import {compose} from 'redux'
import {connect, Provider} from 'react-redux'
import {Omit} from 'lodash'

import {store, Root} from './store'

import {City, setCities, educateCity, focusCity} from './model/city'
import {CitiesUl, FocusedCitySection, FocusedCityProps} from './components/city'

import './App.css'

const selectCity = (root: Root) =>
  root.city.focusedCityIndex === -1
    ? null
    : root.city.cities[root.city.focusedCityIndex]

const Cities = connect(
  (root: Root) => ({
    cities: root.city.cities,
    focusedCity: selectCity(root)
  }),
  dispatch => ({
    onChangeFocus: (city: City) => dispatch(focusCity(city))
  })
)(CitiesUl)

type Props = {
  focusedCity: City | null
}

type ConnectedFocusedCityProps = Omit<FocusedCityProps, 'focusedCity'> & {
  focusedCity: City | null
}

const FocusedCity = connect(
  (root: Root) => ({
    focusedCity: selectCity(root)
  }),
  dispatch => ({
    educate: (city: City) => dispatch(educateCity(city))
  })
)(
  ({focusedCity, ...rest}: ConnectedFocusedCityProps) =>
    focusedCity ? (
      <FocusedCitySection focusedCity={focusedCity} {...rest} />
    ) : null
)

export default class App extends Component {
  componentDidMount() {
    store.dispatch(setCities())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="main">
          <div className="sidebar">
            <Cities />
          </div>
          <div className="city-menu">{<FocusedCity />}</div>
        </div>
      </Provider>
    )
  }
}
