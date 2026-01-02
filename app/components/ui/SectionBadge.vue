<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'light'].includes(value)
  }
})
</script>

<template>
  <span
    :class="[
      'section-badge',
      `section-badge--${variant}`
    ]"
  >
    {{ label }}
  </span>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  padding: $space-1-5 $space-4;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $primary-600;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-wide;
  background-color: transparent;
  border: 1px solid $primary-300;
  border-radius: $radius-full;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background-color: $primary-500;
    border-radius: $radius-full;
  }

  &--default {
    // default styles already applied
  }

  &--light {
    color: $primary-200;
    border-color: rgba($neutral-0, 0.3);

    &::before {
      background-color: $primary-300;
    }
  }
}
</style>
