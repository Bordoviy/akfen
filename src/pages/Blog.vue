<script setup>
import { ref, computed } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Pagination from '@/components/Pagination.vue'
import NewsCard from '@/components/NewsCard.vue'

// Данные: добавил поле type: 'news' | 'article'
const newsCards = [
  {
    title: 'Скидка 10% на квартиры ко дню матери',
    date: 'до 14 апреля',
    img: '/imgs/news/img1.png',
    slug: 'skidka-10',
    type: 'news',
  },
  {
    title: 'Скидка 10% на квартиры ко дню матери',
    date: 'до 14 апреля',
    img: '/imgs/news/img2.png',
    type: 'news',
    slug: 'skidka-11',
  },
  {
    title: 'Руководство: как выбрать ипотеку',
    date: '12 апреля',
    img: '/imgs/news/img3.png',
    slug: 'kak-vybrat-ipoteku',
    type: 'article',
  },
  {
    title: 'Скидка 10% на квартиры ко дню матери',
    date: 'до 14 апреля',
    img: '/imgs/news/img1.png',
    slug: 'skidka-12',
    type: 'news',
  },
  {
    title: 'Ремонт под ключ: плюсы и минусы',
    date: '10 апреля',
    img: '/imgs/news/img2.png',
    slug: 'remont-pod-kluch',
    type: 'article',
  },
  {
    title: 'Скидка 10% на квартиры ко дню матери',
    date: 'до 14 апреля',
    img: '/imgs/news/img3.png',
    slug: 'skidka-13',
    type: 'news',
  },
]

const filterOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Новости', value: 'news' },
  { label: 'Статьи', value: 'article' },
]

const activeFilter = ref('all')

// пагинация
const currentPage = ref(1)
const itemsPerPage = 5

// вычисления
const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return newsCards
  return newsCards.filter((i) => i.type === activeFilter.value)
})

const totalItems = computed(() => filteredItems.value.length)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

// действия
function setFilter(value) {
  if (activeFilter.value === value) return
  activeFilter.value = value
  currentPage.value = 1
}
</script>

<template>
  <Breadcrumbs />
  <div class="blog">
    <div class="container">
      <div class="blog__inner">
        <h1 class="default-title blog__title">Блог</h1>

        <div class="blog__filters">
          <span
            v-for="opt in filterOptions"
            :key="opt.value"
            class="blog__filter-item"
            :class="{ active: activeFilter === opt.value }"
            @click="setFilter(opt.value)"
          >
            {{ opt.label }}
          </span>
        </div>

        <div class="blog__wrapper">
          <NewsCard :items="paginatedItems" :slider="false" />
        </div>
      </div>
    </div>
  </div>

  <Pagination
    :total="totalItems"
    :perPage="itemsPerPage"
    :currentPage="currentPage"
    @update:currentPage="(page) => (currentPage = page)"
  />
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.blog {
  margin-top: clamp(0px, vw(8px, $desktop), 8px);

  &__filters {
    display: flex;
    gap: clamp(20px, vw(30px, $desktop), 30px);
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
  }

  &__filter-item {
    cursor: pointer;
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    color: var(--60);
    border-bottom: 1px dashed var(--60);
    &.active {
      color: var(--1);
      border-bottom-color: var(--1);
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: clamp(20px, vw(20px, $desktop), 20px);
    row-gap: clamp(20px, vw(20px, $desktop), 20px);

    @media (min-width: $tab) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: $desk) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
