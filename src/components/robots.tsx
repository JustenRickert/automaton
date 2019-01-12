import * as React from 'react'

import {RobotsState, Robot} from '../model/robots'

const RobotInfo = (props: {robot: Robot}) => {
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

export const RobotsInfo = (props: RobotsState) => {
  const {robots} = props
  console.log(robots)
  return (
    <div>
      <h3 children="Robots" />
      <section>
        {robots.length ? (
          robots.map(robot => <RobotInfo key={robot.id} robot={robot} />)
        ) : (
          <p children="No robots :(" />
        )}
      </section>
    </div>
  )
}
