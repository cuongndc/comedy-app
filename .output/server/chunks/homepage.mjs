globalThis.__timing__.logStart('Load chunks/homepage');import { defineEventHandler } from 'h3';
import axios from 'axios';

const homepage = defineEventHandler(async () => {
  return axios.get("/api/wb/homepage", {
    baseURL: process.env.SERVICE_URL || "http://103.166.185.88:5001"
  }).then((res) => res.data);
});

export { homepage as default };;globalThis.__timing__.logEnd('Load chunks/homepage');
//# sourceMappingURL=homepage.mjs.map
