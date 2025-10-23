<template>
  <div v-for="(item, index) in items" :key="index">
    <button @click="selectItem(item)">Показать "{{ item }}"</button>

    <p v-if="selected === item">Вы выбрали: {{ item }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const items = ['Один', 'Два', 'Три']
    const selected = ref(null)

    function selectItem(item) {
      selected.value = item
    }

    return {
      items,
      selected,
      selectItem,
    }
  },
}
</script>
