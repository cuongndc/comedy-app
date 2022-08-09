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

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/assets/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"domain":"https://meetoon.co","siteName":"MEETOON","imgCDN":"https://6z1a4akz.cdn.imgeng.in/"},"mongodbURI":"mongodb+srv://cuongnd:aPOEFnnYrKjH5fnn@cluster0.qkg20.mongodb.net/comics-db","serviceURL":"http://localhost:5001","proxy":{"options":{"target":"http://localhost:5001","changeOrigin":true,"pathRewrite":{"^/api/proxy":"/api/wb"},"pathFilter":["/api/proxy"]}},"ipx":{"dir":"","domains":["meetoon.co","meetruyen.com"],"sharp":{},"alias":{}}};
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
    "mtime": "2022-08-09T08:30:22.676Z",
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-1wu/mwWpai4Cw0OMrOR2NIWxrTI\"",
    "mtime": "2022-08-09T08:30:22.676Z",
    "path": "../public/favicon.ico"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"5c1d-mpGu6s6iZzai2O3MwSKZEVnzLKc\"",
    "mtime": "2022-08-09T08:30:22.676Z",
    "path": "../public/icon.png"
  },
  "/manifest.579c8d44.json": {
    "type": "application/json",
    "etag": "\"9a6-Z9fyfGaGLtXESBL7hjNdbXpXnfg\"",
    "mtime": "2022-08-09T08:30:22.618Z",
    "path": "../public/manifest.579c8d44.json"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"16-iUOtJ2RsHfdY9DoQxaq0wz1LZCU\"",
    "mtime": "2022-08-09T08:30:22.659Z",
    "path": "../public/robots.txt"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"5a2-l8fKxp+EeYRWHojyorrxEV5RUi8\"",
    "mtime": "2022-08-09T08:30:22.616Z",
    "path": "../public/sw.js"
  },
  "/assets/CateList-519f3b38.mjs": {
    "type": "application/javascript",
    "etag": "\"26d-Fxqayw9z/jrHrDkO7H3ZoAJ1/kQ\"",
    "mtime": "2022-08-09T08:30:22.659Z",
    "path": "../public/assets/CateList-519f3b38.mjs"
  },
  "/assets/Catelog-1b1ba554.mjs": {
    "type": "application/javascript",
    "etag": "\"72c-806usXkSVbLgL71skaeaaSwzSo0\"",
    "mtime": "2022-08-09T08:30:22.659Z",
    "path": "../public/assets/Catelog-1b1ba554.mjs"
  },
  "/assets/Chaplist-ca817168.mjs": {
    "type": "application/javascript",
    "etag": "\"445-kv/rzU0DaQ5yR4ZXY/GtHgFCPRo\"",
    "mtime": "2022-08-09T08:30:22.659Z",
    "path": "../public/assets/Chaplist-ca817168.mjs"
  },
  "/assets/ChapterImg-67d16715.mjs": {
    "type": "application/javascript",
    "etag": "\"1d0-C0QcjpghDYPmpCgPIiJLnsD8sYY\"",
    "mtime": "2022-08-09T08:30:22.659Z",
    "path": "../public/assets/ChapterImg-67d16715.mjs"
  },
  "/assets/ChapterRepresent-91f0d47c.mjs": {
    "type": "application/javascript",
    "etag": "\"2a6-Aw1EiKPdE8I6ICuSvH2wzAVjsJo\"",
    "mtime": "2022-08-09T08:30:22.658Z",
    "path": "../public/assets/ChapterRepresent-91f0d47c.mjs"
  },
  "/assets/ComicChapterTab-405d81c3.mjs": {
    "type": "application/javascript",
    "etag": "\"592-o6HlZFRFKSOynsPnjDrTiaeJshU\"",
    "mtime": "2022-08-09T08:30:22.658Z",
    "path": "../public/assets/ComicChapterTab-405d81c3.mjs"
  },
  "/assets/ComicItem-d12e4e04.mjs": {
    "type": "application/javascript",
    "etag": "\"5b1-OUNNlfImroeG1zlJe61Wm0J4mAs\"",
    "mtime": "2022-08-09T08:30:22.658Z",
    "path": "../public/assets/ComicItem-d12e4e04.mjs"
  },
  "/assets/ComicTab-8047ccc7.mjs": {
    "type": "application/javascript",
    "etag": "\"340-qvoHStXKzgeWPt1W8QZxC/2qP9M\"",
    "mtime": "2022-08-09T08:30:22.658Z",
    "path": "../public/assets/ComicTab-8047ccc7.mjs"
  },
  "/assets/CommentComic-4491d286.mjs": {
    "type": "application/javascript",
    "etag": "\"80-0/Uphgt0ofHz2M9LeerLkCRRudk\"",
    "mtime": "2022-08-09T08:30:22.658Z",
    "path": "../public/assets/CommentComic-4491d286.mjs"
  },
  "/assets/MeeToonImg-57a5fba4.mjs": {
    "type": "application/javascript",
    "etag": "\"32b-2L687d3XQbKO2SaUlvOOi1ZUms0\"",
    "mtime": "2022-08-09T08:30:22.658Z",
    "path": "../public/assets/MeeToonImg-57a5fba4.mjs"
  },
  "/assets/NewStory-784ff6c3.mjs": {
    "type": "application/javascript",
    "etag": "\"2f3-9DF7BoA25381a6wo6uHPvb2fy0A\"",
    "mtime": "2022-08-09T08:30:22.658Z",
    "path": "../public/assets/NewStory-784ff6c3.mjs"
  },
  "/assets/NewStory-87aec2c4.mjs": {
    "type": "application/javascript",
    "etag": "\"305-kV6JD5VnGtrTqcX9IAIPU2VQO/g\"",
    "mtime": "2022-08-09T08:30:22.657Z",
    "path": "../public/assets/NewStory-87aec2c4.mjs"
  },
  "/assets/PageLoading-9fff3f62.mjs": {
    "type": "application/javascript",
    "etag": "\"c67-RmN4NQ+nejzf5BOacHO6h+fiJYY\"",
    "mtime": "2022-08-09T08:30:22.657Z",
    "path": "../public/assets/PageLoading-9fff3f62.mjs"
  },
  "/assets/ReadMangaFooter-bcd17429.mjs": {
    "type": "application/javascript",
    "etag": "\"494-v2OiWhZy12APfhNW6DRDoLW2PpU\"",
    "mtime": "2022-08-09T08:30:22.657Z",
    "path": "../public/assets/ReadMangaFooter-bcd17429.mjs"
  },
  "/assets/RepresentCategory-a93d8641.mjs": {
    "type": "application/javascript",
    "etag": "\"c85-ys8l2H2DNE2+qFeVtpCpiBiXfhA\"",
    "mtime": "2022-08-09T08:30:22.657Z",
    "path": "../public/assets/RepresentCategory-a93d8641.mjs"
  },
  "/assets/RepresentCategory-e1566964.mjs": {
    "type": "application/javascript",
    "etag": "\"c62-gdiRKw4pWMF1bqrvEcI5s2Os2bE\"",
    "mtime": "2022-08-09T08:30:22.657Z",
    "path": "../public/assets/RepresentCategory-e1566964.mjs"
  },
  "/assets/SearchLoading-0da3b7f0.mjs": {
    "type": "application/javascript",
    "etag": "\"c0e-mLTBZonT+3yY+iSAZay39Shh/Zw\"",
    "mtime": "2022-08-09T08:30:22.657Z",
    "path": "../public/assets/SearchLoading-0da3b7f0.mjs"
  },
  "/assets/Spotlight-2f5b8bc7.mjs": {
    "type": "application/javascript",
    "etag": "\"480-zhkmlAjR87bmB/YA8WIQ/hMDRR8\"",
    "mtime": "2022-08-09T08:30:22.656Z",
    "path": "../public/assets/Spotlight-2f5b8bc7.mjs"
  },
  "/assets/Spotlight-68e0ac03.mjs": {
    "type": "application/javascript",
    "etag": "\"480-w9vy+8BmcpNnhRcGpAHybfGUUjM\"",
    "mtime": "2022-08-09T08:30:22.656Z",
    "path": "../public/assets/Spotlight-68e0ac03.mjs"
  },
  "/assets/TheFooter-9046fccf.mjs": {
    "type": "application/javascript",
    "etag": "\"b82-R3GF9nSsD6qUeL5smZjFtXXmgbA\"",
    "mtime": "2022-08-09T08:30:22.656Z",
    "path": "../public/assets/TheFooter-9046fccf.mjs"
  },
  "/assets/TheHeader-274d4e47.mjs": {
    "type": "application/javascript",
    "etag": "\"488-Q0bGlsr08BniddcFfh8GsGYmRXo\"",
    "mtime": "2022-08-09T08:30:22.656Z",
    "path": "../public/assets/TheHeader-274d4e47.mjs"
  },
  "/assets/Trending-b7eaa6f9.mjs": {
    "type": "application/javascript",
    "etag": "\"a0d-BOxb6EMbA5D3sDcMSpV3dxu5x7E\"",
    "mtime": "2022-08-09T08:30:22.656Z",
    "path": "../public/assets/Trending-b7eaa6f9.mjs"
  },
  "/assets/Trending-fe3767d6.mjs": {
    "type": "application/javascript",
    "etag": "\"9fa-QVp9F9HAQE2p3kCLoN+pf6YGWnE\"",
    "mtime": "2022-08-09T08:30:22.655Z",
    "path": "../public/assets/Trending-fe3767d6.mjs"
  },
  "/assets/VisitedComic-2c785852.mjs": {
    "type": "application/javascript",
    "etag": "\"10ea-IyKs0PrlohwY/OZjhlvHg5+397s\"",
    "mtime": "2022-08-09T08:30:22.655Z",
    "path": "../public/assets/VisitedComic-2c785852.mjs"
  },
  "/assets/__id_-3d57637c.mjs": {
    "type": "application/javascript",
    "etag": "\"127b-NbsQ1Sm/k2JqwKESyVuxEjChjvM\"",
    "mtime": "2022-08-09T08:30:22.655Z",
    "path": "../public/assets/__id_-3d57637c.mjs"
  },
  "/assets/__id_-48d7900f.mjs": {
    "type": "application/javascript",
    "etag": "\"c05-i607tgM5GtZXiTYYjR1/XYMnsLI\"",
    "mtime": "2022-08-09T08:30:22.655Z",
    "path": "../public/assets/__id_-48d7900f.mjs"
  },
  "/assets/__id_-76094fe0.mjs": {
    "type": "application/javascript",
    "etag": "\"1385-+y16xNg0XZVkYQLD+I+uEyAJ09o\"",
    "mtime": "2022-08-09T08:30:22.654Z",
    "path": "../public/assets/__id_-76094fe0.mjs"
  },
  "/assets/_slug_-df276566.mjs": {
    "type": "application/javascript",
    "etag": "\"5c9-LoGFMVkAT3ZqZpH42JMV74HqD3M\"",
    "mtime": "2022-08-09T08:30:22.654Z",
    "path": "../public/assets/_slug_-df276566.mjs"
  },
  "/assets/_slug_-e35c8b26.mjs": {
    "type": "application/javascript",
    "etag": "\"13e6-kXmlOmX4kcWpSrWA3rchjHw+Qe4\"",
    "mtime": "2022-08-09T08:30:22.654Z",
    "path": "../public/assets/_slug_-e35c8b26.mjs"
  },
  "/assets/_slug_-e6e60ba8.mjs": {
    "type": "application/javascript",
    "etag": "\"620-42Bmb0uU0xeTcls0zYk/+8Cl/zM\"",
    "mtime": "2022-08-09T08:30:22.654Z",
    "path": "../public/assets/_slug_-e6e60ba8.mjs"
  },
  "/assets/autoplay-4d94461b.mjs": {
    "type": "application/javascript",
    "etag": "\"bdc-DZRcGF6BpBTz2QdYcftF1ioBkWI\"",
    "mtime": "2022-08-09T08:30:22.653Z",
    "path": "../public/assets/autoplay-4d94461b.mjs"
  },
  "/assets/default-15e34b15.mjs": {
    "type": "application/javascript",
    "etag": "\"199-6JZSzSHIzjrWbkr55oZwG+0hZOs\"",
    "mtime": "2022-08-09T08:30:22.653Z",
    "path": "../public/assets/default-15e34b15.mjs"
  },
  "/assets/entry-8fb9504e.mjs": {
    "type": "application/javascript",
    "etag": "\"3f2ab-xIP5tCVwjxcQ9/IZn56q/sAPHeA\"",
    "mtime": "2022-08-09T08:30:22.653Z",
    "path": "../public/assets/entry-8fb9504e.mjs"
  },
  "/assets/entry.89b3f17e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a8a-3HbdE8+PXN3aKd1mLRP3eDGRjWg\"",
    "mtime": "2022-08-09T08:30:22.652Z",
    "path": "../public/assets/entry.89b3f17e.css"
  },
  "/assets/error-404-881c4490.mjs": {
    "type": "application/javascript",
    "etag": "\"822-3Nlq8hMErJAyFCFkQ/DjPQWy3cM\"",
    "mtime": "2022-08-09T08:30:22.652Z",
    "path": "../public/assets/error-404-881c4490.mjs"
  },
  "/assets/error-404.314f7075.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11bd-kF6SKfdJYaoPOx5XSNB4IuKqq6c\"",
    "mtime": "2022-08-09T08:30:22.652Z",
    "path": "../public/assets/error-404.314f7075.css"
  },
  "/assets/error-500-3c85a5f5.mjs": {
    "type": "application/javascript",
    "etag": "\"6cb-AXAaLhWI0j4NUipI+3mFvpajtzM\"",
    "mtime": "2022-08-09T08:30:22.652Z",
    "path": "../public/assets/error-500-3c85a5f5.mjs"
  },
  "/assets/error-500.4e3461e5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"af4-ckENJljqPJ6JYcymKbQpp8F2r1I\"",
    "mtime": "2022-08-09T08:30:22.652Z",
    "path": "../public/assets/error-500.4e3461e5.css"
  },
  "/assets/error-component-35a5a8d1.mjs": {
    "type": "application/javascript",
    "etag": "\"425-umZ+a/QiS1Xe7xLI0pR+3NmN08I\"",
    "mtime": "2022-08-09T08:30:22.651Z",
    "path": "../public/assets/error-component-35a5a8d1.mjs"
  },
  "/assets/fetch-1a850ad7.mjs": {
    "type": "application/javascript",
    "etag": "\"2ed-3esyrPWr1CfzJRim6kADecuo//k\"",
    "mtime": "2022-08-09T08:30:22.651Z",
    "path": "../public/assets/fetch-1a850ad7.mjs"
  },
  "/assets/grid-55226633.mjs": {
    "type": "application/javascript",
    "etag": "\"488-8X9mECUbMrQBPMlqPGcTz+qyZZo\"",
    "mtime": "2022-08-09T08:30:22.651Z",
    "path": "../public/assets/grid-55226633.mjs"
  },
  "/assets/index-102a9ee7.mjs": {
    "type": "application/javascript",
    "etag": "\"d95-mjqXRYByXjpaRiGiUGMLBjR68Wg\"",
    "mtime": "2022-08-09T08:30:22.649Z",
    "path": "../public/assets/index-102a9ee7.mjs"
  },
  "/assets/index-51eff49a.mjs": {
    "type": "application/javascript",
    "etag": "\"8d8-mUfbBqB9sEXjCfc3EpXL6nBIp8o\"",
    "mtime": "2022-08-09T08:30:22.649Z",
    "path": "../public/assets/index-51eff49a.mjs"
  },
  "/assets/index-b351655c.mjs": {
    "type": "application/javascript",
    "etag": "\"81-UwFiXQTk7Q8xq0jYypVaJ+lfSV4\"",
    "mtime": "2022-08-09T08:30:22.649Z",
    "path": "../public/assets/index-b351655c.mjs"
  },
  "/assets/index-c8a61c55.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-iTbYLrd3Xq2WomuUpRmmBR8AjbQ\"",
    "mtime": "2022-08-09T08:30:22.649Z",
    "path": "../public/assets/index-c8a61c55.mjs"
  },
  "/assets/manga-8e957283.mjs": {
    "type": "application/javascript",
    "etag": "\"194-8tsma41v48N0ykPpZHoq9nE7kGc\"",
    "mtime": "2022-08-09T08:30:22.649Z",
    "path": "../public/assets/manga-8e957283.mjs"
  },
  "/assets/manifest.json": {
    "type": "application/json",
    "etag": "\"39bc-SaUTbxUY3xmR6YK815JdfeUhsac\"",
    "mtime": "2022-08-09T08:30:22.649Z",
    "path": "../public/assets/manifest.json"
  },
  "/assets/menu-7a531c1a.mjs": {
    "type": "application/javascript",
    "etag": "\"199-q7e754Cdt4SGwxhFAa4nny1JGAA\"",
    "mtime": "2022-08-09T08:30:22.649Z",
    "path": "../public/assets/menu-7a531c1a.mjs"
  },
  "/assets/novel-321a0df0.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-rtJCBlEdLk1fNPIczllbE3R1lEw\"",
    "mtime": "2022-08-09T08:30:22.648Z",
    "path": "../public/assets/novel-321a0df0.mjs"
  },
  "/assets/swiper-slide-de91718b.mjs": {
    "type": "application/javascript",
    "etag": "\"48ad-xptAFalfJLteK5MKcTOBrh7zZnw\"",
    "mtime": "2022-08-09T08:30:22.648Z",
    "path": "../public/assets/swiper-slide-de91718b.mjs"
  },
  "/assets/trending-b41cdfce.mjs": {
    "type": "application/javascript",
    "etag": "\"b03-CJ/o44fYE8UD2Ri6AGB4ZDWtVPI\"",
    "mtime": "2022-08-09T08:30:22.648Z",
    "path": "../public/assets/trending-b41cdfce.mjs"
  },
  "/assets/welcome-b8655445.mjs": {
    "type": "application/javascript",
    "etag": "\"2dcb-8lxypIYBo3R5m6Ep43+XNcucLkc\"",
    "mtime": "2022-08-09T08:30:22.648Z",
    "path": "../public/assets/welcome-b8655445.mjs"
  },
  "/images/bg-spotlight.png": {
    "type": "image/png",
    "etag": "\"afce-Fv92f75+twXYgi7IhMurXn3C/YU\"",
    "mtime": "2022-08-09T08:30:22.666Z",
    "path": "../public/images/bg-spotlight.png"
  },
  "/images/bg-wrapper-spotlight.png": {
    "type": "image/png",
    "etag": "\"14ddf-naVXN9F2enq+MJHhgCb4iiVNFP8\"",
    "mtime": "2022-08-09T08:30:22.666Z",
    "path": "../public/images/bg-wrapper-spotlight.png"
  },
  "/images/category.png": {
    "type": "image/png",
    "etag": "\"857-E65BKOki9tXQ+iUe1t0+97yohKc\"",
    "mtime": "2022-08-09T08:30:22.666Z",
    "path": "../public/images/category.png"
  },
  "/images/dam-my.png": {
    "type": "image/png",
    "etag": "\"96d9-FGyvJa2ABdzlSz/cr338ggdkNEM\"",
    "mtime": "2022-08-09T08:30:22.665Z",
    "path": "../public/images/dam-my.png"
  },
  "/images/huyen-huyen.png": {
    "type": "image/png",
    "etag": "\"88f7-WNKcF+vfYPMHUeTfwehM2bhgJ6E\"",
    "mtime": "2022-08-09T08:30:22.665Z",
    "path": "../public/images/huyen-huyen.png"
  },
  "/images/img-avatar.png": {
    "type": "image/png",
    "etag": "\"1f4a-Mv7atszIBIS+Gs9JYfFRzccyzXg\"",
    "mtime": "2022-08-09T08:30:22.665Z",
    "path": "../public/images/img-avatar.png"
  },
  "/images/mao-hiem.png": {
    "type": "image/png",
    "etag": "\"9fea-q7aahfuruaacccLx99Mo3TosRFU\"",
    "mtime": "2022-08-09T08:30:22.665Z",
    "path": "../public/images/mao-hiem.png"
  },
  "/images/nu-cuong.png": {
    "type": "image/png",
    "etag": "\"9402-Z2c0olLUOM77c5ydX+gWeu8KwUc\"",
    "mtime": "2022-08-09T08:30:22.664Z",
    "path": "../public/images/nu-cuong.png"
  },
  "/images/ranking.png": {
    "type": "image/png",
    "etag": "\"82c-/xslGZS+mtDeoIlpem5pCeqfEJ0\"",
    "mtime": "2022-08-09T08:30:22.664Z",
    "path": "../public/images/ranking.png"
  },
  "/images/spotlight-1.png": {
    "type": "image/png",
    "etag": "\"6e167-QR1+PI/vDr3jPvyOTWx6LPJbRUI\"",
    "mtime": "2022-08-09T08:30:22.664Z",
    "path": "../public/images/spotlight-1.png"
  },
  "/images/spotlight-2.png": {
    "type": "image/png",
    "etag": "\"20734-2ZjV6bURjiLLPEGRhoK8i+0Kons\"",
    "mtime": "2022-08-09T08:30:22.663Z",
    "path": "../public/images/spotlight-2.png"
  },
  "/images/spotlight-3.png": {
    "type": "image/png",
    "etag": "\"1f6b8-cIpGQEjNfizyaXbDGRTd7x7rmyA\"",
    "mtime": "2022-08-09T08:30:22.662Z",
    "path": "../public/images/spotlight-3.png"
  },
  "/images/spotlight-5.png": {
    "type": "image/png",
    "etag": "\"2fdfb-vjpSmy63NYvM/1IIhCap1yrJqJ0\"",
    "mtime": "2022-08-09T08:30:22.662Z",
    "path": "../public/images/spotlight-5.png"
  },
  "/images/spotlight-7.png": {
    "type": "image/png",
    "etag": "\"6b158-fgnxEDxvJSQqAO99kHRgHqZlrwM\"",
    "mtime": "2022-08-09T08:30:22.662Z",
    "path": "../public/images/spotlight-7.png"
  },
  "/images/tong-tai.png": {
    "type": "image/png",
    "etag": "\"7bd2-bKpMyMVdKevDX5rHj6U9+tmNs3E\"",
    "mtime": "2022-08-09T08:30:22.661Z",
    "path": "../public/images/tong-tai.png"
  },
  "/images/truong-hoc.png": {
    "type": "image/png",
    "etag": "\"a103-1Dcggw6172hOqXZLQW2LJ8KSy74\"",
    "mtime": "2022-08-09T08:30:22.660Z",
    "path": "../public/images/truong-hoc.png"
  },
  "/assets/icons/120x120.af090742.png": {
    "type": "image/png",
    "etag": "\"1ea2-Bo9T9KMbXzDh4hqfEupntkNws8Q\"",
    "mtime": "2022-08-09T08:30:22.648Z",
    "path": "../public/assets/icons/120x120.af090742.png"
  },
  "/assets/icons/120x120.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"17b2-N92yGdmt0CZF3qYmrIJ7xW43UVs\"",
    "mtime": "2022-08-09T08:30:22.647Z",
    "path": "../public/assets/icons/120x120.maskable.af090742.png"
  },
  "/assets/icons/144x144.af090742.png": {
    "type": "image/png",
    "etag": "\"24e3-FF67bU+bET9678Dn4fhWEdl4vy8\"",
    "mtime": "2022-08-09T08:30:22.647Z",
    "path": "../public/assets/icons/144x144.af090742.png"
  },
  "/assets/icons/144x144.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"1d91-9ow7r94STY9lPnM40j7YD4ilNbg\"",
    "mtime": "2022-08-09T08:30:22.647Z",
    "path": "../public/assets/icons/144x144.maskable.af090742.png"
  },
  "/assets/icons/152x152.af090742.png": {
    "type": "image/png",
    "etag": "\"273f-5QjwH5p5LSE5sFRdtcDIdTfdZMQ\"",
    "mtime": "2022-08-09T08:30:22.647Z",
    "path": "../public/assets/icons/152x152.af090742.png"
  },
  "/assets/icons/152x152.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"1f54-8kxm+9fDuEEXFMRUiUFNVWQRal4\"",
    "mtime": "2022-08-09T08:30:22.646Z",
    "path": "../public/assets/icons/152x152.maskable.af090742.png"
  },
  "/assets/icons/192x192.af090742.png": {
    "type": "image/png",
    "etag": "\"32b2-LH+MnW75Xyz/DcPmKJSXBr+LAfM\"",
    "mtime": "2022-08-09T08:30:22.646Z",
    "path": "../public/assets/icons/192x192.af090742.png"
  },
  "/assets/icons/192x192.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"2790-EuDIoUTqlPEJq73Zbw47qjEAwxc\"",
    "mtime": "2022-08-09T08:30:22.646Z",
    "path": "../public/assets/icons/192x192.maskable.af090742.png"
  },
  "/assets/icons/384x384.af090742.png": {
    "type": "image/png",
    "etag": "\"703c-98X2hkfpZZ5z+BsX0gucbFAaSL8\"",
    "mtime": "2022-08-09T08:30:22.646Z",
    "path": "../public/assets/icons/384x384.af090742.png"
  },
  "/assets/icons/384x384.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"5681-K6e23MVR50jXJ+qym7SkSugRqFk\"",
    "mtime": "2022-08-09T08:30:22.645Z",
    "path": "../public/assets/icons/384x384.maskable.af090742.png"
  },
  "/assets/icons/512x512.af090742.png": {
    "type": "image/png",
    "etag": "\"3c90-VUCr35aEGCYrqtxtaI0F6WrTh1s\"",
    "mtime": "2022-08-09T08:30:22.645Z",
    "path": "../public/assets/icons/512x512.af090742.png"
  },
  "/assets/icons/512x512.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"7b01-koWx138wzx/bIpmAzkuznFMJBIw\"",
    "mtime": "2022-08-09T08:30:22.645Z",
    "path": "../public/assets/icons/512x512.maskable.af090742.png"
  },
  "/assets/icons/64x64.af090742.png": {
    "type": "image/png",
    "etag": "\"f22-BeuCFbDFCqnP16JlAp+3W6tOAXQ\"",
    "mtime": "2022-08-09T08:30:22.645Z",
    "path": "../public/assets/icons/64x64.af090742.png"
  },
  "/assets/icons/64x64.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"cb9-RcpzG9wzYOErS0iBXkAUy3FsE1A\"",
    "mtime": "2022-08-09T08:30:22.644Z",
    "path": "../public/assets/icons/64x64.maskable.af090742.png"
  },
  "/assets/splash/1125x2436.af090742.png": {
    "type": "image/png",
    "etag": "\"11e7f-x0BDQ4v3D8Neb5kdyMSxzXFUTk0\"",
    "mtime": "2022-08-09T08:30:22.644Z",
    "path": "../public/assets/splash/1125x2436.af090742.png"
  },
  "/assets/splash/1136x640.af090742.png": {
    "type": "image/png",
    "etag": "\"6ed3-aOV8u6QJwto58u3hZnTHQlA+Wg8\"",
    "mtime": "2022-08-09T08:30:22.644Z",
    "path": "../public/assets/splash/1136x640.af090742.png"
  },
  "/assets/splash/1170x2532.af090742.png": {
    "type": "image/png",
    "etag": "\"13267-pArpS/ANzvQHgdjFTj64Sbt3rFU\"",
    "mtime": "2022-08-09T08:30:22.644Z",
    "path": "../public/assets/splash/1170x2532.af090742.png"
  },
  "/assets/splash/1242x2208.af090742.png": {
    "type": "image/png",
    "etag": "\"11df0-Z7OKIR/K4fDijLFBkO3LZRe9Mj4\"",
    "mtime": "2022-08-09T08:30:22.643Z",
    "path": "../public/assets/splash/1242x2208.af090742.png"
  },
  "/assets/splash/1242x2688.af090742.png": {
    "type": "image/png",
    "etag": "\"1532b-CONu3+yN6LbU/Ya5j6EmhnAfRmY\"",
    "mtime": "2022-08-09T08:30:22.643Z",
    "path": "../public/assets/splash/1242x2688.af090742.png"
  },
  "/assets/splash/1284x2778.af090742.png": {
    "type": "image/png",
    "etag": "\"15b43-TdBCd8+5gAH+Do4NF5raUDUqzNg\"",
    "mtime": "2022-08-09T08:30:22.643Z",
    "path": "../public/assets/splash/1284x2778.af090742.png"
  },
  "/assets/splash/1334x750.af090742.png": {
    "type": "image/png",
    "etag": "\"8708-N0ndeAo+71joicLjxofS78JBQQ0\"",
    "mtime": "2022-08-09T08:30:22.642Z",
    "path": "../public/assets/splash/1334x750.af090742.png"
  },
  "/assets/splash/1536x2048.af090742.png": {
    "type": "image/png",
    "etag": "\"1350c-DVVIKpTLJvnVfortVqmeEC4gCRg\"",
    "mtime": "2022-08-09T08:30:22.642Z",
    "path": "../public/assets/splash/1536x2048.af090742.png"
  },
  "/assets/splash/1620x2160.af090742.png": {
    "type": "image/png",
    "etag": "\"15812-e6WOtbdOlVRbWn9lEuCZ54iVpUE\"",
    "mtime": "2022-08-09T08:30:22.642Z",
    "path": "../public/assets/splash/1620x2160.af090742.png"
  },
  "/assets/splash/1668x2224.af090742.png": {
    "type": "image/png",
    "etag": "\"1625f-GT2LxAtio3JpJLGws5QOO5mHl6c\"",
    "mtime": "2022-08-09T08:30:22.641Z",
    "path": "../public/assets/splash/1668x2224.af090742.png"
  },
  "/assets/splash/1668x2388.af090742.png": {
    "type": "image/png",
    "etag": "\"1785f-/O3P2JSDs6Z41h2QvB7uhDLkeFQ\"",
    "mtime": "2022-08-09T08:30:22.641Z",
    "path": "../public/assets/splash/1668x2388.af090742.png"
  },
  "/assets/splash/1792x828.af090742.png": {
    "type": "image/png",
    "etag": "\"ab1e-wPcEWD987IF2qDjFXq3Fhmc33oM\"",
    "mtime": "2022-08-09T08:30:22.641Z",
    "path": "../public/assets/splash/1792x828.af090742.png"
  },
  "/assets/splash/2048x1536.af090742.png": {
    "type": "image/png",
    "etag": "\"133b9-wcWarli5UrLhUH+avvsrToY/YLc\"",
    "mtime": "2022-08-09T08:30:22.641Z",
    "path": "../public/assets/splash/2048x1536.af090742.png"
  },
  "/assets/splash/2160x1620.af090742.png": {
    "type": "image/png",
    "etag": "\"15046-s1elKNbwNw0bgFAZ2MlIMfSG1qw\"",
    "mtime": "2022-08-09T08:30:22.640Z",
    "path": "../public/assets/splash/2160x1620.af090742.png"
  },
  "/assets/splash/2208x1242.af090742.png": {
    "type": "image/png",
    "etag": "\"110f2-zrnwL4Rp+gpEleQ0p2XG9PD6Bic\"",
    "mtime": "2022-08-09T08:30:22.640Z",
    "path": "../public/assets/splash/2208x1242.af090742.png"
  },
  "/assets/splash/2224x1668.af090742.png": {
    "type": "image/png",
    "etag": "\"1625f-OO+8M327FKAve2MZxoDDZlxJCto\"",
    "mtime": "2022-08-09T08:30:22.640Z",
    "path": "../public/assets/splash/2224x1668.af090742.png"
  },
  "/assets/splash/2388x1668.af090742.png": {
    "type": "image/png",
    "etag": "\"17228-YHEejzSnMsHzqvXH2dZtkJr8W2I\"",
    "mtime": "2022-08-09T08:30:22.639Z",
    "path": "../public/assets/splash/2388x1668.af090742.png"
  },
  "/assets/splash/2436x1125.af090742.png": {
    "type": "image/png",
    "etag": "\"10f16-0om5Q0OmQM9hrzwVYRv88g+UTq4\"",
    "mtime": "2022-08-09T08:30:22.639Z",
    "path": "../public/assets/splash/2436x1125.af090742.png"
  },
  "/assets/splash/2532x1170.af090742.png": {
    "type": "image/png",
    "etag": "\"121f0-g8J7rJqI1oWhp2mxTPOoLK0nb5M\"",
    "mtime": "2022-08-09T08:30:22.639Z",
    "path": "../public/assets/splash/2532x1170.af090742.png"
  },
  "/assets/splash/2688x1242.af090742.png": {
    "type": "image/png",
    "etag": "\"13d5b-QIi9PVxayrmuDMPKnz2uFyNHfcw\"",
    "mtime": "2022-08-09T08:30:22.639Z",
    "path": "../public/assets/splash/2688x1242.af090742.png"
  },
  "/assets/splash/2732x2048.af090742.png": {
    "type": "image/png",
    "etag": "\"1f63f-dBAQy/Hg91VDAZAI7wimlNu4cRo\"",
    "mtime": "2022-08-09T08:30:22.638Z",
    "path": "../public/assets/splash/2732x2048.af090742.png"
  },
  "/assets/splash/2778x1284.af090742.png": {
    "type": "image/png",
    "etag": "\"14eac-HiPeDz5MLwDRhVq9Xo1Px/k4EYI\"",
    "mtime": "2022-08-09T08:30:22.638Z",
    "path": "../public/assets/splash/2778x1284.af090742.png"
  },
  "/assets/splash/640x1136.af090742.png": {
    "type": "image/png",
    "etag": "\"6d57-aXV8ENSn8hwihYPI94vHD+7ZhRo\"",
    "mtime": "2022-08-09T08:30:22.638Z",
    "path": "../public/assets/splash/640x1136.af090742.png"
  },
  "/assets/splash/750x1334.af090742.png": {
    "type": "image/png",
    "etag": "\"87ec-TKsm2p8AZcmg0KxlC2V3vC0dgh4\"",
    "mtime": "2022-08-09T08:30:22.637Z",
    "path": "../public/assets/splash/750x1334.af090742.png"
  },
  "/assets/splash/828x1792.af090742.png": {
    "type": "image/png",
    "etag": "\"b51e-tZQ3i8+y8ejZxWCWwXdklGbbDsU\"",
    "mtime": "2022-08-09T08:30:22.637Z",
    "path": "../public/assets/splash/828x1792.af090742.png"
  },
  "/icons/chapterItem/icon-comment.svg": {
    "type": "image/svg+xml",
    "etag": "\"30a-tKaEVrz0AGgkFsmtzZoiK249TOg\"",
    "mtime": "2022-08-09T08:30:22.676Z",
    "path": "../public/icons/chapterItem/icon-comment.svg"
  },
  "/icons/chapterItem/icon-like.svg": {
    "type": "image/svg+xml",
    "etag": "\"338-Mu3PLBD3C+VbyRHNntvb/evTs98\"",
    "mtime": "2022-08-09T08:30:22.676Z",
    "path": "../public/icons/chapterItem/icon-like.svg"
  },
  "/icons/chapterItem/icon-view.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-EuS8o4d69l/BxN7Ip58G0DNY2ZU\"",
    "mtime": "2022-08-09T08:30:22.675Z",
    "path": "../public/icons/chapterItem/icon-view.svg"
  },
  "/icons/comicPage/backgroundInfo.png": {
    "type": "image/png",
    "etag": "\"30d4-o2f3aSZrDK2vB+thMfxXpqIPbxc\"",
    "mtime": "2022-08-09T08:30:22.675Z",
    "path": "../public/icons/comicPage/backgroundInfo.png"
  },
  "/icons/comicPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"119-EYaRxectNOBTtXeZEsmwnSTB+bQ\"",
    "mtime": "2022-08-09T08:30:22.675Z",
    "path": "../public/icons/comicPage/icon-back.svg"
  },
  "/icons/comicPage/icon-comment-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"28a-PgPoMRg6jcTxhJURo48TG+lc6Ss\"",
    "mtime": "2022-08-09T08:30:22.675Z",
    "path": "../public/icons/comicPage/icon-comment-count.svg"
  },
  "/icons/comicPage/icon-follow-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c2-mcOabHBYmJOjYl1TSMVRd9w3sCA\"",
    "mtime": "2022-08-09T08:30:22.674Z",
    "path": "../public/icons/comicPage/icon-follow-count.svg"
  },
  "/icons/comicPage/icon-follow.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c2-mcOabHBYmJOjYl1TSMVRd9w3sCA\"",
    "mtime": "2022-08-09T08:30:22.674Z",
    "path": "../public/icons/comicPage/icon-follow.svg"
  },
  "/icons/comicPage/icon-promote.png": {
    "type": "image/png",
    "etag": "\"ae6-ChBGJd6lmGsfyZoYsPfoavAeQys\"",
    "mtime": "2022-08-09T08:30:22.674Z",
    "path": "../public/icons/comicPage/icon-promote.png"
  },
  "/icons/comicPage/icon-report.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f8-tcGpENfuInaasFGvALGYLxbxxSk\"",
    "mtime": "2022-08-09T08:30:22.674Z",
    "path": "../public/icons/comicPage/icon-report.svg"
  },
  "/icons/comicPage/icon-share.svg": {
    "type": "image/svg+xml",
    "etag": "\"4db-suvf51D+kGPy94FT1U0BiisG6Lc\"",
    "mtime": "2022-08-09T08:30:22.674Z",
    "path": "../public/icons/comicPage/icon-share.svg"
  },
  "/icons/comicPage/icon-star-deactive.svg": {
    "type": "image/svg+xml",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2022-08-09T08:30:22.674Z",
    "path": "../public/icons/comicPage/icon-star-deactive.svg"
  },
  "/icons/comicPage/icon-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"33d-leI151VDTgvlK2pUxO+VRE19rR0\"",
    "mtime": "2022-08-09T08:30:22.674Z",
    "path": "../public/icons/comicPage/icon-star.svg"
  },
  "/icons/comicPage/icon-view-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-RCrIOPQmJIjlK3sNCpVZ2JPJRsA\"",
    "mtime": "2022-08-09T08:30:22.673Z",
    "path": "../public/icons/comicPage/icon-view-count.svg"
  },
  "/icons/header/icon-back-white.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0-AHS3nfopH5kdniGlg2rbUHb5sVE\"",
    "mtime": "2022-08-09T08:30:22.673Z",
    "path": "../public/icons/header/icon-back-white.svg"
  },
  "/icons/header/icon-search.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ab-YJ8OrjmJIGFDfBMQQABSueOkt/w\"",
    "mtime": "2022-08-09T08:30:22.673Z",
    "path": "../public/icons/header/icon-search.svg"
  },
  "/icons/homePage/icon-view-chapter.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-+XXJMOqo2k6wq93ILanbxLFS15E\"",
    "mtime": "2022-08-09T08:30:22.673Z",
    "path": "../public/icons/homePage/icon-view-chapter.svg"
  },
  "/icons/novelChapterPage/icon-arrow-down.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d-DAvclMLweya6I+XTwA4HJO1AY+Y\"",
    "mtime": "2022-08-09T08:30:22.672Z",
    "path": "../public/icons/novelChapterPage/icon-arrow-down.svg"
  },
  "/icons/novelChapterPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"11a-xrq0+MckOb9+JL/7sOxBLvH7IbE\"",
    "mtime": "2022-08-09T08:30:22.672Z",
    "path": "../public/icons/novelChapterPage/icon-back.svg"
  },
  "/icons/novelChapterPage/icon-comment.svg": {
    "type": "image/svg+xml",
    "etag": "\"294-5zR/8//Qr241j4gjQ/86yza1+l0\"",
    "mtime": "2022-08-09T08:30:22.672Z",
    "path": "../public/icons/novelChapterPage/icon-comment.svg"
  },
  "/icons/novelChapterPage/icon-follow-footer-unactive.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c6-m+rAJ7GwieJB6CHsX7wFf+6a/N0\"",
    "mtime": "2022-08-09T08:30:22.672Z",
    "path": "../public/icons/novelChapterPage/icon-follow-footer-unactive.svg"
  },
  "/icons/novelChapterPage/icon-footer-setting.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f7-pQDcMACLQ2LwPVedu4WtzZ3f3AQ\"",
    "mtime": "2022-08-09T08:30:22.672Z",
    "path": "../public/icons/novelChapterPage/icon-footer-setting.svg"
  },
  "/icons/novelChapterPage/icon-next.svg": {
    "type": "image/svg+xml",
    "etag": "\"285-73gsAhjW7yLqKPwJA+KECyRcH1o\"",
    "mtime": "2022-08-09T08:30:22.671Z",
    "path": "../public/icons/novelChapterPage/icon-next.svg"
  },
  "/icons/novelChapterPage/icon-prev.svg": {
    "type": "image/svg+xml",
    "etag": "\"287-PYJF+hqQ1pXz7Dz0L6uprcnDZmA\"",
    "mtime": "2022-08-09T08:30:22.671Z",
    "path": "../public/icons/novelChapterPage/icon-prev.svg"
  },
  "/icons/novelChapterPage/icon-report.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f6-THXBp2o3aDBA9/ZyJoa5h2cE56E\"",
    "mtime": "2022-08-09T08:30:22.671Z",
    "path": "../public/icons/novelChapterPage/icon-report.svg"
  },
  "/icons/novelChapterPage/icon-share.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f0-Un1dC+G0iymWU8YmO1EWw1IuRmQ\"",
    "mtime": "2022-08-09T08:30:22.671Z",
    "path": "../public/icons/novelChapterPage/icon-share.svg"
  },
  "/icons/searchPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0-NujVPaP8y67ZtwgqY9O0QkCh7ss\"",
    "mtime": "2022-08-09T08:30:22.670Z",
    "path": "../public/icons/searchPage/icon-back.svg"
  },
  "/icons/searchPage/icon-close.svg": {
    "type": "image/svg+xml",
    "etag": "\"20b-Nq/7L9bkiCddZSY0Xm4X8/mFdlM\"",
    "mtime": "2022-08-09T08:30:22.670Z",
    "path": "../public/icons/searchPage/icon-close.svg"
  },
  "/icons/searchPage/icon-search.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ff-bbuK3n5mjvz2hNkwLX81QEeKbtc\"",
    "mtime": "2022-08-09T08:30:22.670Z",
    "path": "../public/icons/searchPage/icon-search.svg"
  },
  "/icons/searchPage/icon-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-xOosY3V0XdXZf7KUQyFRh0gN0UM\"",
    "mtime": "2022-08-09T08:30:22.670Z",
    "path": "../public/icons/searchPage/icon-star.svg"
  },
  "/icons/searchPage/icon-view-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-EuS8o4d69l/BxN7Ip58G0DNY2ZU\"",
    "mtime": "2022-08-09T08:30:22.669Z",
    "path": "../public/icons/searchPage/icon-view-count.svg"
  },
  "/icons/tabbar/icon-canhan.svg": {
    "type": "image/svg+xml",
    "etag": "\"5b0-QgHHSy6i78LIgWCWol0tHvfsJNY\"",
    "mtime": "2022-08-09T08:30:22.669Z",
    "path": "../public/icons/tabbar/icon-canhan.svg"
  },
  "/icons/tabbar/icon-newsfeed.svg": {
    "type": "image/svg+xml",
    "etag": "\"66f-B/o0NLlN4OPOTUBooEFdc2zRl6M\"",
    "mtime": "2022-08-09T08:30:22.669Z",
    "path": "../public/icons/tabbar/icon-newsfeed.svg"
  },
  "/icons/tabbar/icon-novel-active.svg": {
    "type": "image/svg+xml",
    "etag": "\"936-IS0BtzHMXjmAC5CJo4N+6kmbt/E\"",
    "mtime": "2022-08-09T08:30:22.669Z",
    "path": "../public/icons/tabbar/icon-novel-active.svg"
  },
  "/icons/tabbar/icon-novel.svg": {
    "type": "image/svg+xml",
    "etag": "\"936-hOMOXh2+fGNAlYTGhu09kfNIB3Y\"",
    "mtime": "2022-08-09T08:30:22.668Z",
    "path": "../public/icons/tabbar/icon-novel.svg"
  },
  "/icons/tabbar/icon-toon-active.svg": {
    "type": "image/svg+xml",
    "etag": "\"67d-A5yStXKRiUCbVR4qfno/x3Skk5Q\"",
    "mtime": "2022-08-09T08:30:22.668Z",
    "path": "../public/icons/tabbar/icon-toon-active.svg"
  },
  "/icons/tabbar/icon-toon.svg": {
    "type": "image/svg+xml",
    "etag": "\"69f-G988y5OIA6mLzGSSgFc+h4+R8YI\"",
    "mtime": "2022-08-09T08:30:22.668Z",
    "path": "../public/icons/tabbar/icon-toon.svg"
  },
  "/icons/tabbar/icon-tutruyen.svg": {
    "type": "image/svg+xml",
    "etag": "\"650-AgiyMw1qU7jOgUv5W/U1W+hyxk8\"",
    "mtime": "2022-08-09T08:30:22.668Z",
    "path": "../public/icons/tabbar/icon-tutruyen.svg"
  },
  "/images/trending/bg-trending.png": {
    "type": "image/png",
    "etag": "\"bd222-hJzVmGMgWNspLIVzjjiCCds+AC4\"",
    "mtime": "2022-08-09T08:30:22.661Z",
    "path": "../public/images/trending/bg-trending.png"
  },
  "/icons/widgets/trend/img-header-novel.svg": {
    "type": "image/svg+xml",
    "etag": "\"20ac9-u/wYMWK/qez/ChEej8yQ2WiFnss\"",
    "mtime": "2022-08-09T08:30:22.668Z",
    "path": "../public/icons/widgets/trend/img-header-novel.svg"
  },
  "/icons/widgets/trend/img-header.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fa0b-LgQNTFo/k4fJnjlNaSm46AmHX4E\"",
    "mtime": "2022-08-09T08:30:22.667Z",
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

const _v49n7p = createProxyMiddleware({ "target": "http://localhost:5001", "changeOrigin": true, "pathRewrite": { "^/api/proxy": "/api/wb" }, "pathFilter": ["/api/proxy"] });

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
const _lazy_1jipKl = () => import('../related.post.mjs');
const _lazy_Jn2S6N = () => import('../read-novel.mjs');
const _lazy_WJiWee = () => import('../information.mjs');
const _lazy_tu2PlR = () => import('../chapters.mjs');
const _lazy_XUh2K0 = () => import('../_slug_2.mjs');
const _lazy_2mOW0p = () => import('../mongo.mjs');
const _lazy_Jyv2bI = () => import('../homepage.mjs');
const _lazy_0Svp7f = () => import('../_slug_3.mjs');
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
  { route: '/api/novel/related', handler: _lazy_1jipKl, lazy: true, middleware: false, method: "post" },
  { route: '/api/novel/read-novel', handler: _lazy_Jn2S6N, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/information', handler: _lazy_WJiWee, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/chapters', handler: _lazy_tu2PlR, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/:slug', handler: _lazy_XUh2K0, lazy: true, middleware: false, method: undefined },
  { route: '/api/mongo', handler: _lazy_2mOW0p, lazy: true, middleware: false, method: undefined },
  { route: '/api/homepage', handler: _lazy_Jyv2bI, lazy: true, middleware: false, method: undefined },
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
