<script setup>
// import { useRoute } from 'vue-router'
// const { params } = useRoute()
// const slug = params.slug
import SingleTop from '@/layouts/blog/SingleTop.vue'
import SingleContainer from '@/layouts/blog/SingleContainer.vue'
import News from '@/layouts/News.vue'
import OtherApartment from '@/layouts/apartment/OtherApartment.vue'
import Projects from '@/layouts/Projects.vue'
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
  authorPhoto: '/imgs/single/frame2.png',
}
</script>

<template>
  <Breadcrumbs />

  <SingleTop :items="SingleItems"></SingleTop>
  <SingleContainer></SingleContainer>
  <Projects :title="'Проекты, которые упоминались'"></Projects>
  <OtherApartment :title="'Квартиры, которые упоминались'"></OtherApartment>
  <News :title="'Похожие статьи'"></News>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';
</style>
