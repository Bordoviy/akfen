<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true, // общее количество элементов
  },
  perPage: {
    type: Number,
    default: 6, // количество элементов на одной странице
  },
  currentPage: {
    type: Number,
    default: 1, // текущая страница
  },
})

const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const pages = computed(() => {
  if (totalPages.value <= 7) {
    return Array.from({ length: totalPages.value }, (_, index) => ({
      key: `page-${index + 1}`,
      type: 'page',
      value: index + 1,
    }))
  }

  const pagesToShow = new Set([1, totalPages.value])

  for (
    let page = Math.max(1, props.currentPage - 1);
    page <= Math.min(totalPages.value, props.currentPage + 1);
    page += 1
  ) {
    pagesToShow.add(page)
  }

  if (props.currentPage <= 3) {
    pagesToShow.add(2)
    pagesToShow.add(3)
  }

  if (props.currentPage >= totalPages.value - 2) {
    pagesToShow.add(totalPages.value - 1)
    pagesToShow.add(totalPages.value - 2)
  }

  const sortedPages = [...pagesToShow].sort((a, b) => a - b).filter((page) => page > 0)
  const items = []

  sortedPages.forEach((page, index) => {
    items.push({
      key: `page-${page}`,
      type: 'page',
      value: page,
    })

    const nextPage = sortedPages[index + 1]
    if (nextPage && nextPage - page > 1) {
      items.push({
        key: `ellipsis-${page}-${nextPage}`,
        type: 'ellipsis',
        value: '...',
      })
    }
  })

  return items
})

function goToPage(page) {
  if (page !== props.currentPage && page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <div class="container">
      <div class="pagination__inner">
        <button
          v-for="item in pages"
          :key="item.key"
          class="pagination__btn"
          :class="{ active: item.value === currentPage, 'pagination__btn--ellipsis': item.type === 'ellipsis' }"
          :disabled="item.type === 'ellipsis'"
          @click="item.type === 'page' && goToPage(item.value)"
        >
          {{ item.value }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/index';

.pagination {
  margin-top: clamp(20px, vw(30px, $desktop), 30px);

  &__inner {
    display: flex;
    gap: clamp(8px, vw(8px, $desktop), 8px);
    flex-wrap: wrap;
  }

  &__btn {
    width: clamp(40px, vw(48px, $desktop), 48px);
    border-radius: 8px;
    padding: clamp(10px, vw(10px, $desktop), 10px);
    border: 1px solid var(--obvodka);
    background-color: #fff;
    cursor: pointer;
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--80);
    transition: background-color 0.2s ease;

    &.active {
      background: var(--2);
      color: var(--color);
    }
    &:hover {
      background: var(--2);
      color: var(--color);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__btn--ellipsis {
    border-color: transparent;
    background: transparent;

    &:hover {
      background: transparent;
      color: var(--80);
    }
  }
}
</style>
