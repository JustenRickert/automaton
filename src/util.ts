export const setRandomInterval = (f: () => any, msRange: [number, number]) => {
  const ms = Math.random() * (msRange[1] - msRange[0]) + msRange[0]
  setTimeout(() => {
    f()
    setRandomInterval(f, msRange)
  }, ms)
}
