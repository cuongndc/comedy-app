import { useQuery } from 'h3'
import client from '~/services/client'

export default defineEventHandler(async (event) => {
  const { comic_id, comic_slug } = useQuery(event)
  console.log("comic_id", comic_id)
  console.log("comic_slug", comic_slug)
  const response = await client.get('/wb/chapters', {
    params: {
      comic_id,
      comic_slug,
    },
  })

  return response.data
})
