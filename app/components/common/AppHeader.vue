<script setup>
import AppLogo from '~/components/common/AppLogo.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <NuxtLink
        to="/"
        class="app-header__logo"
        :aria-label="`${props.data.site.title} 홈으로 이동`"
      >
        <AppLogo />
      </NuxtLink>

      <nav
        class="app-header__nav"
        :class="{ 'app-header__nav--open': isMobileMenuOpen }"
        :aria-label="'메인 네비게이션'"
      >
        <ul class="app-header__menu">
          <li
            v-for="item in props.data.navigation.headerMenu"
            :key="item.to"
            class="app-header__menu-item"
          >
            <NuxtLink
              :to="item.to"
              :aria-label="item.ariaLabel ?? item.label"
              class="app-header__link"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="app-header__mobile-toggle"
        :aria-label="isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
        :aria-expanded="isMobileMenuOpen"
        @click="toggleMobileMenu"
      >
        <span class="app-header__hamburger">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.app-header {
  position: sticky;
  top: 0;
  z-index: $z-header;
  background-color: $color-surface;
  border-bottom: 1px solid $color-border-light;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-height;
  }

  &__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &__nav {
    display: none;

    @media (min-width: $container-md) {
      display: block;
    }

    &--open {
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: $color-surface;
      border-bottom: 1px solid $color-border-light;
      padding: $space-4 0;

      @media (min-width: $container-md) {
        position: static;
        border-bottom: none;
        padding: 0;
      }
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    list-style: none;

    @media (min-width: $container-md) {
      flex-direction: row;
      gap: $space-8;
    }
  }

  &__menu-item {
    text-align: center;
  }

  &__link {
    display: block;
    padding: $space-3 $space-4;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    text-decoration: none;
    transition: color $transition-fast;

    @media (min-width: $container-md) {
      padding: $space-2;
    }

    &:hover {
      color: $primary-600;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }

    &.router-link-active {
      color: $primary-600;
    }
  }

  &__mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;

    @media (min-width: $container-md) {
      display: none;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }
  }

  &__hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 24px;

    span {
      display: block;
      height: 2px;
      background-color: $color-text-primary;
      transition: all $transition-fast;
    }
  }
}
</style>
