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
    class="qna-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="qna-hero__background">
      <div class="qna-hero__gradient" />
    </div>

    <div class="qna-hero__content container">
      <SectionBadge v-if="data.badge" :label="data.badge" variant="light" />
      <h1 class="qna-hero__title">{{ data.title }}</h1>
      <p class="qna-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.qna-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  overflow: hidden;

  @media (min-width: $container-md) {
    min-height: 400px;
  }

  &__background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, $primary-600 0%, $primary-800 50%, $neutral-900 100%);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $space-4;
    padding-top: $space-12;
    padding-bottom: $space-12;

    @media (min-width: $container-md) {
      padding-top: $space-16;
      padding-bottom: $space-16;
    }
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    color: $neutral-0;
    white-space: pre-line;

    @media (min-width: $container-md) {
      font-size: $font-size-4xl;
    }

    @media (min-width: $container-lg) {
      font-size: $font-size-5xl;
    }
  }

  &__description {
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: $primary-100;
    max-width: 560px;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }
}
</style>
