<script setup>
const props = defineProps({
  faq: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const panelId = computed(() => `faq-panel-${props.faq.id}`)
const headerId = computed(() => `faq-header-${props.faq.id}`)

const handleToggle = () => {
  emit('toggle', props.faq.id)
}

const handleKeydown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleToggle()
  }
}
</script>

<template>
  <div
    class="faq-item"
    :class="{ 'faq-item--open': props.isOpen }"
  >
    <h3 class="faq-item__header">
      <button
        :id="headerId"
        type="button"
        class="faq-item__trigger"
        :aria-expanded="props.isOpen"
        :aria-controls="panelId"
        @click="handleToggle"
        @keydown="handleKeydown"
      >
        <span class="faq-item__question">
          {{ props.faq.question }}
        </span>
        <span
          class="faq-item__icon"
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </h3>
    <div
      :id="panelId"
      role="region"
      :aria-labelledby="headerId"
      class="faq-item__panel"
      :hidden="!props.isOpen"
    >
      <div class="faq-item__answer">
        {{ props.faq.answer }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.faq-item {
  border-bottom: 1px solid $color-border-light;

  &:last-child {
    border-bottom: none;
  }

  &__header {
    margin: 0;
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: $space-5 0;
    font-family: inherit;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    text-align: left;
    color: $color-text-primary;
    background: none;
    border: none;
    cursor: pointer;
    transition: color $transition-fast;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }

    &:hover {
      color: $primary-600;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }
  }

  &__question {
    flex: 1;
    padding-right: $space-4;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: $color-text-tertiary;
    transition: transform $transition-base;

    .faq-item--open & {
      transform: rotate(180deg);
    }
  }

  &__panel {
    overflow: hidden;

    &[hidden] {
      display: none;
    }
  }

  &__answer {
    padding-bottom: $space-5;
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: $color-text-secondary;
  }
}
</style>
