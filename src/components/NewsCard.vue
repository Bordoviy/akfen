<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  items: { type: Array, required: true },
  slider: { type: Boolean, default: false },
})
</script>

<template>
  <div
    class="news__card"
    :class="{ 'swiper-slide': slider }"
    v-for="(item, index) in items"
    :key="item.slug || index"
  >
    <RouterLink :to="`/blog/${item.slug}`" class="news__card-link" aria-label="Подробнее">
      <div class="news__card-wrap">
        <img
          class="news__card-img"
          :src="item.img"
          :alt="item.title"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="news__card-container">
        <h3 class="news__card-title">{{ item.title }}</h3>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.news__card {
  border: 1px solid var(--obvodka);
  border-radius: 24px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.news__card-wrap {
  position: relative;
}
.news__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 0 120px 0;
  max-height: 190px;
  @media (min-width: $tab) {
    max-height: 210px;
  }
  @media (min-width: $desk) {
    max-height: 274px;
  }
}
.news__card-percent {
  position: absolute;
  left: clamp(12px, vw(16px, $desktop), 16px);
  top: clamp(12px, vw(16px, $desktop), 16px);
}
.news__card-container {
  padding: clamp(18px, vw(30px, $desktop), 30px);
}
.news__card-title {
  font-weight: 600;
  font-size: clamp(18px, vw(21px, $desktop), 21px);
  line-height: 136%;
  letter-spacing: 0em;
  color: var(--100);
  margin-bottom: clamp(8px, vw(10px, $desktop), 10px);
}
.news__card-text {
  font-weight: 400;
  font-size: clamp(15px, vw(16px, $desktop), 16px);
  line-height: 146%;
  color: var(--60);
  margin-bottom: clamp(16px, vw(16px, $desktop), 20px);
}
.news__card-date {
  font-weight: 400;
  font-size: clamp(14px, vw(15px, $desktop), 15px);
  line-height: 146%;
  color: var(--40);
}
</style>
