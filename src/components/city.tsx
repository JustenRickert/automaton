import * as React from 'react'
import {City, learnCity} from '../model/city'

const LiCity = (props: {
  city: City
  isFocused: boolean
  onChangeFocus: (city: City) => void
}) => {
  const {city, isFocused, onChangeFocus} = props
  return (
    <li>
      <h3 className="city_title" onClick={() => onChangeFocus(city)}>
        {city.place.name} <span>({city.population})</span>
      </h3>
      {isFocused && <p>{city.description}</p>}
    </li>
  )
}

type CitiesProps = {
  cities: City[]
  focusedCity: City | null
  onChangeFocus: (city: City) => void
}

export const CitiesUl = (props: CitiesProps) => {
  const {cities, focusedCity, onChangeFocus} = props
  return (
    <ul>
      {cities.map(city => (
        <LiCity
          isFocused={Boolean(focusedCity && city.id === focusedCity.id)}
          onChangeFocus={onChangeFocus}
          city={city}
        />
      ))}
    </ul>
  )
}

export type FocusedCityProps = {focusedCity: City; learn: typeof learnCity}

export const FocusedCitySection = (props: FocusedCityProps) => {
  const {
    focusedCity,
    focusedCity: {description, population, place, items: {knowledge}},
    learn
  } = props
  return (
    <section>
      <h3 children={place.name} />
      <p children={`${description} in ${place.description.toLowerCase()}.`} />

      <p children={`They are as smart as ${knowledge} ideas can be.`} />

      <button onClick={() => learn(focusedCity)} children="Educate City" />
    </section>
  )
}
