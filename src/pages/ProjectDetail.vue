<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ResidentialTop from '@/layouts/detail/ResidentialTop.vue'
import ResidentialAbout from '@/layouts/detail/ResidentialAbout.vue'
import ResidentialFeatures from '@/layouts/detail/ResidentialFeatures.vue'
import ResidentialAdvents from '@/layouts/detail/ResidentialAdvents.vue'
import ResidentialProgress from '@/layouts/detail/ResidentialProgress.vue'
import ResidentalCase from '@/layouts/detail/ResidentalCase.vue'
import Sales from '@/layouts/Sales.vue'
import Office from '@/layouts/Office.vue'
import Other from '@/layouts/Other.vue'
import News from '@/layouts/News.vue'
import Cc from '@/layouts/Cc.vue'
import InfrastructureMap from '@/layouts/detail/InfrastructureMap.vue'
</script>

<template>
  <Breadcrumbs />
  <ResidentialTop />
  <ResidentialAbout />
  <ResidentalCase />
  <!-- <ResidentialFeatures />
  <ResidentialAdvents /> -->
  <Cc></Cc>
  <InfrastructureMap></InfrastructureMap>
  <ResidentialProgress />
  <News></News>

  <!-- <Sales :title="'Кроме квартир'" /> -->

  <Other :title="'Радость, которую мы уже подарили'"></Other>
  <Office />
  <!-- <div class="container">
    <div class="inner">Страница в работе..</div>
  </div> -->
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

// .inner {
//   font-size: 42px;
//   text-align: center;
//   margin-top: 30px;
// }
</style>
