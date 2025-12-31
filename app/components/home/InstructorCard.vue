<script setup>
const props = defineProps({
  instructor: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article
    class="instructor-card card"
    :aria-label="props.instructor.ariaLabel ?? props.instructor.name"
  >
    <div class="instructor-card__profile">
      <img
        :src="props.instructor.profileImage.src"
        :alt="props.instructor.profileImage.alt"
        class="instructor-card__image"
        loading="lazy"
      />
    </div>
    <div class="instructor-card__body">
      <h3 class="instructor-card__name">
        {{ props.instructor.name }}
      </h3>
      <p class="instructor-card__title">
        {{ props.instructor.title }}
      </p>
      <ul class="instructor-card__specialty" aria-label="전문 분야">
        <li
          v-for="item in props.instructor.specialty"
          :key="item"
          class="instructor-card__specialty-item"
        >
          {{ item }}
        </li>
      </ul>
      <blockquote class="instructor-card__message">
        "{{ props.instructor.message }}"
      </blockquote>
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
  align-items: center;
  text-align: center;
  padding: $card-padding-lg;

  &__profile {
    width: 120px;
    height: 120px;
    border-radius: $radius-full;
    overflow: hidden;
    margin-bottom: $space-4;
    background-color: $neutral-200;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__name {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $space-1;
  }

  &__title {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $space-3;
  }

  &__specialty {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-1-5;
    list-style: none;
    margin-bottom: $space-4;
  }

  &__specialty-item {
    padding: $space-0-5 $space-2;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $secondary-700;
    background-color: $secondary-50;
    border-radius: $radius-full;
  }

  &__message {
    font-size: $font-size-sm;
    font-style: italic;
    color: $color-text-tertiary;
    line-height: $line-height-relaxed;

    &::before,
    &::after {
      content: none;
    }
  }
}
</style>
