<script setup>
const props = defineProps({
  stat: {
    type: Object,
    required: true
  }
})

const displayValue = ref(0)
const hasAnimated = ref(false)

const animateValue = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  const duration = 2000
  const start = performance.now()
  const target = props.stat.value

  const animate = (currentTime) => {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const easeOutQuad = 1 - (1 - progress) * (1 - progress)

    displayValue.value = Math.floor(target * easeOutQuad)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.5 }
  )

  const el = document.getElementById(`stat-${props.stat.id}`)
  if (el) observer.observe(el)
})
</script>

<template>
  <article
    :id="`stat-${stat.id}`"
    class="stat-card"
    :aria-label="stat.ariaLabel ?? `${stat.label}: ${stat.value}${stat.suffix}`"
  >
    <p class="stat-card__value">
      {{ displayValue.toLocaleString() }}<span class="stat-card__suffix">{{ stat.suffix }}</span>
    </p>
    <p class="stat-card__label">{{ stat.label }}</p>
    <p v-if="stat.description" class="stat-card__description">{{ stat.description }}</p>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: $space-5 $space-4;
  text-align: center;
  background-color: $color-surface;
  border: 1px solid $neutral-300;
  border-radius: $radius-xl;
  transition: border-color $transition-base, box-shadow $transition-base, transform $transition-base;

  @media (min-width: 360px) {
    aspect-ratio: 1 / 1;
    padding: $card-padding-lg;
  }

  &:hover {
    border-color: $primary-300;
    box-shadow: 0 8px 24px rgba($primary-500, 0.12);
    transform: translateY(-4px);

    .stat-card__value {
      color: $primary-700;
    }
  }

  &__value {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $primary-600;
    line-height: 1;
    flex-shrink: 0;
    transition: color $transition-base;

    @media (min-width: $container-md) {
      font-size: $font-size-4xl;
    }
  }

  &__suffix {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $primary-400;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__label {
    margin-top: $space-3;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    flex-shrink: 0;

    @media (min-width: $container-md) {
      font-size: $font-size-base;
    }
  }

  &__description {
    margin-top: $space-2;
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
