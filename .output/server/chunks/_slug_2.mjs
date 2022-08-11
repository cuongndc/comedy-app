globalThis.__timing__.logStart('Load chunks/_slug_2');import { defineEventHandler } from 'h3';
import { c as client, a as collections } from './index.mjs';
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
  return await client.db().collection(collections.novels).find(filter).limit(30).sort({ updatedAt: -1 }).toArray();
});

export { _slug_ as default };;globalThis.__timing__.logEnd('Load chunks/_slug_2');
//# sourceMappingURL=_slug_2.mjs.map
