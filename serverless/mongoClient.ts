import type { MongoClientOptions } from 'mongodb'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

if (!process.env.MONGODB_URI)
  throw new Error('Please add your Mongo URI to .env.local')

const client = new MongoClient(uri, options as MongoClientOptions)
export default client
