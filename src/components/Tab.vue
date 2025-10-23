<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="tab">
    {{ title }}
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.tab {
  border-radius: 10px;
  padding: clamp(6px, vw(10px, $desktop), 10px) clamp(10px, vw(16px, $desktop), 16px);
  background: rgba(33, 32, 38, 0.5);
  backdrop-filter: blur(40px);
  font-weight: 400;
  font-size: clamp(15px, vw(16px, $desktop), 16px);
  line-height: 146%;
  color: var(--color);
  @media (min-width: $tab) {
    // Пустой медиазапрос
  }

  @media (min-width: $desk) {
    background: rgba(33, 32, 38, 0.3);
  }
}
</style>
