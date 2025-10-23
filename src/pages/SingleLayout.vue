<script setup>
// import { useRoute } from 'vue-router'
// const { params } = useRoute()
// const slug = params.slug
import SingleTop from '@/layouts/blog/SingleTop.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const SingleItems = {
  title: 'Заголовок статьи, новостей или ещё чего-то',
  text: 'Описание. Строительная компания МПК начала строительство своего первого дома в 2007 году. За 15 лет нашей усердной работы более 5000 семей стали счастливыми обладателями новых квартир в Калининграде и Зеленоградске',
  date: '14.02.2024',
  readtime: '5',
  views: '5 852',
  imgWrap: '/imgs/single/singleWrap.png',
  author: 'Фамилия Имя Отчество',
  descr:
    'Чем занимается человек в компании. Например, менеджер по работе с клиентамиобсудить решение',
  photo: '/imgs/single/frame2.png',
}
</script>

<template>
  <Breadcrumbs />
  <div class="single">
    <div class="container">
      <SingleTop :items="SingleItems"></SingleTop>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';
</style>
