import * as React from 'react'

import {RobotsState, RobotUnion} from '../model/robots'
import {partitionRobots} from '../model/util'

const RobotInfo = (props: {robot: RobotUnion}) => {
  const {description, type, birthTime} = props.robot
  const now = Date.now()
  return (
    <ul>
      <li
        children={`kind: ${type}, age: ${(
          (now - birthTime) /
          1000
        ).toLocaleString()}`}
      />
      <li children={description} />
    </ul>
  )
}

const averageRobotAge = (robots: RobotUnion[]) => {
  const now = Date.now()
  return (
    (
      robots.reduce((sum, basic) => sum + (now - basic.birthTime) / 1000, 0) /
      robots.length
    ).toLocaleString() + 's'
  )
}

export const RobotsInfo = (props: RobotsState) => {
  const {basics, utilities} = props
  return (
    <div>
      <h3 children="Robots" />
      <section>
        <ul>
          {Boolean(basics.length) && (
            <li>
              Basics: {basics.length} @ {averageRobotAge(basics)} of age
            </li>
          )}
          {Boolean(utilities.length) && (
            <li>
              Utilites: {utilities.length} @ {averageRobotAge(utilities)} of age
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}
