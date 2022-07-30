import type { Category } from './categorys'

export interface Comic {
  _id: string
  type: string
  title: string
  comicName: string
  comicNameMention: string
  categories: Category[]
  active: boolean
  slug: string
  label: string
  platform: string[]
  author: {}
  chapCount: number
  newestChapter: string
  averageRate: number
  avgRate: number
  reviewCount: number
  followingCount: number
  likedCount: number
  viewCount: number
  shareCount: number
  adultContent: boolean
  licenseAvailable: boolean
  horizontalLogo: string
  verticalLogo: string
  verticalCover: string
  ogImage: string
  squareLogo: string
  squareCover: string
  publishedAt: string
  isNew: boolean
  updatedAt: string
  createdAt: string
  status: string
  totalVote: string
  totalComment: string
  source: string
  tags: tag[]
  description: string
}

export interface tag {
  _id: string
  name: string
  slug: string
}
