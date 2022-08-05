import axios from 'axios'

export default defineEventHandler(async () => {
  return axios.get('/api/wb/homepage', {
    baseURL: process.env.SERVICE_URL || 'http://103.166.185.88:5001',
  }).then(res => res.data)
})
