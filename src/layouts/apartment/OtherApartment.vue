<script setup>
import { onMounted, ref, nextTick } from 'vue'
import OtherApartmentCard from '@/components/OtherApartmentsCard.vue'

defineProps({
  title: { type: String, required: true },
})

const OtherApartContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    if (!OtherApartContainer.value) return

    const isMobile = window.innerWidth < 992

    const nextEl = isMobile
      ? document.querySelector('.news__button-next--mobile')
      : document.querySelector('.news__button-next--desktop')

    const prevEl = isMobile
      ? document.querySelector('.news__button-prev--mobile')
      : document.querySelector('.news__button-prev--desktop')

    new Swiper(OtherApartContainer.value, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 18,

      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },

      navigation: {
        nextEl,
        prevEl,
      },
    })
  })
})

const apartments = ref([
  {
    id: 'A-205',
    img: '/imgs/sp1.png',
    city: 'Зеленоградск',
    project: 'Акфиноград-Сити',
    address: 'ул. Потемкина 15',
    building: 'Корпус 1',
    section: 'Секция B',
    rooms: 2,
    area: 66.9,
    kitchen: 12.82,
    living: 59.92,
    floor: 8,
    floorsTotal: 32,
    price: 6785425,
    priceSale: 5785425,
    finishing: 'Предчистовая',
    status: 'В продаже',
    code: '982',
    delivery: '2025',
    promo: true,
  },
  {
    id: 'B-313',
    img: '/imgs/sp1.png',
    city: 'Калининград',
    project: 'Солнечный квартал',
    address: 'пр-т Мира 1',
    building: 'Корпус 2',
    section: 'Секция C',
    rooms: 3,
    area: 126.9,
    kitchen: 14.2,
    living: 92.1,
    floor: 12,
    floorsTotal: 18,
    price: 12785425,
    priceM2: 196000,
    finishing: 'Чистовая',
    status: 'В продаже',
    code: '701',
    delivery: '2026',
    promo: false,
  },
  {
    id: 'C-118',
    img: '/imgs/sp1.png',
    city: 'Калининград',
    project: 'Северный парк',
    address: 'ул. Центральная 3',
    building: 'Корпус 3',
    section: 'Секция A',
    rooms: 2,
    area: 49.7,
    kitchen: 9.5,
    living: 39.2,
    floor: 2,
    floorsTotal: 18,
    price: 8100000,
    priceM2: 162000,
    finishing: 'Предчистовая',
    status: 'В продаже',
    code: '320',
    delivery: '2026',
    promo: true,
  },
  {
    id: 'D-101',
    img: '/imgs/sp1.png',
    city: 'Зеленоградск',
    project: 'Акфиноград-Сити',
    address: 'ул. Потемкина 15',
    building: 'Корпус 1',
    section: 'Секция D',
    rooms: 1,
    area: 36.4,
    kitchen: 10.1,
    living: 26.3,
    floor: 3,
    floorsTotal: 22,
    price: 6200000,
    priceM2: 170000,
    finishing: 'Чистовая',
    status: 'В продаже',
    code: '982',
    delivery: '2025',
    promo: false,
  },
])
</script>

<template>
  <div class="other-apart mt-110">
    <div class="container">
      <div class="other-apart__top swiper-top">
        <h2 class="other-apart__title default-title">{{ title }}</h2>
        <!-- Кнопки для десктопа -->
        <div class="swiper-controls desktop-only">
          <div class="swiper-button-prev news__button-prev--desktop">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15.5L7.5 10.5L12.5 5.5"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="swiper-button-next news__button-next--desktop">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15.5L12.5 10.5L7.5 5.5"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="swiper other-apart__wrapper" ref="OtherApartContainer">
        <div class="swiper-wrapper">
          <OtherApartmentCard :items="apartments"></OtherApartmentCard>
        </div>

        <!-- Кнопки для мобилки -->
        <div class="swiper-controls mobile-only">
          <div class="swiper-button-prev news__button-prev--mobile">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15.5L7.5 10.5L12.5 5.5"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p>листайте, чтобы увидеть больше</p>
          <div class="swiper-button-next news__button-next--mobile">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15.5L12.5 10.5L7.5 5.5"
                stroke="white"
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
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.other-apart {
  & .container {
    padding: 0;
  }
  background: var(--seryy);
  border-radius: 60px;
  padding: clamp(50px, vw(70px, $desktop), 70px) clamp(30px, vw(40px, $desktop), 40px);
  &__top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
  }
}
</style>
