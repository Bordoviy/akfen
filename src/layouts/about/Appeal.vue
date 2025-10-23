<script setup>
const appealInfo = {
  title: 'Все учатся сами, но если не знаешь, лучше два раза спроси, чем один раз ошибись',
  text: 'Накопив большой опыт в сегменте строительства домов социальной направленности, компания начала реализовывать проекты уровня комфорт-класса. Такие дома предполагают более удобные квартиры, развитый паркинг, качественные малые архитектурные формы для детских площадок. Также огромное значение имеет планировка мест общего пользования. Инфраструктура района устраивается таким образом, чтобы обеспечить жителей домов всем необходимым в пешей доступности.',
  name: 'Байтаров Зейрали Мусаддинович',
  position: 'Директор компании Акфен',
  img: '/imgs/about/appeal-img.jpg',
}
</script>

<template>
  <div class="appeal mt-110">
    <div class="container">
      <div class="appeal__inner">
        <div class="appeal__img-wrapper">
          <img :src="appealInfo.img" :alt="appealInfo.title" loading="lazy" decoding="async" />
        </div>
        <div class="appeal__container">
          <div class="appeal__container-top">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="60" height="60" rx="30" fill="white" />
              <path
                d="M38.8609 42.4956C36.5652 42.4363 34.8574 41.5764 33.7375 39.9159C32.6737 38.1962 32.1417 36.18 32.1417 33.8672C32.1417 31.2579 32.6737 28.8562 33.7375 26.6621C34.8014 24.4086 36.1452 22.511 37.769 20.9691C39.4488 19.368 41.2406 18.2116 43.1444 17.5L46 22.0366C45.2161 22.511 44.3762 23.1929 43.4803 24.0825C42.5844 24.9127 41.7725 25.8318 41.0446 26.84C40.3167 27.7888 39.8128 28.708 39.5328 29.5975C40.6527 29.6568 41.6325 29.9533 42.4724 30.487C43.3123 31.0207 43.9843 31.762 44.4882 32.7108C44.9921 33.6003 45.2441 34.6974 45.2441 36.002C45.2441 38.1369 44.6002 39.7677 43.3123 40.8944C42.0805 42.0211 40.5967 42.5549 38.8609 42.4956ZM20.8031 42.4956C18.4514 42.4956 16.7157 41.6357 15.5958 39.9159C14.5319 38.1962 14 36.18 14 33.8672C14 31.2579 14.5319 28.8562 15.5958 26.6621C16.6597 24.4086 18.0035 22.511 19.6273 20.9691C21.3071 19.368 23.0709 18.2116 24.9186 17.5L27.7743 22.0366C27.0464 22.511 26.2345 23.1929 25.3386 24.0825C24.4427 24.9127 23.6308 25.8318 22.9029 26.84C22.175 27.7888 21.671 28.708 21.3911 29.5975C22.4549 29.6568 23.4068 29.9533 24.2467 30.487C25.1426 31.0207 25.8425 31.762 26.3465 32.7108C26.8504 33.6003 27.1024 34.6974 27.1024 36.002C27.1024 38.1369 26.4584 39.7677 25.1706 40.8944C23.8828 41.9618 22.4269 42.4956 20.8031 42.4956Z"
                fill="red"
              />
            </svg>

            <p class="appeal__container-title">{{ appealInfo.title }}</p>
          </div>
          <p class="appeal__container-text">{{ appealInfo.text }}</p>
          <div class="appeal__container-bottom">
            <p class="appeal__container-name">{{ appealInfo.name }}</p>
            <p class="appeal__container-pos">{{ appealInfo.position }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.appeal {
  background: var(--seryy);
  border-radius: 60px;
  &__inner {
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(50px, $desktop), 50px);
    border-radius: 60px;
    padding: clamp(40px, vw(60px, $desktop), 60px) clamp(25px, vw(40px, $desktop), 40px);
    @media (min-width: $tab-inner) {
      flex-direction: row;
    }
    @media (min-width: $desk) {
    }
  }
  &__img-wrapper {
    @media (min-width: $tab-inner) {
      max-width: 295px;
    }
  }
  &__img-wrapper img {
    border-radius: 20px;
    width: 100%;
    object-fit: cover;
    min-height: clamp(280px, vw(389px, $desktop), 389px);
    max-height: 390px;
    @media (min-width: $tab-inner) {
    }
    @media (min-width: $desk) {
      max-width: clamp(20px, vw(295px, $desktop), 295px);
    }
  }
  &__container {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__container-top {
    display: inherit;
    gap: clamp(22px, vw(24px, $desktop), 24px);
    align-items: flex-start;
    flex-direction: column;
    @media (min-width: $tab) {
      //
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__container-top svg {
    width: clamp(40px, vw(60px, $desktop), 60px);
    height: clamp(40px, vw(60px, $desktop), 60px);
  }
  &__container-title {
    font-weight: 600;
    font-size: clamp(30px, vw(42px, $desktop), 42px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
  &__container-top svg {
  }
  &__container-text {
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
  }
  &__container-bottom {
  }
  &__container-name {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: #161717;
    margin-bottom: clamp(4px, vw(4px, $desktop), 4px);
  }
  &__container-pos {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--60);
  }
}
</style>
