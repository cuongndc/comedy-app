globalThis.__timing__.logStart('Load chunks/index');import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};
if (!process.env.MONGODB_URI)
  throw new Error("Please add your Mongo URI to .env.local");
const client = new MongoClient(uri, options);
const client$1 = client;

const collections = {
  chapters: "chapters",
  comics: "comics",
  homePages: "homepages",
  chapterPages: "chapter-pages",
  novelChapters: "novel-chapters",
  novels: "novels"
};

export { collections as a, client$1 as c };;globalThis.__timing__.logEnd('Load chunks/index');
//# sourceMappingURL=index.mjs.map
