import { defineNuxtConfig } from 'nuxt'
import mongodbSetup from './modules/mongodb-setup'

export default defineNuxtConfig({
  app: {
    buildAssetsDir: "/assets/",
  },
  hooks: {
    "vite:extendConfig"(config, { isServer }) {
      if (isServer) {
        // Workaround for Netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true;
      }
    },
  },
  ssr: true,
  runtimeConfig: {
    mongodbURI: process.env.MONGODB_URI,
    imageCDN: process.env.IMAGE_CDN,
    public: {
      NUXT_PUBLIC_SERVICE_URL: process.env.NUXT_PUBLIC_SERVICE_URL,
      DOMAIN: process.env.DOMAIN,
      SIZE_NAME: process.env.SIZE_NAME,
      PUBLIC_IMAGE_CDN: process.env.IMAGE_CDN,
    },
  },
  pwa: {
    meta: {
      favicon: true,
      name: process.env.SIZE_NAME,
      author: process.env.SIZE_NAME,
      description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại ${process.env.SIZE_NAME}`,
      mobileAppIOS: true,
      mobileApp: true,
      ogHost: process.env.DOMAIN,
      twitterCard: process.env.SIZE_NAME,
      twitterSite: process.env.SIZE_NAME,
      twitterCreator: process.env.SIZE_NAME,
    },
    manifest: {
      name: process.env.SIZE_NAME,
      short_name: process.env.SIZE_NAME,
      description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại ${process.env.SIZE_NAME}`,
      background_color: "#111827",
      theme_color: "#fff",
    },
    workbox: {
      // enabled: true,
    },
  },
  image: {
    domains: ["meetoon.co", "meetruyen.com"],
    imageengine: {
      baseURL: "https://6z1a4akz.cdn.imgeng.in/",
    },
    screens: {
      xs: 320,
      "2xs": 390,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
  modules: ["@nuxt/image-edge", "@kevinmarrec/nuxt-pwa", mongodbSetup],
  build: {
    transpile: ["@heroicons/vue"],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: ["~/assets/css/tailwindcss.css", "~/assets/css/main.css"],
});
