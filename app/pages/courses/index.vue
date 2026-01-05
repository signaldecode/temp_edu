<script setup>
import mainData from '~/data/mainData.json'
import coursesData from '~/data/coursesData.json'
import CoursesHeroSection from '~/components/courses/CoursesHeroSection.vue'
import CoursesListSection from '~/components/courses/CoursesListSection.vue'
import InstructorsSection from '~/components/courses/InstructorsSection.vue'

const categories = mainData.categories.list

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: coursesData.meta.title,
  description: coursesData.meta.description,
  ogTitle: coursesData.meta.title,
  ogDescription: coursesData.meta.description
})

useHead({
  title: coursesData.meta.title
})
</script>

<template>
  <main class="page-courses">
    <h1 class="visually-hidden">강의 목록</h1>
    <CoursesHeroSection :data="coursesData.hero" />
    <CoursesListSection
      :categories="categories"
      :courses="coursesData.courses"
    />
    <InstructorsSection :data="coursesData.instructors" />
  </main>
</template>

<style lang="scss" scoped>
.page-courses {
  min-height: 100vh;
}
</style>
