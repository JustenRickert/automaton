export function hasSharedStructured(o1: any, o2: any): boolean {
  return Object.keys(o1).every(key => {
    if (typeof o1[key] === typeof o2[key] && typeof o1[key] === 'object') {
      return hasSharedStructured(o1[key], o2[key])
    }
    return key in o2 && typeof o1[key] === typeof o2[key]
  })
}
