<script setup>
defineProps({
  value: {
    type: Object,
    required: true
  }
})

const iconMap = {
  practice: '/images/icons/practice.svg',
  mentoring: '/images/icons/mentoring.svg',
  community: '/images/icons/community.svg',
  update: '/images/icons/update.svg',
  certificate: '/images/icons/certificate.svg',
  support: '/images/icons/support.svg'
}
</script>

<template>
  <article
    class="value-card"
    :aria-label="value.ariaLabel ?? value.title"
  >
    <div class="value-card__icon">
      <img
        :src="iconMap[value.icon] ?? '/images/icons/default.svg'"
        :alt="`${value.title} 아이콘`"
        width="48"
        height="48"
      />
    </div>
    <h3 class="value-card__title">{{ value.title }}</h3>
    <p class="value-card__description">{{ value.description }}</p>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: $card-padding-lg;
  text-align: center;
  background-color: $color-surface;
  border: 1px solid $color-border-light;
  border-radius: $radius-xl;
  transition: border-color $transition-base, box-shadow $transition-base, transform $transition-base;

  &:hover {
    border-color: $primary-300;
    box-shadow: 0 8px 24px rgba($primary-500, 0.12);
    transform: translateY(-4px);

    .value-card__icon {
      background-color: $primary-500;

      img {
        filter: brightness(0) invert(1);
      }
    }

    .value-card__title {
      color: $primary-600;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-bottom: $space-3;
    background-color: $primary-50;
    border-radius: $radius-xl;
    flex-shrink: 0;
    transition: background-color $transition-base;

    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      transition: filter $transition-base;
    }
  }

  &__title {
    margin-bottom: $space-2;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    flex-shrink: 0;
    transition: color $transition-base;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__description {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
    }
  }
}
</style>
