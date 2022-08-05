import axios from 'axios'
// import mongo from '~/server/api/mongo'
// import { collections } from '~/contants'

export default defineEventHandler(async () => {
  return axios.get('/api/wb/homepage', {
    baseURL: process.env.SERVICE_URL,
  }).then(res => res.data)
//   return await mongo.db().collection(collections.homePages).find({}).sort({
//     orderIndex: 1,
//   }).limit(12).toArray()
})
