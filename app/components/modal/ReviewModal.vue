<script setup>
const props = defineProps({
  review: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const hasImage = computed(() => {
  return props.review?.image?.src || props.review?.hasPhoto
})

const handleClose = () => {
  emit('close')
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && review"
        class="review-modal"
        :class="{ 'review-modal--with-image': hasImage }"
        role="dialog"
        aria-modal="true"
        :aria-label="`${review.nickname}님의 후기`"
        @click="handleBackdropClick"
      >
        <div class="review-modal__backdrop" />
        <div class="review-modal__container">
          <button
            type="button"
            class="review-modal__close"
            aria-label="모달 닫기"
            @click="handleClose"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div class="review-modal__content">
            <div v-if="hasImage && review.image" class="review-modal__image-section">
              <img
                :src="review.image.src"
                :alt="review.image.alt"
                class="review-modal__image"
              />
            </div>

            <div class="review-modal__body">
              <div class="review-modal__header">
                <div class="review-modal__author">
                  <div class="review-modal__avatar" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <span class="review-modal__nickname">{{ review.nickname }}</span>
                </div>
                <span class="review-modal__course">{{ review.courseName }}</span>
              </div>

              <h2 class="review-modal__title">{{ review.title }}</h2>
              <p class="review-modal__description">{{ review.content }}</p>

              <div class="review-modal__footer">
                <button
                  type="button"
                  class="review-modal__btn btn btn--primary"
                  @click="handleClose"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.review-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $space-4;

  &__backdrop {
    position: absolute;
    inset: 0;
    background-color: rgba($neutral-900, 0.6);
    backdrop-filter: blur(8px);
  }

  &__container {
    position: relative;
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    background-color: $color-surface;
    border-radius: $radius-2xl;
    overflow: hidden;
    box-shadow: 0 24px 48px rgba($neutral-900, 0.2);
  }

  &--with-image &__container {
    max-width: 560px;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
  }

  &__close {
    position: absolute;
    top: $space-4;
    right: $space-4;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background-color: rgba($neutral-0, 0.9);
    border: none;
    border-radius: $radius-full;
    cursor: pointer;
    color: $color-text-secondary;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: $neutral-0;
      color: $color-text-primary;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }
  }

  &__image-section {
    width: 100%;
    aspect-ratio: 4 / 3;
    background-color: $neutral-100;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__body {
    padding: $space-6;

    @media (min-width: $container-md) {
      padding: $space-8;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
    margin-bottom: $space-4;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background-color: $neutral-100;
    border-radius: $radius-full;
    color: $neutral-400;
    flex-shrink: 0;
  }

  &__nickname {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__course {
    flex-shrink: 0;
    padding: $space-1-5 $space-3;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $primary-700;
    background-color: $primary-50;
    border-radius: $radius-full;
    white-space: nowrap;

    @media (min-width: $container-md) {
      padding: $space-2 $space-4;
      font-size: $font-size-sm;
    }
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: $line-height-snug;
    margin-bottom: $space-4;

    @media (min-width: $container-md) {
      font-size: $font-size-xl;
    }
  }

  &__description {
    font-size: $font-size-base;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $space-6;
    white-space: pre-line;
  }

  &__footer {
    display: flex;
    justify-content: center;
  }

  &__btn {
    min-width: 120px;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .review-modal__container,
.modal-leave-active .review-modal__container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .review-modal__container,
.modal-leave-to .review-modal__container {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>
