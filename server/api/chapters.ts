import { useQuery } from 'h3'
import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { comic_slug } = useQuery(event)
  return await client.db().collection(collections.chapters).find({
    comicSlug: comic_slug,
  }).sort({
    chapterOrderIndex: 1,
  }).toArray()
})
