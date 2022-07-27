import client from '~/services/client'

export default defineEventHandler(async () => {
  const data = await client.get('/wb/homepage')
  return data.data?.data
})
