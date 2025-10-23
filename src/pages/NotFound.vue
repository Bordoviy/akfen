<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'
</script>

<template>
  <Breadcrumbs />
  <div class="not-found">
    <div class="container">
      <h1 class="not-found__title">404</h1>
      <p class="not-found__text">К сожалению, данная страница не найдена</p>
      <p class="not-found__subtext">Вы можете перейти в любой интересующий Вас раздел</p>
      <router-link to="/"><Button>Вернуться на главную</Button></router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';
.not-found {
  text-align: center;
  margin-top: clamp(60px, vw(80px, $desktop), 80px);
  &__title {
    font-weight: 600;
    font-size: clamp(140px, vw(240px, $desktop), 240px);
    line-height: 100%;
    letter-spacing: -0.01em;
    text-align: center;
    color: var(--2);
    margin-bottom: clamp(8px, vw(12px, $desktop), 12px);
  }
  &__text {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    text-align: center;
    color: var(--100);
    margin-bottom: clamp(8px, vw(12px, $desktop), 12px);
  }
  &__subtext {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    text-align: center;
    color: var(--60);
    margin-bottom: clamp(20px, vw(24px, $desktop), 24px);
  }
  & a {
    border: 1px solid transparent;
  }
  & a:hover {
    border: 1px solid #000;
    border-radius: 16px;
  }
}
</style>
