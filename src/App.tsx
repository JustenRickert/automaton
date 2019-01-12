import React, {Component, useState, PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import {store, Root} from './store'

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

export default class App extends PureComponent {
  componentDidMount() {
    store.dispatch(initAutomaton())
    setInterval(() => store.dispatch(tickKnowledge()), 5000)
    setRandomInterval(
      () => {
        const state = store.getState()
        store.dispatch(createRandomEligibleRobot(state.automaton))
      },
      [1000, 10000]
    )
  }

  render() {
    return (
      <Provider store={store}>
        <Automaton />
        <Robots />
      </Provider>
    )
  }
}
