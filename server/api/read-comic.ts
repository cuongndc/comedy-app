import { useQuery } from 'h3'
import client from '~/services/client'

export default defineEventHandler(async (event) => {
  const { chapter_slug } = useQuery(event)
  const response = await client.get('/wb/read-comic', {
    params: {
      chapter_slug,
    },
  })

  return response.data.data
})
