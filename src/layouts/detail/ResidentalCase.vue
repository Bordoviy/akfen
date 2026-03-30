<script setup>
import { useRoute } from 'vue-router'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const allProjects = [
  {
    id: 'elizavetinskiy',
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
    id: 'ogni-kaliningrada',
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
  {
    id: 'pionerskiy-bereg',
    params: {
      src: 'https://smart-catalog.profitbase.ru/eco/catalog/house/121896#/catalog/house/121896/facades?facadeId=60898',
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
const embedRef = ref(null)

// ищем проект по id из роута
const project = computed(() => allProjects.find((p) => p.id === route.params.id))

function clearWidget() {
  if (window.widget?.destroy) {
    window.widget.destroy()
  }

  window.widget = null

  if (embedRef.value) {
    embedRef.value.innerHTML = ''
  }
}

function loadWidgetScript() {
  if (typeof window.ProfitbaseWidget === 'function') {
    return Promise.resolve()
  }

  const existingScript = document.querySelector('script[data-profitbase-widget="true"]')
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', resolve, { once: true })
      existingScript.addEventListener('error', reject, { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.profitbase.ru/smart/sw.js'
    script.async = true
    script.dataset.profitbaseWidget = 'true'
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

async function initWidget() {
  clearWidget()

  if (!project.value) return

  await nextTick()
  await loadWidgetScript()

  if (!embedRef.value || !project.value) return

  window.widget = window.ProfitbaseWidget()
  window.widget.init({
    embedElement: '#profitbase_front',
    params: project.value.params,
  })
}

watch(() => route.params.id, initWidget, { immediate: true })
onBeforeUnmount(clearWidget)
</script>

<template>
  <div class="case mt-110">
    <div class="container">
      <div v-if="project" id="profitbase_front" ref="embedRef" style="height: 900px; width: 100%"></div>
      <div v-else></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';
</style>
