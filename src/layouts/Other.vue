<script setup>
import { onMounted, ref, nextTick } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const otherContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!otherContainer.value) return

    const isMobile = window.innerWidth < 992
    const nextEl = isMobile
      ? document.querySelector('.other__button-next--mobile')
      : document.querySelector('.other__button-next--desktop')
    const prevEl = isMobile
      ? document.querySelector('.other__button-prev--mobile')
      : document.querySelector('.other__button-prev--desktop')

    new Swiper(otherContainer.value, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        600: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 1,
        },
      },
      navigation: {
        nextEl,
        prevEl,
      },
    })
  })
})

const OtherImages = [
  {
    imgs: [{ img: '/imgs/other/image1.png' }, { img: '/imgs/other/image2.png' }],
  },
  // {
  //   imgs: [{ img: '/imgs/other/image1.png' }, { img: '/imgs/other/image2.png' }],
  // },
]
</script>

<template>
  <div class="other mt-110">
    <div class="container">
      <div class="other__top swiper-top">
        <h2 class="other__title default-title">{{ title }}</h2>
        <!-- Кнопки для десктопа -->
        <!--
        <div class="swiper-controls desktop-only">
          <div class="swiper-button-prev other__button-prev--desktop">
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
          <div class="swiper-button-next other__button-next--desktop">
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
        -->
      </div>

      <div class="swiper other__wrapper" ref="otherContainer">
        <div class="swiper-wrapper">
          <div class="swiper-slide other__card" v-for="(item, index) in OtherImages" :key="index">
            <img
              v-for="(image, idx) in item.imgs"
              :key="idx"
              class="other__card-img"
              :src="image.img"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <!-- Кнопки для мобилки -->
        <!--
        <div class="swiper-controls mobile-only">
          <div class="swiper-button-prev other__button-prev--mobile">
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
          <div class="swiper-button-next other__button-next--mobile">
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
        -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.other {
  font-family: var(--font-family);
  &__top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__card {
    border-radius: 30px;
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    gap: clamp(16px, vw(20px, $desktop), 20px);
    // flex-direction: column;
    @media (min-width: $tab) {
      // flex-direction: row;
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: $desk) {
      grid-template-columns: 1fr 2fr;
    }
  }
  // &__card-img:nth-child(odd) {
  //   flex: 1;
  // }
  // &__card-img:nth-child(even) {
  //   flex: 1;
  //   @media (min-width: $tab) {
  //   }
  //   @media (min-width: $desk) {
  //     flex: 2;
  //   }
  // }
  &__card-img {
    border-radius: 30px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 320px;

    @media (min-width: $tab) {
      max-height: clamp(320px, vw(380px, $tablet), 440px);
    }
    @media (min-width: $desk) {
      // object-fit: unset;
      max-height: clamp(600px, vw(600px, $desktop), 690px);
    }
  }
}
</style>
