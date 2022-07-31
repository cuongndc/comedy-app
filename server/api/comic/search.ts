import { useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { q } = useQuery(event)

  return await mongo.db().collection(collections.comics).find({ $text: { $search: q } }).limit(15).toArray()
})
