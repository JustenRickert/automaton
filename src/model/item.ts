import {BASIC_ROBOT, UTILITY_ROBOT} from './robots'

export const ROCK = 'rock'
export const PLANT_MATTER = 'plant matter'

export interface Item {
  type: typeof ROCK | typeof PLANT_MATTER
  description: string
  amount: number
  rarity: number
  requiredRobots: (typeof BASIC_ROBOT | typeof UTILITY_ROBOT)[]
}

export interface Rock extends Item {
  type: typeof ROCK
  rarity: 1
  requiredRobots: [typeof BASIC_ROBOT]
}

export interface PlantMatter extends Item {
  type: typeof PLANT_MATTER
  rarity: 2
  requiredRobots: [typeof BASIC_ROBOT, typeof UTILITY_ROBOT]
}

export type ItemUnion = Rock

export const rock = (amount: number): Rock => ({
  amount,
  description: 'Taken from the Earth',
  type: ROCK,
  rarity: 1,
  requiredRobots: [BASIC_ROBOT]
})

export const plantMatter = (amount: number): PlantMatter => ({
  amount,
  description:
    'Taken from the Earth for its ability to move without electricity',
  type: PLANT_MATTER,
  rarity: 2,
  requiredRobots: [BASIC_ROBOT, UTILITY_ROBOT]
})

export const allItems = [rock(0), plantMatter(0)]
