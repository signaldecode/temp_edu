<script setup>
import FieldOrbit from './FieldOrbit.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="about-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container about-hero__inner">
      <div class="about-hero__content">
        <h1 class="about-hero__title">{{ data.title }}</h1>
        <p class="about-hero__description">{{ data.description }}</p>
      </div>

      <div class="about-hero__visual">
        <FieldOrbit
          :center-label="data.centerLabel"
          :fields="data.fields"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.about-hero {
  position: relative;
  padding: $section-padding-y 0;
  background: linear-gradient(135deg, $neutral-900 0%, $neutral-800 50%, #1a1a2e 100%);
  overflow: hidden;

  @media (min-width: $container-lg) {
    padding: $section-padding-y-lg 0;
  }

  // 배경 그라데이션 오버레이
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba($primary-500, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, rgba($primary-400, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-12;

    @media (min-width: $container-lg) {
      flex-direction: row;
      justify-content: space-between;
      gap: $space-16;
    }
  }

  &__content {
    text-align: center;

    @media (min-width: $container-lg) {
      flex: 1;
      text-align: left;
      max-width: 480px;
    }
  }

  &__title {
    margin-bottom: $space-4;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $neutral-0;
    line-height: $line-height-tight;

    @media (min-width: $container-md) {
      font-size: $font-size-3xl;
    }

    @media (min-width: $container-lg) {
      font-size: $font-size-4xl;
    }

    // Highlight keyword with brand color
    strong, em {
      color: $primary-400;
      font-style: normal;
    }
  }

  &__description {
    font-size: $font-size-base;
    color: $neutral-300;
    line-height: $line-height-relaxed;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
