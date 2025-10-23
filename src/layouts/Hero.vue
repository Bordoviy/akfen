<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Button from '@/components/Button.vue'
import Tab from '@/components/Tab.vue'

const isMobile = ref(window.innerWidth < 992)

function updateIsMobile() {
  isMobile.value = window.innerWidth < 992
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const heroContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!heroContainer.value) return
    new Swiper(heroContainer.value, {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: heroContainer.value.querySelector('.swiper-button-next'),
        prevEl: heroContainer.value.querySelector('.swiper-button-prev'),
      },
    })
  })
})

const heroCards = [
  {
    title: 'ЖК “Калининград City”',
    text: '25 этажей высоты открывают 1000 возможностей для жизни!',
    categories: [
      { title: 'топовая локация' },
      { title: '0 % рассрочка' },
      { title: 'подземный паркинг' },
      { title: 'вид на город' },
    ],
    img: '/imgs/hero/22.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: 'ЖК “Sun City“',
    text: 'Пространство новой жизни на Сельме',
    categories: [{ title: 'сдача в 2026' }, { title: 'подземный паркинг' }],
    img: '/imgs/hero/6.jpg',
    id: 'sun-city',
  },
  {
    title: 'ЖК “МореLife“”',
    text: 'Ваша жизнь начинается у кромки Балтики',
    categories: [{ title: 'у моря' }, { title: 'курортный город' }],
    img: '/imgs/hero/3.jpg',
    // id: 'mope-life',
  },
  {
    title: 'ЖК “Avrora“',
    text: 'Жизнь в гармонии с природой',
    categories: [{ title: 'в центре' }, { title: 'у парка' }, { title: 'с террасой' }],
    img: '/imgs/hero/7.jpg',
  },
]
</script>

<template>
  <div class="hero hero__card">
    <div class="container">
      <div class="hero__inner swiper" ref="heroContainer">
        <div class="hero__container swiper-wrapper">
          <div class="swiper-slide hero__card" v-for="(item, index) in heroCards" :key="index">
            <div class="hero__img-wrap">
              <img :src="item.img" :alt="item.title" loading="lazy" decoding="async" />
            </div>
            <div class="hero__wrapper">
              <div class="hero__title">{{ item.title }}</div>
              <div class="hero__tabs">
                <Tab v-for="(i, index) in item.categories" :key="index" :title="i.title" />
              </div>
              <p class="hero__text">{{ item.text }}</p>
              <router-link v-if="item.id" :to="`/projects/${item.id}`">
                <Button>Подробнее</Button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="swiper-controls">
          <div class="swiper-button-prev hero__button-prev--desktop">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="#3343A9"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p>листайте, чтобы увидеть больше</p>
          <div class="swiper-button-next hero__button-next--desktop">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="#3343A9"
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

.hero {
  margin-top: 5px;
  &__inner {
    box-sizing: border-box;
    position: relative;
    border-radius: 30px;
  }
  &__img-wrap {
    position: relative;
    border-radius: 30px;
  }
  &__img-wrap img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    max-height: 320px;
    object-fit: cover;
    border-radius: 30px;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      max-height: clamp(500px, vw(715px, $desktop), 715px);
      min-height: unset;
    }
  }
  &__img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(55.59deg, rgba(33, 32, 38, 0.5) 20%, rgba(33, 32, 38, 0) 53.65%);
    border-radius: 30px;
    z-index: 1;
    pointer-events: none;
  }
  &__wrapper {
    z-index: 2;
    color: var(--color);
    font-family: var(--font-family);
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      margin-top: 0;
      position: absolute;
      top: clamp(230px, vw(350px, $desktop), 375px);
      left: 50px;
      align-items: normal;
    }
  }
  &__title {
    font-weight: 600;
    font-size: clamp(32px, vw(54px, $desktop), 54px);
    line-height: 121%;
    letter-spacing: -0.02em;
    margin-bottom: clamp(10px, vw(16px, $desktop), 16px);
    color: var(--100);
    text-align: center;
    text-shadow:
      0 0 30px rgba(33, 32, 38, 0.2),
      0 0 1px rgba(33, 32, 38, 0.4);
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      color: var(--color);
      text-align: left;
    }
  }
  &__tabs {
    display: flex;
    gap: clamp(7px, vw(8px, $desktop), 8px);
    margin-bottom: clamp(12px, vw(24px, $desktop), 24px);
    flex-wrap: wrap;
    justify-content: center;
    @media (min-width: $desk) {
      justify-content: flex-start;
    }
  }
  &__text {
    margin-bottom: clamp(12px, vw(36px, $desktop), 36px);
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
    text-align: center;

    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      text-align: left;
      text-shadow:
        0 0 30px 0 rgba(33, 32, 38, 0.2),
        0 0 1px 0 rgba(33, 32, 38, 0.4);
      color: var(--color);
    }
  }
  & .btn {
    align-self: center;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      align-self: flex-start;
    }
  }
  & .swiper-slide {
    border-radius: 30px;
  }
  & .swiper-controls {
    display: flex;
    gap: clamp(16px, vw(16px, $desktop), 16px);
    margin-bottom: 19px;
    margin-top: 16px;

    @media (min-width: $desk) {
      margin-bottom: 0;
      margin-top: 0;
      position: absolute;
      right: clamp(50px, vw(50px, $desktop), 50px);
      // bottom: clamp(50px, vw(50px, $desktop), 50px);
      top: clamp(450px, vw(580px, $desktop), 594px);
    }
  }
  & .swiper-controls p {
    display: inline-block;

    @media (min-width: $desk) {
      display: none;
    }
  }
  // & .hero__button-next--desktop svg,
  // & .hero__button-prev--desktop svg {
  //   fill: white;
  // }
  & .hero__button-next--desktop svg path,
  & .hero__button-prev--desktop svg path {
    stroke: #fff; // или текущий цвет, который вы хотите
    stroke-width: 1.4;
    transition: stroke 0.3s ease;
    @media (min-width: $desk) {
      stroke: #3343a9;
    }
  }
  & .hero__button-next--desktop,
  & .hero__button-prev--desktop {
    background: var(--2);

    @media (min-width: $desk) {
      background: var(--color);
    }
  }
  & .swiper .swiper-controls .swiper-button-next,
  .swiper .swiper-controls .swiper-button-prev {
    border: 1px solid transparent;
    width: clamp(29px, vw(43px, $desktop), 43px);
    height: clamp(29px, vw(43px, $desktop), 43px);
  }
  & .swiper .swiper-controls .swiper-button-next:hover svg path,
  & .swiper .swiper-controls .swiper-button-prev:hover svg path {
    stroke: #3343a9;
    @media (min-width: $desk) {
      stroke: #fff;
    }
  }
  & .swiper .swiper-controls .swiper-button-next:hover {
    background: var(--color);
    border: 1px solid var(--2);
    @media (min-width: $desk) {
      background: var(--2);
    }
  }
  & .swiper .swiper-controls .swiper-button-prev:hover {
    background: var(--color);
    border: 1px solid var(--2);
    @media (min-width: $desk) {
      background: var(--2);
    }
  }
}
</style>
