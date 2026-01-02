<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import ValueCard from './ValueCard.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="core-values"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="core-values__header">
        <SectionBadge :label="data.badge" />
        <h2 class="core-values__title">{{ data.title }}</h2>
      </header>

      <ul class="core-values__list">
        <li
          v-for="value in data.values"
          :key="value.id"
          class="core-values__item"
        >
          <ValueCard :value="value" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.core-values {
  padding: $section-padding-y 0;
  background-color: $color-background;

  @media (min-width: $container-lg) {
    padding: $section-padding-y-lg 0;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-3;
    margin-bottom: $space-12;
    text-align: center;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;

    @media (min-width: $container-md) {
      font-size: $font-size-3xl;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: $card-gap-lg;
    list-style: none;

    @media (min-width: $container-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    display: flex;
  }
}
</style>
