import axios from 'axios'

export default defineEventHandler(async () => {
  console.log("process.env.SERVICE_URL", process.env.SERVICE_URL)
  return axios.get('/api/wb/homepage', {
    baseURL: process.env.SERVICE_URL,
  }).then(res => res.data)
})
