globalThis.__timing__.logStart('Load chunks/_slug_3');import { defineEventHandler } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const _slug_ = defineEventHandler(async (event) => {
  const slug = event.context.params.slug;
  let filter = {};
  if (slug !== "all") {
    filter = {
      "categories.categorySlug": {
        $in: [slug]
      }
    };
  }
  return await mongo.db().collection(collections.comics).find(filter).limit(15).sort({ updatedAt: -1 }).toArray();
});

export { _slug_ as default };;globalThis.__timing__.logEnd('Load chunks/_slug_3');
//# sourceMappingURL=_slug_3.mjs.map
