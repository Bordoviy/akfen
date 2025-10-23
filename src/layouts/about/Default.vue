<script setup>
const defInfo = {
  title: 'Курс на развитие',
  text: `Сегодня компания «Акфен» уже вышла на федеральный уровень и не собирается в дальнейшем ограничиваться Калининградской областью, расширяя границы строительства.`,
}
</script>

<template>
  <div class="default mt-110">
    <div class="container">
      <div class="default__inner">
        <h2 class="default__title">{{ defInfo.title }}</h2>
        <p class="default__text">{{ defInfo.text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.default {
  background: var(--seryy);
  border-radius: 60px;
  padding: clamp(45px, vw(45px, $desktop), 60px) clamp(30px, vw(40px, $desktop), 40px);

  &__inner {
    display: flex;

    gap: clamp(20px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__title {
    font-weight: 600;
    font-size: clamp(30px, vw(30px, $desktop), 42px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
    flex: 1;
  }
  &__text {
    flex: 2;
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
  }
}
</style>
