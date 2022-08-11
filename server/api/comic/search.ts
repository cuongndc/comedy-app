import { useQuery } from 'h3'
import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { q } = useQuery(event)

  return await client.db().collection(collections.comics).find({ $text: { $search: q } }).limit(15).toArray()
})
