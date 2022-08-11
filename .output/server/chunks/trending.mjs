globalThis.__timing__.logStart('Load chunks/trending');import { defineEventHandler } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const trending = defineEventHandler(async () => {
  const slug = [
    "ngon-tinh-co-dai",
    "ngon-tinh-hien-dai",
    "dam-my-bach-hop"
  ];
  return await client.db().collection(collections.comics).find({
    "categories.categorySlug": {
      $in: slug
    }
  }).limit(99).sort({ updatedAt: -1 }).toArray();
});

export { trending as default };;globalThis.__timing__.logEnd('Load chunks/trending');
//# sourceMappingURL=trending.mjs.map
