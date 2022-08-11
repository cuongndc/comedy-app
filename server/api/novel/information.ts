import { useQuery } from 'h3'
import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { novelId } = useQuery(event)
  const chapters = await client.db().collection(collections.novelChapters).find({
    novelId,
  }).toArray()

  return {
    chapters,
  }
})
