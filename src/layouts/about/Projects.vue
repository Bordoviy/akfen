<script setup>
import { onMounted, ref, nextTick } from 'vue'
import Tab from '@/components/Tab.vue'

defineProps({
  title: { type: String, default: 'Наши проекты' },
})


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
    title: 'Огни Калининграда',
    address: 'г. Калининград, Гайдара 90',
    text: 'до центра на авто - 5 мин',
    price: '7 189 100',
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
    lists: [
      { title: '1-комнатная квартира', price: '7 189 100 млн' },
      { title: '2-комнатная квартира', price: '7 368 800 млн' },
      { title: '3-комнатная квартира', price: '10 599 680 млн' },
    ],
    flat: '480',
    floor: '25',
    date: 'IV кв. 2027',
    id: 'ogni-kaliningrada',
  },
  {
    title: 'ЖК Елизаветинский',
    address: 'г. Калининград, Елизаветинская, 47',
    text: 'до центра на авто - 5 мин',
    price: '7 037 800',
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
    lists: [
      { title: '1-комнатная квартира', price: '7 037 800 млн' },
      { title: '2-комнатная квартира', price: '9 809 200 млн' },
      { title: '3-комнатная квартира', price: '-' },
    ],
    flat: '285',
    floor: '15',
    date: 'I кв. 2026',
    id: 'elizavetinskiy',
  },
  {
    title: 'Пионерский берег',
    address: 'г. Пионерский, ул. Новоставского',
    text: 'до моря 4 мин пешком',
    price: '6 764 000',
    imgs: [
      { img: '/imgs/projects/9.jpg' },
      { img: '/imgs/projects/10.jpg' },
      { img: '/imgs/projects/11.jpg' },
      { img: '/imgs/projects/12.jpg' },
    ],
    categories: [
      { title: 'у моря' },
      { title: 'курортный город' },
      { title: 'новый пляж' },
    ],
    lists: [
      { title: '1-комнатная квартира', price: '6 764 000 млн' },
      { title: '2-комнатная квартира', price: '8 320 100 млн' },
      { title: '3-комнатная квартира', price: '9 996 200 млн' },
    ],
    flat: '85',
    floor: '5',
    date: 'IV кв. 2026',
    id: 'pionerskiy-bereg',
  },
  {
    title: 'Аврора',
    address: 'Гурьевск, ул Ленина',
    text: 'до центра на авто - менее 15 мин',
    price: '6 352 500',
    imgs: [
      { img: '/imgs/projects/s1.jpeg' },
      { img: '/imgs/projects/s2.jpeg' },
      { img: '/imgs/projects/s3.jpeg' },
      { img: '/imgs/projects/s4.jpeg' },
    ],
    categories: [
      { title: 'топовая локация' },
      { title: ' 0 % рассрочка' },
      { title: 'в центре Гурьевска' },
      { title: 'рядом парк' },
    ],
    lists: [
      { title: '1-комнатная квартира', price: '6 352 500 млн' },
      { title: '2-комнатная квартира', price: '8 501 360 млн' },
      { title: '3-комнатная квартира', price: '13 786 150 млн' },
    ],
    flat: '144',
    floor: '7',
    date: 'III кв. 2027',
    id: 'avrora',
  },
]
</script>

<template>
  <div class="projects mt-110" id="mortgage">
    <div class="container">
      <h2 class="projects__title default-title">{{ title }}</h2>
      <div class="projects__inner">
        <div
          v-for="(item, index) in houseCards"
          :key="index"
          class="projects__card"
          :class="{ 'projects__card--open': openCardIndex === index }"
          @click="handleCardClick(index, $event)"
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
            <router-link
              v-if="item.id"
              :to="`/projects/${item.id}`"
              class="projects__card-top-title"
            >
              {{ item.title }}
            </router-link>
            <span v-else class="projects__card-top-title">
              {{ item.title }}
            </span>

            <p class="projects__card-top-price">от {{ item.price }}</p>
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
            <p class="projects__card-bottom-text">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75195 6.16675H9.25195C9.28806 6.16677 9.31676 6.17286 9.33789 6.17944L9.4043 7.62085C9.412 7.79274 9.48078 7.94827 9.54102 8.05347C9.58914 8.13746 9.65378 8.22858 9.73438 8.30835L9.82031 8.38354L11.5137 9.7019L11.4453 9.75366C11.4349 9.76108 11.3983 9.78003 11.334 9.78003C11.3017 9.78001 11.2763 9.77497 11.2578 9.76929L11.2227 9.75366L10.1328 8.95093L9.33691 8.36401V10.1814L9.43164 10.3123C9.438 10.321 9.44365 10.3289 9.44824 10.3347L10.043 11.3005C10.1899 11.5396 10.3563 11.9691 10.4014 12.2156L10.8496 14.6677C10.8468 14.6526 10.862 14.6809 10.7979 14.7468C10.7338 14.8125 10.6146 14.883 10.4512 14.9109L10.3232 14.9324C10.2772 14.9402 10.2306 14.9441 10.1855 14.9441C10.0449 14.9441 9.94001 14.9074 9.87891 14.8679C9.83765 14.8412 9.82516 14.8209 9.82227 14.8142L9.51953 12.8035C9.46664 12.4514 9.27814 11.9262 9.09473 11.6091L8.46289 10.5164L7.97559 9.67456L7.57422 10.5613L5.79297 14.4978C5.77204 14.544 5.60718 14.6999 5.2793 14.7C5.22319 14.7 5.16798 14.6942 5.11621 14.6843L4.98828 14.6599L4.87891 14.6306C4.78406 14.5969 4.73065 14.5525 4.70801 14.5232C4.70472 14.5189 4.70279 14.5151 4.70117 14.5125L6.59668 10.323C6.60121 10.3152 6.60675 10.3056 6.6123 10.2947L6.66699 10.1882V6.91284L5.75977 8.18628L4.63867 9.75952C4.63519 9.76188 4.62809 9.7671 4.61621 9.77222C4.5867 9.78484 4.54366 9.79467 4.49414 9.79468L4.40234 9.78198L4.14648 9.7019L6.43555 6.27222C6.42838 6.28293 6.4287 6.27851 6.44727 6.2644C6.46501 6.25094 6.49251 6.23455 6.52832 6.21851C6.60292 6.18512 6.68598 6.16675 6.75195 6.16675ZM9.45996 10.3484C9.46136 10.3501 9.4615 10.3508 9.46191 10.3513C9.46129 10.3505 9.45888 10.3473 9.45605 10.3435C9.45758 10.3454 9.45908 10.3473 9.45996 10.3484Z"
                  fill="#BAB9BE"
                  stroke="#BAB9BE"
                />
                <path
                  d="M7.99977 4.94447C8.98019 4.94447 9.77772 4.14698 9.77772 3.16661C9.77772 2.18641 8.98019 1.38892 7.99977 1.38892C7.01952 1.38892 6.22217 2.18641 6.22217 3.16661C6.22199 4.14698 7.01952 4.94447 7.99977 4.94447Z"
                  fill="#BAB9BE"
                />
              </svg>
              {{ item.text }}
            </p>
          </div>
          <div class="projects__card-inner">
            <div class="projects__card-lists">
              <div class="projects__card-lists--item" v-for="list in item.lists">
                <p class="projects__card-lists--title">{{ list.title }}</p>
                <p class="projects__card-lists--price">{{ list.price }}</p>
              </div>
            </div>
            <div class="projects__card-info">
              <p>{{ item.flat }} квартир</p>
              <p>{{ item.floor }} этажей</p>
              <p>{{ item.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.projects {
  font-family: var(--font-family);
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
  &__card:nth-child(3) {
    flex: 100%;
    @media (min-width: $tab) {
      flex: 48%;
    }
    @media (min-width: $desk) {
      grid-column: span 2;
    }
  }
  &__card:nth-child(3) .projects__card-tabs .tab:first-child {
    background: var(--1);
  }
  &__card:nth-child(4) {
    flex: 100%;
    @media (min-width: $tab) {
      flex: 48%;
    }
    @media (min-width: $desk) {
      grid-column: span 4;
    }
  }
  &__card:nth-child(4) .projects__card-tabs .tab:first-child {
    background: var(--1);
  }
  &__card .swiper-slide {
    width: 100% !important;
  }
  &__card-top-title:hover {
    color: var(--1);
  }
  &__card {
    display: flex;
    flex-direction: column;
    overflow: hidden;

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
    height: clamp(376px, vw(516px, $desktop), 516px);
    overflow: hidden;
    transition: height 0.25s;
  }
  &__card:hover .projects__card-wrapper {
    height: clamp(305px, vw(353px, $desktop), 353px);
  }

  &__card .swiper-slide {
    height: 100%;
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
    display: block;
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
  &__card-bottom,
  &__card-lists,
  &__card-info {
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

  &__card-inner {
    margin-top: clamp(11px, vw(15px, $desktop), 15px);
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition:
      height 0.25s,
      opacity 0.25s;
  }
  &__card:hover .projects__card-inner,
  &__card--open .projects__card-inner {
    opacity: 1;
    height: 150px;
  }
  &__card-lists {
    display: flex;
    flex-direction: column;
    gap: clamp(8px, vw(10px, $desktop), 10px);
    margin-bottom: clamp(16px, vw(20px, $desktop), 20px);
  }
  &__card-lists--item {
    display: inherit;
    justify-content: space-between;
    align-items: center;
    gap: clamp(16px, vw(20px, $desktop), 20px);
  }
  &__card-lists--title {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--1);
  }
  &__card-lists--text {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    text-align: right;
    color: var(--100);
  }
  &__card-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: clamp(35px, vw(40px, $desktop), 40px);
  }
  &__card-info p {
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--60);
  }
}
</style>
