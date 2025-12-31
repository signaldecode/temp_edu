/**
 * 공통 타입 정의
 * - 여러 섹션/컴포넌트에서 재사용되는 기본 타입
 */

/** 이미지 정보 */
export interface ImageInfo {
  src: string
  alt: string
  width?: number
  height?: number
}

/** CTA 버튼 */
export interface CtaButton {
  label: string
  to: string
  ariaLabel?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

/** 네비게이션 아이템 */
export interface NavItem {
  label: string
  to: string
  ariaLabel?: string
  children?: NavItem[]
}

/** 사이트 기본 정보 (SEO) */
export interface SiteInfo {
  title: string
  metaDescription: string
  metaKeywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  locale?: string
  siteName?: string
}

/** 지역 정보 (GEO) */
export interface GeoInfo {
  country: string
  countryCode?: string
  city?: string
  address?: string
  postalCode?: string
  latitude?: number
  longitude?: number
  phone?: string
  email?: string
  businessHours?: string
}

/** 섹션 공통 헤더 */
export interface SectionHeader {
  title: string
  subtitle?: string
  description?: string
  ariaLabel?: string
}
