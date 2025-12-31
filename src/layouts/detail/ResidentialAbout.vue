<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const AboutProject = [
  {
    id: 'kaliningrad-city',
    about:
      'Жилой комплекс «Kaliningrad City» на ул. Гайдара, 90 — это масштабный проект комфорт-класса, который кардинально меняет представление о современном жилье в Калининграде. Здесь сочетаются уникальная архитектура, инновационные технологии и продуманная инфраструктура, создавая идеальные условия для комфортной жизни',
    lists: [
      { title: '480 квартир', text: 'количество квартир' },
      { title: '25 этажей', text: 'количество этажей' },
      { title: 'от 40,37 m2', text: 'площадь квартир' },
      { title: 'сдача 1 квартал 2028 года', text: 'конец строительства' },
      { title: '2 корпуса', text: 'количество корпусов' },
    ],
  },
  {
    id: 'sun-city',
    about:
      'Жилой комплекс «Sun City» на Елизаветинской, 47 — это современный и комфортабельный проект в развивающемся микрорайоне «Сельма» Калининграда. Он идеально подходит для тех, кто ценит удобство, качество и продуманную инфраструктуру.',
    lists: [
      { title: '285 квартир', text: 'количество квартир' },
      { title: '15 этажей', text: 'количество этажей' },
      { title: 'от 45.6 m2', text: 'площадь квартир' },
      { title: 'сдача 1 квартал 2026 года', text: 'конец строительства' },
      { title: '3 корпуса', text: 'количество корпусов' },
    ],
  },
  {
    id: 'avrora',
    about:
      'АВРОРА — это гармония городского комфорта и загородного уюта. Это место, где начинается ваше счастливое будущее, пространство для жизни, где каждая деталь создана для комфортного проживания. Современная архитектура, продуманная инфраструктура, зеленые парковые зоны и выгодное расположение — здесь есть всё для воплощения ваших стремлений.',
    lists: [
      { title: '144 квартир', text: 'количество квартир' },
      { title: '7 этажей', text: 'количество этажей' },
      { title: 'от 39,85 м2', text: 'площадь квартир' },
      { title: 'сдача 3 квартал 2027 г', text: 'конец строительства' },
      { title: '1 корпус', text: 'количество корпусов' },
    ],
  },
]

const route = useRoute()

const project = computed(() => {
  return AboutProject.find((p) => p.id === route.params.id) || null
})
</script>

<template>
  <div class="rc-about mt-110">
    <div class="container">
      <div class="rc-about__inner">
        <h2 class="rc-about__title default-title">О проекте</h2>
        <div class="rc-about__wrapper">
          <p
            class="rc-about__text"
            v-for="(paragraph, index) in project.about.split('\n\n')"
            :key="index"
          >
            {{ paragraph }}
          </p>
          <div class="rc-about__lists">
            <div class="rc-about__item" v-for="(item, index) in project.lists" :key="index">
              <p class="rc-about__item-title">{{ item.title }}</p>
              <p class="rc-about__item-text">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.rc-about {
  &__inner {
    display: flex;
    gap: clamp(16px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__title {
    flex: 1;
    margin-bottom: 0;
  }
  &__wrapper {
    flex: 2;
  }
  &__text {
    font-weight: 400;
    font-size: clamp(16px, vw(16px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
    margin-bottom: clamp(40px, vw(40px, $desktop), 40px);
  }
  &__lists {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: clamp(22px, vw(30px, $desktop), 30px);
    column-gap: clamp(16px, vw(20px, $desktop), 20px);
  }
  &__item {
  }
  &__item-title {
    font-weight: 400;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(4px, vw(4px, $desktop), 4px);
  }
  &__item-text {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--60);
  }
}
</style>
