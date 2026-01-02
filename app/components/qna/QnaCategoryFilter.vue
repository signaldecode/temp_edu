<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    default: 'all'
  },
  searchQuery: {
    type: String,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    default: '검색'
  },
  searchAriaLabel: {
    type: String,
    default: '검색'
  }
})

const emit = defineEmits(['update:activeCategory', 'update:searchQuery'])

const handleCategoryClick = (categoryId) => {
  emit('update:activeCategory', categoryId)
}

const handleSearchInput = (event) => {
  emit('update:searchQuery', event.target.value)
}
</script>

<template>
  <aside class="qna-filter" aria-label="Q&A 필터">
    <div class="qna-filter__search">
      <label for="qna-search" class="visually-hidden">{{ searchAriaLabel }}</label>
      <div class="qna-filter__search-wrap">
        <svg
          class="qna-filter__search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          id="qna-search"
          type="text"
          class="qna-filter__search-input"
          :placeholder="searchPlaceholder"
          :value="searchQuery"
          @input="handleSearchInput"
        />
      </div>
    </div>

    <nav class="qna-filter__categories" aria-label="강의별 카테고리">
      <h2 class="qna-filter__title">강의별 Q&A</h2>
      <ul class="qna-filter__list" role="tablist">
        <li
          v-for="category in categories"
          :key="category.id"
          role="presentation"
        >
          <button
            type="button"
            role="tab"
            :class="[
              'qna-filter__item',
              { 'qna-filter__item--active': activeCategory === category.id }
            ]"
            :aria-label="category.ariaLabel ?? category.label"
            :aria-selected="activeCategory === category.id"
            @click="handleCategoryClick(category.id)"
          >
            {{ category.label }}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.qna-filter {
  display: flex;
  flex-direction: column;
  gap: $space-6;

  &__search-wrap {
    position: relative;
  }

  &__search-icon {
    position: absolute;
    left: $space-4;
    top: 50%;
    transform: translateY(-50%);
    color: $color-text-tertiary;
    pointer-events: none;
  }

  &__search-input {
    width: 100%;
    padding: $space-3 $space-4;
    padding-left: calc($space-4 + 20px + $space-2);
    font-family: inherit;
    font-size: $font-size-base;
    color: $color-text-primary;
    background-color: $color-surface;
    border: 1px solid $color-border-light;
    border-radius: $radius-lg;
    transition: border-color $transition-fast, box-shadow $transition-fast;

    &::placeholder {
      color: $color-text-tertiary;
    }

    &:hover {
      border-color: $primary-300;
    }

    &:focus {
      outline: none;
      border-color: $primary-500;
      box-shadow: 0 0 0 3px rgba($primary-500, 0.15);
    }
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-tertiary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: $space-3;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: $space-3 $space-4;
    font-family: inherit;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    text-align: left;
    background-color: transparent;
    border: none;
    border-radius: $radius-lg;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: $neutral-100;
      color: $color-text-primary;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: -2px;
    }

    &--active {
      background-color: $primary-50;
      color: $primary-700;
      font-weight: $font-weight-semibold;

      &:hover {
        background-color: $primary-100;
        color: $primary-700;
      }
    }
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
