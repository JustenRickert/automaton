import * as React from 'react'

import {Route} from '../model/misc'

export const TabsSection = (props: {
  routes: Route[]
  currentRoute: Route
  onChangeRoute: (route: Route) => void
}) => {
  const {currentRoute, routes, onChangeRoute} = props
  return (
    <section className="tabs">
      {routes.map(route => (
        <h3
          className={[route === currentRoute ? 'highlighted' : null]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onChangeRoute(route)}
        >
          {route}
        </h3>
      ))}
    </section>
  )
}
