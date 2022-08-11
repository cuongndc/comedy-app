globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};globalThis.__timing__.logStart('Load chunks/nitro/node-server');import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, lazyEventHandler, createApp, createRouter } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'nuxt-proxy/middleware';
import { fileURLToPath as fileURLToPath$1 } from 'node:url';
import { createIPX, createIPXMiddleware } from 'ipx';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/assets/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"domain":"https://meetoon.co","siteName":"MEETOON","imgCDN":"https://6z1a4akz.cdn.imgeng.in/"},"proxy":{"options":{"target":"http://service.meetoon.co","changeOrigin":true,"pathRewrite":{"^/api/proxy":"/api/wb"},"pathFilter":["/api/proxy"]}},"ipx":{"dir":"","domains":["meetoon.co","meetruyen.com"],"sharp":{},"alias":{}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(_error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(_error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: _error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (errorObject.statusCode !== 404) {
    console.error("[nuxt] [request error]", errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error) => {
    console.error("[nitro] Error while generating error response", error);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-MwP6wQpN6n/BsLfhyyT5iFT03M4\"",
    "mtime": "2022-08-11T03:20:17.560Z",
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-1wu/mwWpai4Cw0OMrOR2NIWxrTI\"",
    "mtime": "2022-08-11T03:20:17.560Z",
    "path": "../public/favicon.ico"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"5c1d-mpGu6s6iZzai2O3MwSKZEVnzLKc\"",
    "mtime": "2022-08-11T03:20:17.560Z",
    "path": "../public/icon.png"
  },
  "/manifest.579c8d44.json": {
    "type": "application/json",
    "etag": "\"9a6-Z9fyfGaGLtXESBL7hjNdbXpXnfg\"",
    "mtime": "2022-08-11T03:20:17.516Z",
    "path": "../public/manifest.579c8d44.json"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"16-iUOtJ2RsHfdY9DoQxaq0wz1LZCU\"",
    "mtime": "2022-08-11T03:20:17.543Z",
    "path": "../public/robots.txt"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"5a2-l8fKxp+EeYRWHojyorrxEV5RUi8\"",
    "mtime": "2022-08-11T03:20:17.516Z",
    "path": "../public/sw.js"
  },
  "/assets/CateList-0397d76c.mjs": {
    "type": "application/javascript",
    "etag": "\"28c-eefVk3BNhlCmnWyE5hQPLUzdztc\"",
    "mtime": "2022-08-11T03:20:17.542Z",
    "path": "../public/assets/CateList-0397d76c.mjs"
  },
  "/assets/Catelog-fe37912b.mjs": {
    "type": "application/javascript",
    "etag": "\"72c-QPF0zIFD1aYUVK7B4TJ9qrgKtv0\"",
    "mtime": "2022-08-11T03:20:17.542Z",
    "path": "../public/assets/Catelog-fe37912b.mjs"
  },
  "/assets/Chaplist-bdcc90eb.mjs": {
    "type": "application/javascript",
    "etag": "\"445-ikK4r5TrjKaG/Dzkvi80bmVC2Ms\"",
    "mtime": "2022-08-11T03:20:17.542Z",
    "path": "../public/assets/Chaplist-bdcc90eb.mjs"
  },
  "/assets/ChapterImg-d4dead78.mjs": {
    "type": "application/javascript",
    "etag": "\"1d0-tKbEzsFhIQMp2snimzeDu4dMPEs\"",
    "mtime": "2022-08-11T03:20:17.542Z",
    "path": "../public/assets/ChapterImg-d4dead78.mjs"
  },
  "/assets/ChapterRepresent-0d8fc81a.mjs": {
    "type": "application/javascript",
    "etag": "\"2a6-RxBVcjc9z/W6QFWNEnDLXBjtiSs\"",
    "mtime": "2022-08-11T03:20:17.542Z",
    "path": "../public/assets/ChapterRepresent-0d8fc81a.mjs"
  },
  "/assets/ChapterTab-c79e6c26.mjs": {
    "type": "application/javascript",
    "etag": "\"580-9m5Hp6MAZPGisGS4mZupu0Ynuyw\"",
    "mtime": "2022-08-11T03:20:17.542Z",
    "path": "../public/assets/ChapterTab-c79e6c26.mjs"
  },
  "/assets/ComicChapterTab-394a98e3.mjs": {
    "type": "application/javascript",
    "etag": "\"592-KWgWvEvA5VQZwrW7hLfW2KIeImQ\"",
    "mtime": "2022-08-11T03:20:17.541Z",
    "path": "../public/assets/ComicChapterTab-394a98e3.mjs"
  },
  "/assets/ComicItem-04eac2b2.mjs": {
    "type": "application/javascript",
    "etag": "\"5b1-w/7TSvqdGSxoi8XlSQy2EbjySx8\"",
    "mtime": "2022-08-11T03:20:17.541Z",
    "path": "../public/assets/ComicItem-04eac2b2.mjs"
  },
  "/assets/ComicTab-4ed8a0ae.mjs": {
    "type": "application/javascript",
    "etag": "\"340-VFSxI8RFjkcF22Lji2WJ21xRCtE\"",
    "mtime": "2022-08-11T03:20:17.541Z",
    "path": "../public/assets/ComicTab-4ed8a0ae.mjs"
  },
  "/assets/CommentComic-b2ec2e8c.mjs": {
    "type": "application/javascript",
    "etag": "\"80-MhHADe6mWsSZMcntLSa5NQW0WMo\"",
    "mtime": "2022-08-11T03:20:17.541Z",
    "path": "../public/assets/CommentComic-b2ec2e8c.mjs"
  },
  "/assets/MeeToonImg-d8f1e150.mjs": {
    "type": "application/javascript",
    "etag": "\"319-ePotMU7qZgYlBY0SAJwI/vqKizA\"",
    "mtime": "2022-08-11T03:20:17.541Z",
    "path": "../public/assets/MeeToonImg-d8f1e150.mjs"
  },
  "/assets/NewStory-18b9cd74.mjs": {
    "type": "application/javascript",
    "etag": "\"306-AxencYrbZbGbt4D4iL+T/VYsfts\"",
    "mtime": "2022-08-11T03:20:17.540Z",
    "path": "../public/assets/NewStory-18b9cd74.mjs"
  },
  "/assets/NewStory-91641fe8.mjs": {
    "type": "application/javascript",
    "etag": "\"2f3-CgMyIPVHkhnHE4wGpvmrJDol11U\"",
    "mtime": "2022-08-11T03:20:17.540Z",
    "path": "../public/assets/NewStory-91641fe8.mjs"
  },
  "/assets/NoveItem-4c4384ce.mjs": {
    "type": "application/javascript",
    "etag": "\"54d-pCwwnoLFDgGHjyl3/X47ZuXmBa4\"",
    "mtime": "2022-08-11T03:20:17.540Z",
    "path": "../public/assets/NoveItem-4c4384ce.mjs"
  },
  "/assets/PageLoading-57fce9d5.mjs": {
    "type": "application/javascript",
    "etag": "\"167-uq7/UYDMeAVDcjW0WC1llYNVkjo\"",
    "mtime": "2022-08-11T03:20:17.538Z",
    "path": "../public/assets/PageLoading-57fce9d5.mjs"
  },
  "/assets/ReadMangaFooter-f566ba6a.mjs": {
    "type": "application/javascript",
    "etag": "\"494-i2Z4XCeT3PcoRfBRLJh3iKO0AJs\"",
    "mtime": "2022-08-11T03:20:17.536Z",
    "path": "../public/assets/ReadMangaFooter-f566ba6a.mjs"
  },
  "/assets/RepresentCategory-0f248b95.mjs": {
    "type": "application/javascript",
    "etag": "\"c62-JHRj3A0O/9iaT75Z/ffOm5nVRu4\"",
    "mtime": "2022-08-11T03:20:17.536Z",
    "path": "../public/assets/RepresentCategory-0f248b95.mjs"
  },
  "/assets/RepresentCategory-429d32fc.mjs": {
    "type": "application/javascript",
    "etag": "\"c85-fEkl9vr2tSTnV7cYGbtO3wSI6/w\"",
    "mtime": "2022-08-11T03:20:17.536Z",
    "path": "../public/assets/RepresentCategory-429d32fc.mjs"
  },
  "/assets/SearchLoading-cfaf7229.mjs": {
    "type": "application/javascript",
    "etag": "\"c0e-5DdDQQi0p+3oMHNE1JjsAtRNaNw\"",
    "mtime": "2022-08-11T03:20:17.536Z",
    "path": "../public/assets/SearchLoading-cfaf7229.mjs"
  },
  "/assets/Spotlight-b55cce54.mjs": {
    "type": "application/javascript",
    "etag": "\"518-Z60vxMroZFyjNEoEhipG+nP5Eb4\"",
    "mtime": "2022-08-11T03:20:17.536Z",
    "path": "../public/assets/Spotlight-b55cce54.mjs"
  },
  "/assets/Spotlight-e4f1d675.mjs": {
    "type": "application/javascript",
    "etag": "\"480-EIvsQF0bmLMbA6nBxGmId3yI+Gw\"",
    "mtime": "2022-08-11T03:20:17.535Z",
    "path": "../public/assets/Spotlight-e4f1d675.mjs"
  },
  "/assets/TheFooter-a844b0e7.mjs": {
    "type": "application/javascript",
    "etag": "\"b76-GfjsJh7BrX/3PRM0qOhz2J8zBeA\"",
    "mtime": "2022-08-11T03:20:17.535Z",
    "path": "../public/assets/TheFooter-a844b0e7.mjs"
  },
  "/assets/TheHeader-d47fa637.mjs": {
    "type": "application/javascript",
    "etag": "\"3dc-BJrxZJ9XzkN7PaHqLA6qLCIfh/Y\"",
    "mtime": "2022-08-11T03:20:17.535Z",
    "path": "../public/assets/TheHeader-d47fa637.mjs"
  },
  "/assets/Trending-1b4d7c62.mjs": {
    "type": "application/javascript",
    "etag": "\"9c4-9aPCvjYZ9I33JnvKWA+t+pgeLiw\"",
    "mtime": "2022-08-11T03:20:17.535Z",
    "path": "../public/assets/Trending-1b4d7c62.mjs"
  },
  "/assets/Trending-ac1e4ac3.mjs": {
    "type": "application/javascript",
    "etag": "\"9fc-O5ELlW0GmzQd2U0IWzwlW34wILg\"",
    "mtime": "2022-08-11T03:20:17.534Z",
    "path": "../public/assets/Trending-ac1e4ac3.mjs"
  },
  "/assets/VisitedComic-1bd68ad6.mjs": {
    "type": "application/javascript",
    "etag": "\"838-ofn+zt71zitRjUKxHTWC5kfjwbE\"",
    "mtime": "2022-08-11T03:20:17.534Z",
    "path": "../public/assets/VisitedComic-1bd68ad6.mjs"
  },
  "/assets/__id_-2a9eef76.mjs": {
    "type": "application/javascript",
    "etag": "\"193d-EnSGPrseV7ghc8V3ih9ZRaKpUdQ\"",
    "mtime": "2022-08-11T03:20:17.534Z",
    "path": "../public/assets/__id_-2a9eef76.mjs"
  },
  "/assets/__id_-8f7556a0.mjs": {
    "type": "application/javascript",
    "etag": "\"c0f-7LlOa8qoo2xWl7gGAiIjOfHDmFI\"",
    "mtime": "2022-08-11T03:20:17.534Z",
    "path": "../public/assets/__id_-8f7556a0.mjs"
  },
  "/assets/__id_-bb3768c9.mjs": {
    "type": "application/javascript",
    "etag": "\"149e-CsqUAuVR8Vto9DOnPQZT08gldUI\"",
    "mtime": "2022-08-11T03:20:17.534Z",
    "path": "../public/assets/__id_-bb3768c9.mjs"
  },
  "/assets/_slug_-0e4af3f6.mjs": {
    "type": "application/javascript",
    "etag": "\"620-Jqf3SmPanSKSoXNGe1Oe/dpdIw4\"",
    "mtime": "2022-08-11T03:20:17.533Z",
    "path": "../public/assets/_slug_-0e4af3f6.mjs"
  },
  "/assets/_slug_-56014337.mjs": {
    "type": "application/javascript",
    "etag": "\"157c-izdGkn87KIQEmUPY6H8p8EzBMQg\"",
    "mtime": "2022-08-11T03:20:17.533Z",
    "path": "../public/assets/_slug_-56014337.mjs"
  },
  "/assets/_slug_-7914346b.mjs": {
    "type": "application/javascript",
    "etag": "\"5c9-UKaLJKv+m0Er7/u9jxcEpfvFtwo\"",
    "mtime": "2022-08-11T03:20:17.533Z",
    "path": "../public/assets/_slug_-7914346b.mjs"
  },
  "/assets/_slug_-eb114bca.mjs": {
    "type": "application/javascript",
    "etag": "\"5cb-3eUiwx7W2a7pki3opE2OTcgb9Cs\"",
    "mtime": "2022-08-11T03:20:17.533Z",
    "path": "../public/assets/_slug_-eb114bca.mjs"
  },
  "/assets/autoplay-fc19fa83.mjs": {
    "type": "application/javascript",
    "etag": "\"bdc-FwywTZ2x/764XHuWcoWo3FHO9uY\"",
    "mtime": "2022-08-11T03:20:17.533Z",
    "path": "../public/assets/autoplay-fc19fa83.mjs"
  },
  "/assets/default-4cd45dd2.mjs": {
    "type": "application/javascript",
    "etag": "\"199-j92cpz+04r/ySJ2uNcwx1WlxeTY\"",
    "mtime": "2022-08-11T03:20:17.532Z",
    "path": "../public/assets/default-4cd45dd2.mjs"
  },
  "/assets/entry-b5225d3d.mjs": {
    "type": "application/javascript",
    "etag": "\"391d7-NXRUMb2Z7LXls5QlwS0W3INtBE0\"",
    "mtime": "2022-08-11T03:20:17.532Z",
    "path": "../public/assets/entry-b5225d3d.mjs"
  },
  "/assets/entry.fa0f9e10.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"881e-Kuiqey828gQ3jaSA0MTPJ76xqxo\"",
    "mtime": "2022-08-11T03:20:17.532Z",
    "path": "../public/assets/entry.fa0f9e10.css"
  },
  "/assets/error-404-096b46a1.mjs": {
    "type": "application/javascript",
    "etag": "\"822-KAGf8S3K/Xmel9Oh8Jqzr70IYYg\"",
    "mtime": "2022-08-11T03:20:17.531Z",
    "path": "../public/assets/error-404-096b46a1.mjs"
  },
  "/assets/error-404.314f7075.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11bd-kF6SKfdJYaoPOx5XSNB4IuKqq6c\"",
    "mtime": "2022-08-11T03:20:17.531Z",
    "path": "../public/assets/error-404.314f7075.css"
  },
  "/assets/error-500-e3df3c2d.mjs": {
    "type": "application/javascript",
    "etag": "\"6cb-Xu+uWvOzUvBv25S8FImT7tHhYLQ\"",
    "mtime": "2022-08-11T03:20:17.531Z",
    "path": "../public/assets/error-500-e3df3c2d.mjs"
  },
  "/assets/error-500.4e3461e5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"af4-ckENJljqPJ6JYcymKbQpp8F2r1I\"",
    "mtime": "2022-08-11T03:20:17.531Z",
    "path": "../public/assets/error-500.4e3461e5.css"
  },
  "/assets/error-component-cf2ddb6b.mjs": {
    "type": "application/javascript",
    "etag": "\"425-Cn8LP0Kn6eH0gtnFy5nyXY9oscs\"",
    "mtime": "2022-08-11T03:20:17.531Z",
    "path": "../public/assets/error-component-cf2ddb6b.mjs"
  },
  "/assets/fetch-a362cbd0.mjs": {
    "type": "application/javascript",
    "etag": "\"2ed-bOjBy1EcP4cyiXYYMrRxcIXql8M\"",
    "mtime": "2022-08-11T03:20:17.530Z",
    "path": "../public/assets/fetch-a362cbd0.mjs"
  },
  "/assets/grid-55226633.mjs": {
    "type": "application/javascript",
    "etag": "\"488-8X9mECUbMrQBPMlqPGcTz+qyZZo\"",
    "mtime": "2022-08-11T03:20:17.530Z",
    "path": "../public/assets/grid-55226633.mjs"
  },
  "/assets/index-06a1a6d4.mjs": {
    "type": "application/javascript",
    "etag": "\"c0a-uzz3jATxwO+RiRdFTjFaqf90Rs4\"",
    "mtime": "2022-08-11T03:20:17.528Z",
    "path": "../public/assets/index-06a1a6d4.mjs"
  },
  "/assets/index-0df74a5c.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-FDM6rRW0dlOscDJc88yU63B3qZI\"",
    "mtime": "2022-08-11T03:20:17.528Z",
    "path": "../public/assets/index-0df74a5c.mjs"
  },
  "/assets/index-89028a6b.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-gRyngFJ5K8/WXq3+XmnzgmZmiZY\"",
    "mtime": "2022-08-11T03:20:17.528Z",
    "path": "../public/assets/index-89028a6b.mjs"
  },
  "/assets/index-9d82279a.mjs": {
    "type": "application/javascript",
    "etag": "\"8d8-gdp3NsVIR8rLA2NTSAZTllzV/nQ\"",
    "mtime": "2022-08-11T03:20:17.527Z",
    "path": "../public/assets/index-9d82279a.mjs"
  },
  "/assets/index-b351655c.mjs": {
    "type": "application/javascript",
    "etag": "\"81-UwFiXQTk7Q8xq0jYypVaJ+lfSV4\"",
    "mtime": "2022-08-11T03:20:17.527Z",
    "path": "../public/assets/index-b351655c.mjs"
  },
  "/assets/index-bfe0188b.mjs": {
    "type": "application/javascript",
    "etag": "\"d95-U1b9oAsK06nlH5gbcB3/wJ5wNio\"",
    "mtime": "2022-08-11T03:20:17.527Z",
    "path": "../public/assets/index-bfe0188b.mjs"
  },
  "/assets/index-fb972410.mjs": {
    "type": "application/javascript",
    "etag": "\"59d-REgNGV6PrBVbUeBDRXkig0GPtbA\"",
    "mtime": "2022-08-11T03:20:17.527Z",
    "path": "../public/assets/index-fb972410.mjs"
  },
  "/assets/manga-346d12b3.mjs": {
    "type": "application/javascript",
    "etag": "\"194-iUAzMPVMaqveqEK38Zf9qIozLYE\"",
    "mtime": "2022-08-11T03:20:17.526Z",
    "path": "../public/assets/manga-346d12b3.mjs"
  },
  "/assets/manifest.json": {
    "type": "application/json",
    "etag": "\"41a0-ZVKub6JAaGNp73PsLCxHcfobIjY\"",
    "mtime": "2022-08-11T03:20:17.526Z",
    "path": "../public/assets/manifest.json"
  },
  "/assets/menu-80ee43c9.mjs": {
    "type": "application/javascript",
    "etag": "\"199-7pLg6aIpjS0IiHpziiKJCj34TnM\"",
    "mtime": "2022-08-11T03:20:17.526Z",
    "path": "../public/assets/menu-80ee43c9.mjs"
  },
  "/assets/swiper-slide-1fe8b0a5.mjs": {
    "type": "application/javascript",
    "etag": "\"48ad-aMLXN5DUswcrCr5gFT79aFjE15E\"",
    "mtime": "2022-08-11T03:20:17.526Z",
    "path": "../public/assets/swiper-slide-1fe8b0a5.mjs"
  },
  "/assets/trending-f894247d.mjs": {
    "type": "application/javascript",
    "etag": "\"bc6-muEO6lsCamxgKg5UwTkD+XJL9lM\"",
    "mtime": "2022-08-11T03:20:17.525Z",
    "path": "../public/assets/trending-f894247d.mjs"
  },
  "/assets/truyen-chu-hot-7a0627b5.mjs": {
    "type": "application/javascript",
    "etag": "\"c62-c7POJiNZvt9S5FpM2zjd2o6GTtE\"",
    "mtime": "2022-08-11T03:20:17.525Z",
    "path": "../public/assets/truyen-chu-hot-7a0627b5.mjs"
  },
  "/assets/welcome-51ab9a48.mjs": {
    "type": "application/javascript",
    "etag": "\"2dcb-3vvifG0hLcXW+HGsDtNKwSsTvz0\"",
    "mtime": "2022-08-11T03:20:17.525Z",
    "path": "../public/assets/welcome-51ab9a48.mjs"
  },
  "/images/bg-spotlight.png": {
    "type": "image/png",
    "etag": "\"afce-Fv92f75+twXYgi7IhMurXn3C/YU\"",
    "mtime": "2022-08-11T03:20:17.550Z",
    "path": "../public/images/bg-spotlight.png"
  },
  "/images/bg-wrapper-spotlight.png": {
    "type": "image/png",
    "etag": "\"14ddf-naVXN9F2enq+MJHhgCb4iiVNFP8\"",
    "mtime": "2022-08-11T03:20:17.549Z",
    "path": "../public/images/bg-wrapper-spotlight.png"
  },
  "/images/category.png": {
    "type": "image/png",
    "etag": "\"857-E65BKOki9tXQ+iUe1t0+97yohKc\"",
    "mtime": "2022-08-11T03:20:17.549Z",
    "path": "../public/images/category.png"
  },
  "/images/dam-my.png": {
    "type": "image/png",
    "etag": "\"96d9-FGyvJa2ABdzlSz/cr338ggdkNEM\"",
    "mtime": "2022-08-11T03:20:17.549Z",
    "path": "../public/images/dam-my.png"
  },
  "/images/huyen-huyen.png": {
    "type": "image/png",
    "etag": "\"88f7-WNKcF+vfYPMHUeTfwehM2bhgJ6E\"",
    "mtime": "2022-08-11T03:20:17.549Z",
    "path": "../public/images/huyen-huyen.png"
  },
  "/images/img-avatar.png": {
    "type": "image/png",
    "etag": "\"1f4a-Mv7atszIBIS+Gs9JYfFRzccyzXg\"",
    "mtime": "2022-08-11T03:20:17.548Z",
    "path": "../public/images/img-avatar.png"
  },
  "/images/mao-hiem.png": {
    "type": "image/png",
    "etag": "\"9fea-q7aahfuruaacccLx99Mo3TosRFU\"",
    "mtime": "2022-08-11T03:20:17.548Z",
    "path": "../public/images/mao-hiem.png"
  },
  "/images/nu-cuong.png": {
    "type": "image/png",
    "etag": "\"9402-Z2c0olLUOM77c5ydX+gWeu8KwUc\"",
    "mtime": "2022-08-11T03:20:17.548Z",
    "path": "../public/images/nu-cuong.png"
  },
  "/images/ranking.png": {
    "type": "image/png",
    "etag": "\"82c-/xslGZS+mtDeoIlpem5pCeqfEJ0\"",
    "mtime": "2022-08-11T03:20:17.548Z",
    "path": "../public/images/ranking.png"
  },
  "/images/spotlight-1.png": {
    "type": "image/png",
    "etag": "\"6e167-QR1+PI/vDr3jPvyOTWx6LPJbRUI\"",
    "mtime": "2022-08-11T03:20:17.548Z",
    "path": "../public/images/spotlight-1.png"
  },
  "/images/spotlight-2.png": {
    "type": "image/png",
    "etag": "\"20734-2ZjV6bURjiLLPEGRhoK8i+0Kons\"",
    "mtime": "2022-08-11T03:20:17.547Z",
    "path": "../public/images/spotlight-2.png"
  },
  "/images/spotlight-3.png": {
    "type": "image/png",
    "etag": "\"1f6b8-cIpGQEjNfizyaXbDGRTd7x7rmyA\"",
    "mtime": "2022-08-11T03:20:17.547Z",
    "path": "../public/images/spotlight-3.png"
  },
  "/images/spotlight-5.png": {
    "type": "image/png",
    "etag": "\"2fdfb-vjpSmy63NYvM/1IIhCap1yrJqJ0\"",
    "mtime": "2022-08-11T03:20:17.547Z",
    "path": "../public/images/spotlight-5.png"
  },
  "/images/spotlight-7.png": {
    "type": "image/png",
    "etag": "\"6b158-fgnxEDxvJSQqAO99kHRgHqZlrwM\"",
    "mtime": "2022-08-11T03:20:17.546Z",
    "path": "../public/images/spotlight-7.png"
  },
  "/images/tong-tai.png": {
    "type": "image/png",
    "etag": "\"7bd2-bKpMyMVdKevDX5rHj6U9+tmNs3E\"",
    "mtime": "2022-08-11T03:20:17.546Z",
    "path": "../public/images/tong-tai.png"
  },
  "/images/truong-hoc.png": {
    "type": "image/png",
    "etag": "\"a103-1Dcggw6172hOqXZLQW2LJ8KSy74\"",
    "mtime": "2022-08-11T03:20:17.544Z",
    "path": "../public/images/truong-hoc.png"
  },
  "/loading/pikachu.gif": {
    "type": "image/gif",
    "etag": "\"4c13-MHExx3jwuiJAx783AUS958gqaxQ\"",
    "mtime": "2022-08-11T03:20:17.543Z",
    "path": "../public/loading/pikachu.gif"
  },
  "/assets/icons/120x120.af090742.png": {
    "type": "image/png",
    "etag": "\"1ea2-Bo9T9KMbXzDh4hqfEupntkNws8Q\"",
    "mtime": "2022-08-11T03:20:17.524Z",
    "path": "../public/assets/icons/120x120.af090742.png"
  },
  "/assets/icons/120x120.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"17b2-N92yGdmt0CZF3qYmrIJ7xW43UVs\"",
    "mtime": "2022-08-11T03:20:17.524Z",
    "path": "../public/assets/icons/120x120.maskable.af090742.png"
  },
  "/assets/icons/144x144.af090742.png": {
    "type": "image/png",
    "etag": "\"24e3-FF67bU+bET9678Dn4fhWEdl4vy8\"",
    "mtime": "2022-08-11T03:20:17.524Z",
    "path": "../public/assets/icons/144x144.af090742.png"
  },
  "/assets/icons/144x144.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"1d91-9ow7r94STY9lPnM40j7YD4ilNbg\"",
    "mtime": "2022-08-11T03:20:17.524Z",
    "path": "../public/assets/icons/144x144.maskable.af090742.png"
  },
  "/assets/icons/152x152.af090742.png": {
    "type": "image/png",
    "etag": "\"273f-5QjwH5p5LSE5sFRdtcDIdTfdZMQ\"",
    "mtime": "2022-08-11T03:20:17.523Z",
    "path": "../public/assets/icons/152x152.af090742.png"
  },
  "/assets/icons/152x152.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"1f54-8kxm+9fDuEEXFMRUiUFNVWQRal4\"",
    "mtime": "2022-08-11T03:20:17.523Z",
    "path": "../public/assets/icons/152x152.maskable.af090742.png"
  },
  "/assets/icons/192x192.af090742.png": {
    "type": "image/png",
    "etag": "\"32b2-LH+MnW75Xyz/DcPmKJSXBr+LAfM\"",
    "mtime": "2022-08-11T03:20:17.523Z",
    "path": "../public/assets/icons/192x192.af090742.png"
  },
  "/assets/icons/192x192.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"2790-EuDIoUTqlPEJq73Zbw47qjEAwxc\"",
    "mtime": "2022-08-11T03:20:17.523Z",
    "path": "../public/assets/icons/192x192.maskable.af090742.png"
  },
  "/assets/icons/384x384.af090742.png": {
    "type": "image/png",
    "etag": "\"703c-98X2hkfpZZ5z+BsX0gucbFAaSL8\"",
    "mtime": "2022-08-11T03:20:17.522Z",
    "path": "../public/assets/icons/384x384.af090742.png"
  },
  "/assets/icons/384x384.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"5681-K6e23MVR50jXJ+qym7SkSugRqFk\"",
    "mtime": "2022-08-11T03:20:17.522Z",
    "path": "../public/assets/icons/384x384.maskable.af090742.png"
  },
  "/assets/icons/512x512.af090742.png": {
    "type": "image/png",
    "etag": "\"3c90-VUCr35aEGCYrqtxtaI0F6WrTh1s\"",
    "mtime": "2022-08-11T03:20:17.522Z",
    "path": "../public/assets/icons/512x512.af090742.png"
  },
  "/assets/icons/512x512.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"7b01-koWx138wzx/bIpmAzkuznFMJBIw\"",
    "mtime": "2022-08-11T03:20:17.522Z",
    "path": "../public/assets/icons/512x512.maskable.af090742.png"
  },
  "/assets/icons/64x64.af090742.png": {
    "type": "image/png",
    "etag": "\"f22-BeuCFbDFCqnP16JlAp+3W6tOAXQ\"",
    "mtime": "2022-08-11T03:20:17.521Z",
    "path": "../public/assets/icons/64x64.af090742.png"
  },
  "/assets/icons/64x64.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"cb9-RcpzG9wzYOErS0iBXkAUy3FsE1A\"",
    "mtime": "2022-08-11T03:20:17.521Z",
    "path": "../public/assets/icons/64x64.maskable.af090742.png"
  },
  "/icons/chapterItem/icon-comment.svg": {
    "type": "image/svg+xml",
    "etag": "\"30a-tKaEVrz0AGgkFsmtzZoiK249TOg\"",
    "mtime": "2022-08-11T03:20:17.560Z",
    "path": "../public/icons/chapterItem/icon-comment.svg"
  },
  "/icons/chapterItem/icon-like.svg": {
    "type": "image/svg+xml",
    "etag": "\"338-Mu3PLBD3C+VbyRHNntvb/evTs98\"",
    "mtime": "2022-08-11T03:20:17.559Z",
    "path": "../public/icons/chapterItem/icon-like.svg"
  },
  "/icons/chapterItem/icon-view.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-EuS8o4d69l/BxN7Ip58G0DNY2ZU\"",
    "mtime": "2022-08-11T03:20:17.559Z",
    "path": "../public/icons/chapterItem/icon-view.svg"
  },
  "/icons/comicPage/backgroundInfo.png": {
    "type": "image/png",
    "etag": "\"30d4-o2f3aSZrDK2vB+thMfxXpqIPbxc\"",
    "mtime": "2022-08-11T03:20:17.559Z",
    "path": "../public/icons/comicPage/backgroundInfo.png"
  },
  "/icons/comicPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"119-EYaRxectNOBTtXeZEsmwnSTB+bQ\"",
    "mtime": "2022-08-11T03:20:17.559Z",
    "path": "../public/icons/comicPage/icon-back.svg"
  },
  "/icons/comicPage/icon-comment-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"28a-PgPoMRg6jcTxhJURo48TG+lc6Ss\"",
    "mtime": "2022-08-11T03:20:17.558Z",
    "path": "../public/icons/comicPage/icon-comment-count.svg"
  },
  "/icons/comicPage/icon-follow-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c2-mcOabHBYmJOjYl1TSMVRd9w3sCA\"",
    "mtime": "2022-08-11T03:20:17.558Z",
    "path": "../public/icons/comicPage/icon-follow-count.svg"
  },
  "/icons/comicPage/icon-follow.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c2-mcOabHBYmJOjYl1TSMVRd9w3sCA\"",
    "mtime": "2022-08-11T03:20:17.558Z",
    "path": "../public/icons/comicPage/icon-follow.svg"
  },
  "/icons/comicPage/icon-promote.png": {
    "type": "image/png",
    "etag": "\"ae6-ChBGJd6lmGsfyZoYsPfoavAeQys\"",
    "mtime": "2022-08-11T03:20:17.558Z",
    "path": "../public/icons/comicPage/icon-promote.png"
  },
  "/icons/comicPage/icon-report.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f8-tcGpENfuInaasFGvALGYLxbxxSk\"",
    "mtime": "2022-08-11T03:20:17.558Z",
    "path": "../public/icons/comicPage/icon-report.svg"
  },
  "/icons/comicPage/icon-share.svg": {
    "type": "image/svg+xml",
    "etag": "\"4db-suvf51D+kGPy94FT1U0BiisG6Lc\"",
    "mtime": "2022-08-11T03:20:17.558Z",
    "path": "../public/icons/comicPage/icon-share.svg"
  },
  "/icons/comicPage/icon-star-deactive.svg": {
    "type": "image/svg+xml",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2022-08-11T03:20:17.557Z",
    "path": "../public/icons/comicPage/icon-star-deactive.svg"
  },
  "/icons/comicPage/icon-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"33d-leI151VDTgvlK2pUxO+VRE19rR0\"",
    "mtime": "2022-08-11T03:20:17.557Z",
    "path": "../public/icons/comicPage/icon-star.svg"
  },
  "/icons/comicPage/icon-view-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-RCrIOPQmJIjlK3sNCpVZ2JPJRsA\"",
    "mtime": "2022-08-11T03:20:17.557Z",
    "path": "../public/icons/comicPage/icon-view-count.svg"
  },
  "/icons/header/icon-back-white.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0-AHS3nfopH5kdniGlg2rbUHb5sVE\"",
    "mtime": "2022-08-11T03:20:17.557Z",
    "path": "../public/icons/header/icon-back-white.svg"
  },
  "/icons/header/icon-search.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ab-YJ8OrjmJIGFDfBMQQABSueOkt/w\"",
    "mtime": "2022-08-11T03:20:17.556Z",
    "path": "../public/icons/header/icon-search.svg"
  },
  "/icons/homePage/icon-view-chapter.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-+XXJMOqo2k6wq93ILanbxLFS15E\"",
    "mtime": "2022-08-11T03:20:17.556Z",
    "path": "../public/icons/homePage/icon-view-chapter.svg"
  },
  "/icons/menuBar/category_v2.png": {
    "type": "image/png",
    "etag": "\"2376-yvt9WKk1G+wIw8MFk04Ql6MovLs\"",
    "mtime": "2022-08-11T03:20:17.556Z",
    "path": "../public/icons/menuBar/category_v2.png"
  },
  "/icons/menuBar/community_v2.png": {
    "type": "image/png",
    "etag": "\"23e1-pZLzP6foJ0eTIdW0kAK208ddVZk\"",
    "mtime": "2022-08-11T03:20:17.556Z",
    "path": "../public/icons/menuBar/community_v2.png"
  },
  "/icons/menuBar/follow_v2.png": {
    "type": "image/png",
    "etag": "\"2295-io44b51HHQoBgWf80zlIk51aOWc\"",
    "mtime": "2022-08-11T03:20:17.555Z",
    "path": "../public/icons/menuBar/follow_v2.png"
  },
  "/icons/menuBar/mission_v2.png": {
    "type": "image/png",
    "etag": "\"24a8-RPdmEXiRaMT6aUQL34YXAUs8Yj8\"",
    "mtime": "2022-08-11T03:20:17.555Z",
    "path": "../public/icons/menuBar/mission_v2.png"
  },
  "/icons/menuBar/ranking_v2.png": {
    "type": "image/png",
    "etag": "\"2274-hbGfGZGZmbanqR2HkhbwMZtquTk\"",
    "mtime": "2022-08-11T03:20:17.555Z",
    "path": "../public/icons/menuBar/ranking_v2.png"
  },
  "/icons/novelChapterPage/icon-arrow-down.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d-DAvclMLweya6I+XTwA4HJO1AY+Y\"",
    "mtime": "2022-08-11T03:20:17.555Z",
    "path": "../public/icons/novelChapterPage/icon-arrow-down.svg"
  },
  "/icons/novelChapterPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"11a-xrq0+MckOb9+JL/7sOxBLvH7IbE\"",
    "mtime": "2022-08-11T03:20:17.555Z",
    "path": "../public/icons/novelChapterPage/icon-back.svg"
  },
  "/icons/novelChapterPage/icon-comment.svg": {
    "type": "image/svg+xml",
    "etag": "\"294-5zR/8//Qr241j4gjQ/86yza1+l0\"",
    "mtime": "2022-08-11T03:20:17.555Z",
    "path": "../public/icons/novelChapterPage/icon-comment.svg"
  },
  "/icons/novelChapterPage/icon-follow-footer-unactive.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c6-m+rAJ7GwieJB6CHsX7wFf+6a/N0\"",
    "mtime": "2022-08-11T03:20:17.554Z",
    "path": "../public/icons/novelChapterPage/icon-follow-footer-unactive.svg"
  },
  "/icons/novelChapterPage/icon-footer-setting.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f7-pQDcMACLQ2LwPVedu4WtzZ3f3AQ\"",
    "mtime": "2022-08-11T03:20:17.554Z",
    "path": "../public/icons/novelChapterPage/icon-footer-setting.svg"
  },
  "/icons/novelChapterPage/icon-next.svg": {
    "type": "image/svg+xml",
    "etag": "\"285-73gsAhjW7yLqKPwJA+KECyRcH1o\"",
    "mtime": "2022-08-11T03:20:17.554Z",
    "path": "../public/icons/novelChapterPage/icon-next.svg"
  },
  "/icons/novelChapterPage/icon-prev.svg": {
    "type": "image/svg+xml",
    "etag": "\"287-PYJF+hqQ1pXz7Dz0L6uprcnDZmA\"",
    "mtime": "2022-08-11T03:20:17.554Z",
    "path": "../public/icons/novelChapterPage/icon-prev.svg"
  },
  "/icons/novelChapterPage/icon-report.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f6-THXBp2o3aDBA9/ZyJoa5h2cE56E\"",
    "mtime": "2022-08-11T03:20:17.554Z",
    "path": "../public/icons/novelChapterPage/icon-report.svg"
  },
  "/icons/novelChapterPage/icon-share.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f0-Un1dC+G0iymWU8YmO1EWw1IuRmQ\"",
    "mtime": "2022-08-11T03:20:17.554Z",
    "path": "../public/icons/novelChapterPage/icon-share.svg"
  },
  "/icons/searchPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0-NujVPaP8y67ZtwgqY9O0QkCh7ss\"",
    "mtime": "2022-08-11T03:20:17.554Z",
    "path": "../public/icons/searchPage/icon-back.svg"
  },
  "/icons/searchPage/icon-close.svg": {
    "type": "image/svg+xml",
    "etag": "\"20b-Nq/7L9bkiCddZSY0Xm4X8/mFdlM\"",
    "mtime": "2022-08-11T03:20:17.553Z",
    "path": "../public/icons/searchPage/icon-close.svg"
  },
  "/icons/searchPage/icon-search.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ff-bbuK3n5mjvz2hNkwLX81QEeKbtc\"",
    "mtime": "2022-08-11T03:20:17.553Z",
    "path": "../public/icons/searchPage/icon-search.svg"
  },
  "/icons/searchPage/icon-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-xOosY3V0XdXZf7KUQyFRh0gN0UM\"",
    "mtime": "2022-08-11T03:20:17.553Z",
    "path": "../public/icons/searchPage/icon-star.svg"
  },
  "/icons/searchPage/icon-view-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-EuS8o4d69l/BxN7Ip58G0DNY2ZU\"",
    "mtime": "2022-08-11T03:20:17.553Z",
    "path": "../public/icons/searchPage/icon-view-count.svg"
  },
  "/icons/tabbar/icon-canhan.svg": {
    "type": "image/svg+xml",
    "etag": "\"5b0-QgHHSy6i78LIgWCWol0tHvfsJNY\"",
    "mtime": "2022-08-11T03:20:17.553Z",
    "path": "../public/icons/tabbar/icon-canhan.svg"
  },
  "/icons/tabbar/icon-newsfeed.svg": {
    "type": "image/svg+xml",
    "etag": "\"66f-B/o0NLlN4OPOTUBooEFdc2zRl6M\"",
    "mtime": "2022-08-11T03:20:17.552Z",
    "path": "../public/icons/tabbar/icon-newsfeed.svg"
  },
  "/icons/tabbar/icon-novel-active.svg": {
    "type": "image/svg+xml",
    "etag": "\"936-IS0BtzHMXjmAC5CJo4N+6kmbt/E\"",
    "mtime": "2022-08-11T03:20:17.552Z",
    "path": "../public/icons/tabbar/icon-novel-active.svg"
  },
  "/icons/tabbar/icon-novel.svg": {
    "type": "image/svg+xml",
    "etag": "\"936-hOMOXh2+fGNAlYTGhu09kfNIB3Y\"",
    "mtime": "2022-08-11T03:20:17.552Z",
    "path": "../public/icons/tabbar/icon-novel.svg"
  },
  "/icons/tabbar/icon-toon-active.svg": {
    "type": "image/svg+xml",
    "etag": "\"67d-A5yStXKRiUCbVR4qfno/x3Skk5Q\"",
    "mtime": "2022-08-11T03:20:17.552Z",
    "path": "../public/icons/tabbar/icon-toon-active.svg"
  },
  "/icons/tabbar/icon-toon.svg": {
    "type": "image/svg+xml",
    "etag": "\"69f-G988y5OIA6mLzGSSgFc+h4+R8YI\"",
    "mtime": "2022-08-11T03:20:17.552Z",
    "path": "../public/icons/tabbar/icon-toon.svg"
  },
  "/icons/tabbar/icon-tutruyen.svg": {
    "type": "image/svg+xml",
    "etag": "\"650-AgiyMw1qU7jOgUv5W/U1W+hyxk8\"",
    "mtime": "2022-08-11T03:20:17.551Z",
    "path": "../public/icons/tabbar/icon-tutruyen.svg"
  },
  "/images/trending/bg-trending.png": {
    "type": "image/png",
    "etag": "\"bd222-hJzVmGMgWNspLIVzjjiCCds+AC4\"",
    "mtime": "2022-08-11T03:20:17.545Z",
    "path": "../public/images/trending/bg-trending.png"
  },
  "/icons/widgets/trend/img-header-novel.svg": {
    "type": "image/svg+xml",
    "etag": "\"20ac9-u/wYMWK/qez/ChEej8yQ2WiFnss\"",
    "mtime": "2022-08-11T03:20:17.551Z",
    "path": "../public/icons/widgets/trend/img-header-novel.svg"
  },
  "/icons/widgets/trend/img-header.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fa0b-LgQNTFo/k4fJnjlNaSm46AmHX4E\"",
    "mtime": "2022-08-11T03:20:17.551Z",
    "path": "../public/icons/widgets/trend/img-header.svg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = ["/assets","/assets"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _v49n7p = createProxyMiddleware({ "target": "http://service.meetoon.co", "changeOrigin": true, "pathRewrite": { "^/api/proxy": "/api/wb" }, "pathFilter": ["/api/proxy"] });

const _uR6ovl = lazyEventHandler(() => {
  const ipxOptions = {
    ...useRuntimeConfig().ipx || {},
    dir: fileURLToPath$1(new URL("../public", globalThis._importMeta_.url))
  };
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  return eventHandler(async (event) => {
    event.req.url = withLeadingSlash(event.context.params._);
    await middleware(event.req, event.res);
  });
});

const _lazy_1mbNW8 = () => import('../trending.mjs');
const _lazy_WHBJoW = () => import('../_slug_.mjs');
const _lazy_ya8RSQ = () => import('../read-comic.mjs');
const _lazy_LxyAFO = () => import('../trending2.mjs');
const _lazy_1jipKl = () => import('../related.post.mjs');
const _lazy_Jn2S6N = () => import('../read-novel.mjs');
const _lazy_WJiWee = () => import('../information.mjs');
const _lazy_tXQq0x = () => import('../_slug_2.mjs');
const _lazy_tu2PlR = () => import('../chapters.mjs');
const _lazy_XUh2K0 = () => import('../_slug_3.mjs');
const _lazy_Jyv2bI = () => import('../homepage.mjs');
const _lazy_1tvghZ = () => import('../home-novel.mjs');
const _lazy_0Svp7f = () => import('../_slug_4.mjs');
const _lazy_iTrADS = () => import('../search.mjs');
const _lazy_TQ7zl6 = () => import('../related.post2.mjs');
const _lazy_Ij9S53 = () => import('../__id_.mjs');
const _lazy_t0w8lA = () => import('../chapters2.mjs');
const _lazy_b1GDrx = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/trending', handler: _lazy_1mbNW8, lazy: true, middleware: false, method: undefined },
  { route: '/api/tag/:slug', handler: _lazy_WHBJoW, lazy: true, middleware: false, method: undefined },
  { route: '/api/read-comic', handler: _lazy_ya8RSQ, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/trending', handler: _lazy_LxyAFO, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/related', handler: _lazy_1jipKl, lazy: true, middleware: false, method: "post" },
  { route: '/api/novel/read-novel', handler: _lazy_Jn2S6N, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/information', handler: _lazy_WJiWee, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/danh-muc/:slug', handler: _lazy_tXQq0x, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/chapters', handler: _lazy_tu2PlR, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/:slug', handler: _lazy_XUh2K0, lazy: true, middleware: false, method: undefined },
  { route: '/api/homepage', handler: _lazy_Jyv2bI, lazy: true, middleware: false, method: undefined },
  { route: '/api/home-novel', handler: _lazy_1tvghZ, lazy: true, middleware: false, method: undefined },
  { route: '/api/danh-muc/:slug', handler: _lazy_0Svp7f, lazy: true, middleware: false, method: undefined },
  { route: '/api/comic/search', handler: _lazy_iTrADS, lazy: true, middleware: false, method: undefined },
  { route: '/api/comic/related', handler: _lazy_TQ7zl6, lazy: true, middleware: false, method: "post" },
  { route: '/api/comic/:slug/:_id', handler: _lazy_Ij9S53, lazy: true, middleware: false, method: undefined },
  { route: '/api/chapters', handler: _lazy_t0w8lA, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_b1GDrx, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _v49n7p, lazy: false, middleware: true, method: undefined },
  { route: '/_ipx/**', handler: _uR6ovl, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_b1GDrx, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { nodeServer as n, useRuntimeConfig as u };;globalThis.__timing__.logEnd('Load chunks/nitro/node-server');
//# sourceMappingURL=node-server.mjs.map
