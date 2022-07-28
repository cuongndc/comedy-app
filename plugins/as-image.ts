import AsImage from '@awesome-image/image'
import { imageUrlGeneratorFP } from '@awesome-image/services'
import type { NuxtApp } from '#app'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.vueApp.use(AsImage, {
    imageUrlGenerator: imageUrlGeneratorFP,
  })
})
