<script setup>
const props = defineProps({
  qna: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const handleToggle = () => {
  emit('toggle')
}
</script>

<template>
  <article
    class="qna-accordion"
    :class="{ 'qna-accordion--open': isOpen }"
    :aria-label="qna.ariaLabel ?? qna.question.title"
  >
    <button
      type="button"
      class="qna-accordion__header"
      :aria-expanded="isOpen"
      @click="handleToggle"
    >
      <div class="qna-accordion__header-content">
        <span class="qna-accordion__badge">Q</span>
        <div class="qna-accordion__title-wrap">
          <h3 class="qna-accordion__title">{{ qna.question.title }}</h3>
          <span class="qna-accordion__course">{{ qna.courseName }}</span>
        </div>
      </div>
      <span class="qna-accordion__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </button>

    <div class="qna-accordion__body">
      <div class="qna-accordion__body-inner">
        <div class="qna-accordion__question">
          <div class="qna-accordion__meta">
            <span class="qna-accordion__author">{{ qna.question.author }}</span>
            <span class="qna-accordion__date">{{ qna.question.createdAt }}</span>
          </div>
          <p class="qna-accordion__question-content">{{ qna.question.content }}</p>
        </div>

        <div class="qna-accordion__answer">
          <div class="qna-accordion__answer-header">
            <span class="qna-accordion__badge qna-accordion__badge--answer">A</span>
            <div class="qna-accordion__answer-meta">
              <span class="qna-accordion__answer-author">{{ qna.answer.author }}</span>
              <span class="qna-accordion__answer-date">{{ qna.answer.createdAt }}</span>
            </div>
          </div>
          <div class="qna-accordion__answer-content" v-html="qna.answer.content.replace(/\n/g, '<br>')" />
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.qna-accordion {
  background-color: $color-surface;
  border: 1px solid $color-border-light;
  border-radius: $radius-xl;
  overflow: hidden;
  transition: border-color $transition-base, box-shadow $transition-base;

  &:hover {
    border-color: $primary-200;
  }

  &--open {
    border-color: $primary-300;
    box-shadow: 0 4px 16px rgba($primary-500, 0.1);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;
    width: 100%;
    padding: $space-4;
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color $transition-fast;

    @media (min-width: $container-md) {
      padding: $space-5;
    }

    &:hover {
      background-color: $neutral-50;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: -2px;
    }
  }

  &__header-content {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    flex: 1;
    min-width: 0;

    @media (min-width: $container-md) {
      align-items: center;
    }
  }

  &__badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: $neutral-0;
    background-color: $primary-500;
    border-radius: $radius-lg;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      width: 32px;
      height: 32px;
      font-size: $font-size-base;
    }

    &--answer {
      background-color: $success-500;
    }
  }

  &__title-wrap {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    flex: 1;
    min-width: 0;

    @media (min-width: $container-md) {
      flex-direction: row;
      align-items: center;
      gap: $space-3;
    }
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    line-height: $line-height-snug;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__course {
    flex-shrink: 0;
    padding: $space-0-5 $space-2;
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

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: $color-text-tertiary;
    transition: transform $transition-base, color $transition-base;
    flex-shrink: 0;

    .qna-accordion--open & {
      transform: rotate(180deg);
      color: $primary-500;
    }
  }

  &__body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows $transition-base;

    .qna-accordion--open & {
      grid-template-rows: 1fr;
    }
  }

  &__body-inner {
    overflow: hidden;
  }

  &__question {
    padding: 0 $space-4 $space-4;
    border-bottom: 1px solid $color-border-light;

    @media (min-width: $container-md) {
      padding: 0 $space-5 $space-5;
      padding-left: calc($space-5 + 32px + $space-3);
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: $space-2;
    margin-bottom: $space-3;
  }

  &__author {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__date {
    font-size: $font-size-xs;
    color: $color-text-tertiary;
  }

  &__question-content {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;

    @media (min-width: $container-md) {
      font-size: $font-size-base;
    }
  }

  &__answer {
    padding: $space-4;
    background-color: $neutral-50;

    @media (min-width: $container-md) {
      padding: $space-5;
    }
  }

  &__answer-header {
    display: flex;
    align-items: center;
    gap: $space-3;
    margin-bottom: $space-3;
  }

  &__answer-meta {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__answer-author {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;

    @media (min-width: $container-md) {
      font-size: $font-size-base;
    }
  }

  &__answer-date {
    font-size: $font-size-xs;
    color: $color-text-tertiary;
  }

  &__answer-content {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    padding-left: calc(32px + $space-3);

    @media (min-width: $container-md) {
      font-size: $font-size-base;
    }

    :deep(strong) {
      font-weight: $font-weight-semibold;
      color: $color-text-primary;
    }

    :deep(code) {
      display: block;
      margin: $space-3 0;
      padding: $space-3;
      font-family: 'Fira Code', monospace;
      font-size: $font-size-sm;
      background-color: $neutral-800;
      color: $neutral-100;
      border-radius: $radius-lg;
      overflow-x: auto;
      white-space: pre;
    }
  }
}
</style>
