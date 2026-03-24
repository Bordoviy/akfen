<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Pagination from '@/components/Pagination.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import CallbackBlock from '@/layouts/mortgage-installment/CallbackBlock.vue'

const API_URL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_AKFEN_API_URL || 'https://admin-api.akfen39.ru/api'
const API_TOKEN =
  import.meta.env.VITE_AKFEN_API_TOKEN ||
  'NETGWLNgcZH5ntavOYULjOtTQCFRcS23Xn0Mgg7lEUfTol93VGPbNVT1Ek9jtNV8'

const isModal = ref(false)
const apartments = ref([])
const complexes = ref([])
const housesById = ref({})
const isLoading = ref(false)
const errorMessage = ref('')
const currentPage = ref(1)
const perPage = 6
const totalItems = ref(0)
const priceBounds = { min: 0, max: 30000000 }
const areaBounds = { min: 20, max: 150 }

const filters = reactive({
  city: 'all',
  project: 'all',
  rooms: '',
  priceFrom: priceBounds.min,
  priceTo: priceBounds.max,
  areaFrom: areaBounds.min,
  areaTo: areaBounds.max,
  sortBy: 'priceDesc',
})

function toggleModal() {
  isModal.value = !isModal.value
}

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

async function fetchComplexes() {
  try {
    const response = await fetchJson('/complexes')
    complexes.value = response.data ?? []
  } catch (error) {
    console.error(error)
  }
}

async function fetchHouseDetails(houseIds) {
  const missingIds = houseIds.filter((id) => id && !housesById.value[id])

  if (!missingIds.length) return

  const responses = await Promise.all(
    missingIds.map(async (id) => {
      const response = await fetchJson(`/houses/${id}`)
      return response.data
    }),
  )

  housesById.value = responses.reduce(
    (acc, house) => {
      acc[house.id] = house
      return acc
    },
    { ...housesById.value },
  )
}

function getApartmentParams() {
  const params = new URLSearchParams({
    per_page: String(perPage),
    page: String(currentPage.value),
    sort_by: 'price',
    sort_direction: filters.sortBy === 'priceDesc' ? 'desc' : 'asc',
  })

  if (filters.city !== 'all') params.set('city', filters.city)
  if (filters.project !== 'all') params.set('complex_name', filters.project)
  if (filters.rooms) params.set('rooms', filters.rooms)
  if (filters.priceFrom > priceBounds.min) params.set('price_from', String(filters.priceFrom))
  if (filters.priceTo < priceBounds.max) params.set('price_to', String(filters.priceTo))
  if (filters.areaFrom > areaBounds.min) params.set('area_from', String(filters.areaFrom))
  if (filters.areaTo < areaBounds.max) params.set('area_to', String(filters.areaTo))

  return params.toString()
}

async function fetchApartments() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetchJson(`/apartments?${getApartmentParams()}`)
    apartments.value = response.data ?? []
    totalItems.value = Number(response.meta?.total) || 0

    const houseIds = apartments.value.map((apartment) => apartment.house?.id).filter(Boolean)
    await fetchHouseDetails([...new Set(houseIds)])
  } catch (error) {
    console.error(error)
    apartments.value = []
    totalItems.value = 0
    errorMessage.value = 'Не удалось загрузить список квартир'
  } finally {
    isLoading.value = false
  }
}

const cities = computed(() => ['all', ...new Set(complexes.value.map((complex) => complex.city))])
const projects = computed(() => ['all', ...new Set(complexes.value.map((complex) => complex.name))])

const selectedChips = computed(() => {
  const chips = []

  if (filters.city !== 'all') chips.push({ key: 'city', label: filters.city })
  if (filters.project !== 'all') chips.push({ key: 'project', label: filters.project })
  if (filters.rooms) chips.push({ key: 'rooms', label: `${filters.rooms} комн.` })
  if (filters.priceFrom > priceBounds.min || filters.priceTo < priceBounds.max) {
    chips.push({
      key: 'price',
      label: `Цена: ${Math.trunc(filters.priceFrom)} - ${Math.trunc(filters.priceTo)}`,
    })
  }
  if (filters.areaFrom > areaBounds.min || filters.areaTo < areaBounds.max) {
    chips.push({
      key: 'area',
      label: `Площадь: ${filters.areaFrom} - ${filters.areaTo}`,
    })
  }

  return chips
})

function applyFilters() {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    return
  }

  fetchApartments()
}

function resetFilters() {
  filters.city = 'all'
  filters.project = 'all'
  filters.rooms = ''
  filters.priceFrom = priceBounds.min
  filters.priceTo = priceBounds.max
  filters.areaFrom = areaBounds.min
  filters.areaTo = areaBounds.max
  filters.sortBy = 'priceDesc'
  applyFilters()
}

function removeChip(key) {
  switch (key) {
    case 'city':
      filters.city = 'all'
      break
    case 'project':
      filters.project = 'all'
      break
    case 'rooms':
      filters.rooms = ''
      break
    case 'price':
      filters.priceFrom = priceBounds.min
      filters.priceTo = priceBounds.max
      break
    case 'area':
      filters.areaFrom = areaBounds.min
      filters.areaTo = areaBounds.max
      break
    default:
      break
  }

  applyFilters()
}

function setRoom(value) {
  filters.rooms = filters.rooms === value ? '' : value
}

function handlePageChange(page) {
  currentPage.value = page
}

function onPriceMinInput() {
  if (filters.priceFrom > filters.priceTo) filters.priceTo = filters.priceFrom
}

function onPriceMaxInput() {
  if (filters.priceTo < filters.priceFrom) filters.priceFrom = filters.priceTo
}

function onAreaMinInput() {
  if (filters.areaFrom > filters.areaTo) filters.areaTo = filters.areaFrom
}

function onAreaMaxInput() {
  if (filters.areaTo < filters.areaFrom) filters.areaFrom = filters.areaTo
}

function getRangeStyle(min, max, from, to) {
  const range = max - min

  if (range <= 0) {
    return {
      '--range-start': '0%',
      '--range-end': '100%',
    }
  }

  const start = ((from - min) / range) * 100
  const end = ((to - min) / range) * 100

  return {
    '--range-start': `${Math.max(0, Math.min(100, start))}%`,
    '--range-end': `${Math.max(0, Math.min(100, end))}%`,
  }
}

function getHouse(apartment) {
  return housesById.value[apartment.house?.id] || apartment.house || {}
}

function formatPrice(value) {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) return null

  return Math.trunc(parsedValue).toLocaleString('ru-RU')
}

function formatArea(value) {
  if (value === null || value === undefined || value === '') return '-'
  return String(value).replace('.', ',')
}

function formatRooms(apartment) {
  return `${apartment.rooms_amount}-х комнатная квартира ${formatArea(apartment.area_total)} м2`
}

function formatCity(apartment) {
  const house = getHouse(apartment)
  return `г. ${house.locality || apartment.complex?.city || '-'}`
}

function normalizeç(address, city) {
  if (!address) return 'Адрес уточняется'

  const normalizedAddress = address
    .replace(`${city || ''},`, '')
    .replace(/\s+/g, ' ')
    .replace(/^,\s*/, '')
    .trim()

  return normalizedAddress || 'Адрес уточняется'
}

function normalizeStreetAddress(street, city) {
  if (!street) return ''

  return street
    .replace(new RegExp(`^${city || ''},\\s*`, 'i'), '')
    .replace(/^ул\.\s*ул\./i, 'ул.')
    .replace(/(\s[-/]\s)ул\.\s*/gi, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatAddress(apartment) {
  const house = getHouse(apartment)
  const street = normalizeStreetAddress(house.street?.trim(), house.locality || apartment.complex?.city)
  const number = house.number?.trim()

  if (street && number) {
    return `${street}, ${number}`
  }

  if (street) {
    return street
  }

  if (number) {
    return number
  }

  const normalizedAddress = normalizeStreetAddress(
    house.full_address,
    house.locality || apartment.complex?.city,
  )

  if (normalizedAddress === 'Адрес уточняется') return normalizedAddress

  return normalizedAddress.replace(/^ул\.\s*ул\./i, 'ул.')
}

function formatProject(apartment) {
  return `ЖК ${apartment.complex?.name || '-'}`
}

function formatFloor(apartment) {
  const house = getHouse(apartment)
  return house.maxFloor ? `${apartment.floor} из ${house.maxFloor}` : String(apartment.floor ?? '-')
}

function formatBuildingState(apartment) {
  const buildingState = getHouse(apartment).details?.buildingState

  if (buildingState === 'UNFINISHED') return 'Строящийся дом'
  if (buildingState === 'FINISHED') return 'Дом сдан'

  return 'Не указано'
}

function getImage(apartment) {
  return apartment.images?.[0] || apartment.pb_image || '/imgs/sp1.png'
}

watch(currentPage, fetchApartments)

onMounted(async () => {
  await fetchComplexes()
  await fetchApartments()
})
</script>

<template>
  <Breadcrumbs />

  <div class="find-ap">
    <div class="container">
      <div class="find-ap__inner">
        <h1 class="default-title find-ap__title">Подобрать квартиру</h1>

        <div class="find-ap__filters">
          <div class="find-ap__row">
            <label class="find-ap__field">
              <span class="find-ap__label">Город</span>
              <select v-model="filters.city">
                <option v-for="city in cities" :key="city" :value="city">
                  {{ city === 'all' ? 'Выбрать' : city }}
                </option>
              </select>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Проект</span>
              <select v-model="filters.project">
                <option v-for="project in projects" :key="project" :value="project">
                  {{ project === 'all' ? 'Выбрать' : project }}
                </option>
              </select>
            </label>

            <div class="find-ap__field">
              <span class="find-ap__label">Число комнат</span>
              <div class="find-ap__chips">
                <button v-for="room in ['1', '2', '3', '4']" :key="room" type="button" class="find-ap__chip"
                  :class="{ active: filters.rooms === room }" @click="setRoom(room)">
                  {{ room }}
                </button>
              </div>
            </div>

            <label class="find-ap__field find-ap__field--range">
              <span class="find-ap__label">Задать стоимость</span>
              <div class="find-ap__range">
                <div class="find-ap__range--w">
                  <span class="find-ap__dash">от</span>
                  <p> {{ Math.trunc(filters.priceFrom).toLocaleString('ru-RU') }}
                  </p>
                </div>
                <div class="find-ap__range--w">
                  <span class="find-ap__dash">до</span>
                  <p> {{ Math.trunc(filters.priceTo).toLocaleString('ru-RU') }}
                  </p>
                </div>


              </div>
              <div class="find-ap__slider-range" :style="getRangeStyle(
                priceBounds.min,
                priceBounds.max,
                filters.priceFrom,
                filters.priceTo,
              )
                ">
                <input v-model.number="filters.priceFrom" type="range" :min="priceBounds.min" :max="priceBounds.max"
                  step="100000" @input="onPriceMinInput" />
                <input v-model.number="filters.priceTo" type="range" :min="priceBounds.min" :max="priceBounds.max"
                  step="100000" @input="onPriceMaxInput" />
              </div>
            </label>
          </div>

          <div class="find-ap__row">
            <label class="find-ap__field find-ap__field--range">
              <span class="find-ap__label">Площадь, м²</span>
              <div class="find-ap__range">
                <div>
                  <span class="find-ap__dash">от</span>
                  <p>{{ filters.areaFrom }}</p>
                </div>
                 <div>
                  <span class="find-ap__dash">до</span>
                  <p>{{ filters.areaTo }}</p>
                </div>

              </div>
              <div class="find-ap__slider-range" :style="getRangeStyle(
                areaBounds.min,
                areaBounds.max,
                filters.areaFrom,
                filters.areaTo,
              )
                ">
                <input v-model.number="filters.areaFrom" type="range" :min="areaBounds.min" :max="areaBounds.max"
                  step="1" @input="onAreaMinInput" />
                <input v-model.number="filters.areaTo" type="range" :min="areaBounds.min" :max="areaBounds.max" step="1"
                  @input="onAreaMaxInput" />
              </div>
            </label>

            <label class="find-ap__field">
              <span class="find-ap__label">Сортировка</span>
              <select v-model="filters.sortBy">
                <option value="priceDesc">Сначала дороже</option>
                <option value="priceAsc">Сначала дешевле</option>
              </select>
            </label>

            <div class="find-ap__actions-row">
              <Button class="find-ap__apply" @click="applyFilters">Подобрать квартиру</Button>
              <button class="find-ap__reset-link" type="button" @click="resetFilters">
                сбросить фильтр
              </button>
            </div>
          </div>
        </div>

        <div v-if="selectedChips.length" class="find-ap__selected">
          <div class="find-ap__selected-list">
            <button v-for="chip in selectedChips" :key="chip.key" type="button" class="find-ap__selected-chip"
              @click="removeChip(chip.key)">
              <span>{{ chip.label }}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M3 3L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="find-ap__main">
      <div class="container">
        <div class="find-ap__panel">
          <div class="find-ap__results">
            <div v-if="isLoading" class="find-ap__empty">Загрузка...</div>
            <div v-else-if="errorMessage" class="find-ap__empty">{{ errorMessage }}</div>
            <div v-else-if="apartments.length" class="find-ap__list">
              <div v-for="apartment in apartments" :key="apartment.id" class="find-ap__card">
                <div class="find-ap__left">
                  <div class="find-ap__plan">
                    <img :src="getImage(apartment)" :alt="formatRooms(apartment)" loading="lazy" decoding="async" />
                  </div>
                </div>

                <div class="find-ap__right">
                  <div class="find-ap__top">
                    <RouterLink class="find-ap__title-in" :to="{ path: '/apartment', query: { id: apartment.id } }"
                      aria-label="Подробнее">
                      {{ formatRooms(apartment) }}
                    </RouterLink>

                    <div class="find-ap__loc">
                      <p>{{ formatCity(apartment) }}</p>
                      <p>{{ formatAddress(apartment) }}</p>
                      <p>{{ formatProject(apartment) }}</p>
                    </div>
                  </div>

                  <div class="find-ap__prices">
                    <div>
                      <div class="find-ap__price red">
                        {{ formatPrice(apartment.price) ? `${formatPrice(apartment.price)} руб.` : 'Цена уточняется' }}
                      </div>
                    </div>
                    <div>
                      <div class="find-ap__price">
                        {{
                          formatPrice(apartment.pricePerMeter)
                            ? `${formatPrice(apartment.pricePerMeter)} руб/м²`
                            : 'Цена за м² уточняется'
                        }}
                      </div>
                    </div>
                  </div>

                  <div class="find-ap__specgrid">
                    <dl>
                      <dt>Количество комнат</dt>
                      <dd>{{ apartment.rooms_amount }}</dd>
                    </dl>
                    <dl>
                      <dt>Площадь квартиры</dt>
                      <dd>{{ formatArea(apartment.area_total) }} м2</dd>
                    </dl>
                    <dl>
                      <dt>Жилая площадь</dt>
                      <dd>{{ formatArea(apartment.details?.area_living) }} м2</dd>
                    </dl>
                    <dl>
                      <dt>Площадь кухни</dt>
                      <dd>{{ formatArea(apartment.details?.area_kitchen) }} м2</dd>
                    </dl>
                    <dl>
                      <dt>Этаж</dt>
                      <dd>{{ formatFloor(apartment) }}</dd>
                    </dl>
                    <dl>
                      <dt>Стадия строительства</dt>
                      <dd>{{ formatBuildingState(apartment) }}</dd>
                    </dl>
                  </div>

                  <div class="find-ap__actions">
                    <Button class="find-ap__cta" @click.prevent="toggleModal">Связаться по квартире</Button>
                    <Modal v-if="isModal" @close="toggleModal" />
                    <a class="find-ap__phone" href="tel:+74012279086">
                      <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14.7008 11.284L14.7069 13.2839C14.7082 13.4696 14.6707 13.6535 14.5969 13.8238C14.523 13.9942 14.4144 14.1472 14.2779 14.2732C14.1415 14.3991 13.9803 14.4951 13.8046 14.5551C13.6288 14.6152 13.4425 14.6378 13.2576 14.6217C11.2055 14.405 9.23281 13.7099 7.49809 12.5924C5.88423 11.5737 4.51445 10.2122 3.48603 8.60449C2.3541 6.8687 1.64696 4.89069 1.42191 2.83069C1.40469 2.64639 1.42604 2.46052 1.4846 2.28492C1.54315 2.10932 1.63763 1.94783 1.76201 1.81074C1.88639 1.67365 2.03796 1.56397 2.20705 1.48866C2.37615 1.41336 2.55908 1.37409 2.74418 1.37336L4.74417 1.36732C5.0677 1.36316 5.3817 1.47678 5.62765 1.68701C5.8736 1.89723 6.03471 2.18972 6.08096 2.50995C6.16731 3.14974 6.32576 3.7777 6.55329 4.38187C6.6437 4.62021 6.6639 4.87948 6.61148 5.12895C6.55906 5.37842 6.43623 5.60763 6.25754 5.78943L5.41343 6.63865C6.36751 8.30481 7.75361 9.68256 9.4255 10.6266L10.2696 9.77733C10.4503 9.59754 10.6788 9.47333 10.9279 9.4194C11.1771 9.36548 11.4365 9.38411 11.6754 9.47308C12.2809 9.69696 12.9098 9.85161 13.5501 9.93409C13.8741 9.9788 14.1703 10.141 14.3825 10.3899C14.5947 10.6388 14.708 10.957 14.7008 11.284Z"
                          fill="#212026" />
                      </svg>
                      +7 (4012) 27-90-86
                    </a>
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

  <Pagination :total="totalItems" :perPage="perPage" :currentPage="currentPage"
    @update:currentPage="handlePageChange" />

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

  &__sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
  }

  &__sidebar {
    width: min(1040px, 100%);
    height: 100%;
    background: var(--color);
    border-radius: 30px 0 0 30px;
    padding: clamp(24px, vw(36px, $desktop), 36px);
    overflow: auto;

    @media (max-width: $tab) {
      border-radius: 0;
    }
  }

  &__sidebar-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: clamp(20px, vw(28px, $desktop), 28px);

    h3 {
      font-weight: 600;
      font-size: clamp(22px, vw(28px, $desktop), 28px);
      line-height: 120%;
      color: var(--100);
    }
  }

  &__sidebar-close {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--obvodka);
    background: var(--color);
    color: var(--100);
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
  }

  &__sidebar-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(16px, vw(20px, $desktop), 20px);

    @media (min-width: $tab) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $desk) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__sidebar-grid .find-ap__field--search {
    @media (min-width: $tab) {
      grid-column: span 2;
    }
  }

  &__sidebar-actions {
    margin-top: clamp(24px, vw(32px, $desktop), 32px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(12px, vw(16px, $desktop), 16px);
    flex-wrap: wrap;
  }

  &__sidebar .find-ap__range {
    justify-content: space-between;
  }

  &__sidebar .find-ap__range input[type='number'] {
    width: 70px;
    background: transparent !important;
    padding: 0;
    border: 0;
    text-align: left;
    font-weight: 500;
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
    gap: clamp(4px, vw(4px, $desktop), 4px);
    position: relative;
  }


  &__field {

    select,
    input[type='text'] {
      // width: 100%;
      border-radius: 10px;
      background-color: var(--seryy) !important;
      border: 1px solid transparent;
      padding: clamp(14px, vw(15.3px, $desktop), 15.3px) clamp(15px, vw(20px, $desktop), 20px);
      font-weight: 400;
      font-size: clamp(16px, vw(18px, $desktop), 18px);
      line-height: 146%;
      color: var(--100);
      transition: background 0.3s ease;
      -webkit-appearance: none;
    }

    select {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23929095' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-position: right clamp(15px, vw(20px, $desktop), 20px) center;
      background-repeat: no-repeat;
      background-size: 12px 8px;
      padding-right: clamp(40px, vw(48px, $desktop), 48px);
      appearance: none;
    }

    input[type='number'] {
      // width: 100%;
      border-radius: 10px;
      background: var(--seryy) !important;
      border: 1px solid transparent;
      padding: clamp(13px, vw(13.5px, $desktop), 13.5px) clamp(15px, vw(20px, $desktop), 20px);
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
    // select:valid {
    //   background-color: var(--color) !important;
    //    border: 1px solid var(--seryy);
    // }
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
    padding: clamp(14px, vw(15px, $desktop), 15px) clamp(12px, vw(16px, $desktop), 16px);
    // height: clamp(51px, vw(56px, $desktop), 56px);
    background: var(--seryy);
    border: 1px solid transparent;
    flex: 1;
    text-align: center;
    font-weight: 400;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--60);
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
  }

  &__chip.active {
    background: #da1a1f;
    border: 1px solid #da1a1f;
    color: #fff;
  }

  &__chip:hover,
  &__chip:focus-visible {
    background: #da1a1f;
    border: 1px solid #da1a1f;
    color: #fff;
    outline: none;
  }

  &__range {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    background: var(--seryy);
    border-radius: 10px;
    padding: clamp(16px, vw(18px, $desktop), 18px) clamp(12px, vw(16px, $desktop), 16px);

    div {
      font-weight: 400;
      font-size: clamp(16px, vw(18px, $desktop), 18px);
      color: var(--100);
      display: flex;
      gap: 6px;
      align-items: center;
      flex: 1;
    }
  

    &--w {
      display: flex;


    }
  }
  &__dash {
    color: var(--40);
  }

  &__range--inputs {
    padding: clamp(10px, vw(12px, $desktop), 12px) clamp(12px, vw(16px, $desktop), 16px);

    input {
      width: 100%;
      min-width: 0;
      border: 0;
      background: transparent;
      font-weight: 400;
      font-size: clamp(16px, vw(18px, $desktop), 18px);
      line-height: 146%;
      color: var(--100);

      &::placeholder {
        color: var(--60);
      }
    }
  }



  &__actions-row {
    display: flex;
    align-items: center;
    gap: 16px;
    grid-column: span 2;
    margin-bottom: 3px;
    align-self: flex-end;

    // @media (max-width: $tab) {
    //   flex-direction: column;
    //   align-items: stretch;
    // }
  }

  &__slider-range {
    height: 18px;
    bottom: -16px;
    left: 10px;
    right: 10px;
    position: absolute;
    width: auto;
    --range-start: 0%;
    --range-end: 100%;

    &::before,
    &::after {
      content: '';
      position: absolute;
      // top: 50%;
      // transform: translateY(-50%);
      height: 2px;
      border-radius: 999px;
      pointer-events: none;
    }

    &::before {
      left: 0;
      right: 0;
      background: #e5e5e5;
    }

    &::after {
      left: var(--range-start);
      right: calc(100% - var(--range-end));
      background: #da1a1f;
    }
  }

  &__slider-range input[type='range'] {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    height: 2px;
    background: transparent;
    pointer-events: none;
  }

  &__slider-range input[type='range']:last-child {
    background: transparent;
  }

  &__slider-range input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    pointer-events: auto;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #da1a1f;
    border: 0;
  }

  &__slider-range input[type='range']::-moz-range-thumb {
    pointer-events: auto;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #da1a1f;
    border: 0;
  }

  &__check {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    span {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      position: relative;
      font-weight: 400;
      font-size: clamp(16px, vw(18px, $desktop), 18px);
      line-height: 146%;
      color: var(--100);

      &::before {
        content: '';
        display: inline-block;
        width: clamp(28px, vw(32px, $desktop), 32px);
        height: clamp(28px, vw(32px, $desktop), 32px);
        border-radius: 8px;
        background: var(--seryy);
        transition: all 0.2s;
        flex: 0 0 auto;
      }
    }

    input:checked+span::before {
      background: var(--100);
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

  &__selected {
    margin-bottom: clamp(25px, vw(50px, $desktop), 50px);
  }

  &__selected-list {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(8px, vw(10px, $desktop), 10px);
  }

  &__selected-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: clamp(10px, vw(12px, $desktop), 12px) clamp(12px, vw(16px, $desktop), 16px);
    border-radius: 40px;
    background: var(--seryy);
    border: 1px solid var(--obvodka);
    color: var(--100);
    font-weight: 500;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 136%;
    cursor: pointer;
  }

  &__selected-chip svg {
    width: 12px;
    height: 12px;
  }

  &__main {
    background: var(--seryy);
    border-radius: 60px;
    padding: clamp(40px, vw(40px, $desktop), 40px) 0;
  }

  &__head {
    display: flex;
    justify-content: flex-start;
    margin-bottom: clamp(20px, vw(20px, $desktop), 20px);
    overflow: scroll;
    scrollbar-width: none;
  }

  &__sort-select {
    display: flex;
    align-items: center;
    gap: clamp(10px, vw(12px, $desktop), 12px);
  }

  &__sort-label {
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    color: var(--60);
  }

  &__sort-select select {
    // border-radius: 10px;
    background-color: var(--seryy);
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23191A1F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-position: right 0 center;
    background-repeat: no-repeat;
    background-size: 12px 8px;
    outline: none;
    cursor: pointer;
    // border: 1px solid transparent;
    border-bottom: 1px dashed var(--2);
    padding: clamp(4px, vw(4px, $desktop), 4px) 20px clamp(4px, vw(4px, $desktop), 4px) 0;
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    color: var(--100);
    margin-left: 20px;
    -webkit-appearance: none;
  }

  &__panel {}

  &__list {
    display: flex;
    flex-direction: column;
    gap: clamp(16px, vw(20px, $desktop), 20px);
  }

  &__card {
    background: var(--color);
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
    padding: clamp(20px, vw(30px, $desktop), 30px);

    @media (min-width: $tab-inner) {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: clamp(12px, vw(18px, $desktop), 18px);
      row-gap: clamp(20px, vw(20px, $desktop), 20px);
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
    // height: 100%;
    // width: clamp(280px, vw(525px, $tablet), 525px);

    @media (min-width: $desk) {
      height: 100%;
    }
  }

  &__plan img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__swiper {
    height: 100%;
  }

  &__swiper .swiper-wrapper,
  &__swiper .swiper-slide {
    height: 100%;
  }

  &__badge {
    position: absolute;
    left: 12px;
    top: 12px;
    background: var(--1);
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

    & a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }

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
    font-size: clamp(19px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
    margin-bottom: clamp(2px, vw(3px, $desktop), 3px);
  }

  & .red {
    color: var(--1);
  }

  &__price-row {
    display: flex;
    // flex-wrap: wrap;
    align-items: flex-start;
    gap: 4px;
  }

  &__price--old {
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    text-decoration: line-through;
    color: var(--60);
  }

  &__hint {
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--60);
  }

  &__actions {
    display: flex;

    justify-content: center;
    align-items: center;
    gap: clamp(15px, vw(20px, $desktop), 20px);
    // justify-content: center;
    flex-wrap: wrap;

    @media (min-width: $tab) {}

    @media (min-width: $desk) {
      justify-content: space-between;
      flex-wrap: nowrap;
    }
  }

  &__cta {
    background: #da1a1f;
    color: #fff;
    border: 1px solid transparent;
    width: 100%;
    order: 2;

    &:hover {
      border: 1px solid var(--100);
    }

    @media (min-width: $desk) {
      width: auto;
      order: 1;
    }
  }

  &__icons {
    display: flex;
    gap: clamp(6px, vw(8px, $desktop), 8px);

    @media (min-width: $tab) {}

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
    order: 1;

    svg {
      width: clamp(15px, vw(17px, $desktop), 17px);
      height: clamp(15px, vw(17px, $desktop), 17px);
    }

    @media (min-width: $desk) {

      order: 2;
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

  .swiper-wrapper {
    position: relative;
    margin-bottom: 45px;

    @media (min-width: $desk) {
      margin-bottom: 0;
    }
  }

  // .swiper-wrapper .fancy img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  //   min-height: clamp(400px, vw(400px, $desktop), 400px);
  //   @media (min-width: $tab-inner) {
  //     min-height: clamp(445px, vw(445px, $desktop), 445px);
  //   }
  // }
  // .swiper-wrapper .glock {
  //   position: absolute;
  //   right: 0;
  //   bottom: 0;
  // }

  .swiper-controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: clamp(10px, vw(20px, $desktop), 20px);
    left: clamp(10px, vw(20px, $desktop), 20px);
    bottom: 0;

    @media (min-width: $desk) {
      // bottom: 50%;
    }
  }

  & .fn__button-next--desktop svg path,
  & .fn__button-prev--desktop svg path {
    stroke: #fff;
    stroke-width: 1.4;
    transition: stroke 0.3s ease;
  }

  & .swiper .swiper-controls .swiper-button-next,
  .swiper .swiper-controls .swiper-button-prev {
    border: 1px solid transparent;
    width: clamp(22px, vw(32px, $desktop), 32px);
    height: clamp(22px, vw(32px, $desktop), 32px);
  }

  // ховер – только на устройствах с мышью
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
