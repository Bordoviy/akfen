<script setup>
const planingInfo = {
  title: 'Планируем и реализуем',
  text: `Лучше слов о компании говорят реализованные ее силами проекты. В биографии компании «Акфен» множество значимых для города и области построек, которые говорят о ее надежности, социальной ответственности и высоком уровне. Важным событием не только для компании, но и для всего региона стало строительство Центра греко-римской борьбы. Особой гордостью компании является строительство нового здания Школы-интерната №1. Этот проект ярко демонстрирует, что «Акфен» не просто возводит жилье, а комплексно подходит к развитию городской инфраструктуры, вкладываясь в будущее подрастающего поколения и создавая важнейшие социальные объекты.

Возрождение исторического центра и забота о людях

Проявляя уважение к истории города, компания взялась за амбициозный проект по преобразованию территории бывшей кондитерской фабрики в центре Калининграда. Здесь появится элитный апарт-отель, культурной доминантой которого станут два исторических объекта: башня «Врангель» и здание Врангелевского кирасирского полка.`,
}

import { computed } from 'vue'

// computed для текста с <br>
const formattedText = computed(() => {
  return planingInfo.text.replace(/\n/g, '<br>')
})
</script>

<template>
  <div class="planing mt-110">
    <div class="container">
      <div class="planing__inner">
        <h2 class="planing__title">{{ planingInfo.title }}</h2>
        <p class="planing__text" v-html="formattedText"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.planing {
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
  &__title {
    font-weight: 600;
    font-size: clamp(30px, vw(30px, $desktop), 42px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
    flex: 1;
  }
  &__text {
    flex: 2;
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
  }
}
</style>
