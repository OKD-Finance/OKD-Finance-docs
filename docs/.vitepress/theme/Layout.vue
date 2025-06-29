<template>
  <Layout>
    <!-- Добавляем контроллер навигации -->
    <template #layout-top>
      <NavigationController />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import NavigationController from './components/NavigationController.vue'

const { Layout } = DefaultTheme
</script> 