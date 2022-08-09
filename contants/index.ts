export const TRUYEN_TRANH_CHAPTER = 'truyen-tranh-chapter'
export const TRUYEN_CHU_CHAPTER = 'truyen-chu-chapter'
export const TRUYEN_TRANH = 'truyen-tranh'
export const TRUYEN_CHU = 'truyen-chu'
export const DANH_MUC = 'danh-muc'
export const TRENDING = 'trending'
export const TAG = 'tag'

export const categories = [
  {
    label: 'Tất cả danh mục',
    slug: 'all',
    router: `/${DANH_MUC}/all`,
  },
  {
    label: 'Đam mỹ bách hợp',
    slug: 'dam-my-bach-hop',
    router: `/${DANH_MUC}/dam-my-bach-hop`,
  },
  {
    label: 'Ngôn tình cổ đại',
    slug: 'ngon-tinh-co-dai',
    router: `/${DANH_MUC}/ngon-tinh-co-dai`,
  },
  {
    label: 'Ngôn tình hiện đại',
    slug: 'ngon-tinh-hien-dai',
    router: `/${DANH_MUC}/ngon-tinh-hien-dai`,
  },
  {
    label: 'Nữ chủ xuyên không',
    slug: 'nu-chu-xuyen-khong',
    router: `/${DANH_MUC}/nu-chu-xuyen-khong`,
  },
  {
    label: 'Hành động phưu lưu',
    slug: 'hanh-dong-phieu-luu',
    router: `/${DANH_MUC}/hanh-dong-phieu-luu`,
  },
]
export const collections = {
  chapters: 'chapters',
  comics: 'comics',
  homePages: 'homepages',
  chapterPages: 'chapter-pages',
  novelChapters: 'novel-chapters',
  novels: 'novels',
}
export const comicTabs = {
  comic: 'comic',
  chapter: 'chapter',
  review: 'review',
}

export const TailwindColors = [
  '#facc15',
  '#a3e635',
  '#fbbf24',
  '#34d399',
  '#fb923c',
  '#22d3ee',
  '#f87171',
  '#38bdf8',
  '#f472b6',
  '#818cf8',
  '#fb7185',
  '#a78bfa',
  '#e879f9',
]

export const inprogress = 'inprogress'
export const completed = 'completed'

export const COMIC_STATUS = {
  inprogress: 'Đang ra',
  complete: 'Hoàn thành',
}
