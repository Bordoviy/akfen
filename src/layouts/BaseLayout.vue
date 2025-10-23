<script setup>
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
</script>

<template>
  <Header />
  <main class="main">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped lang="scss">
@import '../assets/styles/index';
</style>
