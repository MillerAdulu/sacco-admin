import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ExponentialBackoff } from 'simple-backoff'
require(`dotenv`).config()

import store from '../store'

let backoff = new ExponentialBackoff({
  min: 10,
  factor: 2,
  jitter: 0
})

const authHeader = {
  'Authorization': `Bearer ${ store.getters.loggedInUser.token }`,
}

const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    ...authHeader
  }
})

axiosRetry(HTTP, {
  retries: 3,
  retryDelay: function delay() {
    return backoff.next()
  }
})

export default HTTP

export {
  authHeader
}