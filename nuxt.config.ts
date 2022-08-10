import { defineNuxtConfig } from 'nuxt'
import mongodbSetup from './modules/mongodb-setup'

export default defineNuxtConfig({
  nitro: {
    timing: true,
  },
  app: {
    buildAssetsDir: '/assets/',
  },
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  runtimeConfig: {
    mongodbURI: process.env.MONGODB_URI,
    serviceURL: process.env.SERVICE_URL,
    public: {
      publicURL: process.env.PUBLIC_URL,
      domain: process.env.DOMAIN,
      siteName: process.env.SITE_NAME,
      imgCDN: process.env.IMAGE_CDN,
    },
  },
  hooks: {
    'vite:extendConfig': function (config, { isServer }) {
      if (isServer) {
        // Workaround for Netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },
  proxy: {
    options: {
      target: process.env.SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/proxy': '/api/wb',
      },
      pathFilter: ['/api/proxy'],
    },
  },
  pwa: {
    meta: {
      favicon: true,
      name: process.env.SITE_NAME,
      author: process.env.SITE_NAME,
      description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại ${process.env.SITE_NAME}`,
      mobileAppIOS: true,
      mobileApp: true,
      ogHost: process.env.DOMAIN,
      twitterCard: process.env.SITE_NAME,
      twitterSite: process.env.SITE_NAME,
      twitterCreator: process.env.SITE_NAME,
    },
    manifest: {
      name: process.env.SITE_NAME,
      short_name: process.env.SITE_NAME,
      description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại ${process.env.SITE_NAME}`,
      background_color: '#111827',
      theme_color: '#fff',
    },
    workbox: {
      // enabled: true,
    },
  },
  image: {
    domains: ['meetoon.co', 'meetruyen.com'],
    imageengine: {
      baseURL: 'https://6z1a4akz.cdn.imgeng.in/',
    },
    screens: {
      'xs': 320,
      '2xs': 390,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536,
    },
  },
  modules: [
    'nuxt-proxy',
    '@nuxt/image-edge',
    '@kevinmarrec/nuxt-pwa',
    mongodbSetup,
  ],
  buildModules: [
    ['@nuxt-modules/compression', {
      algorithm: 'gzip',
      filter: /\.(js|mjs|css|html)$/i,
      success: () => {
        // eslint-disable-next-line no-console
        console.log('✅ Success gzip compression')
      },
    }],
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: ['~/assets/css/tailwindcss.css', '~/assets/css/main.css'],
})
