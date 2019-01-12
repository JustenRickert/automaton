import React, {Component, useState, PureComponent} from 'react'
import {compose, bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'
import {Omit} from 'lodash'

import {store, Root} from './store'

import {Route, changeRoute} from './model/misc'
import {City, setCities, learnCity, focusCity} from './model/city'
import {CitiesUl, FocusedCitySection, FocusedCityProps} from './components/city'
import {StoreSection} from './components/store'
import {TabsSection} from './components/tabs'
import {Cities} from './containers/city'

import {selectCity} from './selectors'

import './App.css'

const ROUTES: Route[] = ['cities', 'store']

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
  dispatch =>
    bindActionCreators(
      {
        learn: learnCity
      },
      dispatch
    )
)(
  ({focusedCity, ...rest}: ConnectedFocusedCityProps) =>
    focusedCity ? (
      <FocusedCitySection focusedCity={focusedCity} {...rest} />
    ) : null
)

const Store = connect(
  (root: Root) => ({
    cities: root.city.cities,
    focusedCity: selectCity(root)
  }),
  dispatch => bindActionCreators({}, dispatch)
)(StoreSection)

const ConnectRoute = connect((state: Root) => ({
  route: state.misc.route
}))((props: {route: Route}) => {
  switch (props.route) {
    case 'store': {
      return (
        <div className="content">
          <Store />
        </div>
      )
    }
    case 'cities': {
      return (
        <div className="content">
          <div className="sidebar">
            <Cities />
          </div>
          <div className="city-menu">
            <FocusedCity />
          </div>
        </div>
      )
    }
  }
  return null
})

const Tabs = connect(
  (root: Root) => ({
    routes: ROUTES,
    currentRoute: root.misc.route
  }),
  dispatch =>
    bindActionCreators(
      {
        onChangeRoute: changeRoute
      },
      dispatch
    )
)(TabsSection)

export default class App extends PureComponent {
  componentDidMount() {
    store.dispatch(setCities())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="main">
          <div className="topbar">
            <Tabs />
          </div>
          <ConnectRoute />
        </div>
      </Provider>
    )
  }
}
