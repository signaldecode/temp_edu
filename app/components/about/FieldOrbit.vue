<script setup>
const props = defineProps({
  centerLabel: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    required: true
  }
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})

// 각 아이템에 대한 애니메이션 지연과 궤도 설정
const getItemStyle = (index) => {
  const totalItems = props.fields.length
  const angle = (360 / totalItems) * index
  const delay = index * 0.1

  return {
    '--angle': `${angle}deg`,
    '--delay': `${delay}s`,
    '--orbit-duration': `${20 + index * 2}s`
  }
}

// 아이템별 그라데이션 색상
const colors = [
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadow: 'rgba(102, 126, 234, 0.4)' },
  { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', shadow: 'rgba(240, 147, 251, 0.4)' },
  { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79, 172, 254, 0.4)' },
  { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadow: 'rgba(67, 233, 123, 0.4)' },
  { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', shadow: 'rgba(250, 112, 154, 0.4)' },
  { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', shadow: 'rgba(168, 237, 234, 0.4)' },
  { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', shadow: 'rgba(255, 154, 158, 0.4)' }
]

const getColorStyle = (index) => {
  const color = colors[index % colors.length]
  return {
    '--item-bg': color.bg,
    '--item-shadow': color.shadow
  }
}
</script>

<template>
  <div
    class="field-orbit"
    :class="{ 'field-orbit--visible': isVisible }"
    role="img"
    :aria-label="`${centerLabel} 중심의 학습 분야 다이어그램`"
  >
    <!-- Orbit rings -->
    <div class="field-orbit__ring field-orbit__ring--outer" aria-hidden="true" />
    <div class="field-orbit__ring field-orbit__ring--middle" aria-hidden="true" />
    <div class="field-orbit__ring field-orbit__ring--inner" aria-hidden="true" />

    <!-- Decorative particles -->
    <div class="field-orbit__particles" aria-hidden="true">
      <span v-for="n in 12" :key="n" class="field-orbit__particle" :style="{ '--particle-index': n }" />
    </div>

    <!-- Center circle -->
    <div class="field-orbit__center">
      <div class="field-orbit__center-glow" aria-hidden="true" />
      <span class="field-orbit__center-text">{{ centerLabel }}</span>
    </div>

    <!-- Orbiting fields -->
    <div
      v-for="(field, index) in props.fields"
      :key="field.id"
      class="field-orbit__item"
      :style="{ ...getItemStyle(index), ...getColorStyle(index) }"
      :aria-label="field.ariaLabel ?? field.label"
    >
      <span class="field-orbit__item-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
        </svg>
      </span>
      <span class="field-orbit__item-text">{{ field.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

// 애니메이션 정의
@keyframes orbit {
  from {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-140px) rotate(calc(-1 * var(--angle)));
  }
  to {
    transform: translate(-50%, -50%) rotate(calc(var(--angle) + 360deg)) translateY(-140px) rotate(calc(-1 * var(--angle) - 360deg));
  }
}

@keyframes orbit-md {
  from {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-170px) rotate(calc(-1 * var(--angle)));
  }
  to {
    transform: translate(-50%, -50%) rotate(calc(var(--angle) + 360deg)) translateY(-170px) rotate(calc(-1 * var(--angle) - 360deg));
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes ring-rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes ring-rotate-reverse {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes particle-float {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) rotate(calc(var(--particle-index) * 30deg)) translateY(-180px) scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) rotate(calc(var(--particle-index) * 30deg + 15deg)) translateY(-200px) scale(1.2);
  }
}

.field-orbit {
  position: relative;
  width: 340px;
  height: 340px;

  @media (min-width: $container-md) {
    width: 420px;
    height: 420px;
  }

  // ===========================
  // Orbit Rings
  // ===========================

  &__ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: $radius-full;
    border: 1px dashed rgba($primary-300, 0.5);

    &--outer {
      width: 320px;
      height: 320px;
      animation: ring-rotate 60s linear infinite;

      @media (min-width: $container-md) {
        width: 400px;
        height: 400px;
      }
    }

    &--middle {
      width: 240px;
      height: 240px;
      border-color: rgba($primary-400, 0.4);
      animation: ring-rotate-reverse 45s linear infinite;

      @media (min-width: $container-md) {
        width: 300px;
        height: 300px;
      }
    }

    &--inner {
      width: 160px;
      height: 160px;
      border-color: rgba($primary-300, 0.3);
      animation: ring-rotate 30s linear infinite;

      @media (min-width: $container-md) {
        width: 200px;
        height: 200px;
      }
    }
  }

  // ===========================
  // Particles
  // ===========================

  &__particles {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
  }

  &__particle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: $primary-300;
    border-radius: $radius-full;
    opacity: 0;
    animation: particle-float 4s ease-in-out infinite;
    animation-delay: calc(var(--particle-index) * 0.3s);

    .field-orbit--visible & {
      opacity: 0.5;
    }
  }

  // ===========================
  // Center
  // ===========================

  &__center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $primary-400 0%, $primary-600 100%);
    border-radius: $radius-full;
    box-shadow:
      0 0 60px rgba($primary-400, 0.6),
      0 0 120px rgba($primary-500, 0.3),
      inset 0 -4px 12px rgba($neutral-900, 0.2);
    z-index: 10;
    animation: float 3s ease-in-out infinite;

    @media (min-width: $container-md) {
      width: 120px;
      height: 120px;
    }
  }

  &__center-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, rgba($primary-400, 0.5) 0%, transparent 70%);
    border-radius: $radius-full;
    animation: pulse 2s ease-in-out infinite;

    @media (min-width: $container-md) {
      width: 200px;
      height: 200px;
    }
  }

  &__center-text {
    position: relative;
    z-index: 1;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: $neutral-0;
    text-shadow: 0 2px 4px rgba($neutral-900, 0.3);

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  // ===========================
  // Orbiting Items
  // ===========================

  &__item {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-1;
    width: 72px;
    height: 72px;
    background: var(--item-bg);
    border-radius: $radius-full;
    box-shadow:
      0 4px 20px var(--item-shadow),
      inset 0 1px 0 rgba($neutral-0, 0.3);
    cursor: pointer;
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-140px) rotate(calc(-1 * var(--angle)));
    transition: opacity 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease;
    transition-delay: var(--delay);

    @media (min-width: $container-md) {
      width: 80px;
      height: 80px;
      transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-170px) rotate(calc(-1 * var(--angle)));
    }

    .field-orbit--visible & {
      opacity: 1;
      animation: orbit var(--orbit-duration) linear infinite;
      animation-delay: var(--delay);

      @media (min-width: $container-md) {
        animation-name: orbit-md;
      }
    }

    &:hover {
      animation-play-state: paused !important;
      box-shadow:
        0 8px 32px var(--item-shadow),
        inset 0 1px 0 rgba($neutral-0, 0.4);
      z-index: 20;
    }
  }

  &__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba($neutral-0, 0.9);

    svg {
      width: 14px;
      height: 14px;
      filter: drop-shadow(0 1px 2px rgba($neutral-900, 0.2));

      @media (min-width: $container-md) {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__item-text {
    font-size: 10px;
    font-weight: $font-weight-semibold;
    color: $neutral-0;
    text-align: center;
    text-shadow: 0 1px 2px rgba($neutral-900, 0.3);

    @media (min-width: $container-md) {
      font-size: $font-size-xs;
    }
  }
}
</style>
