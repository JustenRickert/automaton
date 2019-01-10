import * as React from 'react'
import {City, educateCity} from '../model/city'

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

export type FocusedCityProps = {focusedCity: City; educate: typeof educateCity}

export const FocusedCitySection = (props: FocusedCityProps) => {
  const {
    focusedCity,
    focusedCity: {description, population, place, education}
  } = props
  return (
    <section>
      <h3 children={place.name} />
      <p children={`${description} in ${place.description.toLowerCase()}.`} />
      <br />

      <p children={`They are as smart as ${education} ideas can be.`} />
      <br />

      <button
        onClick={() => props.educate(focusedCity)}
        children="Educate City"
      />
    </section>
  )
}
