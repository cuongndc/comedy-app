import type { ICate, INewFeed } from '~/types'

export const REVALIDATE_TIME = 3 * 60 * 60 // 3h

export const SourceCollection: { [key: string]: string } = {
  nt: 'http://www.nettruyenco.com',
}

export const SourceParams = {
  netTruyen: 'nt',
}

export const TRUYEN_TRANH = 'truyen-tranh'
export const MANGA_PATH_NAME = 'manga'
export const MANGA_PATH_DETAIL_NAME = 'detail'
export const MANGA_PATH_PREVIEW_NAME = 'preview'

export const MANGA_PATH_READ_NAME = 'read'

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

export interface DropDownLink {
  title: string
  href: string
}

export const CateRanks: ICate[] = [
  {
    title: 'Top all',
    slug: 'all',
    router: '/ranking/all',
  },
  {
    title: 'Top trong tháng',
    slug: 'month',
    router: '/ranking/month',
  },
  {
    title: 'Top trong tuần',
    slug: 'week',
    router: '/ranking/week',
  },
  {
    title: 'Top trong ngày',
    slug: 'day',
    router: '/ranking/day',
  },
  {
    title: 'Theo dõi',
    slug: 'follow',
    router: '/ranking/follow',
  },
  {
    title: 'Bình luận',
    slug: 'comment',
    router: '/ranking/comment',
  },
  {
    title: 'Số chapter',
    slug: 'chapter',
    router: '/ranking/chapter',
  },
]

export const newFeeds: INewFeed[] = [
  {
    id: 1,
    title: '# Ngôn tình cổ đại',
    endPoint: '/api/ngon-tinh',
    category: 'co-dai-207',
  },
  {
    id: 2,
    title: '# Đam mỹ bách hợp',
    endPoint: '/api/dam-my',
    category: 'dam-my',
  },
  {
    id: 3,
    title: '# Xuyên không',
    endPoint: '/api/xuyen-khong',
    category: 'xuyen-khong-205',
  },
]
