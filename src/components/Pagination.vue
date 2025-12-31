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
  const arr = []
  for (let i = 1; i <= totalPages.value; i++) {
    arr.push(i)
  }
  return arr
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
          v-for="page in pages"
          :key="page"
          class="pagination__btn"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
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
}
</style>
