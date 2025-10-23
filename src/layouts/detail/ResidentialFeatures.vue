<script setup>
import { ref } from 'vue'

// defineProps({
//   title: {
//     type: String,
//     required: true,
//   },
// })

const allfeatures = [
  {
    id: 'kaliningrad-city',
    title: 'Детская площадка',
    text: 'Текстовое описание',
    img: '/imgs/detail/a-1.png',
  },
  {
    id: 'kaliningrad-city',
    title: 'Рассрочка на 20 лет',
    text: 'Текстовое описание',
    img: '',
  },
  {
    id: 'kaliningrad-city',
    title: 'До станции метро 10 минут пешком',
    text: 'Текстовое описание',
    img: '/imgs/detail/a-2.png',
  },
  {
    id: 'kaliningrad-city',
    title: 'До станции метро 10 минут пешком',
    text: 'Текстовое описание',
    img: '/imgs/detail/a-3.png',
  },
  {
    id: 'kaliningrad-city',
    title: 'Парк внутри комплекса',
    text: 'Текстовое описание',
    img: '/imgs/detail/a-4.png',
  },
  {
    id: 'kaliningrad-city',
    title: 'Рассрочка на 20 лет',
    text: 'Текстовое описание',
    img: '',
  },
]

// const route = useRoute()
// const project = computed(() => allProjects.find((p) => p.id === route.params.id))
</script>

<template>
  <div class="features mt-110">
    <div class="container">
      <h2 class="features__title default-title">Особенности проекта</h2>
      <div class="features__inner">
        <div class="features__item" v-for="(item, index) in allfeatures" :key="index">
          <img
            class="features__item-img"
            v-if="item.img"
            :src="item.img"
            :alt="item.title"
            loading="lazy"
            decoding="async"
          />
          <div v-if="!item.img" class="features__wrapper-img">
            <img src="/imgs/detail/g1.svg" loading="lazy" decoding="async" />
          </div>
          <div class="features__item-inner" :class="{ active: item.img }">
            <p class="features__item-title">{{ item.title }}</p>
            <p class="features__item-text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.features {
  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: clamp(20px, vw(34px, $desktop), 34px);
    column-gap: clamp(20px, vw(20px, $desktop), 20px);
    @media (min-width: $tab) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: $desk) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  &__item {
    position: relative;
    border-radius: clamp(60px, vw(70px, $desktop), 70px) 24px;
    max-height: clamp(320px, vw(420px, $desktop), 420px);
    min-height: 320px;
    // @media (min-width: $tab) {
    //   min-height: 320px;
    // }
    // @media (min-width: $desk) {
    // }
  }
  &__item-img {
    width: 100%;
    height: 100%;
    border-radius: clamp(60px, vw(70px, $desktop), 70px) 24px;
    object-fit: cover;
  }
  &__item-inner.active {
    position: absolute;
    left: clamp(20px, vw(24px, $desktop), 24px);
    bottom: clamp(20px, vw(24px, $desktop), 24px);
    // background: linear-gradient(180deg, rgba(33, 32, 38, 0) 0%, rgba(33, 32, 38, 0.8) 61.06%);
  }
  &__item-title {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--color);
    margin-bottom: clamp(6px, vw(6px, $desktop), 8px);
  }
  &__item-text {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--seryy);
  }
  &__wrapper-img {
    border-radius: 20px 4px;
    background: var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: clamp(78px, vw(78px, $desktop), 78px);
    height: clamp(78px, vw(78px, $desktop), 78px);
    // padding: clamp(23px, vw(23px, $desktop), 23px);
  }
  &__wrapper-img img {
    width: clamp(32px, vw(32px, $desktop), 32px);
    height: clamp(32px, vw(32px, $desktop), 32px);
  }
  &__item:nth-child(1) {
    @media (min-width: $desk) {
      grid-column: 1 / 2;
    }
  }
  &__item:nth-child(2) {
    @media (min-width: $desk) {
      grid-column: 2 / 3;
    }
  }
  &__item:nth-child(3) {
    @media (min-width: $desk) {
      grid-column: 3 / 6;
    }
  }
  &__item:nth-child(4) {
    @media (min-width: $desk) {
      grid-column: 1 / 3;
    }
  }
  &__item:nth-child(2),
  &__item:nth-child(6) {
    display: flex;
    flex-direction: column;
    background: var(--seryy);
    padding: clamp(30px, vw(40px, $desktop), 40px);
    min-height: 211px;
  }
  &__item:nth-child(2) .features__item-inner,
  &__item:nth-child(6) .features__item-inner {
    margin-top: auto;
  }
  &__item:nth-child(2) .features__item-title,
  &__item:nth-child(6) .features__item-title {
    color: var(--100);
    margin-bottom: clamp(10px, vw(16px, $desktop), 16px);
  }
  &__item:nth-child(2) .features__item-text,
  &__item:nth-child(6) .features__item-text {
    color: var(--60);
  }
  //   &__item:nth-child(5) {
  //     grid-column: 3 / 4;
  //   }
  //   &__item:nth-child(6) {
  //     grid-column: 5 / 6;
  //   }
}
</style>
