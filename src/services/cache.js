const TTL = 600000 // 10 min

export function get(name, isJson) {
  const lastAccess = localStorage.getItem('lastAccess')
  if (lastAccess) {
    if (Date.now() - parseInt(lastAccess, 10) >= TTL) {
      return false
    }
  }

  const value = localStorage.getItem(name)

  if (!value) {
    return false
  }

  if (isJson) {
    return JSON.parse(value)
  }

  return value
}

export function set(name, value, isJson) {
  if (isJson) {
    localStorage.setItem('lastAccess', Date.now())
    localStorage.setItem(name, JSON.stringify(value))
  } else {
    localStorage.setItem(name, value)
  }
}
