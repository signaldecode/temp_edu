<script setup>
import AppLogo from '~/components/common/AppLogo.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer__inner">
        <div class="app-footer__info">
          <NuxtLink
            to="/"
            class="app-footer__logo"
            :aria-label="`${props.data.site.title} 홈으로 이동`"
          >
            <AppLogo variant="light" />
          </NuxtLink>

          <address class="app-footer__address">
            <p>{{ props.data.geo.address }}</p>
            <p>
              <a
                :href="`tel:${props.data.geo.phone}`"
                :aria-label="`전화번호 ${props.data.geo.phone}`"
              >
                {{ props.data.geo.phone }}
              </a>
              <span class="app-footer__separator">|</span>
              <a
                :href="`mailto:${props.data.geo.email}`"
                :aria-label="`이메일 ${props.data.geo.email}`"
              >
                {{ props.data.geo.email }}
              </a>
            </p>
            <p>{{ props.data.geo.businessHours }}</p>
          </address>
        </div>

        <nav
          class="app-footer__nav"
          aria-label="푸터 네비게이션"
        >
          <ul class="app-footer__menu">
            <li
              v-for="item in props.data.navigation.footerMenu"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                :aria-label="item.ariaLabel ?? item.label"
                class="app-footer__link"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="app-footer__bottom">
        <p class="app-footer__copyright">
          &copy; {{ currentYear }} {{ props.data.site.siteName }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.app-footer {
  margin-top: auto;
  background-color: $neutral-900;
  color: $neutral-300;
  padding: $space-12 0 $space-8;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: $space-8;

    @media (min-width: $container-md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__logo {
    display: inline-flex;
    text-decoration: none;
  }

  &__address {
    font-style: normal;
    font-size: $font-size-sm;
    line-height: $line-height-relaxed;

    a {
      color: $neutral-300;
      text-decoration: none;
      transition: color $transition-fast;

      &:hover {
        color: $neutral-100;
      }

      &:focus-visible {
        outline: 2px solid $color-border-focus;
        outline-offset: 2px;
      }
    }
  }

  &__separator {
    margin: 0 $space-2;
    color: $neutral-600;
  }

  &__nav {
    display: flex;
    align-items: flex-start;
  }

  &__menu {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4 $space-6;
    list-style: none;
  }

  &__link {
    font-size: $font-size-sm;
    color: $neutral-300;
    text-decoration: none;
    transition: color $transition-fast;

    &:hover {
      color: $neutral-100;
    }

    &:focus-visible {
      outline: 2px solid $color-border-focus;
      outline-offset: 2px;
    }
  }

  &__bottom {
    margin-top: $space-8;
    padding-top: $space-6;
    border-top: 1px solid $neutral-700;
  }

  &__copyright {
    font-size: $font-size-xs;
    color: $neutral-500;
  }
}
</style>
