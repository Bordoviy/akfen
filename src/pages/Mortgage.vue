<script setup>
import { ref } from 'vue'

import Breadcrumbs from '@/components/Breadcrumbs.vue'
import FaqBlock from '@/layouts/mortgage-installment/FaqBlock.vue'
import MainBlock from '@/layouts/mortgage-installment/MainBlock.vue'
import VariationsBlock from '@/layouts/mortgage-installment/VariationsBlock.vue'
import AdventBlock from '@/layouts/mortgage-installment/AdventBlock.vue'
import Cc from '@/layouts/Cc.vue'

const variationsItems = [
  {
    title: 'Название',
    text: 'Наш ипотечный брокер поможет оформить ипотеку на выгодных условиях и быстро подберет для Вас индивидуальное предложение',
    img: '/imgs/mort-inst/i-1.svg',
    items: [
      { title: 'от 20%', text: 'Первоначальный взнос' },
      { title: 'от 6%', text: 'Процентная ставка' },
      { title: '30 лет', text: 'Макс. cрок кредита' },
      { title: '6 млн', text: 'Макс. сумма кредита, ₽' },
    ],
  },
  {
    title: 'Материнский капитал',
    text: 'Возможности использования материнского капитала в качестве первоначального взноса',
    img: '/imgs/mort-inst/i-2.svg',
    items: [
      { title: 'от 20%', text: 'Первоначальный взнос' },
      { title: 'от 6%', text: 'Процентная ставка' },
      { title: '30 лет', text: 'Макс. cрок кредита' },
      { title: '6 млн', text: 'Макс. сумма кредита, ₽' },
    ],
  },
  {
    title: 'Рассрочка',
    text: 'Собственное жилье в рассрочку с комфортными платежами без переплат',
    img: '/imgs/mort-inst/i-3.svg',
    items: [
      { title: 'от 20%', text: 'Первоначальный взнос' },
      { title: 'от 6%', text: 'Процентная ставка' },
      { title: '30 лет', text: 'Макс. cрок кредита' },
      { title: '6 млн', text: 'Макс. сумма кредита, ₽' },
    ],
  },
]

const adventItems = [
  {
    text: 'Выгодные предложения и низкие ставки',
    img: '/imgs/mort-inst/a-1.svg',
  },
  {
    text: 'Одобрение ипотеки в короткие сроки',
    img: '/imgs/mort-inst/a-2.svg',
  },
  {
    text: 'Онлайн-анкета для всех банков сразу',
    img: '/imgs/mort-inst/a-3.svg',
  },
  {
    text: 'Персональный менеджер для сопровождения',
    img: '/imgs/mort-inst/a-4.svg',
  },
]

const faqList = ref([
  {
    question: 'Как работает этот сайт?',
    answer: 'Этот сайт использует Vue 3 для создания реактивного интерфейса.',
  },
  {
    question: 'Могу ли я использовать это бесплатно?',
    answer: 'Да, вы можете использовать его бесплатно.',
  },
  {
    question: 'Где я могу получить поддержку?',
    answer: 'Вы можете обратиться в нашу службу поддержки.',
  },
])

const btnText = {
  text1: 'Рассчитать ипотеку',
  text2: 'Выбрать квартиру',
}
</script>

<template>
  <Breadcrumbs />
  <MainBlock
    :title="'Ипотека - возможность исполнить мечту'"
    :description="'Уникальные ипотечные программы и специальные условия от ведущих банков. Просто заполните анкету и получите одобрение. Всего один шаг, и квартира будет ваша.'"
    :btn="btnText.text1"
    :img="'/imgs/mort-inst/image1.png'"
    :items="[
      { title: '98% одобрений', text: 'высокая вероятность получить ипотеку' },
      { title: '37 партнёров', text: 'подберём лучшие условия для вас в банках' },
    ]"
  />
  <VariationsBlock :title="'Варианты ипотеки'" :items="variationsItems" />
  <Cc></Cc>
  <AdventBlock :title="'Преимущества ипотеки'" :items="adventItems" />
  <FaqBlock :items="faqList" />
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.company {
}
</style>
