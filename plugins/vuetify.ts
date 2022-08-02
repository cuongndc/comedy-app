import { createVuetify } from '@vuetify/nightly'
import { VCarousel, VImg } from '@vuetify/nightly/components'
// import * as d from '@vuetify/nightly/directives'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // console.log('cs', Object.keys(cs).filter(item => item.includes('Item')))

  const vuetify = createVuetify({
    components: {
      VImg,
      VCarousel,
    },
    // directives: d,
  })
  nuxtApp.vueApp.use(vuetify)
})
