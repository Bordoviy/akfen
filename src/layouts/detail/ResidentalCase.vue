<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

const allProjects = [
  {
    id: 'sun-city',
    params: {
      src: 'https://smart-catalog.profitbase.ru/eco/catalog/projects/houses?filter=project:8286&filter=property.status:AVAILABLE',
      host: 'https://smart-catalog.profitbase.ru/eco',
      pbDomain: 'profitbase.ru',
      accountId: '3667',
      referrer: window.location.origin,
      pbApiKey: 'c573317dcd6ae60d94f0764d41d89462',
      isEmbedded: true,
    },
  },
  {
    id: 'kaliningrad-city',
    params: {
      src: 'https://smart-catalog.profitbase.ru/eco/catalog/house/91865#/catalog/house/91865/facades?facadeId=60537',
      host: 'https://smart-catalog.profitbase.ru/eco',
      pbDomain: 'profitbase.ru',
      accountId: '3667',
      referrer: window.location.origin,
      pbApiKey: 'c573317dcd6ae60d94f0764d41d89462',
      isEmbedded: true,
    },
  },
  {
    id: 'avrora',
    params: {
      src: 'https://smart-catalog.profitbase.ru/eco/catalog/house/147836#/catalog/house/147836/facades?facadeId=61280',
      host: 'https://smart-catalog.profitbase.ru/eco',
      pbDomain: 'profitbase.ru',
      accountId: '3667',
      referrer: window.location.origin,
      pbApiKey: 'c573317dcd6ae60d94f0764d41d89462',
      isEmbedded: true,
    },
  },
]

const route = useRoute()

// ищем проект по id из роута
const project = computed(() => allProjects.find((p) => p.id === route.params.id))

onMounted(() => {
  if (!project.value) return

  const script = document.createElement('script')
  script.src = 'https://cdn.profitbase.ru/smart/sw.js'
  script.async = true
  script.onload = () => {
    window.widget = ProfitbaseWidget()
    window.widget.init({
      embedElement: '#profitbase_front',
      params: project.value.params,
    })
  }
  document.body.appendChild(script)
})
</script>

<template>
  <div class="case mt-110">
    <div class="container">
      <div v-if="project" id="profitbase_front" style="height: 900px; width: 100%"></div>
      <div v-else></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';
</style>
