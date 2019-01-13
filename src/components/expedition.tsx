import * as React from 'react'

import {RobotsState} from '../model/robots'

type State = {
  basics: string
  utilities: string
}

const clamp = (value: string, max: string) => {
  if (Number(value) < 0) return '0'
  if (Number(value) > Number(max)) return max
  return value
}

export class ExpeditionMenu extends React.Component<RobotsState, State> {
  readonly state: State = {
    basics: '',
    utilities: ''
  }

  input(type: keyof State) {
    const {[type]: robots} = this.props
    const value = this.state[type]
    return (
      <input
        value={value}
        onChange={e =>
          this.setState({
            [type]: clamp(
              e.target.value.replace(/[^0-9]/g, ''),
              String(robots.length)
            )
          } as any)
        }
      />
    )
  }

  render() {
    const {basics, utilities} = this.props
    return (
      <ul>
        {Boolean(basics.length) && (
          <li>
            <p>
              Send {this.input('basics')} of {basics.length} Basic robots
            </p>
          </li>
        )}
        {Boolean(utilities.length) && (
          <li>
            <p>
              Send {this.input('utilities')} of {utilities.length} Utilities
              robots
            </p>
          </li>
        )}
      </ul>
    )
  }
}
