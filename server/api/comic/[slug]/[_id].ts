import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  console.log("client", client)
  const params = event.context.params
  const { slug } = params

  return await client.db().collection(collections.comics).findOne({
    slug,
  })
})
