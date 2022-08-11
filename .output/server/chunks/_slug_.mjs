globalThis.__timing__.logStart('Load chunks/_slug_');import { defineEventHandler } from 'h3';
import { c as client, a as collections } from './index.mjs';
import 'mongodb';

const _slug_ = defineEventHandler(async (event) => {
  const slug = event.context.params.slug;
  return await client.db().collection(collections.comics).find({
    "tags.slug": slug
  }).limit(25).sort({ updatedAt: -1 }).toArray();
});

export { _slug_ as default };;globalThis.__timing__.logEnd('Load chunks/_slug_');
//# sourceMappingURL=_slug_.mjs.map
