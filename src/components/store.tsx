import * as React from 'react'

import {City} from '../model/city'
import {
  affords,
  costToString,
  cityPurchaseables,
  StoreItem
} from '../model/store'
import {Cities} from '../containers/city'

const CityStore = (props: {city: City}) => {
  const {city} = props
  const items = cityPurchaseables.filter(item => affords(item, city))
  return (
    <ul>
      {cityPurchaseables.map(item => (
        <li>
          <h3 children={item.name} />
          <p children={`Needs: ${costToString(item, city)}`} />
        </li>
      ))}
    </ul>
  )
}

export const StoreSection = (props: {
  cities: City[]
  focusedCity: City | null
}) => {
  const {cities} = props
  return (
    <>
      <div className="sidebar">
        <Cities />
      </div>
      <section className="city-menu">
        {cities.map(city => <CityStore city={city} />)}
      </section>
    </>
  )
}
