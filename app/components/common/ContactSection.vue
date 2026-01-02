<script setup>
import ContactCard from '~/components/ui/ContactCard.vue'
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
    class="contact-section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="contact-section__container">
      <header class="contact-section__header">
        <SectionBadge v-if="data.badge" :label="data.badge" />
        <h2 class="contact-section__title">{{ data.title }}</h2>
        <p v-if="data.description" class="contact-section__description">
          {{ data.description }}
        </p>
      </header>

      <ul class="contact-section__list" role="list">
        <li
          v-for="card in data.cards"
          :key="card.id"
          class="contact-section__item"
        >
          <ContactCard :card="card" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.contact-section {
  padding: $section-padding-y 0;
  background-color: $neutral-900;

  &__container {
    max-width: $container-xl;
    margin: 0 auto;
    padding: 0 $container-padding;

    @media (min-width: $container-md) {
      padding: 0 $container-padding-md;
    }

    @media (min-width: $container-lg) {
      padding: 0 $container-padding-lg;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: $space-10;
  }

  &__title {
    margin-top: $space-3;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $neutral-0;

    @media (min-width: $container-md) {
      font-size: $font-size-3xl;
    }
  }

  &__description {
    margin-top: $space-3;
    font-size: $font-size-base;
    color: $neutral-400;
    line-height: $line-height-relaxed;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    display: flex;
  }
}
</style>
