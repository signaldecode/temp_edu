<script setup>
defineProps({
  instructor: {
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
    class="instructor-card"
    :aria-label="instructor.ariaLabel ?? instructor.name"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div class="instructor-card__image-wrap">
      <img
        :src="instructor.profileImage.src"
        :alt="instructor.profileImage.alt"
        class="instructor-card__image"
        loading="lazy"
      />
    </div>
    <div class="instructor-card__body">
      <div class="instructor-card__header">
        <h3 class="instructor-card__name">{{ instructor.name }}</h3>
        <p class="instructor-card__role">{{ instructor.role }}</p>
        <p class="instructor-card__company">{{ instructor.company }}</p>
      </div>
      <ul class="instructor-card__specialties" aria-label="전문 분야">
        <li
          v-for="specialty in instructor.specialties"
          :key="specialty"
          class="instructor-card__specialty"
        >
          {{ specialty }}
        </li>
      </ul>
      <p class="instructor-card__description">{{ instructor.description }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.instructor-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 280px;
  background-color: $color-surface;
  border: 1px solid $color-border-light;
  border-radius: $radius-xl;
  overflow: hidden;
  cursor: pointer;
  transition: border-color $transition-base, box-shadow $transition-base, transform $transition-base;

  @media (min-width: $container-md) {
    flex-direction: row;
    height: 200px;
  }

  &:hover {
    border-color: $primary-300;
    box-shadow: 0 8px 24px rgba($primary-500, 0.12);
    transform: translateY(-4px);
  }

  &:focus-visible {
    outline: 2px solid $color-border-focus;
    outline-offset: 2px;
  }

  &__image-wrap {
    flex-shrink: 0;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: $neutral-100;
    overflow: hidden;

    @media (min-width: $container-md) {
      width: 200px;
      aspect-ratio: auto;
    }

    @media (min-width: $container-lg) {
      width: 240px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: $space-4;
    overflow: hidden;

    @media (min-width: $container-md) {
      padding: $space-5;
    }

    @media (min-width: $container-lg) {
      padding: $space-6;
    }
  }

  &__header {
    margin-bottom: $space-2;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      margin-bottom: $space-3;
    }
  }

  &__name {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-0-5;

    @media (min-width: $container-md) {
      font-size: $font-size-xl;
      margin-bottom: $space-1;
    }
  }

  &__role {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $primary-600;
    margin-bottom: $space-0-5;

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
      margin-bottom: $space-1;
    }
  }

  &__company {
    font-size: $font-size-xs;
    color: $color-text-tertiary;

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
    }
  }

  &__specialties {
    display: flex;
    flex-wrap: wrap;
    gap: $space-1;
    list-style: none;
    margin-bottom: $space-2;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      gap: $space-1-5;
      margin-bottom: $space-3;
    }
  }

  &__specialty {
    padding: $space-0-5 $space-1-5;
    font-size: 10px;
    font-weight: $font-weight-medium;
    color: $primary-700;
    background-color: $primary-50;
    border-radius: $radius-full;

    @media (min-width: $container-md) {
      padding: $space-0-5 $space-2;
      font-size: $font-size-xs;
    }
  }

  &__description {
    flex: 1;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 0;

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
      -webkit-line-clamp: 3;
    }
  }
}
</style>
