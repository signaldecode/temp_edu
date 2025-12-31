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
    class="hero-section"
    :aria-label="props.data.ariaLabel ?? props.data.title"
  >
    <div class="hero-section__background">
      <img
        :src="props.data.backgroundImage.src"
        :alt="props.data.backgroundImage.alt"
        class="hero-section__bg-image"
        loading="eager"
      />
      <div class="hero-section__overlay" />
    </div>

    <div class="hero-section__content container">
      <h1 class="hero-section__title">
        {{ props.data.title }}
      </h1>
      <p class="hero-section__subtitle">
        {{ props.data.subtitle }}
      </p>
      <div class="hero-section__cta-group">
        <NuxtLink
          v-for="(button, index) in props.data.ctaButtons"
          :key="index"
          :to="button.to"
          :aria-label="button.ariaLabel ?? button.label"
          :class="[
            'btn',
            `btn--${button.variant ?? 'primary'}`,
            'hero-section__cta'
          ]"
        >
          {{ button.label }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  overflow: hidden;

  @media (min-width: $container-md) {
    min-height: 700px;
  }

  &__background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba($neutral-900, 0.6),
      rgba($neutral-900, 0.8)
    );
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: $space-16;
    padding-bottom: $space-16;
  }

  &__title {
    font-size: $heading-2-size;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    color: $neutral-0;
    margin-bottom: $space-4;
    white-space: pre-line;

    @media (min-width: $container-md) {
      font-size: $heading-1-size;
    }

    @media (min-width: $container-lg) {
      font-size: $font-size-6xl;
    }
  }

  &__subtitle {
    font-size: $body-lg-size;
    line-height: $line-height-relaxed;
    color: $neutral-200;
    max-width: 600px;
    margin-bottom: $space-8;

    @media (min-width: $container-md) {
      font-size: $font-size-xl;
    }
  }

  &__cta-group {
    display: flex;
    flex-direction: column;
    gap: $space-3;

    @media (min-width: $container-md) {
      flex-direction: row;
      gap: $space-4;
    }
  }

  &__cta {
    min-width: 160px;

    @media (min-width: $container-md) {
      min-width: 180px;
    }
  }
}
</style>
