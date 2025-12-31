<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
  <span
    class="app-logo"
    :class="`app-logo--${props.variant}`"
  >
    EduTech
  </span>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;

.app-logo {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  letter-spacing: -0.02em;

  &--default {
    color: $primary-600;
  }

  &--light {
    color: $neutral-100;
  }
}
</style>
