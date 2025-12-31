<script setup>
import CourseCard from '~/components/home/CourseCard.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const activeCategory = ref('all')

const filteredCourses = computed(() => {
  if (activeCategory.value === 'all') {
    return props.data.courses
  }
  return props.data.courses.filter(
    course => course.category === activeCategory.value
  )
})

const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}
</script>

<template>
  <section
    class="courses-section section"
    :aria-label="props.data.ariaLabel ?? props.data.title"
  >
    <div class="container">
      <header class="section-header">
        <h2 class="section-header__title">
          {{ props.data.title }}
        </h2>
        <p
          v-if="props.data.subtitle"
          class="section-header__subtitle"
        >
          {{ props.data.subtitle }}
        </p>
      </header>

      <nav class="courses-section__categories" aria-label="강좌 카테고리">
        <ul class="courses-section__category-list">
          <li
            v-for="category in props.data.categories"
            :key="category.id"
          >
            <button
              type="button"
              :class="[
                'courses-section__category-btn',
                { 'courses-section__category-btn--active': activeCategory === category.id }
              ]"
              :aria-label="category.ariaLabel ?? category.label"
              :aria-pressed="activeCategory === category.id"
              @click="handleCategoryChange(category.id)"
            >
              {{ category.label }}
            </button>
          </li>
        </ul>
      </nav>

      <ul class="courses-section__list">
        <li
          v-for="course in filteredCourses"
          :key="course.id"
          class="courses-section__item"
        >
          <CourseCard :course="course" />
        </li>
      </ul>

      <div
        v-if="props.data.moreLink"
        class="courses-section__more"
      >
        <NuxtLink
          :to="props.data.moreLink.to"
          :aria-label="props.data.moreLink.ariaLabel ?? props.data.moreLink.label"
          class="btn btn--outline"
        >
          {{ props.data.moreLink.label }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.courses-section {
  background-color: $color-background-secondary;

  &__categories {
    margin-bottom: $space-8;
  }

  &__category-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-2;
    list-style: none;
  }

  &__category-btn {
    padding: $space-2 $space-4;
    font-family: inherit;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    background-color: transparent;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    cursor: pointer;
    transition: all $transition-fast;

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

  &__list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $card-gap-lg;
    list-style: none;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__item {
    // Grid item
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-top: $space-10;
  }
}
</style>
