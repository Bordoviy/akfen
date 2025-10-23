<script setup>
import { onMounted, ref, nextTick } from 'vue'
import Tab from '@/components/Tab.vue'

const salesContainers = ref([])

defineProps({
  title: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  nextTick(() => {
    salesContainers.value.forEach((el) => {
      if (!el) return
      new Swiper(el, {
        loop: true,
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true,
        },
      })
    })
  })
})

const salesCards = [
  {
    title: 'Коммерческие помещения',
    price: '3,8 млн',
    img: '/imgs/sales/img1.png',
    categories: [{ title: 'ЖК “Sun City“"' }, { title: 'ЖК "Калининград-Сити"' }],
    href: '#',
  },
  {
    title: 'Парковочные места',
    price: '1.3млн',
    img: '/imgs/sales/1.jpg',
    categories: [{ title: ' ЖК “Калининград City”' }, { title: 'ЖК “Sun City“' }],
    href: '#',
  },
]
</script>

<template>
  <div class="sales mt-110">
    <div class="container">
      <h2 class="sales__title default-title">{{ title }}</h2>
      <div class="sales__inner">
        <div class="sales__card" v-for="(item, index) in salesCards" :key="index">
          <div class="sales__card-wrapper">
            <div class="sales__card-wrapper-inner">
              <div class="sales__card-ob">
                <img :src="item.img" loading="lazy" decoding="async" />
              </div>
            </div>

            <div class="sales__card-tabs">
              <Tab v-for="(term, i) in item.categories" :key="i" :title="term.title" />
            </div>
          </div>
          <div class="sales__card-top">
            <p class="sales__card-top-title">{{ item.title }}</p>
            <p class="sales__card-top-price">от {{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.sales {
  font-family: var(--font-family);
  &__inner {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    flex-direction: column;
    @media (min-width: $tab) {
      flex-direction: row;
    }
    @media (min-width: $desk) {
    }
  }
  &__card .swiper-slide {
    width: 100% !important;
    overflow: hidden;
  }
  &__card-wrapper {
    position: relative;
    border-radius: 24px;
  }
  &__card-tabs {
    position: absolute;
    left: clamp(12px, vw(16px, $desktop), 16px);
    top: clamp(12px, vw(16px, $desktop), 16px);
    display: flex;
    gap: clamp(4px, vw(4px, $desktop), 4px);
    flex-wrap: wrap;
    z-index: 1;
  }
  &__card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // min-height: 380px;
    @media (min-width: $tab) {
      // min-height: 421px;
      max-height: 386px;
    }
    @media (min-width: $desk) {
      // min-height: unset;
      min-height: clamp(380px, vw(547px, $desktop), 547px);
      max-height: 747px;
    }
  }
  &__card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: clamp(6px, vw(8px, $desktop), 8px);
    margin-top: clamp(16px, vw(20px, $desktop), 20px);
    flex-wrap: wrap;
    @media (min-width: $desk) {
      flex-wrap: nowrap;
    }
  }
  &__card-top-title {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &__card-top-price {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    text-align: right;
    color: var(--100);
  }
  &__card {
    ::v-deep .swiper-pagination-bullet {
      width: clamp(4px, vw(6px, $desktop), 6px);
      height: clamp(4px, vw(6px, $desktop), 6px);
      background: var(--color);
      opacity: 0.7;
    }

    ::v-deep .swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
  &__card-ob {
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>
