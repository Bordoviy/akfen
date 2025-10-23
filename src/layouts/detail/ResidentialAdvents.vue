<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const adContainer = ref(null)
const swiperInstance = ref(null) // хранение экземпляра

const activeIndex = ref(0)

const allAdvents = [
  {
    buttonName: 'Архитектура',
    buttonContent: {
      id: 'kaliningrad-city',
      title:
        'Дизайн зданий отличается оригинальностью и элегантностью, исключая излишнюю помпезность.',
      text: 'Цветовое решение для фасада выполнено в светлых тонах с природно-коричневыми акцентами, что придает зданию объемности.',
      lists: [
        {
          cont: 'Для фасада выполнено в светлых тонах с природно-коричневыми акцентами, что придает зданию объемности.',
        },
        {
          cont: 'Что придает зданию объемности.',
        },
      ],
      imgs: ['/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png'],
    },
  },
  {
    buttonName: 'Отопление',
    buttonContent: {
      id: 'kaliningrad-city',
      title: 'Современная система отопления.',
      text: 'Энергоэффективное и надежное отопление в каждой квартире.',
      lists: [
        {
          cont: 'Для фасада выполнено в светлых тонах с природно-коричневыми акцентами, что придает зданию объемности.',
        },
        {
          cont: 'Что придает зданию объемности.',
        },
      ],
      imgs: ['/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png'],
    },
  },
  {
    buttonName: 'Благоустройство',
    buttonContent: {
      id: 'kaliningrad-city',
      title: 'Озеленённые дворы и современные площадки.',
      text: 'Удобство и комфорт для жителей всех возрастов.',
      lists: [
        {
          cont: 'Для фасада выполнено в светлых тонах с природно-коричневыми акцентами, что придает зданию объемности.',
        },
        {
          cont: 'Что придает зданию объемности.',
        },
      ],
      imgs: ['/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png'],
    },
  },
  {
    buttonName: 'Инфраструктура',
    buttonContent: {
      id: 'kaliningrad-city',
      title: 'Развитая инфраструктура рядом.',
      text: 'Школы, детсады и магазины в шаговой доступности.',
      lists: [
        {
          cont: 'Для фасада выполнено в светлых тонах с природно-коричневыми акцентами, что придает зданию объемности.',
        },
        {
          cont: 'Что придает зданию объемности.',
        },
      ],
      imgs: ['/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png'],
    },
  },
  {
    buttonName: 'Паркинг',
    buttonContent: {
      id: 'kaliningrad-city',
      title: 'Удобные парковочные места.',
      text: 'Наземный и подземный паркинг для вашего авто.',
      lists: [
        {
          cont: 'Для фасада выполнено в светлых тонах с природно-коричневыми акцентами, что придает зданию объемности.',
        },
        {
          cont: 'Что придает зданию объемности.',
        },
      ],
      imgs: ['/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png', '/imgs/detail/advent-1.png'],
    },
  },
]

const setActive = (index) => {
  activeIndex.value = index
}

// Инициализация Swiper
const initSwiper = () => {
  if (!adContainer.value) return

  // Уничтожаем старый экземпляр
  if (swiperInstance.value) {
    swiperInstance.value.destroy(true, true)
  }

  swiperInstance.value = new Swiper(adContainer.value, {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: adContainer.value.querySelector('.swiper-button-next'),
      prevEl: adContainer.value.querySelector('.swiper-button-prev'),
    },
  })
}

onMounted(async () => {
  await nextTick()
  initSwiper()
})

watch(activeIndex, async () => {
  await nextTick()
  initSwiper()
})
</script>

<template>
  <div class="advents mt-110">
    <div class="container">
      <h2 class="advents__title default-title">Преимущества</h2>

      <div class="advents__buttons">
        <button
          v-for="(item, index) in allAdvents"
          :key="index"
          :class="['advents__button', { active: activeIndex === index }]"
          @click="setActive(index)"
        >
          {{ item.buttonName }}
        </button>
      </div>

      <div class="advents__content" v-if="allAdvents[activeIndex]">
        <div class="advents__main">
          <h3 class="advents__subtitle">{{ allAdvents[activeIndex].buttonContent.title }}</h3>
          <p class="advents__text">{{ allAdvents[activeIndex].buttonContent.text }}</p>
          <ul class="advents__lists" v-if="allAdvents[activeIndex].buttonContent.lists">
            <li
              class="advents__lists-item"
              v-for="(item, index) in allAdvents[activeIndex].buttonContent.lists"
              :key="index"
            >
              {{ item.cont }}
            </li>
          </ul>
        </div>
        <div class="advents__wrapper swiper" ref="adContainer">
          <div class="swiper-wrapper">
            <img
              v-for="(img, i) in allAdvents[activeIndex].buttonContent.imgs"
              :key="i"
              :src="img"
              :alt="`Изображение ${i + 1}`"
              class="swiper-slide"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="swiper-controls">
            <div class="swiper-button-prev">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="#3343A9"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="swiper-button-next">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="#3343A9"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.advents {
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(20px, vw(30px, $desktop), 30px);
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__button {
    font-weight: 400;
    font-size: clamp(15px, vw(15px, $desktop), 17px);
    line-height: 146%;
    color: var(--60);
    border-bottom: 1px dashed var(--60);
    padding-bottom: clamp(2px, vw(4px, $desktop), 4px);
  }
  &__button.active {
    color: var(--1);
    border-bottom: 1px dashed var(--1);
  }
  &__content {
    display: flex;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab) {
      // order: 2;
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__main {
    flex: 1;
    order: 2;
    display: flex;
    flex-direction: column;
    gap: clamp(16px, vw(24px, $desktop), 24px);
    @media (min-width: $tab) {
      // order: 2;
    }

    @media (min-width: $desk) {
      order: 1;
    }
  }
  &__subtitle {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &__text {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
  }
  &__lists {
    display: flex;
    flex-direction: column;
    gap: clamp(16px, vw(24px, $desktop), 24px);
  }
  &__lists-item {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
    list-style-type: disc;
    margin-left: clamp(20px, vw(20px, $desktop), 20px);
  }
  &__lists-item::marker {
    color: var(--1);
    font-size: 1em;
  }
  &__wrapper {
    border-radius: 35px;
    flex: 2;
    order: 1;
    @media (min-width: $tab) {
      // order: 2;
    }
    @media (min-width: $desk) {
      order: 2;
    }
  }

  & .swiper-slide {
    width: 100%;
    height: 100%;
    border-radius: 35px;
    object-fit: cover;
    min-height: 260px;
    max-height: clamp(260px, vw(510px, $desktop), 510px);
    // @media (min-width: $tab) {
    //   min-height: 420px;
    // }

    // @media (min-width: $desk) {
    //   min-height: unset;
    // }
  }
  & .swiper-controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: clamp(10px, vw(20px, $desktop), 20px);
    left: clamp(10px, vw(20px, $desktop), 20px);
    bottom: 46%;
  }
  & .swiper-button-next svg,
  & .swiper-button-prev svg {
    fill: white;
  }
  & .swiper .swiper-controls .swiper-button-next,
  & .swiper .swiper-controls .swiper-button-prev {
    background: var(--color);
    width: clamp(24px, vw(36px, $desktop), 36px);
    height: clamp(24px, vw(36px, $desktop), 36px);
  }
}
</style>
