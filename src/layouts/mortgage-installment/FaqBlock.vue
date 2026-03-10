<script setup>
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const activeIndex = ref(null)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq mt-110">
    <div class="container">
      <div class="faq__inner">
        <h2 class="faq__title default-title">Вопросы и ответы</h2>
        <div class="faq__lists">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="faq__item"
            :class="{ active: activeIndex === index }"
          >
            <div class="faq__question" @click="toggle(index)">
              <p class="faq__question-title">{{ item.question }}</p>
              <svg
                class="faq__icon"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="17" />
                <path d="M20 13V27" stroke-width="2" stroke-linecap="round" />
                <path d="M13 20H27" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <div class="faq__answer" v-show="activeIndex === index">
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.faq {
  &__inner {
    display: flex;
    gap: clamp(18px, vw(20px, $desktop), 20px);
    justify-content: space-between;
    flex-direction: column;
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__title {
    margin-bottom: 0;
  }
  &__lists {
    display: inherit;
    flex-direction: column;
    gap: clamp(10px, vw(12px, $desktop), 12px);
  }
  &__item {
    border-radius: 24px;
    padding: clamp(20px, vw(24px, $desktop), 24px) clamp(24px, vw(30px, $desktop), 30px);
    background: var(--seryy);
    border: 1px solid transparent;
    cursor: pointer;
    max-width: 900px;
    @media (min-width: $desk) {
      min-width: clamp(660px, vw(900px, $desktop), 900px);
    }
  }
  &__item.active {
    background: #fff;
    border: 1px solid var(--obvodka);
  }
  &__question {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    transition: margin-bottom 0.1s ease-in;
  }
  &__item.active .faq__question {
    margin-bottom: clamp(15px, vw(16px, $desktop), 16px);
  }
  &__question-title {
    font-weight: 400;
    font-size: clamp(20px, vw(23px, $desktop), 23px);
    line-height: 146%;
    letter-spacing: -0.01em;
    color: var(--100);
    max-width: clamp(228px, vw(268px, $mobile), 268px);
    overflow-wrap: break-word;
    white-space: normal;
    @media (min-width: $tab) {
      max-width: clamp(440px, vw(830px, $desktop), 830px);
    }
  }
  &__item.active .faq__question-title {
    color: var(--60);
  }
  &__answer {
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--100);
     white-space: pre-line;
  }
  .faq__icon {
    width: clamp(28px, vw(34px, $desktop), 34px);
    height: clamp(28px, vw(34px, $desktop), 34px);

    min-width: clamp(28px, vw(34px, $desktop), 34px);
    min-height: clamp(28px, vw(34px, $desktop), 34px);
  }

  /* закрыто: красный круг + белый плюс */
  .faq__icon circle {
    fill: #da1a1f;
    stroke: transparent;
  }
  .faq__icon path {
    stroke: #fff;
  }

  /* открыто: красный контур + красный минус */
  .faq__item.active .faq__icon circle {
    fill: transparent;
    stroke: #da1a1f;
    stroke-width: 2px;
  }
  .faq__item.active .faq__icon path {
    stroke: #da1a1f;
  }

  /* убираем вертикальную палку -> минус */
  .faq__item.active .faq__icon path:first-of-type {
    opacity: 0;
  }
}
</style>
