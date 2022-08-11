import axios from 'axios'

const baseURL = process.env.SERVICE_URL
const headers = {
  'Content-Type': 'application/json',
  'referer': baseURL,
  'origin': baseURL,
}
const instance = axios.create({
  baseURL,
  headers,
  withCredentials: false,
})

export default instance

