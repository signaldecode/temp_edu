<script setup>
import reviewsData from '~/data/reviewsData.json'
import ReviewsHeroSection from '~/components/reviews/ReviewsHeroSection.vue'
import PhotoReviewsSection from '~/components/reviews/PhotoReviewsSection.vue'
import MoreReviewsSection from '~/components/reviews/MoreReviewsSection.vue'

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: reviewsData.meta.title,
  description: reviewsData.meta.description,
  ogTitle: reviewsData.meta.ogTitle,
  ogDescription: reviewsData.meta.ogDescription
})

useHead({
  title: reviewsData.meta.title
})
</script>

<template>
  <main class="reviews-page">
    <ReviewsHeroSection :data="reviewsData.hero" />
    <PhotoReviewsSection :data="reviewsData.photoReviews" />
    <MoreReviewsSection :data="reviewsData.moreReviews" />
  </main>
</template>

<style lang="scss" scoped>
.reviews-page {
  min-height: 100vh;
}
</style>
