<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="course-card card">
    <NuxtLink
      :to="props.course.link"
      :aria-label="props.course.ariaLabel ?? props.course.title"
      class="course-card__link"
    >
      <div class="course-card__thumbnail">
        <img
          :src="props.course.thumbnail.src"
          :alt="props.course.thumbnail.alt"
          class="course-card__image"
          loading="lazy"
        />
      </div>
      <div class="course-card__body">
        <ul class="course-card__tags" aria-label="강좌 태그">
          <li
            v-for="tag in props.course.tags"
            :key="tag"
            class="course-card__tag"
          >
            {{ tag }}
          </li>
        </ul>
        <h3 class="course-card__title">
          {{ props.course.title }}
        </h3>
        <p
          v-if="props.course.instructor"
          class="course-card__instructor"
        >
          {{ props.course.instructor }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.course-card {
  height: 100%;

  &__link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    color: inherit;

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }
  }

  &__thumbnail {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: $neutral-200;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow;

    .course-card:hover & {
      transform: scale(1.05);
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: $card-padding;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-1-5;
    list-style: none;
    margin-bottom: $space-2;
  }

  &__tag {
    padding: $space-0-5 $space-2;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $primary-700;
    background-color: $primary-50;
    border-radius: $radius-full;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    line-height: $line-height-snug;
    color: $color-text-primary;
    margin-bottom: $space-2;
    flex: 1;
  }

  &__instructor {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}
</style>
