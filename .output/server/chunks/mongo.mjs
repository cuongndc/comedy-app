globalThis.__timing__.logStart('Load chunks/mongo');import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || "mongodb+srv://cuongnd:aPOEFnnYrKjH5fnn@cluster0.qkg20.mongodb.net/comics-db", {});
const mongo = client;

export { mongo as default };;globalThis.__timing__.logEnd('Load chunks/mongo');
//# sourceMappingURL=mongo.mjs.map
