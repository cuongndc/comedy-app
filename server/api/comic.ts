import { useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { slug } = useQuery(event)

  const comic = await mongo.db().collection(collections.comics).findOne({
    slug,
  })

  return comic
})
