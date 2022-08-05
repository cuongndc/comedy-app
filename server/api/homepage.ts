import axios from 'axios'

export default defineEventHandler(async () => {
  return axios.get('/api/wb/homepage', {
    baseURL: process.env.SERVICE_URL,
  }).then(res => res.data)
})
