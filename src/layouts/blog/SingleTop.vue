<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="single__top">
    <div class="single__top-left">
      <h2 class="single__title">{{ items.title }}</h2>
      <p class="single__text">{{ items.text }}</p>
      <div class="single__top-split">
        <p class="single__date">{{ items.date }}</p>
        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2.5" r="2" fill="#3343A9" />
        </svg>
        <p class="single__time">{{ items.readtime }} мин чтение</p>
        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2.5" r="2" fill="#3343A9" />
        </svg>
        <p class="single__views">{{ items.views }} просмотров</p>
      </div>
    </div>
    <div class="single__top-right">
      <img :src="items.imgWrap" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.single__top {
}
</style>
