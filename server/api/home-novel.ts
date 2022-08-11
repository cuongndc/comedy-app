import instance from '~/serverless/axios'

export default defineEventHandler(async () => {
  return instance.get('/api/wb/home-novel').then(res => res.data)
})
