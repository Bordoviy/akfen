<script setup>
import { onMounted, ref, nextTick } from 'vue'

const finishContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!finishContainer.value) return

    const isMobile = window.innerWidth < 992

    const nextEl = isMobile
      ? document.querySelector('.finish__button-next--mobile')
      : document.querySelector('.finish__button-next--desktop')

    const prevEl = isMobile
      ? document.querySelector('.finish__button-prev--mobile')
      : document.querySelector('.finish__button-prev--desktop')

    new Swiper(finishContainer.value, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 20,

      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
      },

      navigation: {
        nextEl,
        prevEl,
      },
    })
  })
})

const fCards = [
  {
    title: 'Мебельные сеты',
    text: '20 готовых комплектов для 7 зон вашей кварттиры: прихожей, гостиной, кухни, спальни, ванной комнаты, кабинета и зоны хранения.',
    img: '/imgs/apartment/ss1.png',
  },
  {
    title: 'Шторы',
    text: '20 готовых комплектов для 7 зон вашей кварттиры: прихожей, гостиной, кухни, спальни, ванной комнаты, кабинета и зоны хранения.',
    img: '/imgs/apartment/ss2.png',
  },
  {
    title: 'Шторы',
    text: '20 готовых комплектов для 7 зон вашей кварттиры: прихожей, гостиной, кухни, спальни, ванной комнаты, кабинета и зоны хранения.',
    img: '/imgs/apartment/ss2.png',
  },
]
</script>

<template>
  <div class="finish mt-110">
    <div class="container">
      <div class="finish__top swiper-top">
        <div class="finish__top-inner">
          <h2 class="finish__title default-title">Отделка в квартирах</h2>
          <p class="finish__subtitle">Вы можете заказать типовую расстановку к квартире</p>
        </div>
        <!-- Кнопки для десктопа -->
        <div class="swiper-controls desktop-only">
          <div class="swiper-button-prev finish__button-prev--desktop">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15.5L7.5 10.5L12.5 5.5"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="swiper-button-next finish__button-next--desktop">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15.5L12.5 10.5L7.5 5.5"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="swiper finish__wrapper" ref="finishContainer">
        <div class="swiper-wrapper">
          <div class="finish__card swiper-slide" v-for="(item, index) in fCards" :key="index">
            <img :src="item.img" :alt="item.title" class="finish__card-img" />
            <div class="finish__card-body">
              <p class="finish__card-title">{{ item.title }}</p>
              <p class="finish__card-text">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <!-- Кнопки для мобилки -->
        <div class="swiper-controls mobile-only">
          <div class="swiper-button-prev finish__button-prev--mobile">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15.5L7.5 10.5L12.5 5.5"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p>листайте, чтобы увидеть больше</p>
          <div class="swiper-button-next finish__button-next--mobile">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15.5L12.5 10.5L7.5 5.5"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.finish {
  &__top {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__title {
    margin-bottom: clamp(12px, vw(12px, $desktop), 12px);
  }
  &__subtitle {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
  }
  &__wrapper {
    border-radius: 30px;
  }
  &__card {
    text-align: center;
  }
  &__card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    margin-bottom: clamp(16px, vw(20px, $desktop), 20px);
  }
  &__card-body {
    max-width: clamp(260px, vw(610px, $desktop), 610px);
    margin: 0 auto;
  }
  &__card-title {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    text-align: center;
    color: var(--100);
    margin-bottom: clamp(8px, vw(8px, $desktop), 8px);
  }
  &__card-text {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 146%;
    text-align: center;
    color: var(--60);
  }
  & .swiper-controls {
    margin-bottom: 20px;
    @media (min-width: $desk) {
      margin-bottom: 0;
    }
  }
}
</style>
