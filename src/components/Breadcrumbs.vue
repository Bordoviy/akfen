<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// твои данные
const allProjects = [
  { id: 'kaliningrad-city', title: 'ЖК “Калининград-Сити”' },
  { id: 'sun-city', title: 'ЖК “Sun City“' },
  { id: 'mope-life', title: 'ЖК “МореLife“' },
  { id: 'avrora', title: 'ЖК “Avrora“' },
]

const route = useRoute()

const breadcrumbs = computed(() => {
  return route.matched.map((r) => {
    let name = r.meta.breadcrumb || 'Без названия'

    // если страница проект
    if (r.path === '/projects/:id' && route.params.id) {
      const project = allProjects.find((p) => p.id === route.params.id)
      if (project) name = project.title
    }

    return {
      path: r.path.includes(':id') ? route.fullPath : r.path, // чтоб ссылка работала
      name,
    }
  })
})
</script>

<template>
  <div class="breadcrumbs">
    <div class="container">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link
          :to="crumb.path"
          class="breadcrumb-link"
          :class="{ active: index === breadcrumbs.length - 1 }"
        >
          {{ crumb.name }}
        </router-link>

        <span v-if="index < breadcrumbs.length - 1" class="dot-separator">•</span>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/styles/index';

.breadcrumbs {
  // display: flex;
  margin-top: clamp(8px, vw(8px, $desktop), 8px);
  margin-bottom: clamp(16px, vw(16px, $desktop), 16px);
  // margin: 16px 0;

  .breadcrumb-link {
    text-decoration: none;
    font-weight: 400;
    font-size: clamp(15px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--100);

    &.active {
      color: var(--40);
      pointer-events: none;
      cursor: default;
    }
  }

  .dot-separator {
    color: var(--2);
    margin: 0 clamp(8px, vw(8px, $desktop), 8px);
    user-select: none;
    vertical-align: middle;
  }
}
</style>
