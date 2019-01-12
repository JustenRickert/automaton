import {City} from './city'

export type StoreItem = {
  name: keyof City['items']
  description: string
  costs: {
    name: keyof City['items']
    amount: (currentAmount: number) => number
  }[]
}

export const cityPurchaseables: StoreItem[] = [
  {
    name: 'education',
    description: 'Education is important',
    costs: [
      {
        name: 'knowledge',
        amount: (currentKnowledge: number) => 10 + Math.pow(currentKnowledge, 2)
      }
    ]
  },
  {
    name: 'indoctrination',
    description:
      'Time to use that knowledge and education to create a productive system',
    costs: [
      {
        name: 'knowledge',
        amount: (currentKnowledge: number) =>
          25 + Math.pow(currentKnowledge, 1.5)
      },
      {
        name: 'education',
        amount: (currentEducation: number) => 15 + Math.pow(currentEducation, 2)
      }
    ]
  }
]

export const costToString = (item: StoreItem, city: City) =>
  item.costs
    .map(cost => `${cost.name}: ${cost.amount(city.items[cost.name])}`)
    .join(', ')

export const affords = (item: StoreItem, city: City) =>
  item.costs.every(
    item => item.amount(city.items[item.name]) < city.items[item.name]
  )
