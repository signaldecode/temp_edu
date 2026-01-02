<script setup>
import CourseCard from '~/components/home/CourseCard.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  courses: {
    type: Array,
    required: true
  }
})

const activeCategory = ref('all')

const filteredCourses = computed(() => {
  if (activeCategory.value === 'all') {
    return props.courses
  }
  return props.courses.filter(
    course => course.category === activeCategory.value
  )
})

const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}
</script>

<template>
  <section class="courses-list section" aria-label="강의 목록">
    <div class="container">
      <nav class="courses-list__tabs" aria-label="강의 카테고리">
        <ul class="courses-list__tab-list" role="tablist">
          <li
            v-for="category in categories"
            :key="category.id"
            role="presentation"
          >
            <button
              type="button"
              role="tab"
              :class="[
                'courses-list__tab',
                { 'courses-list__tab--active': activeCategory === category.id }
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

      <div class="courses-list__count">
        <span class="courses-list__count-number">{{ filteredCourses.length }}</span>개의 강의
      </div>

      <ul class="courses-list__grid" role="list">
        <li
          v-for="course in filteredCourses"
          :key="course.id"
          class="courses-list__item"
        >
          <CourseCard :course="course" />
        </li>
      </ul>

      <p
        v-if="filteredCourses.length === 0"
        class="courses-list__empty"
      >
        해당 카테고리에 강의가 없습니다.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.courses-list {
  background-color: $color-background;

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
    background-color: $color-background-secondary;
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
    grid-template-columns: repeat(2, 1fr);
    gap: $space-3;
    list-style: none;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(3, 1fr);
      gap: $card-gap-lg;
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(4, 1fr);
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
