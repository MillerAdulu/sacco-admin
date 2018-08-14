import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ExponentialBackoff } from 'simple-backoff'

const token = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')).token : null

let backoff = new ExponentialBackoff({
  min: 10,
  factor: 2,
  jitter: 0
})

const HTTP = axios.create({
  baseURL: `http://localhost:8000/api`,
  // baseURL: `https://sedcapi.herokuapp.com/api/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Authorization' : `Bearer ${ token }`,
  }
})

axiosRetry(HTTP, {
  retries: 5,
  retryDelay: function delay() {
    return backoff.next()
  }
})

export default HTTP