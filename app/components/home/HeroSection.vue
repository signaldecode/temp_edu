<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section
    class="hero-section"
    :class="{ 'hero-section--visible': isVisible }"
    :aria-label="props.data.ariaLabel ?? props.data.title"
  >
    <!-- Background layers -->
    <div class="hero-section__background">
      <img
        :src="props.data.backgroundImage.src"
        :alt="props.data.backgroundImage.alt"
        class="hero-section__bg-image"
        loading="eager"
      />
      <div class="hero-section__overlay" />
      <div class="hero-section__gradient" />
    </div>

    <!-- Animated decorations -->
    <div class="hero-section__decorations" aria-hidden="true">
      <div class="hero-section__glow hero-section__glow--1" />
      <div class="hero-section__glow hero-section__glow--2" />
      <div class="hero-section__glow hero-section__glow--3" />
      <div class="hero-section__particles">
        <span v-for="n in 20" :key="n" class="hero-section__particle" :style="{ '--i': n }" />
      </div>
    </div>

    <!-- Content -->
    <div class="hero-section__content container">
      <div class="hero-section__badge">
        <span class="hero-section__badge-dot" />
        실무 중심 교육 플랫폼
      </div>
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
            'hero-section__cta',
            `hero-section__cta--${button.variant ?? 'primary'}`
          ]"
        >
          <span class="hero-section__cta-text">{{ button.label }}</span>
          <span class="hero-section__cta-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </NuxtLink>
      </div>

      <!-- Stats preview -->
      <div class="hero-section__stats">
        <div class="hero-section__stat">
          <span class="hero-section__stat-value">15,000+</span>
          <span class="hero-section__stat-label">수강생</span>
        </div>
        <div class="hero-section__stat-divider" />
        <div class="hero-section__stat">
          <span class="hero-section__stat-value">50+</span>
          <span class="hero-section__stat-label">강좌</span>
        </div>
        <div class="hero-section__stat-divider" />
        <div class="hero-section__stat">
          <span class="hero-section__stat-value">4.9</span>
          <span class="hero-section__stat-label">만족도</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-section__scroll" aria-hidden="true">
      <span class="hero-section__scroll-text">Scroll</span>
      <span class="hero-section__scroll-line" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

// Animations
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes particle-float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

@keyframes badge-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba($primary-400, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba($primary-400, 0); }
}

.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;

  // ===========================
  // Background
  // ===========================

  &__background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.05);
    transition: transform 10s ease-out;

    .hero-section--visible & {
      transform: scale(1);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba($neutral-900, 0.85) 0%,
      rgba($neutral-900, 0.7) 50%,
      rgba(#1a1a2e, 0.9) 100%
    );
  }

  &__gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 30% 20%, rgba($primary-500, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba($primary-400, 0.1) 0%, transparent 40%),
      radial-gradient(ellipse at 90% 10%, rgba(#667eea, 0.1) 0%, transparent 30%);
  }

  // ===========================
  // Decorations
  // ===========================

  &__decorations {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  &__glow {
    position: absolute;
    border-radius: 50%;

    &--1 {
      top: 10%;
      left: 20%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba($primary-500, 0.2) 0%, transparent 70%);
      animation: glow-pulse 6s ease-in-out infinite;
    }

    &--2 {
      bottom: 20%;
      right: 10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(#667eea, 0.15) 0%, transparent 70%);
      animation: glow-pulse 8s ease-in-out infinite;
      animation-delay: 2s;
    }

    &--3 {
      top: 50%;
      left: 50%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba($primary-400, 0.1) 0%, transparent 60%);
      animation: glow-pulse 10s ease-in-out infinite;
      animation-delay: 1s;
    }
  }

  &__particles {
    position: absolute;
    inset: 0;
  }

  &__particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba($primary-300, 0.6);
    border-radius: 50%;
    left: calc(random(100) * 1%);
    animation: particle-float calc(15s + var(--i) * 0.5s) linear infinite;
    animation-delay: calc(var(--i) * -0.75s);

    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        left: #{random(100)}%;
        width: #{2 + random(4)}px;
        height: #{2 + random(4)}px;
        opacity: #{0.3 + random(5) * 0.1};
      }
    }
  }

  // ===========================
  // Content
  // ===========================

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: $space-20 $space-4;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $primary-300;
    background: rgba($primary-500, 0.1);
    border: 1px solid rgba($primary-400, 0.3);
    border-radius: $radius-full;
    margin-bottom: $space-6;
    opacity: 0;
    animation: fade-up 0.8s ease forwards, badge-pulse 2s ease-in-out infinite;
    animation-delay: 0.2s, 0.2s;

    .hero-section--visible & {
      opacity: 1;
    }

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
      padding: $space-2 $space-5;
    }
  }

  &__badge-dot {
    width: 8px;
    height: 8px;
    background: $primary-400;
    border-radius: 50%;
    animation: badge-pulse 2s ease-in-out infinite;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    color: $neutral-0;
    margin-bottom: $space-5;
    white-space: pre-line;
    opacity: 0;
    animation: fade-up 0.8s ease forwards;
    animation-delay: 0.4s;
    text-shadow: 0 4px 30px rgba($neutral-900, 0.5);

    .hero-section--visible & {
      opacity: 1;
    }

    @media (min-width: $container-md) {
      font-size: $font-size-5xl;
    }

    @media (min-width: $container-lg) {
      font-size: 4rem;
    }
  }

  &__subtitle {
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: $neutral-300;
    max-width: 560px;
    margin-bottom: $space-10;
    opacity: 0;
    animation: fade-up 0.8s ease forwards;
    animation-delay: 0.6s;

    .hero-section--visible & {
      opacity: 1;
    }

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__cta-group {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    margin-bottom: $space-12;
    opacity: 0;
    animation: fade-up 0.8s ease forwards;
    animation-delay: 0.8s;

    .hero-section--visible & {
      opacity: 1;
    }

    @media (min-width: $container-md) {
      flex-direction: row;
      gap: $space-5;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $space-2;
    min-width: 180px;
    padding: $space-4 $space-6;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    text-decoration: none;
    border-radius: $radius-xl;
    transition: all 0.3s ease;

    @media (min-width: $container-md) {
      min-width: 200px;
      padding: $space-4 $space-8;
    }

    &--primary {
      color: $neutral-0;
      background: linear-gradient(135deg, $primary-500 0%, $primary-600 100%);
      box-shadow:
        0 4px 20px rgba($primary-500, 0.4),
        inset 0 1px 0 rgba($neutral-0, 0.2);

      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0 8px 30px rgba($primary-500, 0.5),
          inset 0 1px 0 rgba($neutral-0, 0.2);
      }
    }

    &--secondary {
      color: $neutral-0;
      background: rgba($neutral-0, 0.1);
      border: 1px solid rgba($neutral-0, 0.3);
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba($neutral-0, 0.2);
        border-color: rgba($neutral-0, 0.5);
        transform: translateY(-2px);
      }
    }
  }

  &__cta-icon {
    display: flex;
    transition: transform 0.3s ease;

    .hero-section__cta:hover & {
      transform: translateX(4px);
    }
  }

  // ===========================
  // Stats
  // ===========================

  &__stats {
    display: flex;
    align-items: center;
    gap: $space-6;
    padding: $space-5 $space-8;
    background: rgba($neutral-0, 0.05);
    border: 1px solid rgba($neutral-0, 0.1);
    border-radius: $radius-2xl;
    backdrop-filter: blur(10px);
    opacity: 0;
    animation: fade-up 0.8s ease forwards;
    animation-delay: 1s;

    .hero-section--visible & {
      opacity: 1;
    }

    @media (min-width: $container-md) {
      gap: $space-8;
      padding: $space-6 $space-10;
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-1;
  }

  &__stat-value {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $neutral-0;

    @media (min-width: $container-md) {
      font-size: $font-size-2xl;
    }
  }

  &__stat-label {
    font-size: $font-size-xs;
    color: $neutral-400;

    @media (min-width: $container-md) {
      font-size: $font-size-sm;
    }
  }

  &__stat-divider {
    width: 1px;
    height: 40px;
    background: rgba($neutral-0, 0.2);
  }

  // ===========================
  // Scroll Indicator
  // ===========================

  &__scroll {
    position: absolute;
    bottom: $space-8;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-2;
    opacity: 0;
    animation: fade-up 0.8s ease forwards;
    animation-delay: 1.2s;

    .hero-section--visible & {
      opacity: 1;
    }
  }

  &__scroll-text {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $neutral-400;
    text-transform: uppercase;
    letter-spacing: $letter-spacing-wide;
  }

  &__scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, $neutral-400, transparent);
    animation: scroll-bounce 2s ease-in-out infinite;
  }
}
</style>
