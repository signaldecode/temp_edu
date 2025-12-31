/**
 * 메인 페이지(Home) 관련 타입 정의
 * - Hero, Courses, Instructors, Reviews, Partners, FAQ, Contact 섹션
 */

import type {
  ImageInfo,
  CtaButton,
  SectionHeader,
  SiteInfo,
  GeoInfo,
  NavItem,
} from './common'

/** ===========================
 *  Hero 섹션
 *  =========================== */
export interface HeroSection {
  title: string
  subtitle: string
  backgroundImage: ImageInfo
  ctaButtons: CtaButton[]
  ariaLabel?: string
}

/** ===========================
 *  강좌 카드 섹션
 *  =========================== */
export interface CourseCategory {
  id: string
  label: string
  ariaLabel?: string
}

export interface CourseCard {
  id: string
  title: string
  category: string
  tags: string[]
  thumbnail: ImageInfo
  instructor?: string
  link: string
  ariaLabel?: string
}

export interface CoursesSection extends SectionHeader {
  categories: CourseCategory[]
  courses: CourseCard[]
  moreLink?: CtaButton
}

/** ===========================
 *  강사진 소개 섹션
 *  =========================== */
export interface InstructorCard {
  id: string
  name: string
  profileImage: ImageInfo
  title: string
  specialty: string[]
  message: string
  ariaLabel?: string
}

export interface InstructorsSection extends SectionHeader {
  instructors: InstructorCard[]
}

/** ===========================
 *  수강생 후기 섹션
 *  =========================== */
export interface ReviewCard {
  id: string
  nickname: string
  courseName: string
  content: string
  rating: number
  ariaLabel?: string
}

export interface ReviewsSection extends SectionHeader {
  reviews: ReviewCard[]
  moreLink?: CtaButton
}

/** ===========================
 *  고객사/협업사 섹션
 *  =========================== */
export interface PartnerLogo {
  id: string
  name: string
  logo: ImageInfo
  link?: string
}

export interface PartnersSection extends SectionHeader {
  partners: PartnerLogo[]
}

/** ===========================
 *  FAQ 섹션
 *  =========================== */
export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqSection extends SectionHeader {
  faqList: FaqItem[]
  moreLink?: CtaButton
}

/** ===========================
 *  문의하기 폼 섹션
 *  =========================== */
export interface ContactFormField {
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  ariaDescribedBy?: string
  helpText?: string
}

export interface ContactSection extends SectionHeader {
  fields: ContactFormField[]
  submitButton: CtaButton
  privacyConsent: {
    id: string
    label: string
    required: boolean
    ariaDescribedBy?: string
    helpText?: string
  }
}

/** ===========================
 *  메인 페이지 전체 데이터
 *  =========================== */
export interface HomePageData {
  hero: HeroSection
  courses: CoursesSection
  instructors: InstructorsSection
  reviews: ReviewsSection
  partners: PartnersSection
  faq: FaqSection
  contact: ContactSection
}

/** ===========================
 *  전체 MainData 구조
 *  =========================== */
export interface MainData {
  site: SiteInfo
  navigation: {
    headerMenu: NavItem[]
    footerMenu?: NavItem[]
  }
  home: HomePageData
  geo?: GeoInfo
}
