import {
  Robot,
  BasicRobot,
  UtilityRobot,
  RobotUnion,
  BASIC_ROBOT,
  UTILITY_ROBOT
} from './robots'

export function hasSharedStructured(o1: any, o2: any): boolean {
  return Object.keys(o1).every(key => {
    if (typeof o1[key] === typeof o2[key] && typeof o1[key] === 'object') {
      return hasSharedStructured(o1[key], o2[key])
    }
    return key in o2 && typeof o1[key] === typeof o2[key]
  })
}

export function partitionRobots(robots: RobotUnion[]) {
  const basics: BasicRobot[] = []
  const utilities: UtilityRobot[] = []
  for (const robot of robots) {
    // prettier-ignore
    switch (robot.type) {
      case BASIC_ROBOT: basics.push(robot); break
      case UTILITY_ROBOT: utilities.push(robot); break
    }
  }
  return {basics, utilities}
}

export function randomlyFilter<T>(ts: T[], lossChange: number) {
  return ts.reduce<T[]>(
    (ts, t) => (Math.random() < lossChange ? ts : ts.concat(t)),
    []
  )
}
