import React, {Component, useState, PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'
import {capitalize} from 'lodash'

import {store, Root} from './store'

import {ExpeditionMenu, OngoingExpeditionMenu} from './components/expedition'
import {createRandomEligibleRobot, sendSearchExpedition} from './model/robots'
import {RobotsInfo} from './components/robots'
import {initAutomaton, tickKnowledge} from './model/automaton'
import {AutomatonInfo} from './components/automaton'
import {setRandomInterval} from './util'

import './App.css'

const Automaton = connect((root: Root) => ({
  ...root.automaton
}))(AutomatonInfo)

const Robots = connect((root: Root) => ({...root.robots}))(RobotsInfo)

const Expedition = connect(
  (root: Root) => ({
    ...root.robots
  }),
  dispatch => bindActionCreators({sendSearchExpedition}, dispatch)
)(ExpeditionMenu)

const OngoingExpeditions = connect((root: Root) => ({
  ...root.expedition
}))(OngoingExpeditionMenu)

type Route = 'automaton' | 'expedition' | 'ongoings'

const routes: Route[] = ['automaton', 'expedition', 'ongoings']

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
    case 'ongoings':
      return (
        <>
          <OngoingExpeditions />
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
