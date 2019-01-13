import * as React from 'react'

import {
  RobotsState,
  sendSearchExpedition,
  BASIC_ROBOT,
  UTILITY_ROBOT
} from '../model/robots'
import {ExpeditionState} from '../model/expedition'

type State = {
  basics: string
  utilities: string
}

const clamp = (value: string, max: string) => {
  if (Number(value) < 0) return '0'
  if (Number(value) > Number(max)) return max
  return value
}

interface ExpeditionAction {
  sendSearchExpedition: typeof sendSearchExpedition
}

export class ExpeditionMenu extends React.Component<
  RobotsState & ExpeditionAction,
  State
> {
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
    const {basics, utilities, sendSearchExpedition} = this.props
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
        <button
          onClick={() => {
            sendSearchExpedition({
              [BASIC_ROBOT]: Number(this.state.basics),
              [UTILITY_ROBOT]: Number(this.state.utilities),
              expeditionRobots: [...basics, ...utilities]
            })
            this.setState({basics: '', utilities: ''})
          }}
          children="Send search expedition"
        />
      </ul>
    )
  }
}

export const OngoingExpeditionMenu = (props: ExpeditionState) => {
  const {expeditions} = props
  console.log('EXPEDITIONS', expeditions)
  return (
    <section>
      {expeditions.map(expedition => (
        <div>
          {expedition.robots.length} robots out on a {expedition.time}s search
          expedition
        </div>
      ))}
    </section>
  )
}
