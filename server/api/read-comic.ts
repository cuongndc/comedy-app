import { useQuery } from 'h3'
import client from '~/services/client'

export default defineEventHandler(async (event) => {
  const { slug, _id } = useQuery(event)
  const response = await client.get('/wb/read-comic', {
    params: {
      slug,
      _id,
    },
  })

  return response.data.data
})
