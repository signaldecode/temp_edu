<script setup>
import FaqItem from '~/components/home/FaqItem.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const openFaqId = ref(null)

const handleToggle = (id) => {
  openFaqId.value = openFaqId.value === id ? null : id
}

const faqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: props.data.faqList.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqJsonLd.value),
    },
  ],
})
</script>

<template>
  <section
    class="faq-section section"
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

      <div class="faq-section__list">
        <FaqItem
          v-for="faq in props.data.faqList"
          :key="faq.id"
          :faq="faq"
          :is-open="openFaqId === faq.id"
          @toggle="handleToggle"
        />
      </div>

      <div
        v-if="props.data.moreLink"
        class="faq-section__more"
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

.faq-section {
  background-color: $color-background;

  &__list {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    background-color: $color-surface;
    border: 1px solid $color-border-light;
    border-radius: $radius-xl;
    padding: 0 $space-6;
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-top: $space-10;
  }
}
</style>
