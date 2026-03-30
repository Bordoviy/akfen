<script setup>
import Hero from '@/layouts/Hero.vue'
import Projects from '@/layouts/Projects.vue'
import Offers from '@/layouts/Offers.vue'
import Sales from '@/layouts/Sales.vue'
import Office from '@/layouts/Office.vue'
import About from '@/layouts/About.vue'
import News from '@/layouts/News.vue'
import Other from '@/layouts/Other.vue'
import Objects from '@/layouts/Objects.vue'
import Cc from '@/layouts/Cc.vue'
import FindBlock from '@/layouts/FindBlock.vue'
</script>

<template>
  <Hero></Hero>
  <Projects></Projects>
  <FindBlock></FindBlock>
  <Cc></Cc>
  <Objects></Objects>
  <Offers></Offers>
  <Sales :title="'Мы также продаем'"></Sales>
  <About></About>
  <News :title="'Новости'"></News>
  <Other :title="'Радость, которую мы уже подарили'"></Other>
  <Office></Office>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.main {
  margin-top: 5px;
}
</style>
