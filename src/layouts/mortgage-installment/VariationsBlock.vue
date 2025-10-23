<script setup>
import Button from '@/components/Button.vue'
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
  <div class="m-variations mt-110">
    <div class="container">
      <div class="m-variations__inner">
        <h2 class="m-variations__title default-title">{{ title }}</h2>
        <div class="m-variations__wrapper">
          <div v-for="(item, index) in items" :key="index" class="m-variations__item">
            <div class="m-variations__icon">
              <img :src="item.img" alt="" />
            </div>
            <p class="m-variations__subtitle">{{ item.title }}</p>
            <p class="m-variations__text">{{ item.text }}</p>
            <div class="m-variations__bottom">
              <div class="m-variations__lists">
                <div
                  v-for="(sub, subIndex) in item.items"
                  :key="subIndex"
                  class="m-variations__inert"
                >
                  <p class="m-variations__inert-title">{{ sub.title }}</p>
                  <p class="m-variations__inert-subtitle">{{ sub.text }}</p>
                </div>
              </div>
              <Button :none="true">Узнать подробности</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.m-variations {
  &__inner {
  }
  &__wrapper {
    display: flex;
    gap: clamp(18px, vw(20px, $desktop), 20px);
    flex-direction: column;

    @media (min-width: $tab) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    @media (min-width: $desk) {
    }
  }
  &__item {
    flex: 1;
    background: var(--seryy);
    border-radius: 30px;
    padding: clamp(24px, vw(30px, $desktop), 30px);
    display: inherit;
    flex-direction: column;
    gap: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__icon {
    background: var(--color);
    border-radius: 20px 4px;
    width: clamp(50px, vw(64px, $desktop), 64px);
    height: clamp(50px, vw(64px, $desktop), 64px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__icon img {
    width: clamp(35px, vw(35px, $desktop), 35px);
    height: clamp(35px, vw(35px, $desktop), 35px);
  }
  &__subtitle {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &__text {
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--80);
  }
  &__bottom {
    margin-top: auto;
  }
  &__lists {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: clamp(12px, vw(16px, $desktop), 16px);
    column-gap: clamp(12px, vw(20px, $desktop), 20px);
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__inert {
  }
  &__inert-title {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &__inert-subtitle {
    font-weight: 400;
    font-size: clamp(12px, vw(12px, $desktop), 12px);
    line-height: 140%;
    letter-spacing: 0.01em;
    color: var(--60);
  }
  &__bottom .btn {
    width: 100%;
  }
}
</style>
