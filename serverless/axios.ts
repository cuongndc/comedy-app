import axios from 'axios'

const baseURL = 'http://service.meetoon.co'
const headers = {
  'Content-Type': 'application/json',
}

const instance = axios.create({
  baseURL,
  headers,
  withCredentials: false,
})

export default instance

