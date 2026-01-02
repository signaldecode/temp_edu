<script setup>
defineProps({
  review: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <article
    class="photo-review-card card"
    :aria-label="review.ariaLabel ?? review.title"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div class="photo-review-card__image-wrap">
      <img
        :src="review.image.src"
        :alt="review.image.alt"
        class="photo-review-card__image"
        loading="lazy"
      />
    </div>
    <div class="photo-review-card__body">
      <h3 class="photo-review-card__title">{{ review.title }}</h3>
      <p class="photo-review-card__content">{{ review.content }}</p>
      <div class="photo-review-card__footer">
        <div class="photo-review-card__author">
          <div class="photo-review-card__avatar" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span class="photo-review-card__nickname">{{ review.nickname }}</span>
        </div>
        <span class="photo-review-card__course">{{ review.courseName }}</span>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.photo-review-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: transform $transition-base, box-shadow $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba($neutral-900, 0.12);
  }

  &:focus-visible {
    outline: 2px solid $color-border-focus;
    outline-offset: 2px;
  }

  &__image-wrap {
    flex-shrink: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: $neutral-100;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow;

    .photo-review-card:hover & {
      transform: scale(1.05);
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    height: 180px;
    padding: $space-4;
    overflow: hidden;

    @media (min-width: $container-md) {
      height: 200px;
      padding: $space-5;
    }
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    line-height: $line-height-snug;
    margin-bottom: $space-2;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      font-size: $font-size-base;
    }
  }

  &__content {
    flex: 1;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 0;

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-2;
    margin-top: auto;
    padding-top: $space-3;
    border-top: 1px solid $color-border-light;
    flex-shrink: 0;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: $space-2;
    min-width: 0;
  }

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: $neutral-100;
    border-radius: $radius-full;
    color: $neutral-400;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      width: 32px;
      height: 32px;
    }
  }

  &__nickname {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
    }
  }

  &__course {
    flex-shrink: 0;
    padding: $space-1 $space-2;
    font-size: 10px;
    font-weight: $font-weight-medium;
    color: $primary-700;
    background-color: $primary-50;
    border-radius: $radius-full;
    white-space: nowrap;

    @media (min-width: $container-md) {
      padding: $space-1 $space-2-5;
      font-size: $font-size-xs;
    }
  }
}
</style>
