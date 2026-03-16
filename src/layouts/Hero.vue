<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Button from '@/components/Button.vue'

const viewportWidth = ref(window.innerWidth)
const heroContainer = ref(null)
const heroSwiper = ref(null)
const activeSlideIndex = ref(0)

const isDesktop = computed(() => viewportWidth.value >= 993)
const isMobile = computed(() => viewportWidth.value < 600)
const isTablet = computed(() => viewportWidth.value >= 600 && viewportWidth.value < 993)

function updateViewport() {
  viewportWidth.value = window.innerWidth
}

const defaultSidebarCards = [
  {
    title: '0 % рассрочка',
    text: 'Текст описание, текст описание, текст описание, текст описание',
    buttonText: 'Подробнее',
    link: '/projects',
  },
  {
    title: 'С траншевой ипотекой платеж 2 000 ₽/мес',
    text: 'Текст описание, текст описание, текст описание, текст описание',
    buttonText: 'Подробнее',
    link: '/projects',
  },
]

const heroCards = [
  {
    title: 'Пионерский берег',
    text: 'Жизнь в гармонии с природой',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/pioner-desk.webp',
    mobileImg: '/imgs/hero/pioner-mob.webp',
    id: 'pionerskiy-bereg',
    sidebarCards: [
      {
        title: 'Траншевая ипотека: от 2 000 руб./мес.',
        text: 'Платите всего 2 000 ₽ в месяц до ввода дома в эксплуатацию.',
        buttonText: 'Подробнее',
        link: '/projects/pionerskiy-bereg',
      },
      {
        title: 'ЖК "Пионерский берег"',
        text: 'Жизнь у моря в экологичном районе. Свежий воздух и современный дизайн и комфорт в шаге от пляжа.',
        buttonText: 'Подробнее',
        link: '/projects/pionerskiy-bereg',
      },
    ],
  },
  {
    title: 'Пионерский берег',
    text: 'Жизнь в гармонии с природой',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/pioner-desk2.webp',
    mobileImg: '/imgs/hero/pioner-mob2.webp',
    id: 'pionerskiy-bereg',
    sidebarCards: [
      {
        title: 'Скидка 3% на квартиру',
        text: 'Ваша выгода при 100% оплате или стандартной ипотеке.',
        buttonText: 'Подробнее',
        link: '/projects/pionerskiy-bereg',
      },
      {
        title: 'ЖК "Пионерский берег"',
        text: 'Жизнь у моря в экологичном районе. Свежий воздух и современный дизайн в шаге от пляжа.',
        buttonText: 'Подробнее',
        link: '/projects/pionerskiy-bereg',
      },
    ],
  },
  {
    title: 'ЖК Елизаветинский',
    text: 'Пространство новой жизни на Сельме',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/sun-desk.webp',
    mobileImg: '/imgs/hero/sun-mob.webp',
    id: 'elizavetinskiy',
    sidebarCards: [
      {
        title: 'Скидка 3% на квартиру',
        text: 'Специальная цена при полной оплате. Узнайте сумму вашей экономии.',
        buttonText: 'Подробнее',
        link: '/projects/elizavetinskiy',
      },
      {
        title: 'ЖК "Елизаветинский"',
        text: 'Жизнь в уютном районе в 10 минутах от Центра. Тишина, комфорт и всё нужное рядом.',
        buttonText: 'Подробнее',
        link: '/projects/elizavetinskiy',
      },
    ],
  },
  {
    title: 'ЖК Елизаветинский',
    text: 'Пространство новой жизни на Сельме',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/sun-desk2.webp',
    mobileImg: '/imgs/hero/sun-mob2.webp',
    id: 'elizavetinskiy',
    sidebarCards: [
      {
        title: 'Семейная ипотека 4,5%',
        text: 'Комфортная ставка для семей с детьми. Успейте забронировать!',
        buttonText: 'Подробнее',
        link: '/projects/elizavetinskiy',
      },
      {
        title: 'ЖК "Елизаветинский"',
        text: 'Жизнь в уютном районе в 10 минутах от Центра. Тишина, комфорт и всё нужное рядом.',
        buttonText: 'Подробнее',
        link: '/projects/elizavetinskiy',
      },
    ],
  },
  {
    title: 'Пионерский берег',
    text: 'Жизнь в гармонии с природой',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/pioner-desk3.webp',
    mobileImg: '/imgs/hero/pioner-mob3.webp',
    id: 'pionerskiy-bereg',
    sidebarCards: [
      {
        title: 'Семейная ипотека 4,5%',
        text: 'Низкий процент на весь срок кредитования. Подробности у менеджеров.',
        buttonText: 'Подробнее',
        link: '/projects/pionerskiy-bereg',
      },
      {
        title: 'ЖК "Пионерский берег"',
        text: 'Жизнь у моря в экологичном районе. Свежий воздух и современный дизайн в шаге от пляжа.',
        buttonText: 'Подробнее',
        link: '/projects/pionerskiy-bereg',
      },
    ],
  },
  {
    title: 'Огни Калининграда',
    text: '25 этажей высоты открывают 1000 возможностей для жизни!',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/kali-desk.webp',
    mobileImg: '/imgs/hero/kali-mob.webp',
    id: 'ogni-kaliningrada',
    sidebarCards: [
      {
        title: '0% рассрочка',
        text: 'Без переплат и процентов до сдачи дома',
        buttonText: 'Подробнее',
        link: '/projects/ogni-kaliningrada',
      },
      {
        title: 'ЖК "Огни Калининграда"',
        text: 'Современный квартал в сердце города. Панорамные виды и развитая инфраструктура.',
        buttonText: 'Подробнее',
        link: '/projects/ogni-kaliningrada',
      },
    ],
  },
  {
    title: 'Огни Калининграда',
    text: '25 этажей высоты открывают 1000 возможностей для жизни!',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/kali-desk2.webp',
    mobileImg: '/imgs/hero/kali-mob2.webp',
    id: 'ogni-kaliningrada',
    sidebarCards: [
      {
        title: 'Скидка 5% на квартиру',
        text: 'Максимальная скидка при 100% оплате за наличный расчет.',
        buttonText: 'Подробнее',
        link: '/projects/ogni-kaliningrada',
      },
      {
        title: 'ЖК "Огни Калининграда"',
        text: 'Современный квартал в сердце города. Панорамные виды и развитая инфраструктура.',
        buttonText: 'Подробнее',
        link: '/projects/ogni-kaliningrada',
      },
    ],
  },
  {
    title: 'Аврора',
    text: 'Жизнь в гармонии с природой',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/avrora-desk.webp',
    mobileImg: '/imgs/hero/avrora-mob.webp',
    id: 'avrora',
    sidebarCards: [
      {
        title: '0% рассрочка',
        text: 'Удобный график: ежемесячные платежи по 50 000 ₽ до конца строительства.',
        buttonText: 'Подробнее',
        link: '/projects/avrora',
      },
      {
        title: 'ЖК "Аврора"',
        text: 'Семейный жилой комплекс с благоустроенной территорией и продуманными планировками.',
        buttonText: 'Подробнее',
        link: '/projects/avrora',
      },
    ],
  },
   {
    title: 'Аврора',
    text: 'Жизнь в гармонии с природой',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/avrora-desk2.webp',
    mobileImg: '/imgs/hero/avrora-mob2.webp',
    id: 'avrora',
    sidebarCards: [
      {
        title: 'Траншевая ипотека',
        text: 'Платеж 2 000 ₽/мес. — минимальная нагрузка на ваш бюджет.',
        buttonText: 'Подробнее',
        link: '/projects/avrora',
      },
      {
        title: 'ЖК "Аврора"',
        text: 'Семейный жилой комплекс с благоустроенной территорией и продуманными планировками.',
        buttonText: 'Подробнее',
        link: '/projects/avrora',
      },
    ],
  },
   {
    title: 'Аврора',
    text: 'Жизнь в гармонии с природой',
    categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
    desktopImg: '/imgs/hero/avrora-desk3.webp',
    mobileImg: '/imgs/hero/avrora-mob3.webp',
    id: 'avrora',
    sidebarCards: [
      {
        title: 'Семейная ипотека 4,5%',
        text: 'Ставка актуальна при первоначальном взносе от 20,1%.',
        buttonText: 'Подробнее',
        link: '/projects/avrora',
      },
      {
        title: 'ЖК "Аврора"',
        text: 'Семейный жилой комплекс с благоустроенной территорией и продуманными планировками.',
        buttonText: 'Подробнее',
        link: '/projects/avrora',
      },
    ],
  },
  // {
  //   title: 'ЖК “Калининград City”',
  //   text: '25 этажей высоты открывают 1000 возможностей для жизни!',
  //   categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
  //   img: '/imgs/hero/banner-kal.jpg',
  //   id: 'kaliningrad-city',
  //   sidebarCards: [
  //     {
  //       title: 'Видовые квартиры в центре города',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/kaliningrad-city',
  //     },
  //     {
  //       title: 'Семейные и IT-ипотеки',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/kaliningrad-city',
  //     },
  //   ],
  // },
  // {
  //   title: 'ЖК “Калининград City”',
  //   text: '25 этажей высоты открывают 1000 возможностей для жизни!',
  //   categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
  //   img: '/imgs/hero/banner-kal1.jpg',
  //   id: 'kaliningrad-city',
  //   sidebarCards: [
  //     {
  //       title: 'Готовые планировки для инвестиций',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/kaliningrad-city',
  //     },
  //     {
  //       title: 'Рассрочка 0 % на ограниченный пул',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/kaliningrad-city',
  //     },
  //   ],
  // },
  // {
  //   title: 'ЖК “Avrora“',
  //   text: 'Жизнь в гармонии с природой',
  //   categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
  //   img: '/imgs/hero/banner-av.jpg',
  //   id: 'avrora',
  //   sidebarCards: [
  //     {
  //       title: 'Квартиры рядом с парком',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/avrora',
  //     },
  //     {
  //       title: 'Ипотека от ведущих банков',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/avrora',
  //     },
  //   ],
  // },
  // {
  //   title: 'ЖК “Avrora“',
  //   text: 'Жизнь в гармонии с природой',
  //   categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
  //   img: '/imgs/hero/banner-av1.jpg',
  //   id: 'avrora',
  //   sidebarCards: [
  //     {
  //       title: 'Террасы и приватные форматы',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/avrora',
  //     },
  //     {
  //       title: 'Льготные программы покупки',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/avrora',
  //     },
  //   ],
  // },
  // {
  //   title: 'ЖК “Avrora“',
  //   text: 'Жизнь в гармонии с природой',
  //   categories: [{ title: 'Рядом парк' }, { title: 'В центре Гурьевска' }, { title: 'Паркинг' }],
  //   img: '/imgs/hero/banner-av1.jpg',
  //   id: 'avrora',
  //   sidebarCards: [
  //     {
  //       title: '0 % рассрочка',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/avrora',
  //     },
  //     {
  //       title: 'С траншевой ипотекой платеж 2 000 ₽/мес',
  //       text: 'Текст описание, текст описание, текст описание, текст описание',
  //       buttonText: 'Подробнее',
  //       link: '/projects/avrora',
  //     },
  //   ],
  // },
]

const totalSlides = computed(() => heroCards.length)
const activeHero = computed(() => heroCards[activeSlideIndex.value] || heroCards[0])
const activeSidebarCards = computed(() => {
  const cards = activeHero.value?.sidebarCards
  if (!Array.isArray(cards) || cards.length < 2) return defaultSidebarCards
  return cards.slice(0, 2)
})
const mobilePromoCard = computed(() => activeSidebarCards.value[0] || activeSidebarCards.value[0])
const formattedSlide = computed(() => String(activeSlideIndex.value + 1).padStart(2, '0'))
const formattedTotal = computed(() => String(totalSlides.value).padStart(2, '0'))
const progressItems = computed(() => Array.from({ length: totalSlides.value }, (_, i) => i))

function goNext() {
  heroSwiper.value?.slideNext()
}

function goPrev() {
  heroSwiper.value?.slidePrev()
}

onMounted(() => {
  window.addEventListener('resize', updateViewport)

  nextTick(() => {
    if (!heroContainer.value) return

    heroSwiper.value = new Swiper(heroContainer.value, {
      spaceBetween: 10,
      loop: true,
      on: {
        init(swiper) {
          activeSlideIndex.value = swiper.realIndex
        },
        slideChange(swiper) {
          activeSlideIndex.value = swiper.realIndex
        },
      },
    })
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
  if (heroSwiper.value) {
    heroSwiper.value.destroy(true, true)
    heroSwiper.value = null
  }
})
</script>

<template>
  <div class="hero hero__card">
    <div class="container">
      <div class="hero__inner" :class="{ 'hero__inner--desktop': isDesktop }">
        <div class="hero__slider swiper" ref="heroContainer">
          <div class="hero__container swiper-wrapper">
            <div class="swiper-slide hero__slide" v-for="(item, index) in heroCards" :key="index">
              <div class="hero__img-wrap">
                <picture>
                  <source media="(max-width: 599px)" :srcset="item.mobileImg || item.img" />
                  <source media="(min-width: 600px)" :srcset="item.desktopImg || item.img" />
                  <img :src="item.desktopImg || item.mobileImg || item.img" :alt="item.title" loading="lazy"
                    decoding="async" />
                </picture>
              </div>
            </div>
          </div>

          <div v-if="isDesktop" class="hero__controls hero__controls--desktop">
            <div class="hero__counter">
              <span class="hero__counter-current">{{ formattedSlide }}</span>
              <span class="hero__counter-total">{{ formattedTotal }}</span>
            </div>
            <div class="hero__progress" aria-hidden="true">
              <span v-for="item in progressItems" :key="item" class="hero__progress-item"
                :class="{ 'hero__progress-item--active': item === activeSlideIndex }"></span>
            </div>
            <div class="hero__actions">
              <button type="button" class="hero__arrow" aria-label="Предыдущий слайд" @click="goPrev">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="#3343A9" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <button type="button" class="hero__arrow" aria-label="Следующий слайд" @click="goNext">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#3343A9" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <aside v-if="isDesktop" class="hero__sidebar" aria-label="Промо-предложения">
          <article class="hero__sidebar-card" v-for="(card, index) in activeSidebarCards" :key="index">
            <h3 class="hero__sidebar-title">{{ card.title }}</h3>
            <p class="hero__sidebar-text">{{ card.text }}</p>
            <router-link v-if="card.link" :to="card.link" class="hero__sidebar-link">
              <Button>{{ card.buttonText || 'Подробнее' }}</Button>
            </router-link>
            <Button v-else>{{ card.buttonText || 'Подробнее' }}</Button>
          </article>
        </aside>
      </div>

      <div v-if="isTablet" class="hero__cards-row" aria-label="Промо-предложения">
        <article class="hero__sidebar-card" v-for="(card, index) in activeSidebarCards" :key="index">
          <h3 class="hero__sidebar-title">{{ card.title }}</h3>
          <p class="hero__sidebar-text">{{ card.text }}</p>
          <router-link v-if="card.link" :to="card.link" class="hero__sidebar-link">
            <Button>{{ card.buttonText || 'Подробнее' }}</Button>
          </router-link>
          <Button v-else>{{ card.buttonText || 'Подробнее' }}</Button>
        </article>
      </div>

      <router-link v-if="isMobile && mobilePromoCard" class="hero__mobile-card"
        :to="mobilePromoCard.link || '/projects'">
        <span class="hero__mobile-title">{{ mobilePromoCard.title }}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="#212026" stroke-width="1.6" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </router-link>

      <div v-if="!isDesktop" class="hero__controls"
        :class="{ 'hero__controls--mobile': isMobile, 'hero__controls--tablet': isTablet }">
        <button v-if="isMobile" type="button" class="hero__arrow hero__arrow--alt" aria-label="Предыдущий слайд"
          @click="goPrev">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <div class="hero__counter">
          <span class="hero__counter-current">{{ formattedSlide }}</span>
          <span class="hero__counter-total">{{ formattedTotal }}</span>
        </div>

        <div v-if="!isMobile" class="hero__progress" aria-hidden="true">
          <span v-for="item in progressItems" :key="item" class="hero__progress-item"
            :class="{ 'hero__progress-item--active': item === activeSlideIndex }"></span>
        </div>

        <button v-if="isMobile" type="button" class="hero__arrow hero__arrow--alt" aria-label="Следующий слайд"
          @click="goNext">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <div v-if="isTablet" class="hero__actions">
          <button type="button" class="hero__arrow hero__arrow--alt" aria-label="Предыдущий слайд" @click="goPrev">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" class="hero__arrow hero__arrow--alt" aria-label="Следующий слайд" @click="goNext">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <!--
      <div v-if="!isDesktop" class="hero__chips" aria-label="Категории проекта">
        <span v-for="(item, index) in activeHero.categories" :key="index" class="hero__chip">{{ item.title }}</span>
      </div>
      -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.hero {
  margin-top: 5px;

  &__inner {
    display: block;

    &--desktop {
      display: grid;
      grid-template-columns: 2fr minmax(0, 1fr);
      gap: clamp(15px, vw(20px, $desktop), 20px);
      align-items: stretch;
    }
  }

  &__slider {
    position: relative;
    border-radius: 30px;
    overflow: hidden;
  }

  &__slide,
  &__img-wrap,
  &__img-wrap picture,
  &__img-wrap img {
    border-radius: 30px;
  }

  &__img-wrap picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__img-wrap img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    min-height: 320px;
    // max-height: 480px;

    @media (min-width: $tab) {
      aspect-ratio: 8 / 4;
      // min-height: 420px;
      // max-height: 560px;
    }

    @media (min-width: $desk) {
      min-height: clamp(400px, vw(500px, $desktop), 500px);
      // max-height: 500px;
    }
  }

  &__sidebar,
  &__cards-row {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__cards-row {
    margin-top: 20px;
  }

  &__sidebar-card {
    flex: 1;
    backdrop-filter: blur(84.4px);
    background: #daddef;
    border-radius: 27px;
    padding: clamp(14px, vw(28px, $desktop), 28px) clamp(15px, vw(30px, $desktop), 30px);
    display: flex;
    flex-direction: column;
  }

  &__sidebar-title {
    margin: 0 0 10px;
    font-size: clamp(17px, vw(21px, $desktop), 21px);
    font-weight: 600;
    line-height: 136%;
    color: var(--100);
  }

  &__sidebar-text {
    margin: 0;
    font-weight: 400;
    font-size: clamp(13px, vw(14px, $desktop), 14px);
    line-height: 146%;
    color: #767782;
  }

  &__sidebar-link,
  &__sidebar-card .btn {
    margin-top: auto;
    align-self: flex-start;
    padding-top: clamp(10px, vw(20px, $desktop), 20px);
  }

  &__mobile-card {
    margin-top: 12px;
    border-radius: 27px;
    backdrop-filter: blur(84.4px);
    background: #daddef;
    color: #212026;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 24px 26px;
  }

  &__mobile-title {
    font-weight: 600;
    font-size: 15px;
    line-height: 136%;
    color: var(--100);
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 20px;
  }

  &__controls--desktop {
    position: absolute;
    left: 28px;
    right: 28px;
    bottom: 22px;
    z-index: 3;
    margin-top: 0;
    gap: 16px;

    .hero__counter-current {
      color: var(--color);
    }

    .hero__counter-total {
      color: #c0c5e4;
    }

    .hero__progress-item {
      background: rgba(255, 255, 255, 0.45);
    }

    .hero__progress-item--active {
      background: #fff;
    }
  }

  &__controls--tablet {
    justify-content: space-between;
    margin-top: 18px;
  }

  &__controls--mobile {
    justify-content: space-between;
    margin-top: 14px;
  }

  &__counter {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__counter-current {
    color: #3a49b9;
    font-weight: 600;
    font-size: 30px;
    line-height: 146%;
  }

  &__counter-total {
    font-weight: 600;
    font-size: 15px;
    line-height: 146%;
    color: #aaaaa9;
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 1;
  }

  &__progress-item {
    height: 4px;
    border-radius: 20px;
    background: #b8bdd6;
    max-width: 58px;
    width: 100%;
    transition: background-color 0.2s ease;
  }

  &__progress-item--active {
    background: #3a49b9;
  }

  &__actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }

  &__arrow {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    border: 1px solid transparent;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__arrow--alt {
    background: #3a49b9;
  }

  &__chips {
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  &__chip {
    background: #fff;
    color: #3b3a42;
    border-radius: 14px;
    padding: 8px 16px;
    font-size: 16px;
    line-height: 1.2;
    box-shadow: 0 6px 14px rgba(51, 67, 169, 0.2);
  }

  @media (max-width: 992px) {
    &__cards-row {
      flex-direction: row;
    }

    &__sidebar-card .btn {
      min-width: 218px;
    }
  }

  @media (max-width: 668px) {
    &__cards-row {
      flex-direction: column;
    }
  }

  @media (max-width: 599px) {
    // &__img-wrap img {
    //   min-height: 286px;
    //   max-height: 286px;
    // }

    &__arrow,
    &__arrow--alt {
      width: 44px;
      height: 44px;
      border-radius: 14px;
    }

    &__chip {
      font-size: 16px;
      border-radius: 10px;
      padding: 7px 14px;
    }
  }
}
</style>
