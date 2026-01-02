<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import PhotoReviewCard from './PhotoReviewCard.vue'
import ReviewModal from '~/components/modal/ReviewModal.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const selectedReview = ref(null)
const isModalOpen = ref(false)

const handleReviewClick = (review) => {
  selectedReview.value = review
  isModalOpen.value = true
}

const handleModalClose = () => {
  isModalOpen.value = false
  selectedReview.value = null
}
</script>

<template>
  <section
    class="photo-reviews section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="photo-reviews__header">
        <SectionBadge v-if="data.badge" :label="data.badge" />
        <h2 class="photo-reviews__title">{{ data.title }}</h2>
        <p v-if="data.description" class="photo-reviews__description">
          {{ data.description }}
        </p>
      </header>

      <ul class="photo-reviews__grid" role="list">
        <li
          v-for="review in data.list"
          :key="review.id"
          class="photo-reviews__item"
        >
          <PhotoReviewCard
            :review="review"
            @click="handleReviewClick(review)"
          />
        </li>
      </ul>
    </div>

    <ReviewModal
      :review="selectedReview"
      :is-open="isModalOpen"
      @close="handleModalClose"
    />
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.photo-reviews {
  background-color: $color-background;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-3;
    margin-bottom: $space-10;
    text-align: center;

    @media (min-width: $container-md) {
      margin-bottom: $space-12;
    }
  }

  &__title {
    position: relative;
    display: inline-block;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;

    @media (min-width: $container-md) {
      font-size: $font-size-3xl;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -$space-2;
      left: 50%;
      transform: translateX(-50%);
      width: 48px;
      height: 3px;
      background: linear-gradient(90deg, $primary-400, $primary-600);
      border-radius: $radius-full;
    }
  }

  &__description {
    margin-top: $space-4;
    font-size: $font-size-base;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    max-width: 560px;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-4;
    list-style: none;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(3, 1fr);
      gap: $card-gap-lg;
    }
  }

  &__item {
    display: flex;
    width: 100%;
    min-width: 0;
  }
}
</style>
