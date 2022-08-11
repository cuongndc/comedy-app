import instance from '~/serverless/axios'

export default defineEventHandler(async () => {
  return instance.get('/api/wb/homepage').then(res => res.data)
})
