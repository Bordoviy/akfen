<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.DEV
    ? '/api'
    : import.meta.env.VITE_AKFEN_API_URL || 'https://admin-api.akfen39.ru/api'
const API_TOKEN =
    import.meta.env.VITE_AKFEN_API_TOKEN ||
    'NETGWLNgcZH5ntavOYULjOtTQCFRcS23Xn0Mgg7lEUfTol93VGPbNVT1Ek9jtNV8'

const complexes = ref([])
const priceBounds = { min: 0, max: 30000000 }
const areaBounds = { min: 20, max: 150 }
const router = useRouter()

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

function buildRouteQuery() {
    const query = {}

    if (filters.city !== 'all') query.city = filters.city
    if (filters.project !== 'all') query.project = filters.project
    if (filters.rooms) query.rooms = filters.rooms
    if (filters.priceFrom > priceBounds.min) query.priceFrom = String(filters.priceFrom)
    if (filters.priceTo < priceBounds.max) query.priceTo = String(filters.priceTo)
    if (filters.areaFrom > areaBounds.min) query.areaFrom = String(filters.areaFrom)
    if (filters.areaTo < areaBounds.max) query.areaTo = String(filters.areaTo)
    if (filters.sortBy !== 'priceDesc') query.sortBy = filters.sortBy

    return query
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
    router.push({
        path: '/find-apartment',
        query: buildRouteQuery(),
    })
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

onMounted(async () => {
    await fetchComplexes()
})
</script>

<template>
    <div class="find-block mt-110">
        <div class="container">
            <div class="find-block__inner">
                <h1 class="default-title find-block__title">Подобрать квартиру</h1>

                <div class="find-block__filters">
                    <div class="find-block__row">
                        <label class="find-block__field">
                            <span class="find-block__label">Город</span>
                            <select v-model="filters.city">
                                <option v-for="city in cities" :key="city" :value="city">
                                    {{ city === 'all' ? 'Выбрать' : city }}
                                </option>
                            </select>
                        </label>

                        <label class="find-block__field">
                            <span class="find-block__label">Проект</span>
                            <select v-model="filters.project">
                                <option v-for="project in projects" :key="project" :value="project">
                                    {{ project === 'all' ? 'Выбрать' : project }}
                                </option>
                            </select>
                        </label>

                        <div class="find-block__field">
                            <span class="find-block__label">Число комнат</span>
                            <div class="find-block__chips">
                                <button v-for="room in ['1', '2', '3', '4']" :key="room" type="button"
                                    class="find-block__chip" :class="{ active: filters.rooms === room }"
                                    @click="setRoom(room)">
                                    {{ room }}
                                </button>
                            </div>
                        </div>

                        <label class="find-block__field find-block__field--range">
                            <span class="find-block__label">Задать стоимость</span>
                            <div class="find-block__range">
                                <div class="find-block__range--w">
                                    <span class="find-block__dash">от</span>
                                    <p> {{ Math.trunc(filters.priceFrom).toLocaleString('ru-RU') }}
                                    </p>
                                </div>
                                <div class="find-block__range--w">
                                    <span class="find-block__dash">до</span>
                                    <p> {{ Math.trunc(filters.priceTo).toLocaleString('ru-RU') }}
                                    </p>
                                </div>


                            </div>
                            <div class="find-block__slider-range" :style="getRangeStyle(
                                priceBounds.min,
                                priceBounds.max,
                                filters.priceFrom,
                                filters.priceTo,
                            )
                                ">
                                <input v-model.number="filters.priceFrom" type="range" :min="priceBounds.min"
                                    :max="priceBounds.max" step="100000" @input="onPriceMinInput" />
                                <input v-model.number="filters.priceTo" type="range" :min="priceBounds.min"
                                    :max="priceBounds.max" step="100000" @input="onPriceMaxInput" />
                            </div>
                        </label>
                    </div>

                    <div class="find-block__row">
                        <label class="find-block__field find-block__field--range">
                            <span class="find-block__label">Площадь, м²</span>
                            <div class="find-block__range">
                                <div>
                                    <span class="find-block__dash">от</span>
                                    <p>{{ filters.areaFrom }}</p>
                                </div>
                                <div>
                                    <span class="find-block__dash">до</span>
                                    <p>{{ filters.areaTo }}</p>
                                </div>

                            </div>
                            <div class="find-block__slider-range" :style="getRangeStyle(
                                areaBounds.min,
                                areaBounds.max,
                                filters.areaFrom,
                                filters.areaTo,
                            )
                                ">
                                <input v-model.number="filters.areaFrom" type="range" :min="areaBounds.min"
                                    :max="areaBounds.max" step="1" @input="onAreaMinInput" />
                                <input v-model.number="filters.areaTo" type="range" :min="areaBounds.min"
                                    :max="areaBounds.max" step="1" @input="onAreaMaxInput" />
                            </div>
                        </label>

                      

                        <div class="find-block__actions-row">
                            <Button class="find-block__apply" @click="applyFilters">Подобрать квартиру</Button>
                            <button class="find-block__reset-link" type="button" @click="resetFilters">
                                сбросить фильтр
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="selectedChips.length" class="find-block__selected">
                    <div class="find-block__selected-list">
                        <button v-for="chip in selectedChips" :key="chip.key" type="button"
                            class="find-block__selected-chip" @click="removeChip(chip.key)">
                            <span>{{ chip.label }}</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
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
    </div>


</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.find-block {
    // margin-top: clamp(12px, vw(24px, $desktop), 24px);
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

        input[type='text']:not(:placeholder-shown) {
            background: var(--color); // например, светлее
        }
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

 
}
</style>
