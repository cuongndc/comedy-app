import type { MongoClientOptions } from 'mongodb'
import { MongoClient } from 'mongodb'

const uri = globalThis.process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

if (!uri)
  throw new Error('Please add your Mongo URI to .env.local')

const client = new MongoClient(uri, options as MongoClientOptions)
export default client
