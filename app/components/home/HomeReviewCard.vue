<script setup>
const props = defineProps({
  review: {
    type: Object,
    required: true
  }
})

const maxRating = 5

const filledStars = computed(() => Math.round(props.review.rating))
</script>

<template>
  <article
    class="review-card card"
    :aria-label="props.review.ariaLabel ?? `${props.review.nickname}님의 후기`"
  >
    <div class="review-card__header">
      <div class="review-card__user">
        <span class="review-card__avatar" aria-hidden="true">
          {{ props.review.nickname.charAt(0) }}
        </span>
        <div class="review-card__user-info">
          <span class="review-card__nickname">
            {{ props.review.nickname }}
          </span>
          <span class="review-card__course">
            {{ props.review.courseName }}
          </span>
        </div>
      </div>
      <div
        class="review-card__rating star-rating"
        role="img"
        :aria-label="`별점 ${props.review.rating}점`"
      >
        <span
          v-for="star in maxRating"
          :key="star"
          :class="[
            'star-rating__star',
            { 'star-rating__star--filled': star <= filledStars }
          ]"
          aria-hidden="true"
        >
          ★
        </span>
      </div>
    </div>
    <blockquote class="review-card__content">
      <p>{{ props.review.content }}</p>
    </blockquote>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.review-card {
  padding: $space-4;

  @media (min-width: 360px) {
    padding: $card-padding-lg;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    margin-bottom: $space-4;

    @media (min-width: 360px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: $space-2;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: $space-2;
    min-width: 0;

    @media (min-width: 360px) {
      gap: $space-3;
    }
  }

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $primary-700;
    background-color: $primary-100;
    border-radius: $radius-full;
    flex-shrink: 0;

    @media (min-width: 360px) {
      width: 44px;
      height: 44px;
      font-size: $font-size-lg;
    }
  }

  &__user-info {
    display: flex;
    flex-direction: column;
    gap: $space-0-5;
    min-width: 0;
  }

  &__nickname {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;

    @media (min-width: 360px) {
      font-size: $font-size-base;
    }
  }

  &__course {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 360px) {
      font-size: $font-size-sm;
    }
  }

  &__rating {
    flex-shrink: 0;
  }

  &__content {
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: $color-text-secondary;

    p {
      margin: 0;
    }

    &::before,
    &::after {
      content: none;
    }
  }
}
</style>
