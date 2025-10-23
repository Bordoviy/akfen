<script setup>
import { onMounted, ref, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'

const progressContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!progressContainer.value) return

    const isMobile = window.innerWidth < 992

    const nextEl = isMobile
      ? document.querySelector('.progress__button-next--mobile')
      : document.querySelector('.progress__button-next--desktop')

    const prevEl = isMobile
      ? document.querySelector('.progress__button-prev--mobile')
      : document.querySelector('.progress__button-prev--desktop')

    new Swiper(progressContainer.value, {
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

const progressCards = [
  {
    title: '25 августа 2025 года',
    img: '/imgs/detail/1.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 июля 2025 года',
    img: '/imgs/detail/2.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 июня 2025 года',
    img: '/imgs/detail/3.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 мая 2025 года',
    img: '/imgs/detail/4.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 апреля 2025 года',
    img: '/imgs/detail/5.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 марта 2025 года',
    img: '/imgs/detail/6.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 февраля 2025 года',
    img: '/imgs/detail/7.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 января 2025 года',
    img: '/imgs/detail/8.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: '25 августа 2025 года',
    img: '/imgs/detail/9.jpg',
    id: 'sun-city',
  },
  {
    title: '25 июля 2025 года',
    img: '/imgs/detail/10.jpg',
    id: 'sun-city',
  },
  {
    title: '25 июня 2025 года',
    img: '/imgs/detail/11.jpg',
    id: 'sun-city',
  },
  {
    title: '25 мая 2025 года',
    img: '/imgs/detail/12.jpg',
    id: 'sun-city',
  },
  {
    title: '25 апреля 2025 года',
    img: '/imgs/detail/13.jpg',
    id: 'sun-city',
  },
  {
    title: '25 марта 2025 года',
    img: '/imgs/detail/14.jpg',
    id: 'sun-city',
  },
  {
    title: '25 февраля 2025 года',
    img: '/imgs/detail/15.jpg',
    id: 'sun-city',
  },
  {
    title: '25 января 2025 года',
    img: '/imgs/detail/16.jpg',
    id: 'sun-city',
  },
]

const route = useRoute()
// const project = computed(() => progressCards.find((p) => p.id === route.params.id))

const projectItems = computed(() => progressCards.filter((p) => p.id === route.params.id))
</script>

<template>
  <div class="progress mt-110">
    <div class="container">
      <div class="progress__top swiper-top">
        <h2 class="progress__title default-title">Ход строительства</h2>
        <!-- Кнопки для десктопа -->
        <div class="swiper-controls desktop-only">
          <div class="swiper-button-prev progress__button-prev--desktop">
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
          <div class="swiper-button-next progress__button-next--desktop">
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
      <div class="swiper progress__wrapper" ref="progressContainer">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide progress__card"
            v-for="(item, index) in projectItems"
            :key="index"
          >
            <img
              class="progress__card-img"
              :src="item.img"
              alt=""
              loading="lazy"
              decoding="async"
            />

            <h3 class="progress__card-title">{{ item.title }}</h3>
          </div>
        </div>

        <!-- Кнопки для мобилки -->
        <div class="swiper-controls mobile-only">
          <div class="swiper-button-prev progress__button-prev--mobile">
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
          <div class="swiper-button-next progress__button-next--mobile">
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

.progress {
  &__top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__card {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    border-radius: 30px;
  }
  &__card-img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    object-fit: cover;
    max-height: clamp(290px, vw(400px, $desktop), 400px);
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      //
    }
  }

  &__card-title {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    text-align: center;
    color: var(--80);
    margin-top: clamp(8px, vw(10px, $desktop), 10px);
    text-align: center;
  }
  &__wrapper {
    border-radius: 30px;
    overflow: visible !important;
  }
}
</style>
