<script setup>
import { onMounted, ref, nextTick } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'
import Finishing from '@/layouts/apartment/Finishing.vue'
import Cc from '@/layouts/Cc.vue'

const apartContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    const el = apartContainer.value
    if (!el) return
    new Swiper(el, {
      loop: true,
      navigation: {
        nextEl: el.querySelector('.ap__button-next--desktop'),
        prevEl: el.querySelector('.ap__button-prev--desktop'),
      },
    })
  })
})

const ApartCard = {
  tabs: ['С балконом', 'У моря'],
  title: 'Квартира 502',
  subtitle: 'ЖК “Калининград-Сити” Дом 3',
  oldPrice: '16 849 000 ₽',
  newPrice: '12 849 000 ₽',
  from: '88 245 руб',
  file: '#',
  imgs: [
    { img: '/imgs/sp1.png' },
    { img: '/imgs/sp1.png' },
    { img: '/imgs/sp1.png' },
    { img: '/imgs/sp1.png' },
  ],
  code: 'id 982',
  square: '71.92 м²',
  count: '2 комнаты',
  floor: '4 из 32 этажей',
  checkIn: 'I квартал 2025',
}
</script>

<template>
  <Breadcrumbs />
  <div class="apartment">
    <div class="container">
      <div class="apartment__inner">
        <div class="apartment__main">
          <div class="apartment__left swiper" ref="apartContainer">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide apartment__card"
                v-for="(img, imgIndex) in ApartCard.imgs"
                :key="imgIndex"
              >
                <img :src="img.img" loading="lazy" decoding="async" />
                <img src="/imgs/comp.svg" alt="" />
              </div>
            </div>
            <div class="swiper-controls">
              <div class="swiper-button-prev ap__button-prev--desktop">
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
              <div class="swiper-button-next ap__button-next--desktop">
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
          <div class="apartment__right">
            <div class="apartment__right-top">
              <div class="apartment__tabs">
                <span
                  class="apartment__tabs-item"
                  v-for="(item, index) in ApartCard.tabs"
                  :key="index"
                  >{{ item }}
                </span>
              </div>
              <div class="apartment__body">
                <h2 class="apartment__title">{{ ApartCard.title }}</h2>
                <p class="apartment__subtitle">{{ ApartCard.subtitle }}</p>
                <span class="apartment__prices">
                  <p class="apartment__price-item apartment__price-new">{{ ApartCard.newPrice }}</p>
                  <p class="apartment__price-item apartment__price-old">{{ ApartCard.oldPrice }}</p>
                </span>
                <p class="apartment__from">В ипотеку от {{ ApartCard.from }}</p>
                <div class="apartment__dl">
                  <dl>
                    <dt>Код квартиры</dt>
                    <dd>{{ ApartCard.code }}</dd>
                  </dl>
                  <dl>
                    <dt>Площадь квартиры</dt>
                    <dd>{{ ApartCard.square }}</dd>
                  </dl>
                  <dl>
                    <dt>Количество комнат</dt>
                    <dd>{{ ApartCard.count }}</dd>
                  </dl>
                  <dl>
                    <dt>Этаж</dt>
                    <dd>{{ ApartCard.floor }}</dd>
                  </dl>
                  <dl>
                    <dt>Заселение</dt>
                    <dd>{{ ApartCard.checkIn }}</dd>
                  </dl>
                  <a href="#all" class="apartment__dl-all">все характеристики</a>
                </div>
              </div>
              <div class="apartment__bottom">
                <Button>Забронировать квартиру</Button>
                <a
                  class="apartment__file"
                  v-if="ApartCard.file"
                  :href="ApartCard.file"
                  target="_blank"
                >
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
                    <path
                      d="M33 11H41.25L30.25 0V8.25C30.25 9.7625 31.4875 11 33 11Z"
                      fill="#BAB9BE"
                    />
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
                  Скачать планировку в pdf
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="apartment__all mt-110">
          <p class="apartment__all-title" id="all">Все характеристики</p>
          <div class="apartment__all-inner">
            <dl>
              <dt>Площадь квартиры</dt>
              <dd>{{ ApartCard.code }}</dd>
            </dl>
            <dl>
              <dt>С/У</dt>
              <dd>{{ ApartCard.square }}</dd>
            </dl>
            <dl>
              <dt>Отделка</dt>
              <dd>{{ ApartCard.count }}</dd>
            </dl>
            <dl>
              <dt>Кухня</dt>
              <dd>{{ ApartCard.floor }}</dd>
            </dl>
            <dl>
              <dt>Планировка</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Количество комнат</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Гостиная</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Холл</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Этаж</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Название комнаты</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Проект</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Спальня</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Заселение</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Тип недвижимости</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Лоджия</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Номер квартиры</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>Код</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
            <dl>
              <dt>До моря</dt>
              <dd>{{ ApartCard.checkIn }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Cc></Cc>
  <Finishing></Finishing>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.apartment {
  &__inner {
  }
  &__main {
    display: flex;
    gap: clamp(20px, vw(20px, $desktop), 20px);

    flex-direction: column;
    @media (min-width: $tab-inner) {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  &__left {
    flex: 1;
    @media (min-width: $desk) {
      flex: 1.3;
    }
  }
  &__right {
    flex: 1;
  }
  &__right-top {
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__tabs {
    display: flex;
    gap: clamp(6px, vw(6px, $desktop), 6px);
  }
  &__tabs-item {
    border-radius: 10px;
    padding: clamp(6px, vw(10px, $desktop), 10px) clamp(10px, vw(16px, $desktop), 16px);
    backdrop-filter: blur(40px);
    background: var(--seryy);
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--100);
  }
  &__body {
  }
  &__title {
    font-weight: 600;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(8px, vw(8px, $desktop), 8px);
  }
  &__subtitle {
    font-weight: 400;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(20px, vw(24px, $desktop), 24px);
  }
  &__prices {
    display: flex;
    gap: clamp(10px, vw(12px, $desktop), 12px);
    margin-bottom: 2px;
    align-items: center;
  }
  //   &__price-item {

  //   }
  &__price-new {
    font-weight: 600;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--1);
  }
  &__price-old {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    text-decoration: line-through;
    color: var(--60);
  }
  &__from {
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: #6c6f71;
    margin-bottom: clamp(20px, vw(24px, $desktop), 24px);
  }
  &__dl {
  }
  &__dl-all {
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    text-align: right;
    width: 100%;
    color: var(--100);
  }
  &__dl dl,
  &__all dl {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--obvodka);
    padding-bottom: clamp(10px, vw(10px, $desktop), 10px);
  }
  &__dl dl:not(:last-child),
  &__all dl:not(:last-child) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--obvodka);
    margin-bottom: clamp(8px, vw(10px, $desktop), 10px);
  }
  &__dl dt,
  &__all dt {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: #6c6f71;
  }
  &__dl dd,
  &__all dd {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: #161717;
  }
  &__bottom {
    display: flex;
    gap: clamp(12px, vw(20px, $desktop), 20px);
    flex-wrap: wrap;

    // @media (min-width: $tab) {
    // }
    // @media (min-width: $desk) {
    //   flex-direction: row;
    // }
  }
  &__file {
    display: flex;
    align-items: center;
    gap: clamp(12px, vw(20px, $desktop), 12px);
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: #161717;
  }

  &__all {
  }
  &__all-title {
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
    font-weight: 600;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
  &__all-inner {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 20px;
    @media (min-width: $tab-inner) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: $desk) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  & .btn-default:hover {
    border: 1px solid #161717;
  }

  .swiper-wrapper {
    position: relative;
    margin-bottom: 45px;
    @media (min-width: $desk) {
      margin-bottom: 0;
    }
  }
  .swiper-wrapper img:first-child {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: clamp(400px, vw(400px, $desktop), 400px);
    @media (min-width: $tab-inner) {
      min-height: clamp(445px, vw(445px, $desktop), 445px);
    }
  }
  .swiper-wrapper img:last-child {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .swiper-controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: clamp(10px, vw(20px, $desktop), 20px);
    left: clamp(10px, vw(20px, $desktop), 20px);
    bottom: 0;

    @media (min-width: $desk) {
      bottom: 50%;
    }
  }

  & .ap__button-next--desktop svg path,
  & .ap__button-prev--desktop svg path {
    stroke: #fff; // или текущий цвет, который вы хотите
    stroke-width: 1.4;
    transition: stroke 0.3s ease;
  }
  // & .ap__button-next--desktop,
  // & .ap__button-prev--desktop {
  //   background: var(--2);

  //   @media (min-width: $desk) {
  //     background: var(--color);
  //   }
  // }
  & .swiper .swiper-controls .swiper-button-next,
  .swiper .swiper-controls .swiper-button-prev {
    border: 1px solid transparent;
    width: clamp(24px, vw(36px, $desktop), 36px);
    height: clamp(24px, vw(36px, $desktop), 36px);
  }
  & .swiper .swiper-controls .swiper-button-next:hover svg path,
  & .swiper .swiper-controls .swiper-button-prev:hover svg path {
    stroke: #3343a9;
  }
  & .swiper .swiper-controls .swiper-button-next:hover {
    background: var(--color);
  }
  & .swiper .swiper-controls .swiper-button-prev:hover {
    background: var(--color);
  }
}
</style>
