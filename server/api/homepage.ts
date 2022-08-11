import instance from '~/serverless/axios'

export default defineEventHandler(async () => {
  // console.log("$axios", globalThis.process.env.MONGODB_URI)
  return instance.get('/api/wb/homepage').then(res => res.data)
})
