import * as React from 'react'

import {AutomatonState} from '../model/automaton'

export const AutomatonInfo = (props: AutomatonState) => {
  const {knowledge} = props
  return (
    <div>
      <h3 children="Automaton" />
      <section>
        <p>{`Knowledge: ${knowledge}`}</p>
      </section>
    </div>
  )
}
