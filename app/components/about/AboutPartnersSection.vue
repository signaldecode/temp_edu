<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="about-partners"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="about-partners__header">
        <SectionBadge :label="data.badge" />
        <h2 class="about-partners__title">{{ data.title }}</h2>
      </header>

      <ul class="about-partners__list">
        <li
          v-for="partner in data.partners"
          :key="partner.id"
          class="about-partners__item"
        >
          <a
            v-if="partner.link"
            :href="partner.link"
            class="about-partners__link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${partner.name} 웹사이트로 이동 (새 창)`"
          >
            <img
              :src="partner.logo.src"
              :alt="partner.logo.alt"
              class="about-partners__logo"
              loading="lazy"
            />
          </a>
          <div v-else class="about-partners__logo-wrap">
            <img
              :src="partner.logo.src"
              :alt="partner.logo.alt"
              class="about-partners__logo"
              loading="lazy"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.about-partners {
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
    grid-template-columns: repeat(2, 1fr);
    gap: $card-gap;
    list-style: none;

    @media (min-width: $container-sm) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(6, 1fr);
      gap: $card-gap-lg;
    }
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__link,
  &__logo-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: $space-4;
    background-color: $color-surface;
    border: 1px solid $color-border-light;
    border-radius: $radius-lg;
    transition: border-color $transition-base, box-shadow $transition-base;

    &:hover {
      border-color: $primary-200;
      box-shadow: $shadow-sm;
    }

    @media (min-width: $container-md) {
      height: 100px;
    }
  }

  &__logo {
    max-width: 100%;
    max-height: 48px;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: filter $transition-base, opacity $transition-base;

    @media (min-width: $container-md) {
      max-height: 56px;
    }
  }

  &__link:hover &__logo,
  &__logo-wrap:hover &__logo {
    filter: grayscale(0%);
    opacity: 1;
  }
}
</style>
