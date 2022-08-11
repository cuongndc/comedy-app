import { defineNuxtModule } from '@nuxt/kit'
import client from '../serverless/mongoClient'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('render:setupMiddleware', async () => {
      await client.connect()
    })
  },
})
