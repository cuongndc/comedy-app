globalThis.__timing__.logStart('Load chunks/related.post2');import { defineEventHandler, useBody } from 'h3';
import { c as client, a as collections } from './index.mjs';
import 'mongodb';

const related_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  return await client.db().collection(collections.comics).find({
    "tags.slug": {
      $in: body.tags
    }
  }).limit(15).toArray();
});

export { related_post as default };;globalThis.__timing__.logEnd('Load chunks/related.post2');
//# sourceMappingURL=related.post2.mjs.map
