<script setup>
import InstructorCard from '~/components/home/InstructorCard.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="instructors-section section"
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

      <ul class="instructors-section__list">
        <li
          v-for="instructor in props.data.instructors"
          :key="instructor.id"
          class="instructors-section__item"
        >
          <InstructorCard :instructor="instructor" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.instructors-section {
  background-color: $color-background;

  &__list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $card-gap-lg;
    list-style: none;

    @media (min-width: $container-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__item {
    // Grid item
  }
}
</style>
