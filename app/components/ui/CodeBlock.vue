<script setup>
import { highlightCode } from '~/composables/useCodeHighlight'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'plaintext',
  },
  theme: {
    type: String,
    default: 'github-light',
    validator: (value) => ['github-light', 'github-dark'].includes(value),
  },
  showLineNumbers: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
})

const highlightedCode = ref('')
const isLoading = ref(true)

onMounted(async () => {
  try {
    highlightedCode.value = await highlightCode(props.code, props.language, props.theme)
  } catch (error) {
    console.error('Failed to highlight code:', error)
    highlightedCode.value = `<pre><code>${escapeHtml(props.code)}</code></pre>`
  } finally {
    isLoading.value = false
  }
})

watch(
  () => [props.code, props.language, props.theme],
  async () => {
    isLoading.value = true
    try {
      highlightedCode.value = await highlightCode(props.code, props.language, props.theme)
    } catch (error) {
      console.error('Failed to highlight code:', error)
      highlightedCode.value = `<pre><code>${escapeHtml(props.code)}</code></pre>`
    } finally {
      isLoading.value = false
    }
  },
)

function escapeHtml(text) {
  if (typeof window === 'undefined') {
    // 서버 사이드: 간단한 이스케이프
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
  // 클라이언트 사이드
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

const codeBlockId = computed(() => `code-block-${Math.random().toString(36).substr(2, 9)}`)
const computedAriaLabel = computed(() => {
  return props.ariaLabel || (props.title ? `${props.title} 코드 블록` : '코드 블록')
})
</script>

<template>
  <figure
    class="code-block"
    :aria-label="computedAriaLabel"
  >
    <div
      v-if="title"
      class="code-block__header"
    >
      <span class="code-block__title">
        {{ title }}
      </span>
      <span
        v-if="language && language !== 'plaintext'"
        class="code-block__language"
        aria-label="프로그래밍 언어"
      >
        {{ language }}
      </span>
    </div>
    <div
      class="code-block__wrapper"
      :class="{
        'code-block__wrapper--loading': isLoading,
        'code-block__wrapper--with-lines': showLineNumbers,
      }"
    >
      <div
        v-if="isLoading"
        class="code-block__loading"
        aria-live="polite"
        aria-label="코드 하이라이팅 로딩 중"
      >
        <span class="code-block__loading-text">로딩 중...</span>
      </div>
      <div
        v-else
        class="code-block__content"
        v-html="highlightedCode"
      />
    </div>
  </figure>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.code-block {
  margin: $space-6 0;
  border-radius: $radius-lg;
  overflow: hidden;
  background: $color-background;
  border: 1px solid $color-border;
  box-shadow: $shadow-sm;
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-3 $space-4;
  background: $color-background-secondary;
  border-bottom: 1px solid $color-border;
}

.code-block__title {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-secondary;
}

.code-block__language {
  font-size: $font-size-xs;
  font-weight: $font-weight-regular;
  color: $color-text-tertiary;
  padding: $space-1 $space-2;
  background: $color-background;
  border-radius: $radius-base;
  font-family: $font-family-mono;
}

.code-block__wrapper {
  position: relative;
  overflow-x: auto;
  background: $color-background;
}

.code-block__wrapper--loading {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-block__loading {
  padding: $space-8;
  text-align: center;
}

.code-block__loading-text {
  font-size: $font-size-sm;
  color: $color-text-tertiary;
}

.code-block__content {
  :deep(pre) {
    margin: 0;
    padding: $space-4;
    overflow-x: auto;
    font-family: $font-family-mono;
    font-size: $font-size-sm;
    line-height: $line-height-relaxed;
    background: transparent !important;
    color: inherit;
  }

  :deep(code) {
    font-family: $font-family-mono;
    font-size: $font-size-sm;
    line-height: $line-height-relaxed;
  }

  :deep(pre code) {
    display: block;
    width: 100%;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
  }

  // shiki가 생성한 스타일 오버라이드
  :deep(.shiki) {
    background: transparent !important;
    margin: 0;
    padding: $space-4;
    overflow-x: auto;
  }
}

// 다크 테마 지원 (미래 확장용)
@media (prefers-color-scheme: dark) {
  .code-block {
    border-color: $neutral-700;
  }

  .code-block__header {
    background: $neutral-900;
    border-bottom-color: $neutral-700;
  }
}
</style>

