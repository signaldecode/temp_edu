<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="partners-section section"
    :aria-label="props.data.ariaLabel ?? props.data.title"
  >
    <div class="container">
      <header class="section-header">
        <h2 class="section-header__title">
          {{ props.data.title }}
        </h2>
        <p
          v-if="props.data.subtitle"
          class="section-header__subtitle"
        >
          {{ props.data.subtitle }}
        </p>
      </header>

      <ul class="partners-section__list">
        <li
          v-for="partner in props.data.partners"
          :key="partner.id"
          class="partners-section__item"
        >
          <component
            :is="partner.link ? 'a' : 'div'"
            :href="partner.link"
            :target="partner.link ? '_blank' : undefined"
            :rel="partner.link ? 'noopener noreferrer' : undefined"
            class="partners-section__logo-wrap"
            :aria-label="partner.link ? `${partner.name} 웹사이트로 이동 (새 창)` : undefined"
          >
            <img
              :src="partner.logo.src"
              :alt="partner.logo.alt"
              class="partners-section__logo"
              loading="lazy"
            />
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.partners-section {
  background-color: $color-background;

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-6;
    list-style: none;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    padding: $space-4;
    background-color: $neutral-50;
    border-radius: $radius-lg;
    transition: all $transition-base;

    &:hover {
      background-color: $neutral-100;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }
  }

  &__logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all $transition-base;

    .partners-section__logo-wrap:hover & {
      filter: grayscale(0);
      opacity: 1;
    }
  }
}
</style>
