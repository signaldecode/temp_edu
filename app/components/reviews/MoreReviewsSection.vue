<script setup>
import ReviewCard from './ReviewCard.vue'
import ReviewModal from '~/components/modal/ReviewModal.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const activeCategory = ref('all')
const selectedReview = ref(null)
const isModalOpen = ref(false)

const filteredReviews = computed(() => {
  if (activeCategory.value === 'all') {
    return props.data.list
  }
  return props.data.list.filter(
    review => review.courseCategory === activeCategory.value
  )
})

const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}

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
    class="more-reviews section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="more-reviews__header">
        <h2 class="more-reviews__title">{{ data.title }}</h2>
        <p v-if="data.description" class="more-reviews__description">
          {{ data.description }}
        </p>
      </header>

      <nav class="more-reviews__tabs" aria-label="후기 카테고리">
        <ul class="more-reviews__tab-list" role="tablist">
          <li
            v-for="category in data.categories"
            :key="category.id"
            role="presentation"
          >
            <button
              type="button"
              role="tab"
              :class="[
                'more-reviews__tab',
                { 'more-reviews__tab--active': activeCategory === category.id }
              ]"
              :aria-label="category.ariaLabel ?? category.label"
              :aria-selected="activeCategory === category.id"
              @click="handleCategoryChange(category.id)"
            >
              {{ category.label }}
            </button>
          </li>
        </ul>
      </nav>

      <div class="more-reviews__count">
        <span class="more-reviews__count-number">{{ filteredReviews.length }}</span>개의 후기
      </div>

      <ul class="more-reviews__grid" role="list">
        <li
          v-for="review in filteredReviews"
          :key="review.id"
          class="more-reviews__item"
        >
          <ReviewCard
            :review="review"
            @click="handleReviewClick(review)"
          />
        </li>
      </ul>

      <p
        v-if="filteredReviews.length === 0"
        class="more-reviews__empty"
      >
        해당 카테고리에 후기가 없습니다.
      </p>
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

.more-reviews {
  background-color: $color-background-secondary;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-3;
    margin-bottom: $space-8;
    text-align: center;

    @media (min-width: $container-md) {
      margin-bottom: $space-10;
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

  &__tabs {
    margin-bottom: $space-6;
  }

  &__tab-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-2;
    list-style: none;

    @media (min-width: $container-md) {
      gap: $space-3;
    }
  }

  &__tab {
    padding: $space-2-5 $space-5;
    font-family: inherit;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    background-color: $color-surface;
    border: 1px solid transparent;
    border-radius: $radius-full;
    cursor: pointer;
    transition: all $transition-fast;

    @media (min-width: $container-md) {
      padding: $space-3 $space-6;
      font-size: $font-size-base;
    }

    &:hover {
      border-color: $primary-300;
      color: $primary-600;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }

    &--active {
      background-color: $primary-600;
      border-color: $primary-600;
      color: $neutral-0;

      &:hover {
        background-color: $primary-700;
        border-color: $primary-700;
        color: $neutral-0;
      }
    }
  }

  &__count {
    text-align: center;
    margin-bottom: $space-8;
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__count-number {
    font-weight: $font-weight-semibold;
    color: $primary-600;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;
    list-style: none;

    @media (min-width: $container-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(3, 1fr);
      gap: $card-gap-lg;
    }
  }

  &__item {
    display: flex;
    width: 100%;
    min-width: 0;
  }

  &__empty {
    text-align: center;
    padding: $space-16 0;
    font-size: $font-size-base;
    color: $color-text-tertiary;
  }
}
</style>
