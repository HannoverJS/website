import axios from 'axios'
import * as cache from './cache'

export default function fetch(url) {
  const hit = cache.get(url, true)
  if (hit) {
    return Promise.resolve(hit)
  }

  return axios.get(url)
    .then(res => {
      const { data } = res

      if (process.env.NODE_ENV !== 'development') {
        cache.set(url, data, true)
      }

      return data
    })
}
