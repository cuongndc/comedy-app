import { useQuery } from 'h3'
import client from '~/services/client'

export default defineEventHandler(async (event) => {
  const { comic_id, comic_slug } = useQuery(event)
  const response = await client.get('/wb/chapters', {
    params: {
      comic_id,
      comic_slug,
    },
  })

  return response.data
})
