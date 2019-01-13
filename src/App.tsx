import React, {Component, useState, PureComponent} from 'react'
import {connect, Provider} from 'react-redux'
import {capitalize} from 'lodash'

import {store, Root} from './store'

import {ExpeditionMenu} from './components/expedition'
import {createRandomEligibleRobot} from './model/robots'
import {RobotsInfo} from './components/robots'
import {initAutomaton, tickKnowledge} from './model/automaton'
import {AutomatonInfo} from './components/automaton'
import {setRandomInterval} from './util'

import './App.css'

const Automaton = connect((root: Root) => ({
  ...root.automaton
}))(AutomatonInfo)

const Robots = connect((root: Root) => ({...root.robots}))(RobotsInfo)

const Expedition = connect((root: Root) => ({
  ...root.robots
}))(ExpeditionMenu)

type Route = 'automaton' | 'expedition'

const routes: Route[] = ['automaton', 'expedition']

interface State {
  route: Route
}

export const Router = (props: {route: Route}) => {
  switch (props.route) {
    case 'automaton':
      return (
        <>
          <Automaton />
          <Robots />
        </>
      )
    case 'expedition':
      return (
        <>
          <Expedition />
        </>
      )
  }
}

export default class App extends PureComponent<{}, State> {
  readonly state: State = {
    route: 'automaton'
  }

  componentDidMount() {
    store.dispatch(initAutomaton())
    setInterval(() => store.dispatch(tickKnowledge()), 500)
    setRandomInterval(
      () => {
        const state = store.getState()
        store.dispatch(createRandomEligibleRobot(state.automaton))
      },
      [1000, 5000]
    )
  }

  render() {
    const {route} = this.state
    return (
      <Provider store={store}>
        <ul>
          {routes.map(route => (
            <li
              style={{cursor: 'pointer'}}
              children={capitalize(route)}
              onClick={this.setRoute(route)}
            />
          ))}
        </ul>
        <Router route={route} />
      </Provider>
    )
  }

  setRoute = (route: Route) => () => this.setState({route})
}
