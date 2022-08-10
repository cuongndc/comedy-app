import { useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { novelId } = useQuery(event)
  const chapters = await mongo.db().collection(collections.novelChapters).find({
    novelId,
  }).toArray()

  return {
    chapters,
  }
})
