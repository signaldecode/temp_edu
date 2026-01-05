<script setup>
import mainData from '~/data/mainData.json'
import HeroSection from '~/components/home/HeroSection.vue'
import CoursesSection from '~/components/home/CoursesSection.vue'
import InstructorsSection from '~/components/home/InstructorsSection.vue'
import ReviewsSection from '~/components/home/ReviewsSection.vue'
import PartnersSection from '~/components/common/PartnersSection.vue'
import FaqSection from '~/components/home/FaqSection.vue'

const data = mainData
const categories = mainData.categories.list

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: data.site.title,
  description: data.site.metaDescription,
  ogTitle: data.site.ogTitle ?? data.site.title,
  ogDescription: data.site.ogDescription ?? data.site.metaDescription,
  ogImage: data.site.ogImage,
  ogLocale: data.site.locale,
  ogSiteName: data.site.siteName,
})

useHead({
  htmlAttrs: {
    lang: 'ko',
  },
  meta: [
    { name: 'keywords', content: data.site.metaKeywords?.join(', ') },  
  ],
})
</script>

<template>
  <main class="page-home">
    <h1 class="visually-hidden">{{ data.site.title }}</h1>
    <HeroSection :data="data.home.hero" />
    <CoursesSection :data="data.home.courses" :categories="categories" />
    <InstructorsSection :data="data.home.instructors" />
    <ReviewsSection :data="data.home.reviews" />
    <PartnersSection :data="data.home.partners" variant="brand" />
    <FaqSection :data="data.home.faq" />
  </main>
</template>
