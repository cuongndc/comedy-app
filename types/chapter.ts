export interface Chapter {
  chapterId: string
  chapterNumber: string
  chapterTitle: string
  updatedAt: string
  view: string
}

export interface Genre {
  genreTitle: string
  slug: string
}

export interface ChapterImg {
  id: string
  imgSrc: string
  title: string
  imgSrcCDN: string
}
