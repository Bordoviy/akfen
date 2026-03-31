<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Finishing from '@/layouts/apartment/Finishing.vue'
import Cc from '@/layouts/Cc.vue'
import OtherApartment from '@/layouts/apartment/OtherApartment.vue'
import Modal from '@/components/Modal.vue'

const API_URL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_AKFEN_API_URL || 'https://admin-api.akfen39.ru/api'
const API_TOKEN =
  import.meta.env.VITE_AKFEN_API_TOKEN ||
  'mG7Hz6eYGwl07MW30nB2qYFWjtkUeWU38LstTdBvdIryrMsFk0YEJnYrp0KgqCWd'

const route = useRoute()
const apartContainer = ref(null)
const apartment = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

function getHeaders() {
  return {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: 'application/json',
  }
}

async function fetchJson(path) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

function truncateValue(value) {
  const parsedValue = Number(value)
  if (!Number.isFinite(parsedValue)) return null
  return Math.trunc(parsedValue)
}

function formatArea(value) {
  const integerValue = truncateValue(value)
  return integerValue === null ? '-' : `${integerValue} м²`
}

function formatPrice(value) {
  const integerValue = truncateValue(value)
  return integerValue === null ? 'Цена уточняется' : `${integerValue.toLocaleString('ru-RU')} ₽`
}

function formatBuildingState(value) {
  if (value === 'UNFINISHED') return 'Строящийся дом'
  if (value === 'FINISHED') return 'Дом сдан'
  return 'Не указано'
}

const apartmentImages = computed(() => {
  if (!apartment.value) return []
  if (Array.isArray(apartment.value.images) && apartment.value.images.length) {
    return apartment.value.images
  }
  if (apartment.value.pb_image) {
    return [apartment.value.pb_image]
  }
  return ['/imgs/sp1.png']
})

const apartmentTitle = computed(() =>
  apartment.value?.name ? `Квартира ${apartment.value.name}` : 'Квартира',
)
const apartmentSubtitle = computed(() =>
  apartment.value?.complex?.name ? `ЖК ${apartment.value.complex.name}` : 'ЖК -',
)
const apartmentPrice = computed(() => formatPrice(apartment.value?.price))
const apartmentDetails = computed(() => {
  const item = apartment.value

  if (!item) return []

  return [
    { label: 'Количество комнат', value: item.rooms_amount ?? '-' },
    { label: 'Площадь квартиры', value: formatArea(item.area_total) },
    { label: 'Жилая площадь', value: formatArea(item.details?.area_living) },
    { label: 'Этаж', value: item.floor ?? '-' },
    {
      label: 'Стадия строительства',
      value: formatBuildingState(item.house?.details?.buildingState),
    },
  ]
})

async function initSlider() {
  await nextTick()

  const el = apartContainer.value
  if (!el || apartmentImages.value.length <= 1) return

  if (el.swiper?.destroy) {
    el.swiper.destroy(true, true)
  }

  new Swiper(el, {
    loop: false,
    navigation: {
      nextEl: el.querySelector('.ap__button-next--desktop'),
      prevEl: el.querySelector('.ap__button-prev--desktop'),
    },
  })
}

async function fetchApartment() {
  const apartmentId = route.query.id

  if (!apartmentId) {
    apartment.value = null
    errorMessage.value = 'Квартира не найдена'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetchJson(`/apartments/${apartmentId}`)
    apartment.value = response.data ?? null
    await initSlider()
  } catch (error) {
    console.error(error)
    apartment.value = null
    errorMessage.value = 'Не удалось загрузить данные квартиры'
  } finally {
    isLoading.value = false
  }
}

watch(() => route.query.id, fetchApartment)

onMounted(fetchApartment)
</script>

<template>
  <Breadcrumbs />
  <div class="apartment">
    <div class="container">
      <div class="apartment__inner">
        <div v-if="isLoading" class="apartment__state">Загрузка...</div>
        <div v-else-if="errorMessage" class="apartment__state">{{ errorMessage }}</div>
        <div v-else-if="apartment" class="apartment__main">
          <div class="apartment__left swiper" ref="apartContainer">
            <div class="swiper-wrapper">
              <div class="swiper-slide apartment__card" v-for="(img, imgIndex) in apartmentImages" :key="imgIndex">
                <a class="fancy" :href="img" data-fancybox="apartment-gallery">
                  <img :src="img" loading="lazy" decoding="async" :alt="apartmentTitle" />
                </a>
                
              </div>
            </div>
            <div v-if="apartmentImages.length > 1" class="swiper-controls">
              <div class="swiper-button-prev ap__button-prev--desktop">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="#3343A9" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
              <div class="swiper-button-next ap__button-next--desktop">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#3343A9" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <div class="apartment__right">
            <div class="apartment__right-top">
              <div class="apartment__body">
                <h1 class="apartment__title">{{ apartmentTitle }}</h1>
                <p class="apartment__subtitle">{{ apartmentSubtitle }}</p>
                <span class="apartment__prices">
                  <p class="apartment__price-item apartment__price-new">{{ apartmentPrice }}</p>
                </span>
                <div class="apartment__dl">
                  <dl v-for="detail in apartmentDetails" :key="detail.label">
                    <dt>{{ detail.label }}</dt>
                    <dd>{{ detail.value }}</dd>
                  </dl>
                </div>
              </div>
               <div class="apartment__bottom">
                <Button @click.prevent="toggleModal">Забронировать квартиру</Button>
                <Modal v-if="isModal" @close="toggleModal"></Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Cc />
  <!--
  <Finishing />
  <OtherApartment :title="'Другие варианты квартир'" />
  -->
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.apartment {
  &__main {
    display: flex;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    flex-direction: column;

    @media (min-width: $tab-inner) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__state {
    font-weight: 400;
    font-size: clamp(18px, vw(20px, $desktop), 20px);
    line-height: 140%;
    color: var(--100);
  }

  &__left {
    flex: 1;

    @media (min-width: $desk) {
      flex: 1.3;
    }
  }

  &__right {
    flex: 1;
  }

  &__right-top {
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(30px, $desktop), 30px);
  }

  &__title {
    font-weight: 600;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(8px, vw(8px, $desktop), 8px);
  }

  &__subtitle {
    font-weight: 400;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(20px, vw(24px, $desktop), 24px);
  }

  &__prices {
    display: flex;
    gap: clamp(10px, vw(12px, $desktop), 12px);
    margin-bottom: clamp(20px, vw(24px, $desktop), 24px);
    align-items: center;
  }

  &__price-new {
    font-weight: 600;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--1);
  }

  &__dl dl {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--obvodka);
    padding-bottom: clamp(10px, vw(10px, $desktop), 10px);
    margin-bottom: clamp(8px, vw(10px, $desktop), 10px);
  }

  &__dl dt {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: #6c6f71;
  }

  &__dl dd {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: #161717;
  }

  .swiper-wrapper {
    position: relative;
    margin-bottom: 45px;

    @media (min-width: $desk) {
      margin-bottom: 0;
    }
  }

  .swiper-wrapper .fancy img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    min-height: clamp(400px, vw(400px, $desktop), 400px);

    @media (min-width: $tab-inner) {
      min-height: clamp(445px, vw(445px, $desktop), 445px);
    }
  }

  .swiper-wrapper .glock {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .swiper-controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: clamp(10px, vw(20px, $desktop), 20px);
    left: clamp(10px, vw(20px, $desktop), 20px);
    bottom: 0;

    @media (min-width: $desk) {
      bottom: 50%;
    }
  }

  & .ap__button-next--desktop svg path,
  & .ap__button-prev--desktop svg path {
    stroke: #fff;
    stroke-width: 1.4;
    transition: stroke 0.3s ease;
  }

  & .swiper .swiper-controls .swiper-button-next,
  .swiper .swiper-controls .swiper-button-prev {
    border: 1px solid transparent;
    width: clamp(24px, vw(36px, $desktop), 36px);
    height: clamp(24px, vw(36px, $desktop), 36px);
  }

  @media (hover: hover) and (pointer: fine) {

    & .swiper .swiper-controls .swiper-button-next:hover svg path,
    & .swiper .swiper-controls .swiper-button-prev:hover svg path {
      stroke: #3343a9;
    }

    & .swiper .swiper-controls .swiper-button-next:hover,
    & .swiper .swiper-controls .swiper-button-prev:hover {
      background: var(--color);
    }
  }
}
</style>
