<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { onMounted, nextTick } from 'vue'
import Tab from '@/components/Tab.vue'

// defineProps({
//   title: {
//     type: String,
//     required: true,
//   },
// })

const rcContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!rcContainer.value) return
    new Swiper(rcContainer.value, {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: rcContainer.value.querySelector('.swiper-button-next'),
        prevEl: rcContainer.value.querySelector('.swiper-button-prev'),
      },
    })
  })
})

const allProjects = [
  {
    id: 'kaliningrad-city',
    title: 'ЖК “Калининград-Сити”',
    address: 'г. Калининград, Гайдара 90',
    text: 'до центра на авто - 5 мин',
    price: '5 700 000',
    file: '',
    imgs: [
      '/imgs/rc/k1.jpg',
      '/imgs/rc/k2.jpg',
      '/imgs/rc/k3.jpg',
      '/imgs/rc/k4.jpg',
      '/imgs/rc/k5.jpg',
      '/imgs/rc/4.jpg',
      '/imgs/rc/3.1.jpg',
    ],
    // description: 'Подробное описание жилого комплекса...',
    categories: ['топовая локация', '0 % рассрочка', 'подземный паркинг', 'вид на город'],
  },
  {
    id: 'sun-city',
    title: 'ЖК “Sun City“',
    address: 'г. Калининград, Елизаветинская, 47',
    text: 'до центра на авто - 5 мин',
    price: '6 732 600',
    file: '',
    imgs: [
      '/imgs/rc/9.jpg',
      '/imgs/rc/10.jpg',
      '/imgs/rc/11.jpg',
      '/imgs/rc/12.jpg',
      '/imgs/rc/13.jpg',
      '/imgs/rc/14.jpg',
      '/imgs/rc/15.jpg',
      '/imgs/rc/16.jpg',
      '/imgs/rc/17.jpg',
      '/imgs/rc/18.jpg',
      '/imgs/rc/19.jpg',
      '/imgs/rc/20.jpg',
      '/imgs/rc/2.1.jpg',
      '/imgs/rc/2.2.jpg',
      '/imgs/rc/2.3.jpg',
      '/imgs/rc/2.4.jpg',
    ],
    // description: 'Подробное описание жилого комплекса...',
    categories: ['сдача в 2026', 'подземный паркинг'],
  },
  {
    id: 'more-life',
    title: 'ЖК “МореLife“',
    address: 'г. Калининград, ул.Новоставского',
    text: 'до Калининграда - 30 мин',
    price: '7 120 000',
    file: '',
    imgs: [
      '/imgs/rc/more1.jpg',
      '/imgs/rc/more2.jpg',
      '/imgs/rc/more3.jpg',
      '/imgs/rc/more4.jpg',
      '/imgs/rc/more5.jpg',
      '/imgs/rc/more6.jpg',
    ],
    // description: 'Подробное описание жилого комплекса...',
    categories: ['топовая локация', '0 % рассрочка', 'менее 400 метров до моря', 'новый пляж'],
  },
  {
    id: 'avrora',
    title: 'ЖК “Avrora“',
    address: 'г. Калининград, ул. Гурьева',
    text: 'до центра на авто - менее 15 мин',
    price: '6 451 050',
    file: '/files/avrora_05.pdf',
    imgs: [
      '/imgs/rc/slide1.jpeg',
      '/imgs/rc/slide2.jpeg',
      '/imgs/rc/slide3.jpeg',
      '/imgs/rc/slide4.jpeg',
      '/imgs/rc/slide5.jpeg',
      '/imgs/rc/slide6.jpeg',
    ],
    // description: 'Подробное описание жилого комплекса...',
    categories: ['топовая локация', ' 0 % рассрочка', 'в центре Гурьевска', 'рядом парк'],
  },
]

const route = useRoute()
const project = computed(() => allProjects.find((p) => p.id === route.params.id))
</script>

<template>
  <div class="rc">
    <div class="container">
      <div class="rc__inner" v-if="project">
        <div class="rc__main swiper" ref="rcContainer">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img, i) in project.imgs" :key="i">
              <img :src="img" alt="#" loading="lazy" decoding="async" />
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
        </div>
        <div class="rc__wrapper">
          <div class="rc__wrapper-categories">
            <Tab v-for="(cat, index) in project.categories" :key="index" :title="cat" />
          </div>
          <div class="rc__wrapper-main">
            <div class="rc__wrapper-top">
              <h1 class="rc__wrapper-title">{{ project.title }}</h1>
              <p class="rc__wrapper-price">от {{ project.price }}</p>
            </div>
            <div class="rc__wrapper-bottom">
              <p class="rc__wrapper-text">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6673 8.58587C16.6673 13.5354 10.0007 17.7778 10.0007 17.7778C10.0007 17.7778 3.33398 13.5354 3.33398 8.58587C3.33398 6.89812 4.03636 5.27951 5.28661 4.08609C6.53685 2.89268 8.23254 2.22223 10.0007 2.22223C11.7688 2.22223 13.4645 2.89268 14.7147 4.08609C15.9649 5.27951 16.6673 6.89812 16.6673 8.58587Z"
                    fill="#BAB9BE"
                  />
                  <path
                    d="M9.99957 11.1111C11.2269 11.1111 12.2218 10.1162 12.2218 8.88891C12.2218 7.66161 11.2269 6.66669 9.99957 6.66669C8.77227 6.66669 7.77734 7.66161 7.77734 8.88891C7.77734 10.1162 8.77227 11.1111 9.99957 11.1111Z"
                    fill="white"
                  />
                </svg>
                {{ project.address }}
              </p>

              <p class="rc__wrapper-text">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="3" fill="#BAB9BE" />
                </svg>
                {{ project.text }}
              </p>
            </div>

            <a class="rc__wrapper-file" v-if="project.file" :href="project.file" target="_blank">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0C9.4875 0 8.25 1.2375 8.25 2.75V41.25C8.25 42.7625 9.4875 44 11 44H38.5C40.0125 44 41.25 42.7625 41.25 41.25V11L30.25 0H11Z"
                  fill="#F2F2F9"
                />
                <path d="M33 11H41.25L30.25 0V8.25C30.25 9.7625 31.4875 11 33 11Z" fill="#BAB9BE" />
                <path
                  d="M35.75 35.75C35.75 36.5063 35.1312 37.125 34.375 37.125H4.125C3.36875 37.125 2.75 36.5063 2.75 35.75V22C2.75 21.2437 3.36875 20.625 4.125 20.625H34.375C35.1312 20.625 35.75 21.2437 35.75 22V35.75Z"
                  fill="#DA1A1F"
                />
                <path
                  d="M8.74414 26.052C8.74414 25.689 9.03014 25.293 9.49077 25.293H12.0304C13.4604 25.293 14.7474 26.25 14.7474 28.0843C14.7474 29.8223 13.4604 30.7903 12.0304 30.7903H10.1948V32.2423C10.1948 32.7263 9.88677 32.9999 9.49077 32.9999C9.12777 32.9999 8.74414 32.7263 8.74414 32.2423V26.052ZM10.1948 26.6777V29.4167H12.0304C12.7674 29.4167 13.3504 28.7663 13.3504 28.0843C13.3504 27.3157 12.7674 26.6777 12.0304 26.6777H10.1948Z"
                  fill="white"
                />
                <path
                  d="M16.8996 32.9998C16.5366 32.9998 16.1406 32.8018 16.1406 32.3192V26.0739C16.1406 25.6793 16.5366 25.3919 16.8996 25.3919H19.4172C24.4415 25.3919 24.3315 32.9998 19.5162 32.9998H16.8996ZM17.5926 26.7339V31.6592H19.4172C22.3859 31.6592 22.5179 26.7339 19.4172 26.7339H17.5926Z"
                  fill="white"
                />
                <path
                  d="M26.116 26.8221V28.5697H28.9196C29.3156 28.5697 29.7116 28.9657 29.7116 29.3493C29.7116 29.7123 29.3156 30.0093 28.9196 30.0093H26.116V32.3179C26.116 32.7029 25.8424 32.9986 25.4574 32.9986C24.9734 32.9986 24.6777 32.7029 24.6777 32.3179V26.0727C24.6777 25.6781 24.9747 25.3907 25.4574 25.3907H29.317C29.801 25.3907 30.087 25.6781 30.087 26.0727C30.087 26.4247 29.801 26.8207 29.317 26.8207H26.116V26.8221Z"
                  fill="white"
                />
              </svg>
              Скачать презентацию проекта в pdf
            </a>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Проект не найден</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.rc {
  &__inner {
  }

  &__main {
    position: relative;
    border-radius: 30px;
  }
  & .swiper-slide {
    width: 100% !important;
  }
  & .swiper-slide img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    object-fit: cover;
    min-height: 320px;
    max-height: clamp(320px, vw(650px, $desktop), 650px);
    @media (min-width: $tab) {
      min-height: 420px;
    }

    @media (min-width: $desk) {
      min-height: unset;
    }
  }
  & .swiper-controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: clamp(10px, vw(20px, $desktop), 20px);
    left: clamp(10px, vw(20px, $desktop), 20px);
    bottom: 50%;
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

  &__wrapper {
    margin-top: clamp(20px, vw(30px, $desktop), 30px);
    display: flex;
    gap: clamp(16px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab) {
    }

    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__wrapper-categories {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: flex-start;
    max-height: 100px;
    margin-bottom: 13px;
    @media (min-width: $tab) {
      margin-bottom: 0;
    }
  }
  &__wrapper-categories .tab {
    // max-width: 85px;
    // max-height: 43px;
    backdrop-filter: blur(40px);
    background: var(--100);
    border-radius: 10px;
  }
  &__wrapper-main {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: clamp(12px, vw(12px, $desktop), 12px);
  }
  &__wrapper-top {
    display: inherit;
    gap: clamp(4px, vw(16px, $desktop), 16px);
    flex-direction: column;
    @media (min-width: $tab) {
      flex-direction: row;
    }
    @media (min-width: $desk) {
    }
  }
  &__wrapper-bottom {
    display: inherit;
    gap: clamp(8px, vw(24px, $desktop), 24px);
    flex-direction: column;
    @media (min-width: $tab) {
      flex-direction: row;
    }
    @media (min-width: $desk) {
    }
  }
  &__wrapper-title {
    font-weight: 600;
    font-size: clamp(30px, vw(42px, $desktop), 42px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
  &__wrapper-price {
    font-weight: 400;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
  &__wrapper-text {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--60);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  &__wrapper-text svg {
    width: clamp(16px, vw(20px, $desktop), 20px);
  }
  &__wrapper-file {
    width: 100%;
    display: inherit;
    align-items: center;
    gap: clamp(12px, vw(16px, $desktop), 16px);
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: #161717;
    @media (min-width: $tab) {
      width: clamp(350px, vw(350px, $desktop), 350px);
    }
    @media (min-width: $desk) {
    }
  }
  & .swiper-controls .rc__button-next--desktop,
  & .swiper-controls .rc__button-prev--desktop {
    box-shadow: 0 4px 10px 0 rgba(33, 32, 38, 0.14);
  }
}
</style>
