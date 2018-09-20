import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ExponentialBackoff } from 'simple-backoff'

require(`dotenv`).config()

let backoff = new ExponentialBackoff({
  min: 10,
  factor: 2,
  jitter: 0
})

const BaseConnection = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
  }
})

BaseConnection.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${ token }`
    }
    return config
}, err => {
  return Promise.reject(err)
})


axiosRetry(BaseConnection, {
  retries: 3,
  retryDelay: function delay() {
    return backoff.next()
  }
})

export default BaseConnection