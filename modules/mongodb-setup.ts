import { defineNuxtModule } from '@nuxt/kit'
import mongo from '../server/api/mongo'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('render:setupMiddleware', async () => {
      await mongo.connect()
    })
  },
})
