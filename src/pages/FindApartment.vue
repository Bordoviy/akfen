<script setup>
import { ref, reactive, computed } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Pagination from '@/components/Pagination.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import CallbackBlock from '@/layouts/mortgage-installment/CallbackBlock.vue'

const showModal = ref(false)
// Demo data (replace with API)
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
    priceM2: 196000,
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
  {
    id: 'E-220',
    img: '/imgs/sp1.png',
    city: 'Калининград',
    project: 'Квартал Восток',
    address: 'ул. Победы 22',
    building: 'Корпус 2',
    section: 'Секция E',
    rooms: 2,
    area: 58.3,
    kitchen: 11.0,
    living: 44.7,
    floor: 7,
    floorsTotal: 20,
    price: 8950000,
    priceM2: 153000,
    finishing: 'Чистовая',
    status: 'В продаже',
    code: '554',
    delivery: '2025',
    promo: false,
  },
  {
    id: 'F-002',
    img: '/imgs/sp1.png',
    city: 'Зеленоградск',
    project: 'Акфиноград-Сити',
    address: 'ул. Потемкина 15',
    building: 'Корпус 4',
    section: 'Секция F',
    rooms: 3,
    area: 78.9,
    kitchen: 13.3,
    living: 60.1,
    floor: 10,
    floorsTotal: 24,
    price: 11200000,
    priceM2: 142000,
    finishing: 'Предчистовая',
    status: 'В продаже',
    code: '732',
    delivery: '2026',
    promo: false,
  },
  {
    id: 'G-330',
    img: '/imgs/sp1.png',
    city: 'Калининград',
    project: 'Солнечный квартал',
    address: 'пр-т Мира 1',
    building: 'Корпус 5',
    section: 'Секция G',
    rooms: 4,
    area: 102.1,
    kitchen: 14.2,
    living: 85.4,
    floor: 16,
    floorsTotal: 22,
    price: 21500000,
    priceM2: 210000,
    finishing: 'Чистовая',
    status: 'В продаже',
    code: '514',
    delivery: 'Сдан',
    promo: false,
  },
  {
    id: 'H-901',
    img: '/imgs/sp1.png',
    city: 'Зеленоградск',
    project: 'Балтийская бухта',
    address: 'ул. Морская 7',
    building: 'Корпус 6',
    section: 'Секция H',
    rooms: 1,
    area: 42.5,
    kitchen: 9.8,
    living: 30.1,
    floor: 5,
    floorsTotal: 16,
    price: 7350000,
    priceM2: 173000,
    finishing: 'Чистовая',
    status: 'В продаже',
    code: '605',
    delivery: '2025',
    promo: true,
  },
])

// Filters state
const filters = reactive({
  city: 'all',
  project: 'all',
  building: 'all',
  rooms: 'Студия', // 'Студия'|'1'|'2'|'3'|'4+'
  areaMin: 22,
  areaMax: 145,
  priceMin: 0,
  priceMax: Infinity,
  floorMin: 1,
  floorMax: 30,
  finishing: 'all',
  status: 'all',
  delivery: 'all',
  promo: false,
  query: '',
  sortBy: 'priceAsc',
})

const buildings = computed(() => ['all', ...new Set(apartments.value.map((a) => a.building))])
const cities = computed(() => ['all', ...new Set(apartments.value.map((a) => a.city))])
const projects = computed(() => ['all', ...new Set(apartments.value.map((a) => a.project))])
const deliveries = computed(() => ['all', ...new Set(apartments.value.map((a) => a.delivery))])

// Pagination
const currentPage = ref(1)
const perPage = ref(6)
const resetPage = () => (currentPage.value = 1)
const setRooms = (val) => {
  filters.rooms = val
  resetPage()
}
const applyFilters = () => resetPage()
const showMoreFilters = ref(false)
const monthlyPayment = (price) => Math.round(price / 360 / 1000) * 1000

// Filtering
const filtered = computed(() => {
  let list = apartments.value
  if (filters.city !== 'all') list = list.filter((a) => a.city === filters.city)
  if (filters.project !== 'all') list = list.filter((a) => a.project === filters.project)
  if (filters.building !== 'all') list = list.filter((a) => a.building === filters.building)

  if (filters.rooms !== 'Студия') {
    if (filters.rooms === '4+') list = list.filter((a) => a.rooms >= 4)
    else list = list.filter((a) => String(a.rooms) === String(filters.rooms))
  }

  list = list.filter(
    (a) =>
      a.area >= filters.areaMin &&
      a.area <= filters.areaMax &&
      a.price >= filters.priceMin &&
      a.price <= filters.priceMax &&
      a.floor >= filters.floorMin &&
      a.floor <= filters.floorMax,
  )

  if (filters.finishing !== 'all') list = list.filter((a) => a.finishing === filters.finishing)
  if (filters.status !== 'all') list = list.filter((a) => a.status === filters.status)
  if (filters.delivery !== 'all') list = list.filter((a) => a.delivery === filters.delivery)
  if (filters.promo) list = list.filter((a) => a.promo)

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase()
    list = list.filter((a) => a.id.toLowerCase().includes(q) || a.section.toLowerCase().includes(q))
  }
  return list
})

const sorted = computed(() => {
  const list = [...filtered.value]
  switch (filters.sortBy) {
    case 'priceDesc':
      return list.sort((a, b) => b.price - a.price)
    case 'areaAsc':
      return list.sort((a, b) => a.area - b.area)
    case 'areaDesc':
      return list.sort((a, b) => b.area - a.area)
    case 'priceAsc':
    default:
      return list.sort((a, b) => a.price - b.price)
  }
})

const totalItems = computed(() => sorted.value.length)
const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return sorted.value.slice(start, start + perPage.value)
})

function resetFilters() {
  filters.city = 'all'
  filters.project = 'all'
  filters.building = 'all'
  filters.rooms = 'Студия'
  filters.areaMin = 22
  filters.areaMax = 145
  filters.priceMin = 1700000
  filters.priceMax = 9030000
  filters.floorMin = 1
  filters.floorMax = 30
  filters.finishing = 'all'
  filters.status = 'all'
  filters.delivery = 'all'
  filters.promo = false
  filters.sortBy = 'priceAsc'
  filters.query = ''
  resetPage()
}
</script>

<template>
  <Breadcrumbs />

  <div class="find-ap">
    <div class="container">
      <div class="find-ap__inner">
        <!-- <button @click="showModal = true">Открыть модалку</button> -->

        <!-- Показываем модалку, только если showModal = true -->
        <!-- <Modal v-if="showModal" @close="showModal = false" /> -->
        <h1 class="default-title find-ap__title">Подобрать квартиру</h1>

        <div class="find-ap__filters">
          <div class="find-ap__row">
            <label class="find-ap__field">
              <span class="find-ap__label">Город</span>
              <select v-model="filters.city" @change="resetPage">
                <option v-for="c in cities" :key="c" :value="c">
                  {{ c === 'all' ? 'Выбрать' : c }}
                </option>
              </select>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Проект</span>
              <select v-model="filters.project" @change="resetPage">
                <option v-for="p in projects" :key="p" :value="p">
                  {{ p === 'all' ? 'Выбрать' : p }}
                </option>
              </select>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Число комнат</span>
              <div class="find-ap__chips">
                <span
                  class="find-ap__chip"
                  :class="{ active: filters.rooms === 'Студия' }"
                  @click="setRooms('Студия')"
                  >Студия</span
                >
                <span
                  v-for="r in ['1', '2', '3', '4+']"
                  :key="r"
                  class="find-ap__chip"
                  :class="{ active: filters.rooms === r }"
                  @click="setRooms(r)"
                  >{{ r }}</span
                >
              </div>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Стоимость, ₽</span>
              <div class="find-ap__range">
                <input
                  type="number"
                  v-model.number="filters.priceMin"
                  @input="resetPage"
                  min="0"
                  step="10000"
                />
                <span class="find-ap__dash">до</span>
                <input
                  type="number"
                  v-model.number="filters.priceMax"
                  @input="resetPage"
                  min="0"
                  step="10000"
                />
              </div>
            </label>
          </div>

          <div class="find-ap__row">
            <label class="find-ap__field">
              <span class="find-ap__label">Площадь, м²</span>
              <div class="find-ap__range">
                <input type="number" v-model.number="filters.areaMin" @input="resetPage" min="0" />
                <span class="find-ap__dash">до</span>
                <input type="number" v-model.number="filters.areaMax" @input="resetPage" min="0" />
              </div>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Срок сдачи</span>
              <select v-model="filters.delivery" @change="resetPage">
                <option v-for="d in deliveries" :key="d" :value="d">
                  {{ d === 'all' ? 'Выбрать' : d }}
                </option>
              </select>
            </label>

            <label class="find-ap__field find-ap__field--check">
              <span class="find-ap__label">&nbsp;</span>
              <label class="find-ap__check">
                <input type="checkbox" v-model="filters.promo" @change="resetPage" />
                <span>По акции</span>
              </label>
            </label>

            <Button class="find-ap__apply" @click="applyFilters">Подобрать квартиру</Button>
          </div>

          <div class="find-ap__more-toggle">
            <button class="find-ap__more" type="button" @click="showMoreFilters = !showMoreFilters">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_223_23473)">
                  <path
                    d="M14.0007 13.3333L9.33398 13.3333"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66667 13.3333L2 13.3333"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 8L8 8"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.33333 8L2 8"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.9993 2.66666L10.666 2.66666"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 2.66666L2 2.66666"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.33398 15.3333L9.33398 11.3333"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.33398 10L5.33398 6"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.666 4.66666L10.666 0.666657"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_223_23473">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {{ showMoreFilters ? 'скрыть фильтры' : 'все фильтры' }}
            </button>
            <button class="find-ap__reset-link" type="button" @click="resetFilters">
              сбросить фильтр
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3L3 9"
                  stroke="black"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 3L9 9"
                  stroke="black"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <transition name="fade">
          <div v-if="showMoreFilters" class="find-ap__row find-ap__row--more">
            <label class="find-ap__field">
              <span class="find-ap__label">Корпус</span>
              <select v-model="filters.building" @change="resetPage">
                <option v-for="b in buildings" :key="b" :value="b">
                  {{ b === 'all' ? 'Выбрать' : b }}
                </option>
              </select>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Этаж</span>
              <div class="find-ap__range">
                <input type="number" v-model.number="filters.floorMin" @input="resetPage" min="1" />
                <span class="find-ap__dash">до</span>
                <input type="number" v-model.number="filters.floorMax" @input="resetPage" min="1" />
              </div>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Отделка</span>
              <select v-model="filters.finishing" @change="resetPage">
                <option value="all">Любая</option>
                <option value="Чистовая">Чистовая</option>
                <option value="Предчистовая">Предчистовая</option>
              </select>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Статус</span>
              <select v-model="filters.status" @change="resetPage">
                <option value="all">Любой</option>
                <option value="В продаже">В продаже</option>
                <option value="Забронировано">Забронировано</option>
              </select>
            </label>

            <label class="find-ap__field find-ap__field--search">
              <span class="find-ap__label">Поиск по ID/секции</span>
              <input
                type="text"
                v-model="filters.query"
                @input="resetPage"
                placeholder="Например, A-205"
              />
            </label>
          </div>
        </transition>

        <div class="find-ap__main">
          <div class="find-ap__head">
            <div class="find-ap__sort-tabs">
              <span
                class="find-ap__sort-item"
                :class="{ active: filters.sortBy === 'priceAsc' }"
                @click="((filters.sortBy = 'priceAsc'), resetPage())"
              >
                Сначала дешевле
              </span>
              <span
                class="find-ap__sort-item"
                :class="{ active: filters.sortBy === 'priceDesc' }"
                @click="((filters.sortBy = 'priceDesc'), resetPage())"
                >Сначала дороже</span
              >
              <span
                class="find-ap__sort-item"
                :class="{ active: filters.sortBy === 'areaAsc' }"
                @click="((filters.sortBy = 'areaAsc'), resetPage())"
                >Площадь (меньше)</span
              >
              <span
                class="find-ap__sort-item"
                :class="{ active: filters.sortBy === 'areaDesc' }"
                @click="((filters.sortBy = 'areaDesc'), resetPage())"
                >Площадь (больше)</span
              >
            </div>
          </div>
          <div class="find-ap__panel">
            <div class="find-ap__results">
              <div v-if="paginated.length" class="find-ap__list">
                <div v-for="ap in paginated" :key="ap.id" class="find-ap__card">
                  <div class="find-ap__left">
                    <div class="find-ap__plan">
                      <img :src="ap.img" :alt="ap.id" loading="lazy" decoding="async" />
                      <span v-if="ap.promo" class="find-ap__badge">-10%</span>
                    </div>
                  </div>

                  <div class="find-ap__right">
                    <div class="find-ap__top">
                      <h3 class="find-ap__title-in">
                        {{ ap.rooms }}-х комнатная квартира {{ ap.area }} м2
                      </h3>
                      <div class="find-ap__loc">
                        <p>г. {{ ap.city }}</p>
                        <p>{{ ap.address }}</p>

                        <p>ЖК «{{ ap.project }}»</p>
                      </div>
                    </div>

                    <div class="find-ap__specgrid">
                      <dl>
                        <dt>Этаж</dt>
                        <dd>{{ ap.floor }} из {{ ap.floorsTotal }}</dd>
                      </dl>
                      <dl>
                        <dt>Жилой метраж</dt>
                        <dd>{{ ap.living }} м2</dd>
                      </dl>
                      <dl>
                        <dt>Площадь квартиры</dt>
                        <dd>{{ ap.area }} м2</dd>
                      </dl>
                      <dl>
                        <dt>Состояние</dt>
                        <dd>Строящийся дом</dd>
                      </dl>
                      <dl>
                        <dt>Метраж кухни</dt>
                        <dd>{{ ap.kitchen }} м2</dd>
                      </dl>
                      <dl>
                        <dt>Код</dt>
                        <dd>{{ ap.code }}</dd>
                      </dl>
                    </div>

                    <div class="find-ap__prices">
                      <div>
                        <div class="find-ap__price">
                          {{ ap.price.toLocaleString('ru-RU') }} руб.
                        </div>
                        <div class="find-ap__hint">
                          в ипотеку от {{ monthlyPayment(ap.price).toLocaleString('ru-RU') }} руб.
                        </div>
                      </div>
                      <div>
                        <div class="find-ap__price">
                          {{ ap.priceM2.toLocaleString('ru-RU') }} руб/м²
                        </div>
                        <div class="find-ap__hint">цена за квадратный метр</div>
                      </div>
                    </div>

                    <div class="find-ap__actions">
                      <Button class="find-ap__cta">Связаться по квартире</Button>
                      <a class="find-ap__phone" href="tel:+74012279086">
                        <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M14.7008 11.284L14.7069 13.2839C14.7082 13.4696 14.6707 13.6535 14.5969 13.8238C14.523 13.9942 14.4144 14.1472 14.2779 14.2732C14.1415 14.3991 13.9803 14.4951 13.8046 14.5551C13.6288 14.6152 13.4425 14.6378 13.2576 14.6217C11.2055 14.405 9.23281 13.7099 7.49809 12.5924C5.88423 11.5737 4.51445 10.2122 3.48603 8.60449C2.3541 6.8687 1.64696 4.89069 1.42191 2.83069C1.40469 2.64639 1.42604 2.46052 1.4846 2.28492C1.54315 2.10932 1.63763 1.94783 1.76201 1.81074C1.88639 1.67365 2.03796 1.56397 2.20705 1.48866C2.37615 1.41336 2.55908 1.37409 2.74418 1.37336L4.74417 1.36732C5.0677 1.36316 5.3817 1.47678 5.62765 1.68701C5.8736 1.89723 6.03471 2.18972 6.08096 2.50995C6.16731 3.14974 6.32576 3.7777 6.55329 4.38187C6.6437 4.62021 6.6639 4.87948 6.61148 5.12895C6.55906 5.37842 6.43623 5.60763 6.25754 5.78943L5.41343 6.63865C6.36751 8.30481 7.75361 9.68256 9.4255 10.6266L10.2696 9.77733C10.4503 9.59754 10.6788 9.47333 10.9279 9.4194C11.1771 9.36548 11.4365 9.38411 11.6754 9.47308C12.2809 9.69696 12.9098 9.85161 13.5501 9.93409C13.8741 9.9788 14.1703 10.141 14.3825 10.3899C14.5947 10.6388 14.708 10.957 14.7008 11.284Z"
                            fill="#212026"
                          />
                        </svg>
                        +7 (4012) 27-90-86</a
                      >
                      <div class="find-ap__icons">
                        <a href="#" class="find-ap__icon">
                          <svg viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2370_7448)">
                              <path
                                d="M7.99996 0.144917C6.89998 0.15156 6.00544 1.05698 6.01209 2.15696L6.18133 30.1564C6.18798 31.2564 7.09341 32.151 8.19339 32.1443L28.193 32.0236C29.293 32.0169 30.1875 31.1115 30.1809 30.0115L30.0479 8.01191L21.9997 0.0603703L7.99996 0.144917Z"
                                fill="white"
                              />
                              <path
                                d="M24.0483 8.04815L30.0482 8.01192L22 0.0603768L22.0363 6.06027C22.0429 7.16025 22.9483 8.0548 24.0483 8.04815Z"
                                fill="#BAB9BE"
                              />
                              <path
                                d="M26.1559 26.0358C26.1592 26.5858 25.7119 27.0385 25.162 27.0418L3.16236 27.1747C2.61237 27.178 2.15966 26.7307 2.15633 26.1807L2.09589 16.1809C2.09256 15.6309 2.53984 15.1782 3.08983 15.1749L25.0894 15.042C25.6394 15.0387 26.0921 15.486 26.0954 16.036L26.1559 26.0358Z"
                                fill="#DA1A1F"
                              />
                              <path
                                d="M6.47404 19.1014C6.47244 18.8374 6.6787 18.5482 7.01369 18.5462L8.86066 18.535C9.90064 18.5287 10.8408 19.2191 10.8489 20.553C10.8565 21.817 9.92481 22.5267 8.88482 22.5329L7.54985 22.541L7.55623 23.597C7.55836 23.949 7.33557 24.1493 7.04757 24.1511C6.78358 24.1527 6.50338 23.9553 6.50125 23.6034L6.47404 19.1014ZM7.53177 19.5501L7.54381 21.542L8.87879 21.534C9.41478 21.5307 9.83591 21.0552 9.83291 20.5592C9.82953 20.0002 9.40274 19.5388 8.86675 19.542L7.53177 19.5501Z"
                                fill="#F2F2F9"
                              />
                              <path
                                d="M12.437 24.1184C12.173 24.12 11.8841 23.9778 11.882 23.6268L11.8546 19.0849C11.8528 18.7979 12.1396 18.5871 12.4036 18.5855L14.2345 18.5745C17.8884 18.5524 17.8419 24.0858 14.34 24.107L12.437 24.1184ZM12.9134 19.5585L12.9351 23.1404L14.2621 23.1324C16.421 23.1194 16.4954 19.5369 14.2404 19.5505L12.9134 19.5585Z"
                                fill="#F2F2F9"
                              />
                              <path
                                d="M19.1109 19.5852L19.1186 20.8561L21.1575 20.8438C21.4455 20.8421 21.7352 21.1283 21.7369 21.4073C21.7385 21.6713 21.4518 21.8891 21.1638 21.8908L19.1249 21.9031L19.135 23.5821C19.1367 23.8621 18.939 24.0783 18.659 24.08C18.307 24.0821 18.0907 23.8684 18.089 23.5884L18.0616 19.0465C18.0599 18.7595 18.2746 18.5492 18.6256 18.5471L21.4325 18.5301C21.7845 18.528 21.9938 18.7357 21.9955 19.0227C21.9971 19.2787 21.7908 19.568 21.4388 19.5701L19.1109 19.5842L19.1109 19.5852Z"
                                fill="#F2F2F9"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2370_7448">
                                <rect
                                  width="32"
                                  height="32"
                                  fill="white"
                                  transform="matrix(0.999982 -0.00603907 0.00604443 0.999982 0 0.19325)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </a>
                        <a href="#" class="find-ap__icon">
                          <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M20.0615 10.327C20.0974 16.2663 12.1283 21.4054 12.1283 21.4054C12.1283 21.4054 4.09768 16.3629 4.06178 10.4236C4.04954 8.39839 4.88064 6.45099 6.37225 5.00986C7.86385 3.56873 9.89379 2.75192 12.0155 2.7391C14.1372 2.72629 16.1768 3.51853 17.6857 4.94154C19.1947 6.36455 20.0492 8.30176 20.0615 10.327Z"
                              fill="#212026"
                            />
                            <path
                              d="M12.0797 13.4056C13.5524 13.3967 14.7391 12.1956 14.7302 10.7228C14.7213 9.25012 13.5202 8.06344 12.0475 8.07234C10.5747 8.08123 9.38808 9.28233 9.39698 10.7551C9.40588 12.2278 10.607 13.4145 12.0797 13.4056Z"
                              fill="#F2F2F9"
                            />
                          </svg>
                        </a>
                        <RouterLink
                          class="find-ap__icon"
                          :to="{ path: '/apartment', query: { id: ap.id } }"
                          aria-label="Подробнее"
                          >⋯</RouterLink
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="find-ap__empty">По вашему запросу ничего не найдено</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Pagination
    :total="totalItems"
    :perPage="perPage"
    :currentPage="currentPage"
    @update:currentPage="(p) => (currentPage = p)"
  />

  <CallbackBlock :isblue="true" />
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.find-ap {
  margin-top: clamp(12px, vw(24px, $desktop), 24px);
  font-family: var(--font-family);

  &__title {
    // margin-bottom: clamp(24px, vw(30px, $desktop), 30px);
  }

  &__filters {
    display: flex;
    flex-direction: column;
    gap: clamp(24px, vw(24px, $desktop), 24px);
    margin-bottom: clamp(30px, vw(40px, $desktop), 40px);
  }
  &__row {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(16px, vw(20px, $desktop), 20px);
    align-items: center;
    @media (min-width: $tab) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: $desk) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  &__row--more {
    margin-bottom: clamp(30px, vw(40px, $desktop), 40px);
  }
  &__more-toggle {
    // margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__more {
    display: flex;
    align-items: center;
    gap: clamp(6px, vw(8px, $desktop), 8px);
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: var(--100);
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: clamp(5px, vw(6px, $desktop), 6px);
  }
  &__field {
    select,
    input[type='text'],
    input[type='number'] {
      width: 100%;
      border-radius: 10px;
      background: var(--seryy) !important;
      border: 1px solid transparent;
      padding: clamp(10px, vw(13px, $desktop), 13px) clamp(10px, vw(15px, $desktop), 15px);
      font-weight: 400;
      font-size: clamp(16px, vw(18px, $desktop), 18px);
      line-height: 146%;
      color: var(--100);
      transition: background 0.3s ease;
    }

    // когда input не пустой
    input[type='text']:not(:placeholder-shown),
    input[type='number']:not(:placeholder-shown) {
      background: var(--color); // например, светлее
    }

    // когда select выбран
    select:valid {
      background: var(--color);
    }
  }
  // &__field--search {
  //   grid-column: 1 / -1;
  // }
  &__field--check {
    display: flex;
    justify-content: flex-end;
  }
  &__label {
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--40);
  }

  &__chips {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  &__chip:first-child {
    flex: 1.3;
  }
  &__chip {
    cursor: pointer;
    border-radius: 10px;
    padding: clamp(8px, vw(10px, $desktop), 10px) clamp(12px, vw(16px, $desktop), 16px);
    background: var(--seryy);
    color: var(--60);
    border: 1px solid transparent;
    flex: 1;
    text-align: center;
  }
  &__chip.active {
    background: #fff;
    border: 1px solid var(--40);
  }

  &__range {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__dash {
    color: var(--60);
  }

  &__check {
    // display: inline-flex;
    // align-items: center;
    // gap: 8px;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    span {
      position: relative;
      padding-left: clamp(27px, vw(28px, $desktop), 28px);
      cursor: pointer;
      font-weight: 400;
      font-size: clamp(16px, vw(18px, $desktop), 18px);
      line-height: 146%;
      color: var(--100);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: clamp(18px, vw(22px, $desktop), 22px);
        height: clamp(18px, vw(22px, $desktop), 22px);
        // border: 2px solid #888;
        border-radius: 4px; // или 50% если хочешь круглую
        background: var(--seryy);
        transition: all 0.2s;
      }
    }

    input:checked + span::before {
      background: var(--100);
      border-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.6673 5L7.50065 14.1667L3.33398 10' stroke='white' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  // &__check input {
  //   width: 16px;
  //   height: 16px;
  // }

  &__apply {
    white-space: nowrap;
    align-self: flex-end;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid var(--100);
    }
  }
  &__reset-link {
    display: flex;
    align-items: center;
    gap: clamp(4px, vw(4px, $desktop), 4px);
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--60);
    cursor: pointer;
  }
  &__main {
    background: var(--seryy);
    border-radius: 20px;
    padding: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__head {
    display: flex;
    justify-content: flex-start;
    margin-bottom: clamp(20px, vw(20px, $desktop), 20px);
    overflow: scroll;
    scrollbar-width: none;
  }
  &__sort-tabs {
    display: flex;
    gap: clamp(12px, vw(16px, $desktop), 16px);
  }
  &__sort-item {
    cursor: pointer;
    color: var(--60);
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    border-bottom: 1px dashed var(--2);
    white-space: nowrap;
  }
  &__sort-item.active {
    color: var(--100);
    border-bottom-color: 1px dashed var(--2);
  }

  &__panel {
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: clamp(16px, vw(20px, $desktop), 20px);
  }
  &__card {
    background: var(--color);
    border-radius: 30px;
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    padding: clamp(20px, vw(30px, $desktop), 30px);
    column-gap: clamp(12px, vw(18px, $desktop), 18px);
    row-gap: clamp(20px, vw(20px, $desktop), 20px);
    @media (min-width: $tab-inner) {
      grid-template-columns: clamp(320px, vw(515px, $desktop), 515px) 1fr;
    }
  }
  &__left {
    // display: flex;
    // flex-direction: column;
    // gap: 8px;
    // align-items: center;
  }
  &__plan {
    position: relative;
    // width: 100%;
    // aspect-ratio: 4/5;
    overflow: hidden;
  }
  &__plan img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &__badge {
    position: absolute;
    left: 12px;
    top: 12px;
    background: #ff3b30;
    color: #fff;
    border-radius: 10px;
    padding: clamp(4px, vw(4px, $desktop), 4px) clamp(8px, vw(10px, $desktop), 10px);
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--color);
  }
  // &__dot {
  //   width: 28px;
  //   height: 28px;
  //   border-radius: 50%;
  //   background: var(--seryy);
  //   border: 1px solid var(--obvodka);
  //   color: var(--100);
  //   display: inline-flex;
  //   align-items: center;
  //   justify-content: center;
  // }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: clamp(18px, vw(23px, $desktop), 23px);
  }
  &__top {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: clamp(10px, vw(12px, $desktop), 12px);
  }
  &__title-in {
    font-weight: 600;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
  }

  &__loc {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--60);
    display: flex;
    // align-items: center;
    gap: clamp(4px, vw(16px, $desktop), 23px);
    flex-direction: column;
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__dotsep {
    padding: 0 6px;
    color: var(--60);
  }
  &__link {
    color: var(--1);
    text-decoration: underline;
  }

  &__specgrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px 20px;
    @media (min-width: $desk) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__specgrid dl {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--obvodka);
    padding-bottom: 8px;
  }
  &__specgrid dt {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--60);
  }
  &__specgrid dd {
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
  }

  &__prices {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(20px, vw(28px, $desktop), 28px);
    align-items: center;
    @media (min-width: $desk) {
      grid-template-columns: 1fr 1fr;
    }
  }
  &__price {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
    margin-bottom: clamp(2px, vw(3px, $desktop), 3px);
  }
  &__hint {
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--60);
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: clamp(15px, vw(20px, $desktop), 20px);
    justify-content: center;
    flex-wrap: wrap;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-wrap: nowrap;
    }
  }
  &__cta {
    background: #da1a1f;
    color: #fff;
    border: 1px solid transparent;
    width: 100%;
    &:hover {
      border: 1px solid var(--100);
    }
    @media (min-width: $desk) {
      width: auto;
    }
  }
  &__icons {
    display: flex;
    gap: clamp(6px, vw(8px, $desktop), 8px);
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      margin-left: auto;
    }
  }
  &__icon {
    width: clamp(38px, vw(52px, $desktop), 52px);
    height: clamp(38px, vw(52px, $desktop), 52px);
    border-radius: 50%;
    background: var(--seryy);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: 1px solid var(--obvodka);
    color: var(--100);
    svg {
      width: clamp(24px, vw(30px, $desktop), 30px);
      height: clamp(24px, vw(30px, $desktop), 30px);
    }
  }
  &__phone {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--100);
    display: flex;
    align-items: center;
    gap: clamp(4px, vw(5px, $desktop), 5px);
    svg {
      width: clamp(15px, vw(17px, $desktop), 17px);
      height: clamp(15px, vw(17px, $desktop), 17px);
    }
  }

  &__empty {
    padding: 24px;
    text-align: center;
    color: var(--60);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
