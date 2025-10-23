<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="m-advent mt-110">
    <div class="container">
      <div class="m-advent__inner">
        <h2 class="m-advent__title default-title">{{ title }}</h2>
        <div class="m-advent__wrapper">
          <div v-for="(item, index) in items" :key="index" class="m-advent__item">
            <div class="m-advent__icon">
              <img :src="item.img" alt="" />
            </div>
            <p class="m-advent__text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.m-advent {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(20px, vw(30px, $desktop), 30px);
    flex-wrap: wrap;
    @media (min-width: $tab) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: $desk) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  &__item {
    border: 1px solid var(--obvodka);
    border-radius: clamp(50px, vw(70px, $desktop), 70px) clamp(24px, vw(24px, $desktop), 24px);
    padding: clamp(24px, vw(40px, $desktop), 40px);
    display: flex;
    flex-direction: column;
    gap: clamp(30px, vw(60px, $desktop), 60px);
  }
  &__icon {
    border-radius: 20px 4px;
    background: var(--seryy);
    width: clamp(58px, vw(78px, $desktop), 78px);
    height: clamp(58px, vw(78px, $desktop), 78px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__icon img {
    width: clamp(28px, vw(38px, $desktop), 38px);
    height: clamp(28px, vw(38px, $desktop), 38px);
  }
  &__text {
    font-weight: 400;
    font-size: clamp(20px, vw(25px, $desktop), 25px);
    line-height: 130%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
}
</style>
