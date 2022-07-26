import { useStorage } from '@vueuse/core'
import type { ComicPreview } from '~/types'
import { keys } from '~/types'
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/contants'

export default async function useReadComic(chapterNumber: string, chapterId: string, slug: string) {
  const comic = await $fetch(`/api/comic?slug=${slug}`)
  if (!comic)
    return ''

  const manga: ComicPreview = (comic as ComicPreview)
  useStorage(keys.comicCacheLocalPreview, manga)
  return `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${slug}/${chapterNumber}/${chapterId}`
}
