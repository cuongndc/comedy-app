import { useStorage } from '@vueuse/core'
import type { ComicPreview, Manga } from '~/types'
import { keys } from '~/types'
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/contants'

export async function readLastComic(spotlight: Manga, slugs: string | readonly string[]) {
  const slug = slugs || spotlight?.slug
  const comic = await $fetch(`/api/comic?slug=${slug}`)
  if (!comic)
    return ''

  const mangas: ComicPreview = (comic as ComicPreview)
  const cache = useStorage(keys.comicCacheLocalPreview, '')
  cache.value = null
  cache.value = JSON.stringify(mangas)
  const chapterId = mangas?.chapterList && mangas?.chapterList[mangas.chapterList?.length].chapterId
  const chapterNumber = mangas.chapterList && mangas.chapterList[mangas.chapterList?.length].chapterNumber

  return `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${slug}/${chapterNumber}/${chapterId}`
}
