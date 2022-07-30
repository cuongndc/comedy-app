import { useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { comic_slug } = useQuery(event)
  return await mongo.db().collection(collections.chapters).find({
    comicSlug: comic_slug,
  }).sort({
    chapterOrderIndex: 1,
  }).toArray()
})
