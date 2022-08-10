globalThis.__timing__.logStart('Load chunks/trending2');import { defineEventHandler } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const trending = defineEventHandler(async () => {
  const slug = [
    "ngon-tinh-co-dai",
    "ngon-tinh-hien-dai",
    "dam-my-bach-hop",
    "cuoc-thi-viet-truyen-ngan",
    "lang-man-ngot-ngao",
    "tinh-yeu-dau-doi",
    "linh-dai-trinh-tham"
  ];
  return await mongo.db().collection(collections.novels).find({
    "categories.categorySlug": {
      $in: slug
    }
  }).limit(99).sort({ viewCount: -1 }).toArray();
});

export { trending as default };;globalThis.__timing__.logEnd('Load chunks/trending2');
//# sourceMappingURL=trending2.mjs.map
