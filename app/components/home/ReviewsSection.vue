<script setup>
import ReviewCard from '~/components/home/ReviewCard.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="reviews-section section"
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

      <ul class="reviews-section__list">
        <li
          v-for="review in props.data.reviews"
          :key="review.id"
          class="reviews-section__item"
        >
          <ReviewCard :review="review" />
        </li>
      </ul>

      <div
        v-if="props.data.moreLink"
        class="reviews-section__more"
      >
        <NuxtLink
          :to="props.data.moreLink.to"
          :aria-label="props.data.moreLink.ariaLabel ?? props.data.moreLink.label"
          class="btn btn--outline"
        >
          {{ props.data.moreLink.label }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.reviews-section {
  background-color: $color-background-secondary;

  &__list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $card-gap-lg;
    list-style: none;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    // Grid item
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-top: $space-10;
  }
}
</style>
