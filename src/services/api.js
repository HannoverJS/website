import axios from 'axios'
import { camelizeKeys } from 'humps'
import * as cache from './cache'

export default function api(url) {
  const hit = cache.get(url, true)
  if (hit) {
    return Promise.resolve(hit)
  }

  return axios.get(url)
    .then(res => {
      let { data } = res
      data = camelizeKeys(data)

      if (process.env.NODE_ENV !== 'development') {
        cache.set(url, data, true)
      }

      return data
    })
}
