<script setup>
const props = defineProps({
  instructor: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

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
        v-if="isOpen && instructor"
        class="instructor-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`${instructor.name} 강사 상세 정보`"
        @click="handleBackdropClick"
      >
        <div class="instructor-modal__backdrop" />
        <div class="instructor-modal__container">
          <button
            type="button"
            class="instructor-modal__close"
            aria-label="모달 닫기"
            @click="handleClose"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div class="instructor-modal__content">
            <div class="instructor-modal__header">
              <div class="instructor-modal__image-wrap">
                <img
                  :src="instructor.profileImage.src"
                  :alt="instructor.profileImage.alt"
                  class="instructor-modal__image"
                />
              </div>
              <div class="instructor-modal__info">
                <h2 class="instructor-modal__name">{{ instructor.name }}</h2>
                <p class="instructor-modal__role">{{ instructor.role }}</p>
                <p class="instructor-modal__company">{{ instructor.company }}</p>
              </div>
            </div>

            <div class="instructor-modal__body">
              <div class="instructor-modal__section">
                <h3 class="instructor-modal__section-title">전문 분야</h3>
                <ul class="instructor-modal__specialties">
                  <li
                    v-for="specialty in instructor.specialties"
                    :key="specialty"
                    class="instructor-modal__specialty"
                  >
                    {{ specialty }}
                  </li>
                </ul>
              </div>

              <div class="instructor-modal__section">
                <h3 class="instructor-modal__section-title">소개</h3>
                <p class="instructor-modal__description">{{ instructor.description }}</p>
              </div>
            </div>

            <div class="instructor-modal__footer">
              <button
                type="button"
                class="instructor-modal__btn btn btn--primary"
                @click="handleClose"
              >
                닫기
              </button>
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

.instructor-modal {
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
    max-width: 500px;
    max-height: 90vh;
    background-color: $color-surface;
    border-radius: $radius-2xl;
    overflow: hidden;
    box-shadow: 0 24px 48px rgba($neutral-900, 0.2);
  }

  &__content {
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
    padding: $space-6;

    @media (min-width: $container-md) {
      padding: $space-8;
    }
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
    background-color: $neutral-100;
    border: none;
    border-radius: $radius-full;
    cursor: pointer;
    color: $color-text-secondary;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: $neutral-200;
      color: $color-text-primary;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: $space-6;

    @media (min-width: $container-md) {
      flex-direction: row;
      text-align: left;
      gap: $space-5;
    }
  }

  &__image-wrap {
    width: 120px;
    height: 120px;
    border-radius: $radius-full;
    overflow: hidden;
    margin-bottom: $space-4;
    flex-shrink: 0;
    border: 4px solid $primary-100;

    @media (min-width: $container-md) {
      width: 140px;
      height: 140px;
      margin-bottom: 0;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-1;

    @media (min-width: $container-md) {
      font-size: $font-size-2xl;
    }
  }

  &__role {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $primary-600;
    margin-bottom: $space-1;
  }

  &__company {
    font-size: $font-size-sm;
    color: $color-text-tertiary;
  }

  &__body {
    margin-bottom: $space-6;
  }

  &__section {
    margin-bottom: $space-5;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-tertiary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: $space-3;
  }

  &__specialties {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    list-style: none;
  }

  &__specialty {
    padding: $space-1-5 $space-3;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $primary-700;
    background-color: $primary-50;
    border-radius: $radius-full;
  }

  &__description {
    font-size: $font-size-base;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
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

.modal-enter-active .instructor-modal__container,
.modal-leave-active .instructor-modal__container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .instructor-modal__container,
.modal-leave-to .instructor-modal__container {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>
