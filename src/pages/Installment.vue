<script setup>
import { ref } from 'vue'

import Breadcrumbs from '@/components/Breadcrumbs.vue'
import FaqBlock from '@/layouts/mortgage-installment/FaqBlock.vue'
import MainBlock from '@/layouts/mortgage-installment/MainBlock.vue'
import VariationsBlock from '@/layouts/mortgage-installment/VariationsBlock.vue'
import AdventBlock from '@/layouts/mortgage-installment/AdventBlock.vue'
import CallbackBlock from '@/layouts/mortgage-installment/CallbackBlock.vue'
import Maps from '@/components/Maps.vue'
import Projects from '@/layouts/Projects.vue'

const variationsItems = [
  {
    title: 'Квартиры',
    text: 'Наш ипотечный брокер поможет оформить ипотеку на выгодных условиях и быстро подберет для Вас индивидуальное предложение',
    img: '/imgs/mort-inst/ii-1.svg',
    items: [
      { title: 'от 50%', text: 'Первоначальный взнос' },
      { title: 'от 0%', text: 'Процентная ставка' },
      { title: 'до 6 мес.', text: 'Макс. cрок рассрочки' },
    ],
  },
  {
    title: 'Паркинг',
    text: 'Возможности использования материнского капитала в качестве первоначального взноса',
    img: '/imgs/mort-inst/ii-2.svg',
    items: [
      { title: 'от 50%', text: 'Первоначальный взнос' },
      { title: 'от 0%', text: 'Процентная ставка' },
      { title: 'до 6 мес.', text: 'Макс. cрок рассрочки' },
    ],
  },
  {
    title: 'Кладовые',
    text: 'Собственное жилье в рассрочку с комфортными платежами без переплат',
    img: '/imgs/mort-inst/ii-3.svg',
    items: [
      { title: 'от 50%', text: 'Первоначальный взнос' },
      { title: 'от 0%', text: 'Процентная ставка' },
      { title: 'до 6 мес.', text: 'Макс. cрок рассрочки' },
    ],
  },
]

const adventItems = [
  {
    text: 'Выгодные предложения и низкие ставки',
    img: '/imgs/mort-inst/aa-1.svg',
  },
  {
    text: 'Одобрение ипотеки в короткие сроки',
    img: '/imgs/mort-inst/aa-2.svg',
  },
  {
    text: 'Онлайн-анкета для всех банков сразу',
    img: '/imgs/mort-inst/aa-3.svg',
  },
  {
    text: 'Персональный менеджер для сопровождения',
    img: '/imgs/mort-inst/aa-4.svg',
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
    :title="'Рассрочка: все возможно!'"
    :description="'Мы создали для вас гибкие условия покупки, чтобы мечта о своей квартире исполнилась уже сегодня!'"
    :btn="btnText.text2"
    :img="'/imgs/mort-inst/image2.png'"
    :items="[
      { title: '3 способа', text: 'погашения рассрочки, которые будут удобны каждому' },
      { title: 'Условие', text: 'которое коротко и выгодно показывает вариант рассрочки' },
    ]"
  />
  <VariationsBlock :title="'Предоставляем рассрочку на'" :items="variationsItems" />
  <AdventBlock :title="'Преимущества рассрочки'" :items="adventItems" />
  <FaqBlock :items="faqList" />
  <Projects></Projects>
  <CallbackBlock :isblue="true" />
  <Maps></Maps>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.company {
}
</style>
