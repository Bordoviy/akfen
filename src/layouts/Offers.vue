<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { RouterLink } from 'vue-router'

const swiperContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!swiperContainer.value) return

    const nextBtns = [
      document.querySelector('.offers__button-next--desktop'),
      document.querySelector('.offers__button-next--mobile'),
    ].filter(Boolean)

    const prevBtns = [
      document.querySelector('.offers__button-prev--desktop'),
      document.querySelector('.offers__button-prev--mobile'),
    ].filter(Boolean)

    nextBtns.forEach((nextBtn, i) => {
      new Swiper(swiperContainer.value, {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        // preventClicks: false,
        // preventClicksPropagation: false,
        breakpoints: {
          600: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        },

        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtns[i],
        },
      })
    })
  })
})

const OffersCards = [
  {
    title: '0 % рассрочка от застройщика до конца строительства',
    text: 'ПВ 20% , остальная сумма равными платежами раз в квартал',
    img: '/imgs/offers/img1.png',
    // href: '#',
    to: '/mortgage',
    isRouterLink: true,
  },
  {
    title: '0 % рассрочка от застройщика до конца строительства при покупке квартиры',
    text: 'ПВ 20% , остальная сумма равными платежами раз в квартал',
    img: '/imgs/offers/img2.png',
    to: '/mortgage',
    isRouterLink: true,
  },
  {
    title: 'траншевая ипотека',
    text: 'ПВ 20% , первый транш 100 000 р -остальная сумма в конце строительства',
    img: '/imgs/offers/img3.png',
    to: '/mortgage',
    isRouterLink: true,
  },
  {
    title: '0 % рассрочка от застройщика до конца строительства',
    text: 'ПВ 20% , остальная сумма равными платежами раз в квартал',
    img: '/imgs/offers/img1.png',
    to: '/mortgage',
    isRouterLink: true,
  },
  {
    title: '0 % рассрочка от застройщика до конца строительства',
    text: 'ПВ 20% , остальная сумма равными платежами раз в квартал',
    img: '/imgs/offers/img2.png',
    to: '/mortgage',
    isRouterLink: true,
  },
  {
    title: 'траншевая ипотека',
    text: 'ПВ 20% , первый транш 100 000 р -остальная сумма в конце строительства',
    img: '/imgs/offers/img3.png',
    to: '/mortgage',
    isRouterLink: true,
  },
]
</script>

<template>
  <div class="offers mt-110">
    <div class="container">
      <div class="offers__top swiper-top">
        <h2 class="offers__title default-title">Выгодные предложения</h2>
        <!-- Кнопки для десктопа -->
        <div class="swiper-controls desktop-only">
          <div class="swiper-button-prev offers__button-prev--desktop">
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
          <div class="swiper-button-next offers__button-next--desktop">
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

      <div class="swiper offers__wrapper" ref="swiperContainer">
        <div class="swiper-wrapper">
          <div class="swiper-slide offers__card" v-for="(item, index) in OffersCards" :key="index">
            <div class="offers__card-wrap">
              <img
                class="offers__card-percent"
                src="/imgs/percent.svg"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <img
                class="offers__card-img"
                :src="item.img"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="offers__card-container">
              <h3 class="offers__card-title">{{ item.title }}</h3>
              <p class="offers__card-text">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <!-- Кнопки для мобилки -->
        <div class="swiper-controls mobile-only">
          <div class="swiper-button-prev offers__button-prev--mobile">
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
          <div class="swiper-button-next offers__button-next--mobile">
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
@import '../assets/styles/index';

.offers {
  font-family: var(--font-family);
  &__top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__card {
    background: var(--seryy);
    border-radius: 24px;
    display: flex;
    overflow: hidden;
    gap: clamp(16px, vw(20px, $desktop), 20px);
    flex-direction: column;
    // max-height: 315px;
    // min-height: clamp(298px, vw(20px, $desktop), 298px);
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__card-wrap {
    position: relative;
  }
  &__card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 0 120px 0;
    max-height: 150px;
    min-height: 150px;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      max-width: clamp(295px, vw(295px, $desktop), 295px);
      min-height: clamp(225px, vw(225px, $desktop), 225px);
      max-height: clamp(225px, vw(295px, $desktop), 295px);
    }
  }
  &__card-percent {
    position: absolute;
    left: clamp(12px, vw(16px, $desktop), 16px);
    top: clamp(12px, vw(16px, $desktop), 16px);
  }
  &__card-container {
    align-self: center;
    margin: 0px 24px 16px 24px;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      margin: 20px 5px;
    }
  }
  &__card-title {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
    margin-bottom: clamp(8px, vw(10px, $desktop), 10px);
  }
  &__card-text {
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--60);
    margin-bottom: clamp(16px, vw(16px, $desktop), 20px);
  }
  &__card-date {
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--40);
  }
}
</style>
