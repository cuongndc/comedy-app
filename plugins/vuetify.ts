import { createVuetify } from 'vuetify'
import { VImg, VLazy } from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VImg,
      VLazy,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
