import axios from 'axios'

export default defineEventHandler(async () => {
  return axios.get('/api/wb/home-novel', {
    baseURL: process.env.SERVICE_URL || 'http://103.166.185.88:5001',
  }).then(res => res.data)
})
