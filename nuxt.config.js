// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // GitHub Pages 배포 설정
  ssr: false,
  app: {
    baseURL: '/temp_edu/',
    buildAssetsDir: 'assets',
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
  ],

  css: [
    '~/assets/styles/main.scss',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // 정적 사이트 생성
  nitro: {
    preset: 'github-pages',
  },
})
