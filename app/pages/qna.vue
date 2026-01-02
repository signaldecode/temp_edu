<script setup>
import qnaData from '~/data/qnaData.json'
import QnaHeroSection from '~/components/qna/QnaHeroSection.vue'
import QnaListSection from '~/components/qna/QnaListSection.vue'

definePageMeta({
  layout: 'default'
})

const { meta, hero, filter, qnaList } = qnaData

useSeoMeta({
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle ?? meta.title,
  ogDescription: meta.ogDescription ?? meta.description,
  ogImage: meta.ogImage
})

useHead({
  title: meta.title,
  meta: [
    { name: 'keywords', content: meta.keywords }
  ]
})

const listData = computed(() => ({
  filter,
  qnaList
}))
</script>

<template>
  <main class="qna-page" aria-label="Q&A 페이지">
    <QnaHeroSection :data="hero" />
    <QnaListSection :data="listData" />
  </main>
</template>

<style lang="scss" scoped>
.qna-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
