import { createVuetify } from 'vuetify'
import { VImg } from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VImg,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
