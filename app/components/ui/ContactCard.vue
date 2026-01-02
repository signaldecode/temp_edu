<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})

const iconMap = {
  mail: '/images/icons/mail.svg',
  youtube: '/images/icons/youtube.svg',
  chat: '/images/icons/chat.svg'
}
</script>

<template>
  <article
    class="contact-card"
    :aria-label="card.ariaLabel ?? card.title"
  >
    <div class="contact-card__icon">
      <img
        :src="iconMap[card.icon] ?? '/images/icons/default.svg'"
        :alt="`${card.title} 아이콘`"
        width="32"
        height="32"
      />
    </div>
    <h3 class="contact-card__title">{{ card.title }}</h3>
    <p class="contact-card__value">{{ card.value }}</p>
    <component
      :is="card.external ? 'a' : 'NuxtLink'"
      :href="card.external ? card.link : undefined"
      :to="card.external ? undefined : card.link"
      class="contact-card__button"
      :target="card.external ? '_blank' : undefined"
      :rel="card.external ? 'noopener noreferrer' : undefined"
      :aria-label="card.buttonAriaLabel ?? card.buttonLabel"
    >
      {{ card.buttonLabel }}
      <span v-if="card.external" class="visually-hidden">(새 창에서 열림)</span>
    </component>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 200px;
  padding: $space-5 $space-4;
  text-align: center;
  background-color: $neutral-800;
  border-radius: $radius-xl;
  transition: background-color $transition-base, transform $transition-base;

  @media (min-width: $container-md) {
    min-height: 240px;
    padding: $space-8 $card-padding-lg;
  }

  &:hover {
    background-color: $neutral-700;
    transform: translateY(-4px);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: $space-3;
    background-color: rgba($neutral-0, 0.1);
    border-radius: $radius-full;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      width: 56px;
      height: 56px;
      margin-bottom: $space-4;
    }

    img {
      width: 24px;
      height: 24px;
      object-fit: contain;

      @media (min-width: $container-md) {
        width: 28px;
        height: 28px;
      }
    }
  }

  &__title {
    margin-bottom: $space-1-5;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $neutral-0;

    @media (min-width: $container-md) {
      margin-bottom: $space-2;
      font-size: $font-size-lg;
    }
  }

  &__value {
    flex: 1;
    margin-bottom: $space-3;
    font-size: $font-size-xs;
    color: $neutral-400;
    line-height: $line-height-relaxed;
    word-break: break-all;

    @media (min-width: $container-md) {
      margin-bottom: $space-4;
      font-size: $font-size-sm;
    }
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: $space-2 $space-4;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $neutral-0;
    background-color: rgba($neutral-0, 0.15);
    border-radius: $radius-lg;
    text-decoration: none;
    transition: background-color $transition-fast;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      padding: $space-2-5 $space-5;
      font-size: $font-size-sm;
    }

    &:hover {
      background-color: rgba($neutral-0, 0.25);
    }

    &:focus-visible {
      outline: 2px solid $neutral-0;
      outline-offset: 2px;
    }
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
