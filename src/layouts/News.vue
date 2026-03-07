<script setup>
import { onMounted, ref, nextTick } from 'vue'
import NewsCard from '@/components/NewsCard.vue'

defineProps({
  title: { type: String, required: true },
})

const newsContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!newsContainer.value) return

    const isMobile = window.innerWidth < 992

    const nextEl = isMobile
      ? document.querySelector('.news__button-next--mobile')
      : document.querySelector('.news__button-next--desktop')

    const prevEl = isMobile
      ? document.querySelector('.news__button-prev--mobile')
      : document.querySelector('.news__button-prev--desktop')

    new Swiper(newsContainer.value, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 20,

      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },

      navigation: {
        nextEl,
        prevEl,
      },
    })
  })
})

const newsCards = [
  {
    title: 'Компания «Акфен-Калининград» вручила квартиры участникам СВО, пострадавшим от недобросовестных застройщиков',
    img: '/imgs/single/single.jpg',
    href: '#',
  },
  {
    title: 'ЖК “МореLife“ уже в продаже',
    img: '/imgs/projects/9.jpg',
    href: '#',
  },
  {
    title: 'ЖК “Avrora“ уже в продаже',
    img: '/imgs/projects/13.jpg',
    href: '#',
  },
]
</script>

<template>
  <div class="news mt-110">
    <div class="container">
      <div class="news__top swiper-top">
        <h2 class="news__title default-title">{{ title }}</h2>
        <!-- Кнопки для десктопа -->
        <div class="swiper-controls desktop-only">
          <div class="swiper-button-prev news__button-prev--desktop">
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
          <div class="swiper-button-next news__button-next--desktop">
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
      <div class="swiper news__wrapper" ref="newsContainer">
        <div class="swiper-wrapper">
          <NewsCard :items="newsCards" :slider="true"></NewsCard>
        </div>

        <!-- Кнопки для мобилки -->
        <div class="swiper-controls mobile-only">
          <div class="swiper-button-prev news__button-prev--mobile">
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
          <div class="swiper-button-next news__button-next--mobile">
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

.news {
  font-family: var(--font-family);
  &__top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
