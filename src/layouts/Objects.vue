<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'

const API_KEY = '66a13e6b-4231-44ac-91c1-a692c3828e41'

/** Данные */
const projects = ref([
  {
    id: 'kaliningrad-city',
    hasDetail: true,
    coords: [54.738302, 20.491497],
    title: 'ЖК “Калининград-Сити”',
    address: 'г. Калининград, Гайдара 90',
    price: '5.7 млн',
    image: '/imgs/projects/1.jpg',
    flats: 480,
    floors: 25,
    // type: 'Строится',
  },
  {
    id: 'sun-city',
    hasDetail: true,
    coords: [54.746966, 20.484724],
    title: 'ЖК “Sun City”',
    address: 'г. Калининград, Елизаветинская, 47',
    price: '6 млн',
    image: '/imgs/projects/5.jpg',
    flats: 285,
    floors: 15,
    // type: 'Строится',
  },
  {
    id: 'morelife',
    hasDetail: false, // нет детальной
    coords: [54.95171, 20.198578],
    title: 'ЖК “МореLife“',
    address: 'г. Пионерский, ул. Новоставского',
    price: '7 млн',
    image: '/imgs/projects/9.jpg',

    // type: 'Дом сдан',
  },
  {
    id: 'avrora',
    hasDetail: false, // нет детальной
    coords: [54.775771, 20.603077],
    title: 'ЖК “Avrora“',
    address: 'Гурьевск, ул. Ленина',
    price: '6 млн',
    image: '/imgs/projects/13.jpg',

    // type: 'Строится',
  },
])

/** refs/state */
const mapEl = ref(null)
const selected = ref(null)
const isMobile = ref(false)
const isSheetOpen = ref(false)

let ymapsApi, map
const placemarkById = new Map()
let mq
let cleanupMq

/** загрузка Yandex Maps */
function loadYandex() {
  return new Promise((resolve, reject) => {
    if (window.ymaps?.ready) {
      window.ymaps.ready(() => resolve(window.ymaps))
      return
    }
    const s = document.createElement('script')
    s.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`
    s.async = true
    s.onload = () => window.ymaps.ready(() => resolve(window.ymaps))
    s.onerror = reject
    document.head.appendChild(s)
  })
}

/** выбор проекта */
function focusProject(p, { center = true, fromMarker = false } = {}) {
  selected.value = p
  // подсветка метки
  for (const [id, pm] of placemarkById) {
    pm.options.set('preset', id === p.id ? 'islands#blueIcon' : 'islands#grayIcon')
  }
  // центрирование
  if (center && map) map.setCenter(p.coords, 14, { duration: 300 })

  // поведение по платформе
  if (isMobile.value) {
    // на мобилке показываем нижнюю модалку
    openSheet()
  } else if (fromMarker) {
    // на десктопе — просто показать оверлей; (балун не используем)
    // оверлей уже рендерится реактивно по selected
  }
}

/** sheet controls */
function openSheet() {
  isSheetOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeSheet() {
  isSheetOpen.value = false
  document.body.style.overflow = ''
}

onMounted(async () => {
  // media-query
  mq = window.matchMedia('(max-width: 768px)')
  const applyMq = () => (isMobile.value = mq.matches)
  applyMq()
  mq.addEventListener?.('change', applyMq)
  cleanupMq = () => mq.removeEventListener?.('change', applyMq)

  // init map
  ymapsApi = await loadYandex()
  map = new ymapsApi.Map(
    mapEl.value,
    {
      center: projects.value[0].coords,
      zoom: 11,
      controls: ['zoomControl'],
    },
    { suppressMapOpenBlock: true },
  )
  map.behaviors.disable('scrollZoom')

  // markers
  projects.value.forEach((p) => {
    const pm = new ymapsApi.Placemark(
      p.coords,
      { hintContent: p.title },
      { preset: 'islands#grayIcon', iconColor: '#3366FF', hasBalloon: false }, // балун не используем
    )
    pm.events.add('click', () => focusProject(p, { center: false, fromMarker: true }))
    placemarkById.set(p.id, pm)
    map.geoObjects.add(pm)
  })

  // esc закрывает шит
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSheet()
  })
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  cleanupMq?.()
  if (map) {
    map.destroy()
    map = null
  }
  placemarkById.clear()
})
</script>

<template>
  <div class="objects mt-110">
    <div class="container">
      <h2 class="default-title">Объекты на карте</h2>

      <div class="map-layout">
        <!-- карта -->
        <div ref="mapEl" class="map"></div>

        <!-- сайдбар: только десктоп -->
        <aside class="sidebar" v-if="!isMobile">
          <div
            v-for="p in projects"
            :key="p.id"
            :class="['card-mini', { 'card-mini--active': selected?.id === p.id }]"
            @click="focusProject(p)"
          >
            <img :src="p.image" alt="" class="card-mini__img" />
            <div class="card-mini__body">
              <div class="card-mini__title">{{ p.title }}</div>
              <div class="card-mini__addr">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3332 7.36874C13.3332 11.3283 7.99984 14.7223 7.99984 14.7223C7.99984 14.7223 2.6665 11.3283 2.6665 7.36874C2.6665 6.01855 3.22841 4.72366 4.2286 3.76892C5.22879 2.81419 6.58535 2.27783 7.99984 2.27783C9.41432 2.27783 10.7709 2.81419 11.7711 3.76892C12.7713 4.72366 13.3332 6.01855 13.3332 7.36874Z"
                    fill="#BAB9BE"
                  />
                  <path
                    d="M7.99995 9.38881C8.98179 9.38881 9.77772 8.59287 9.77772 7.61103C9.77772 6.62919 8.98179 5.83325 7.99995 5.83325C7.01811 5.83325 6.22217 6.62919 6.22217 7.61103C6.22217 8.59287 7.01811 9.38881 7.99995 9.38881Z"
                    fill="white"
                  />
                </svg>
                {{ p.address }}
              </div>
              <div class="card-mini__price">от {{ p.price }}</div>
            </div>
          </div>
        </aside>

        <!-- центральный оверлей: только десктоп -->
        <div v-if="selected && !isMobile" class="overlay" @click.self="selected = null">
          <div class="overlay-card">
            <img :src="selected.image" class="overlay-card__img" alt="" />
            <div class="overlay-card__body">
              <div class="overlay-card__top">
                <h3 class="overlay-card__title">{{ selected.title }}</h3>
                <div class="overlay-card__price">от {{ selected.price }}</div>
              </div>
              <div class="overlay-card__addr">{{ selected.address }}</div>
              <ul class="overlay-card__meta">
                <li v-if="selected.flats">{{ selected.flats }} квартир</li>
                <li v-if="selected.flats">{{ selected.floors }} этажей</li>
              </ul>
              <div class="overlay-card__actions">
                <button class="btn" @click="selected = null">Закрыть</button>
                <RouterLink
                  v-if="selected?.hasDetail"
                  :to="`/projects/${selected.id}`"
                  class="btn btn--primary"
                >
                  Подробнее
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- bottom-sheet: только мобилка -->
      <teleport to="body">
        <div
          v-if="isMobile && isSheetOpen && selected"
          class="sheet"
          role="dialog"
          aria-modal="true"
        >
          <div class="sheet__backdrop" @click="closeSheet"></div>
          <div class="sheet__panel" @click.stop>
            <div class="sheet__grab" aria-hidden="true"></div>

            <img :src="selected.image" class="sheet__img" alt="" />
            <div class="sheet__body">
              <div class="sheet__tags">
                <span class="tag" v-if="selected.type">{{ selected.type }}</span>
              </div>

              <h3 class="sheet__title">{{ selected.title }}</h3>
              <div class="sheet__addr">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3332 6.86874C13.3332 10.8283 7.99984 14.2223 7.99984 14.2223C7.99984 14.2223 2.6665 10.8283 2.6665 6.86874C2.6665 5.51855 3.22841 4.22366 4.2286 3.26892C5.22879 2.31419 6.58535 1.77783 7.99984 1.77783C9.41432 1.77783 10.7709 2.31419 11.7711 3.26892C12.7713 4.22366 13.3332 5.51855 13.3332 6.86874Z"
                    fill="#BAB9BE"
                  />
                  <path
                    d="M7.99995 8.88881C8.98179 8.88881 9.77772 8.09287 9.77772 7.11103C9.77772 6.12919 8.98179 5.33325 7.99995 5.33325C7.01811 5.33325 6.22217 6.12919 6.22217 7.11103C6.22217 8.09287 7.01811 8.88881 7.99995 8.88881Z"
                    fill="white"
                  />
                </svg>
                {{ selected.address }}
              </div>

              <ul class="sheet__meta">
                <li v-if="selected.flats">{{ selected.flats }} квартир</li>
                <li v-if="selected.floors">{{ selected.floors }} этажей</li>
                <li class="price">от {{ selected.price }}</li>
              </ul>

              <div class="sheet__actions">
                <RouterLink
                  v-if="selected?.hasDetail"
                  :to="`/projects/${selected.id}`"
                  class="btn btn--primary"
                  @click="closeSheet"
                >
                  Посмотреть проект
                </RouterLink>

                <button type="button" class="btn" @click="closeSheet">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

/* сетка */
.map-layout {
  display: grid;
  grid-template-columns: 1fr clamp(310px, vw(360px, $desktop), 360px);
  gap: clamp(20px, vw(20px, $desktop), 20px);
  align-items: start;
  position: relative;
}
.map {
  width: 100%;
  height: clamp(540px, vw(630px, $desktop), 630px);
  border-radius: 20px;
  overflow: hidden;
}

/* sidebar (desktop) */
.sidebar {
  max-height: clamp(510px, vw(590px, $desktop), 590px);
  height: 100%;
  background: var(--seryy);
  border-radius: 30px;
  padding: clamp(18px, vw(18px, $desktop), 18px) clamp(8px, vw(8px, $desktop), 8px);
  display: flex;
  flex-direction: column;
  gap: clamp(12px, vw(16px, $desktop), 16px);
}
.card-mini {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 6px;
  padding: 6px;
  border-radius: 20px;
  background: transparent;
  box-shadow: 0 2px 10px rgba(10, 15, 25, 0.05);
  cursor: pointer;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;
}
.card-mini:hover {
  box-shadow: 0 6px 18px rgba(10, 15, 25, 0.08);
}
.card-mini--active {
  background: #fff;
  box-shadow: 0 8px 24px rgba(51, 102, 255, 0.18);
}
.card-mini__img {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  object-fit: cover;
}
.card-mini__body {
  display: grid;
  gap: 4px;
  align-content: start;
}
.card-mini__title {
  font-weight: 600;
  color: var(--100);
}
.card-mini__addr {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: var(--60);
  font-size: 14px;
}
.card-mini__price {
  color: var(--100);
}

/* overlay (desktop) */
.overlay {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.overlay-card {
  pointer-events: auto;
  width: min(360px, 65%);
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 18px 60px rgba(10, 15, 25, 0.25);
  overflow: hidden;
  animation: pop 0.18s ease;
}
@keyframes pop {
  from {
    transform: scale(0.97);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.overlay-card__img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.overlay-card__body {
  padding: 14px 16px 16px;
}
.overlay-card__top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}
.overlay-card__title {
  font-weight: 600;
  color: var(--100);
}
.overlay-card__price {
  text-align: right;
}
.overlay-card__addr {
  color: var(--60);
}
.overlay-card__meta {
  display: flex;
  gap: 14px;
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  color: #6b7280;
  font-size: 12px;
}
.overlay-card__actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.btn {
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #374151;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
}
.btn--primary {
  border-color: #3366ff;
  background: #3366ff;
  color: #fff;
}

/* bottom-sheet (mobile) */
.sheet {
  position: fixed;
  inset: 0;
  z-index: 10000;
}
.sheet__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(1px);
}
.sheet__panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 22px 22px 0 0;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  transform: translateY(100%);
  animation: sheet-in 0.22s ease forwards;
}
@keyframes sheet-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.sheet__img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}
.sheet__body {
  padding: 14px 16px 16px;
}
.sheet__tags {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.tag {
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
}
.sheet__title {
  font-weight: 700;
  margin: 2px 0 6px;
}
.sheet__addr {
  display: flex;
  gap: 4px;
  color: #6b7280;
  margin-bottom: 8px;
}
.sheet__meta {
  display: flex;
  gap: 14px;
  list-style: none;
  padding: 0;
  margin: 8px 0;
  color: #6b7280;
  font-size: 12px;
}
.sheet__meta .price {
  margin-left: auto;
  color: #111827;
  font-weight: 600;
}
.sheet__actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: flex-end;
}
.sheet__grab {
  width: 48px;
  height: 5px;
  border-radius: 999px;
  background: #e5e7eb;
  margin: 8px auto;
}

/* адаптив: на мобилке нет сайдбара */
@media (max-width: 768px) {
  .map-layout {
    grid-template-columns: 1fr;
  }
  .map {
    height: 420px;
    border-radius: 16px;
  }
}
.ymaps-2-1-79-copyright {
  margin-right: 28px !important;
}
</style>
