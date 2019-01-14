import * as React from 'react'

import {AutomatonState} from '../model/automaton'

export const AutomatonInfo = (props: AutomatonState) => {
  const {knowledge, items} = props
  return (
    <div>
      <h3 children="Automaton" />
      <section>
        <p>{`Knowledge: ${knowledge}`}</p>
        <p>Items</p>
        <ul>
          <li children={`Rocks: ${items.rocks.amount}`} />
          <li children={`Plant matter: ${items.plantMatter.amount}`} />
        </ul>
      </section>
    </div>
  )
}
