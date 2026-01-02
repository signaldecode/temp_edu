<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import InstructorCard from './InstructorCard.vue'
import InstructorModal from '~/components/modal/InstructorModal.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const selectedInstructor = ref(null)
const isModalOpen = ref(false)

const handleInstructorClick = (instructor) => {
  selectedInstructor.value = instructor
  isModalOpen.value = true
}

const handleModalClose = () => {
  isModalOpen.value = false
  selectedInstructor.value = null
}
</script>

<template>
  <section
    class="instructors-section section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="instructors-section__header">
        <SectionBadge v-if="data.badge" :label="data.badge" />
        <h2 class="instructors-section__title">{{ data.title }}</h2>
        <p v-if="data.description" class="instructors-section__description">
          {{ data.description }}
        </p>
      </header>

      <ul class="instructors-section__list" role="list">
        <li
          v-for="instructor in data.list"
          :key="instructor.id"
          class="instructors-section__item"
        >
          <InstructorCard
            :instructor="instructor"
            @click="handleInstructorClick(instructor)"
          />
        </li>
      </ul>
    </div>

    <InstructorModal
      :instructor="selectedInstructor"
      :is-open="isModalOpen"
      @close="handleModalClose"
    />
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.instructors-section {
  background-color: $color-background-secondary;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-3;
    margin-bottom: $space-12;
    text-align: center;
  }

  &__title {
    position: relative;
    display: inline-block;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;

    @media (min-width: $container-md) {
      font-size: $font-size-3xl;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -$space-2;
      left: 50%;
      transform: translateX(-50%);
      width: 48px;
      height: 3px;
      background: linear-gradient(90deg, $primary-400, $primary-600);
      border-radius: $radius-full;
    }
  }

  &__description {
    margin-top: $space-4;
    font-size: $font-size-base;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    max-width: 560px;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: $card-gap-lg;
    list-style: none;

    @media (min-width: $container-lg) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__item {
    display: flex;
  }
}
</style>
