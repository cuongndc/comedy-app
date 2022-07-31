export type Page = {
  _id: string
  chapterId: string
  chapterSlug: string
  linkHD: string
  linkSD: string
  width: number
  height: number
  pageNum: string
}

export type Chapter = {
  _id: string
  chapterNum: string
  chapterName: string
  isUnlocked: boolean
  slug: string
  comicSlug: string
  comicId: string
  chapterOrderIndex: number
  createdAt: string
  totalComment: number
  totalLike: number
  totalView: number
}

export type ReadPage = {
  pages: Page[]
  chapter: Chapter
}