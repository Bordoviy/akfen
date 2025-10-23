<script setup>
defineProps({
  isMargin: { type: Boolean, required: true, default: true },
})
const aboutInfo = {
  title: 'О компании',
  image: '/imgs/about/img.png',
  paragraphs: [
    'Компания «Акфен» — один из ведущих застройщиков Калининградской области, основанный 13 ноября 2003 года.',
    'За 20+ лет работы компания построила более 100 тыс. м² жилья, обеспечив квартирами тысячи семей.',
    'Офис находится в Калининграде на ул. Челнокова, 52.',
    'Основным направлением деятельности компании — строительство домов с акцентом на инфраструктуру: паркинги, детские площадки, магазины в шаговой доступности.',
    'Социальные проекты: передача 10% квартир в новостройках городской администрации для сирот, инвалидов и переселенцев из аварийного жилья (около 200 квартир).',
    'Решение проблем обманутых дольщиков: с 2015 года компания обеспечила жильем 243 семьи в рамках 15-летней программы.',
    'Производство: собственный промышленный комплекс — фабрика окон и дверей, бетонный завод, автопарк и строительная техника. Это позволяет контролировать цены даже в кризис.',
    'География: основные проекты — в Калининграде (микрорайоны "Сельма", "Солнечный город", "Калининград-сити", ЖК "Премьера" и др.). Компания продолжает развивать мощности и планирует дальнейшее расширение за пределы Калининградской области.',
  ],
  cards: [
    { count: '45', name: 'проектов', text: 'выполнили за время существования компании' },
    { count: '6000', name: 'квартир', text: 'построили для наших<br>клиентов' },
    { count: '355 000', name: 'кв. метров', text: 'общая площадь построенных домов' },
  ],
}
</script>

<template>
  <div class="about" :class="{ 'mt-110': isMargin }">
    <div class="container">
      <div class="about__inner">
        <div class="about__left">
          <img class="about__left-img" :src="aboutInfo.image" alt="Фото компании" />
          <h2 class="about__left-title">{{ aboutInfo.title }}</h2>
        </div>
        <div class="about__right">
          <div class="about__right-top">
            <p v-for="(text, index) in aboutInfo.paragraphs" :key="index">{{ text }}</p>
          </div>
          <div class="about__right-bottom">
            <div class="about__right-card" v-for="(item, index) in aboutInfo.cards" :key="index">
              <div class="about__right-card-title">
                <span>
                  {{ item.count }}
                  <p>+</p>
                </span>
                {{ item.name }}
              </div>
              <p class="about__right-card-text" v-html="item.text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.about {
  font-family: var(--font-family);
  &__inner {
    display: flex;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__left {
    flex: 1;
    display: inherit;
    gap: clamp(10px, vw(12px, $desktop), 12px);
  }
  &__left-img {
    align-self: flex-start;
    width: 100%;
    max-width: clamp(42px, vw(54px, $desktop), 54px);
  }
  &__left-title {
    margin-top: clamp(2px, vw(3px, $desktop), 3px);
    font-weight: 600;
    font-size: clamp(30px, vw(42px, $desktop), 42px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
  &__right {
    flex: 2;
  }
  &__right-top {
    margin-bottom: clamp(18px, vw(20px, $desktop), 20px);
  }
  &__right-top p {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
  }
  &__right-top p:not(:nth-child(2)) {
    margin-bottom: clamp(20px, vw(24px, $desktop), 24px);
  }
  &__right-bottom {
    display: flex;
    gap: clamp(10px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab-inner) {
      flex-direction: row;
    }
    @media (min-width: $desk) {
    }
  }
  &__right-card {
    border-radius: 20px;
    padding: clamp(18px, vw(24px, $desktop), 24px);
    background: var(--seryy);
    @media (min-width: $tab-inner) {
      flex-direction: row;
      max-width: 213px;
      width: 100%;
    }
    @media (min-width: $desk) {
      max-width: 256px;
    }
  }
  &__right-card-title {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--100);
    display: flex;
    gap: 2px;
    align-items: center;
  }
  &__right-card-title span {
    display: inherit;
    gap: 2px;
    font-weight: 600;
    font-size: clamp(23px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--1);
  }
  &__right-card-title span p {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--1);
  }
  &__right-card-text {
    font-weight: 400;
    font-size: clamp(14px, vw(14px, $desktop), 15px);
    line-height: 146%;
    color: var(--80);
    text-align: left;
  }
}
</style>
