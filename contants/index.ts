export const TRUYEN_TRANH_CHAPTER = 'truyen-tranh-chapter'
export const TRUYEN_CHU_CHAPTER = 'truyen-chu-chapter'
export const TRUYEN_TRANH = 'truyen-tranh'
export const TRUYEN_CHU = 'truyen-chu'
export const DANH_MUC = 'danh-muc'
export const TRENDING = 'trending'
export const TRUYEN_CHU_HOT = 'truyen-chu-hot'
export const NOVEL_DANH_MUC = 'novel/danh-muc'
export const TAG = 'tag'

export const novelCategories = [
  {
    label: 'Tất cả danh mục',
    slug: `/${NOVEL_DANH_MUC}`,
    router: `/${NOVEL_DANH_MUC}`,
  },
  {
    label: 'Ngôn Tình Cổ Đại',
    slug: 'ngon-tinh-co-dai',
    router: `/${NOVEL_DANH_MUC}/ngon-tinh-co-dai`,
  },
  {
    label: 'Ngôn Tình Hiện Đại',
    slug: 'ngon-tinh-hien-dai',
    router: `/${NOVEL_DANH_MUC}/ngon-tinh-hien-dai`,
  },
  {
    label: 'Đam Mỹ Bách Hợp',
    slug: 'dam-my-bach-hop',
    router: `/${NOVEL_DANH_MUC}/dam-my-bach-hop`,
  },
  {
    label: 'Ngược Sủng Đan Xen',
    slug: 'nguoc-sung-dan-xen',
    router: `/${NOVEL_DANH_MUC}/nguoc-sung-dan-xen`,
  },
  {
    label: 'Lãng Mạn Ngọt Ngào',
    slug: 'lang-man-ngot-ngao',
    router: `/${NOVEL_DANH_MUC}/lang-man-ngot-ngao`,
  },
  {
    label: 'Tình Yêu Đầu Đời',
    slug: 'tinh-yeu-dau-doi',
    router: `/${NOVEL_DANH_MUC}/tinh-yeu-dau-doi`,
  },
  {
    label: 'Văn Học Phương Tây',
    slug: 'van-hoc-phuong-tay',
    router: `/${NOVEL_DANH_MUC}/van-hoc-phuong-tay`,
  },
  {
    label: 'Linh Dị Trinh Thám',
    slug: 'linh-di-trinh-tham',
    router: `/${NOVEL_DANH_MUC}/linh-di-trinh-tham`,
  },
  {
    label: 'Cuộc Thi Viết Truyện Ngắn',
    slug: 'cuoc-thi-viet-truyen-ngan',
    router: `/${NOVEL_DANH_MUC}/cuoc-thi-viet-truyen-ngan`,
  },
]

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
