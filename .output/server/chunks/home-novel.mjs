globalThis.__timing__.logStart('Load chunks/home-novel');import { defineEventHandler } from 'h3';
import axios from 'axios';

const homeNovel = defineEventHandler(async () => {
  return axios.get("/api/wb/home-novel", {
    baseURL: process.env.SERVICE_URL || "http://103.166.185.88:5001"
  }).then((res) => res.data);
});

export { homeNovel as default };;globalThis.__timing__.logEnd('Load chunks/home-novel');
//# sourceMappingURL=home-novel.mjs.map
