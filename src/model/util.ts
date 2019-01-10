export const updateAtKey = <State, Key extends keyof State>(
  state: State,
  key: Key,
  f: (property: State[Key]) => State[Key]
) => ({
  ...state,
  [key]: f(state[key])
})

export const updateThe = <T, R>(
  arr: T[],
  index: number | T,
  f: (x: T) => R
) => {
  if (typeof index === 'number')
    return arr.map((t, i) => (i === index ? f(t) : t))
  return arr.map(t => (t === index ? f(t) : t))
}
