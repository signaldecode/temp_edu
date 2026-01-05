<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import StatCard from './StatCard.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="stats-section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="stats-section__header">
        <SectionBadge :label="data.badge" />
        <h2 class="stats-section__title">{{ data.title }}</h2>
      </header>

      <ul class="stats-section__list">
        <li
          v-for="stat in data.stats"
          :key="stat.id"
          class="stats-section__item"
        >
          <StatCard :stat="stat" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.stats-section {
  padding: $section-padding-y 0;
  background-color: $color-background-secondary;

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
    gap: $space-3;
    list-style: none;

    @media (min-width: 360px) {
      grid-template-columns: repeat(2, 1fr);
      gap: $card-gap;
    }

    @media (min-width: $container-md) {
      grid-template-columns: repeat(4, 1fr);
      gap: $card-gap-lg;
    }
  }

  &__item {
    display: flex;
  }
}
</style>
