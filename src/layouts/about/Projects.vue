<script setup>
import { onMounted, ref, nextTick } from 'vue'
import Tab from '@/components/Tab.vue'

const swiperContainers = ref([])

onMounted(() => {
  nextTick(() => {
    swiperContainers.value.forEach((el) => {
      if (!el) return
      new Swiper(el, {
        loop: true,
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev'),
        },
      })
    })
  })
})
const houseFixture = {
  text: 'За 22 года работы компания Акфен реализовала не только жилые объекты, но и социальные объекты инфраструктуры. Держать цены «в рамках» компании «Акфен» удается даже в непростой экономической ситуации. Это стало возможным за счет того, что компания развивает собственное производство, а также минимизирует цепочку посредников, что приводит к удешевлению ресурса и стоимости затрат.',
}
const houseCards = [
  {
    title: 'ЖК “Калининград-Сити”',
    address: 'г. Калининград, Гайдара 90',
    text: 'до центра на авто - 5 мин',
    price: '5 700 000',
    imgs: [
      { img: '/imgs/projects/1.jpg' },
      { img: '/imgs/projects/2.jpg' },
      { img: '/imgs/projects/3.jpg' },
      { img: '/imgs/projects/4.jpg' },
    ],
    categories: [
      { title: 'топовая локация' },
      { title: '0 % рассрочка' },
      { title: 'подземный паркинг' },
      { title: 'вид на город' },
    ],
    id: 'kaliningrad-city',
  },
  {
    title: 'ЖК “Sun City”',
    address: 'г. Калининград, Елизаветинская, 47',
    text: 'до центра на авто - 5 мин',
    price: '6 000 000',
    imgs: [
      { img: '/imgs/projects/5.jpg' },
      { img: '/imgs/projects/6.jpg' },
      { img: '/imgs/projects/7.jpg' },
      { img: '/imgs/projects/8.jpg' },
    ],
    categories: [
      { title: 'сдача в 2026' },
      { title: 'подземный паркинг' },
      { title: '0 % рассрочка' },
      { title: 'ипотека' },
    ],
    id: 'sun-city',
  },
  {
    title: 'ЖК “МореLife“',
    address: 'г. Пионерский, ул. Новоставского',
    text: 'до моря 4 мин пешком',
    price: '7 000 000',
    imgs: [
      { img: '/imgs/projects/9.jpg' },
      { img: '/imgs/projects/10.jpg' },
      { img: '/imgs/projects/11.jpg' },
      { img: '/imgs/projects/12.jpg' },
    ],
    categories: [
      { title: 'Скоро в продаже' },
      { title: 'у моря' },
      { title: 'курортный город' },
      { title: 'новый пляж' },
    ],
    id: '',
  },
  {
    title: 'ЖК “Avrora“',
    address: 'Гурьевск, ул Ленина',
    text: 'до центра 2 мин пешком',
    price: '6 000 000',
    imgs: [
      { img: '/imgs/projects/13.jpg' },
      { img: '/imgs/projects/14.jpg' },
      { img: '/imgs/projects/15.jpg' },
      { img: '/imgs/projects/16.jpg' },
    ],
    categories: [
      { title: 'Скоро в продаже' },
      { title: 'в центре' },
      { title: 'у парка' },
      { title: 'с террасой' },
    ],
    // id: 'sun-city-47',
    id: '',
  },
  {
    title: 'ЖК “ГАРАНТ-1”',
    address: 'г. Калининград, пер. Рассветный',
    text: 'до центра на авто - 5 мин',
    price: '5 700 000',
    imgs: [
      { img: '/imgs/projects/111.png' },
      { img: '/imgs/projects/112.png' },
      { img: '/imgs/projects/113.png' },
      { img: '/imgs/projects/114.png' },
    ],
    categories: [{ title: 'сдан в 2019 году' }],
    id: '',
  },
  {
    title: 'ЖК “ПРЕМЬЕРА”',
    address: 'г. Калининград, ул. Леонова',
    text: 'до центра на авто - 5 мин',
    price: '6 000 000',
    imgs: [
      { img: '/imgs/projects/115.jpg' },
      { img: '/imgs/projects/116.jpg' },
      { img: '/imgs/projects/117.jpg' },
      { img: '/imgs/projects/118.jpg' },
    ],
    categories: [{ title: 'сдан в 2021 году' }],
    id: '',
  },
]
</script>

<template>
  <div class="projects mt-110">
    <div class="container">
      <div class="projects__top">
        <h2 class="projects__title default-title">Реализованные проекты</h2>
        <p class="projects__subtitle">{{ houseFixture.text }}</p>
      </div>
      <div class="projects__inner">
        <component
          v-for="(item, index) in houseCards"
          :key="index"
          :is="item.id ? 'router-link' : 'div'"
          v-bind="item.id ? { to: `/projects/${item.id}` } : {}"
          class="projects__card"
        >
          <div class="projects__card-wrapper swiper" ref="swiperContainers">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide projects__card-ob"
                v-for="(img, imgIndex) in item.imgs"
                :key="imgIndex"
              >
                <img :src="img.img" loading="lazy" decoding="async" />
              </div>
            </div>
            <div class="swiper-controls">
              <div class="swiper-button-prev rc__button-prev--desktop">
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
              <div class="swiper-button-next rc__button-next--desktop">
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

            <div class="swiper-pagination"></div>

            <div class="projects__card-tabs">
              <Tab v-for="(term, i) in item.categories" :key="i" :title="term.title" />
            </div>
          </div>
          <div class="projects__card-top">
            <p class="projects__card-top-title">{{ item.title }}</p>
          </div>
          <div class="projects__card-bottom">
            <p class="projects__card-bottom-address">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3332 7.36874C13.3332 11.3283 7.99984 14.7223 7.99984 14.7223C7.99984 14.7223 2.6665 11.3283 2.6665 7.36874C2.6665 6.01855 3.22841 4.72366 4.2286 3.76892C5.22879 2.81419 6.58535 2.27783 7.99984 2.27783C9.41432 2.27783 10.7709 2.81419 11.7711 3.76892C12.7713 4.72366 13.3332 6.01855 13.3332 7.36874Z"
                  fill="#BAB9BE"
                />
                <path
                  d="M7.99995 9.38881C8.98179 9.38881 9.77772 8.59287 9.77772 7.61103C9.77772 6.62919 8.98179 5.83325 7.99995 5.83325C7.01811 5.83325 6.22217 6.62919 6.22217 7.61103C6.22217 8.59287 7.01811 9.38881 7.99995 9.38881Z"
                  fill="white"
                />
              </svg>
              {{ item.address }}
            </p>
          </div>
        </component>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.projects {
  font-family: var(--font-family);
  &__top {
    display: flex;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
    flex-direction: column;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__title {
    flex: 1;
    margin-bottom: 0;
  }
  &__subtitle {
    flex: 2;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
  }

  &__inner {
    display: flex;
    column-gap: clamp(18px, vw(20px, $desktop), 20px);
    row-gap: clamp(30px, vw(38px, $desktop), 38px);
    flex-wrap: wrap;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }
    @media (min-width: $desk) {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: auto;
    }
  }
  &__card:nth-child(1),
  &__card:nth-child(2) {
    flex: 100%;
    @media (min-width: $tab) {
      flex: 48%;
    }
    @media (min-width: $desk) {
      grid-column: span 3;
    }
  }
  &__card:nth-child(3),
  &__card:nth-child(4) {
    flex: 100%;
    @media (min-width: $tab) {
      flex: 48%;
    }
    @media (min-width: $desk) {
      grid-column: span 3;
    }
  }
  // &__card:nth-child(3) {
  //   flex: 100%;
  //   @media (min-width: $tab) {
  //     flex: 48%;
  //   }
  //   @media (min-width: $desk) {
  //     grid-column: span 2;
  //   }
  // }
  &__card:nth-child(3) .projects__card-tabs .tab:first-child {
    background: var(--1);
  }
  // &__card:nth-child(4) {
  //   flex: 100%;
  //   @media (min-width: $tab) {
  //     flex: 48%;
  //   }
  //   @media (min-width: $desk) {
  //     grid-column: span 4;
  //   }
  // }
  &__card:nth-child(4) .projects__card-tabs .tab:first-child {
    background: var(--1);
  }
  &__card:nth-child(5),
  &__card:nth-child(6) {
    flex: 100%;
    @media (min-width: $tab) {
      flex: 48%;
    }
    @media (min-width: $desk) {
      grid-column: span 3;
    }
  }
  &__card .swiper-slide {
    width: 100% !important;
  }
  &__card {
    ::v-deep .swiper-pagination-bullet {
      width: clamp(4px, vw(6px, $desktop), 6px);
      height: clamp(4px, vw(6px, $desktop), 6px);
      background: var(--color);
      opacity: 0.7;
    }

    ::v-deep .swiper-pagination-bullet-active {
      opacity: 1;
    }
  }

  &__card-wrapper {
    position: relative;
    border-radius: 24px;
  }

  &__card-tabs {
    position: absolute;
    left: clamp(12px, vw(16px, $desktop), 16px);
    top: clamp(12px, vw(16px, $desktop), 16px);
    display: flex;
    gap: clamp(4px, vw(4px, $desktop), 4px);
    flex-wrap: wrap;
    z-index: 1;
  }
  &__card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // border-radius: 24px;
    min-height: 300px;
    max-height: 380px;
    aspect-ratio: 8 / 6;
    @media (min-width: $tab) {
      aspect-ratio: 8 / 9;
    }
    @media (min-width: $desk) {
      max-height: clamp(376px, vw(516px, $desktop), 516px);
      // aspect-ratio: unset;
    }
  }
  &__card-top,
  &__card-bottom {
    margin: 0 clamp(8px, vw(16px, $desktop), 16px);
  }
  &__card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: clamp(6px, vw(8px, $desktop), 8px);
    margin-top: clamp(16px, vw(20px, $desktop), 20px);
    flex-wrap: wrap;
    @media (min-width: $desk) {
      flex-wrap: nowrap;
    }
  }
  &__card-top-title {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &__card-top-price {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    text-align: right;
    color: var(--100);
  }
  &__card-bottom {
    display: flex;
    margin-bottom: clamp(4px, vw(5px, $desktop), 5px);
    gap: clamp(6px, vw(16px, $desktop), 16px);
    flex-direction: column;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__card-bottom-address,
  &__card-bottom-text {
    display: flex;
    align-items: center;
    gap: clamp(4px, vw(4px, $desktop), 4px);
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--60);
  }
  & .swiper-controls {
    display: flex;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease-in,
      visibility 0.2s ease-in;
    justify-content: space-between;
    position: absolute;
    right: clamp(10px, vw(20px, $desktop), 20px);
    left: clamp(10px, vw(20px, $desktop), 20px);
    bottom: 45%;
  }
  &__card:hover .swiper-controls {
    visibility: visible;
    opacity: 1;
    transition:
      opacity 0.2s ease-in,
      visibility 0.2s ease-in;
  }
  & .rc__button-next--desktop svg,
  & .rc__button-prev--desktop svg {
    fill: white;
  }
  & .swiper .swiper-controls .rc__button-next--desktop,
  & .swiper .swiper-controls .rc__button-prev--desktop {
    background: var(--color);
    width: clamp(24px, vw(36px, $desktop), 36px);
    height: clamp(24px, vw(36px, $desktop), 36px);
  }
  & .swiper-controls .rc__button-next--desktop,
  & .swiper-controls .rc__button-prev--desktop {
    box-shadow: 0 4px 10px 0 rgba(33, 32, 38, 0.14);
  }
}
</style>
