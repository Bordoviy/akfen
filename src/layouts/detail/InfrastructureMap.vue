<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

const API_KEY = '66a13e6b-4231-44ac-91c1-a692c3828e41'

const props = defineProps({ projectId: { type: String, required: false } })
const route = useRoute()
const projectId = computed(() => props.projectId || route.params.id || 'kaliningrad-city')

/* Категории */
const CATS = [
  { code: 'all', name: 'Все объекты', icon: '★' },
  { code: 'bank', name: 'Банки', icon: '🏛️' },
  { code: 'med', name: 'Медицина', icon: '➕' },
  { code: 'cafe', name: 'Кафе', icon: '☕' },
  { code: 'shop', name: 'Магазины', icon: '🛍️' },
  { code: 'edu', name: 'Детские сады и школы', icon: '🎒' },
]
/* подпись в единственном числе для плашки */
const CAT_LABEL = {
  bank: 'Банк',
  med: 'Медицина',
  cafe: 'Кафе',
  shop: 'Магазин',
  edu: 'Образование',
}

/* ЖК */
const PROJECTS = {
  'kaliningrad-city': {
    coords: [54.738302, 20.491497],
    title: 'ЖК “Калининград-Сити”',
    image: '/imgs/projects/1.jpg',
  },
  'sun-city': {
    coords: [54.746966, 20.484724],
    title: 'ЖК “Sun City”',
    image: '/imgs/projects/5.jpg',
  },
  morelife: {
    coords: [54.95171, 20.198578],
    title: 'ЖК “МореLife”',
    image: '/imgs/projects/9.jpg',
  },
  avrora: {
    coords: [54.777055, 20.596335],
    title: 'ЖК “Avrora”',
    image: '/imgs/projects/13.jpg',
  },
}

/* бейдж минут до центра */
const BADGE_BY_PROJECT = { 'kaliningrad-city': 5, 'sun-city': 8, morelife: 12, avrora: 10 }

/* настройки выборки */
const RADIUS_M = 700
const MAX_PER_CAT = 3
const MIN_DIST_M = 120

/* state */
const activeCat = ref('all')
const mapEl = ref(null)
let ymaps, map
const groupByCat = new Map()
let projectPlacemark = null
let badgeControl = null
let PoiBalloonLayout = null

const points = reactive([])

const currentProject = computed(() => PROJECTS[projectId.value] || PROJECTS['kaliningrad-city'])
const counts = computed(() => {
  const res = { all: points.length }
  for (const c of CATS)
    if (c.code !== 'all') res[c.code] = points.filter((p) => p.cat === c.code).length
  return res
})

/* helpers */
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
function distanceMeters([lat1, lon1], [lat2, lon2]) {
  const R = 6371000,
    toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1),
    dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}
function dedupeByDistance(arr, minDist = MIN_DIST_M) {
  const out = []
  for (const p of arr)
    if (!out.some((o) => distanceMeters(p.coords, o.coords) < minDist)) out.push(p)
  return out
}
function TAG_TO_CAT(tags = {}) {
  const a = tags.amenity,
    s = tags.shop
  if (a === 'bank' || a === 'atm') return 'bank'
  if (a === 'hospital' || a === 'clinic' || a === 'doctors' || a === 'dentist' || a === 'pharmacy')
    return 'med'
  if (a === 'cafe' || a === 'restaurant' || a === 'fast_food' || a === 'bar') return 'cafe'
  if (a === 'school' || a === 'kindergarten' || a === 'college' || a === 'university') return 'edu'
  if (
    s === 'supermarket' ||
    s === 'convenience' ||
    s === 'mall' ||
    s === 'department_store' ||
    s === 'greengrocer'
  )
    return 'shop'
  return null
}
function buildOverpassQL(lat, lon, radius = RADIUS_M) {
  const amenity = [
    'bank',
    'atm',
    'hospital',
    'clinic',
    'doctors',
    'dentist',
    'pharmacy',
    'cafe',
    'restaurant',
    'fast_food',
    'bar',
    'school',
    'kindergarten',
    'college',
    'university',
  ]
    .map((a) => `node(around:${radius},${lat},${lon})["amenity"="${a}"];`)
    .join('\n')
  const shop = ['supermarket', 'convenience', 'mall', 'department_store', 'greengrocer']
    .map((s) => `node(around:${radius},${lat},${lon})["shop"="${s}"];`)
    .join('\n')
  return `[out:json][timeout:20];(${amenity}${shop});out body;`
}
async function fetchOSMPoints(lat, lon, radius = RADIUS_M) {
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: buildOverpassQL(lat, lon, radius),
  })
  const data = await res.json()
  const raw = (data.elements || [])
    .map((e, idx) => {
      const cat = TAG_TO_CAT(e.tags || {})
      if (!cat) return null
      const name = e.tags.name || e.tags.brand || 'Объект'
      const coords = [e.lat, e.lon]
      return { id: e.id || idx, coords, cat, name, dist: distanceMeters([lat, lon], coords) }
    })
    .filter(Boolean)
  const byCat = {}
  for (const p of raw) (byCat[p.cat] ||= []).push(p)
  const compact = []
  for (const arr of Object.values(byCat)) {
    const sorted = arr.sort((a, b) => a.dist - b.dist)
    const deduped = dedupeByDistance(sorted, MIN_DIST_M).slice(0, MAX_PER_CAT)
    compact.push(...deduped.map(({ dist, ...rest }) => rest))
  }
  return compact
}

function handleClick(code) {
  activeCat.value = code
  applyFilter()
}

/* иконки */
function makeBlueIconLayout(symbol = '') {
  return ymaps.templateLayoutFactory.createClass(
    `<div style="
      width:42px;height:42px;border-radius:50%;
      background:#2a2e8a;color:#fff;display:flex;align-items:center;justify-content:center;
      box-shadow:0 6px 20px rgba(42,46,138,.35);font-size:18px;user-select:none;cursor:pointer;">${symbol}</div>`,
  )
}
function makeProjectLayout(img) {
  return ymaps.templateLayoutFactory.createClass(
    `<div style="
      width:72px;height:72px;border:3px solid #df3b37;border-radius:50%;overflow:hidden;background:#fff;
      box-shadow:0 12px 40px rgba(223,59,55,.35);cursor:pointer;">
      <img src="${img}" style="width:100%;height:100%;object-fit:cover" alt=""/>
    </div>`,
  )
}
function applyFilter() {
  const code = activeCat.value
  for (const [k, coll] of groupByCat)
    code === 'all' || code === k ? map.geoObjects.add(coll) : map.geoObjects.remove(coll)
}

/* компактная плашка возле метки */
function buildPoiBalloonLayout() {
  PoiBalloonLayout = ymaps.templateLayoutFactory.createClass(
    `<div class="poi-label">
      <div class="poi-label__inner">
        <div class="poi-label__icon">$[properties.icon]</div>
        <div class="poi-label__title">$[properties.name]</div>
      </div>
    </div>`,
    {
      build: function () {
        this.constructor.superclass.build.call(this)
        this._$el = this.getParentElement().querySelector('.poi-label')
        this.applyElementOffset()
      },
      clear: function () {
        this._$el = null
        this.constructor.superclass.clear.call(this)
      },
      onSublayoutSizeChange: function () {
        this.constructor.superclass.onSublayoutSizeChange.apply(this, arguments)
        this.applyElementOffset()
      },
      applyElementOffset: function () {
        if (!this._$el) return
        // над меткой, чуть вправо
        const x = 22,
          y = -10
        this._$el.style.transform = `translate(${x}px, ${y - this._$el.offsetHeight}px)`
      },
      getShape: function () {
        if (!this._$el) return null
        const r = this._$el.getBoundingClientRect()
        return new ymaps.shape.Rectangle(
          new ymaps.geometry.pixel.Rectangle([
            [0, -r.height],
            [r.width, 0],
          ]),
        )
      },
    },
  )
}

/* бейдж */
function mountBadge() {
  const mins = BADGE_BY_PROJECT[projectId.value] ?? 5
  if (badgeControl) {
    map.controls.remove(badgeControl)
    badgeControl = null
  }
  const badgeLayout = ymaps.templateLayoutFactory.createClass(
    `<div class="badge"><div class="badge__row"><b>${mins}</b><span>мин</span></div><div class="badge__sub">до центра города</div></div>`,
  )
  badgeControl = new ymaps.control.Button({
    data: {},
    options: { layout: badgeLayout, maxWidth: 180, selectOnClick: false },
  })
  map.controls.add(badgeControl, { position: { top: 18, left: 18 } })
}

/* создание/пересоздание меток */
function rebuildMarkers() {
  // очистка
  for (const [, coll] of groupByCat) map.geoObjects.remove(coll)
  groupByCat.clear()
  if (projectPlacemark) map.geoObjects.remove(projectPlacemark)

  // центральная метка (тоже с плашкой)
  projectPlacemark = new ymaps.Placemark(
    currentProject.value.coords,
    {
      name: currentProject.value.title,
      type: 'Проект',
      icon: '🏢',
      // ВАЖНО: даём balloonContent — без него Я.Мапы иногда не открывают балун
      balloonContent: `${currentProject.value.title}`,
    },
    {
      iconLayout: makeProjectLayout(currentProject.value.image),
      iconShape: { type: 'Circle', coordinates: [36, 36], radius: 36 },
      zIndex: 1000,
      hideIconOnBalloonOpen: false,
      balloonShadow: false,
      balloonLayout: PoiBalloonLayout,
      balloonPanelMaxMapArea: 0,
      balloonCloseButton: false,
      openBalloonOnClick: true,
    },
  )
  projectPlacemark.events.add('click', () => projectPlacemark.balloon.open())
  map.geoObjects.add(projectPlacemark)

  // категории
  for (const c of CATS) {
    if (c.code === 'all') continue
    const coll = new ymaps.GeoObjectCollection()
    const layout = makeBlueIconLayout(c.icon)

    for (const p of points.filter((pt) => pt.cat === c.code)) {
      const html = `${CAT_LABEL[c.code] || 'Объект'}: ${p.name}`
      const mark = new ymaps.Placemark(
        p.coords,
        {
          name: p.name,
          type: CAT_LABEL[c.code] || 'Объект',
          icon: c.icon,
          balloonContent: html, // <-- триггер на открытие
          balloonContent: p.name,
        },
        {
          iconLayout: layout,
          iconOffset: [-21, -21],
          // ВАЖНО: форма клика — без неё часто не ловятся клики
          iconShape: { type: 'Circle', coordinates: [21, 21], radius: 21 },
          hideIconOnBalloonOpen: false,
          balloonShadow: false,
          balloonLayout: PoiBalloonLayout,
          balloonPanelMaxMapArea: 0,
          balloonCloseButton: false,
          openBalloonOnClick: true,
        },
      )
      mark.events.add('click', () => mark.balloon.open())
      coll.add(mark)
    }

    groupByCat.set(c.code, coll)
    map.geoObjects.add(coll)
  }

  map.setCenter(currentProject.value.coords, 15, { duration: 300 })
  applyFilter()
  mountBadge()
}

/* init */
onMounted(async () => {
  ymaps = await loadYandex()
  buildPoiBalloonLayout()

  map = new ymaps.Map(
    mapEl.value,
    { center: currentProject.value.coords, zoom: 15, controls: ['zoomControl'] },
    { suppressMapOpenBlock: true },
  )
  map.behaviors.disable('scrollZoom')
  map.options.set('balloonAutoPan', true)
  map.events.add('click', () => map.balloon.close())

  try {
    const [lat, lon] = currentProject.value.coords
    const fetched = await fetchOSMPoints(lat, lon, RADIUS_M)
    points.splice(0, points.length, ...fetched)
  } catch {
    const c = currentProject.value.coords
    points.splice(
      0,
      points.length,
      { id: 1, coords: [c[0] + 0.002, c[1]], cat: 'shop', name: 'Магазин у дома' },
      { id: 2, coords: [c[0] - 0.002, c[1] + 0.002], cat: 'bank', name: 'ВТБ' },
      { id: 3, coords: [c[0], c[1] + 0.002], cat: 'cafe', name: 'Кофейня' },
      { id: 4, coords: [c[0] - 0.0015, c[1] - 0.001], cat: 'med', name: 'Поликлиника' },
      { id: 5, coords: [c[0] + 0.0015, c[1] - 0.001], cat: 'edu', name: 'Школа' },
    )
  }

  rebuildMarkers()
})

watch(projectId, async () => {
  if (!map || !ymaps) return
  try {
    const [lat, lon] = currentProject.value.coords
    const fetched = await fetchOSMPoints(lat, lon, RADIUS_M)
    points.splice(0, points.length, ...fetched)
  } catch {
    points.splice(0, points.length)
  }
  rebuildMarkers()
})

onBeforeUnmount(() => {
  if (map) map.destroy()
})
</script>

<template>
  <section class="infra container mt-110">
    <h2 class="default-title">Инфраструктура и расположение</h2>

    <div class="infra__wrap">
      <aside class="panel">
        <ul class="panel__list">
          <li
            v-for="c in CATS"
            :key="c.code"
            :class="['panel__item', { active: activeCat === c.code }]"
            @click="handleClick(c.code)"
          >
            <span class="panel__icon">{{ c.icon }}</span>
            <span class="panel__name">{{ c.name }}</span>
            <span class="panel__count">{{ counts[c.code] ?? 0 }}</span>
          </li>
        </ul>
      </aside>

      <div ref="mapEl" class="map"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';
.infra__wrap {
  position: relative;
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 16px;
  align-items: stretch;
}
.map {
  width: 100%;
  height: clamp(520px, 62vh, 680px);
  border-radius: 20px;
  overflow: hidden;
}
.panel {
  background: #fff;
  border-radius: 20px;
  padding: 20px 14px;
  box-shadow: 0 8px 28px rgba(14, 18, 36, 0.06);
}
.panel__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
}
.panel__item {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  transition:
    background 0.15s,
    box-shadow 0.15s;
}
.panel__item:hover {
  background: #f6f7fb;
}
.panel__item.active {
  background: #2a2e8a;
  color: #fff;
  box-shadow: 0 10px 26px rgba(42, 46, 138, 0.22);
}
.panel__icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #eef0f8;
  color: #2a2e8a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.panel__item.active .panel__icon {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
}
.panel__name {
  font-weight: 600;
}
.panel__count {
  opacity: 0.6;
}

/* бейдж */
:global(.badge) {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(14, 18, 36, 0.1);
  white-space: nowrap;
  pointer-events: none;
}
:global(.badge__row) {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
:global(.badge b) {
  font-size: 18px;
  line-height: 1;
  color: #2a2e8a;
}
:global(.badge span) {
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #2a2e8a;
  line-height: 1;
}
:global(.badge__sub) {
  font-size: 12px;
  color: #687086;
  line-height: 1.1;
}

/* подпись у метки */
:global(.poi-label) {
  border-radius: 12px;
  box-shadow: 0 10px 28px rgba(14, 18, 36, 0.18);
  padding: 10px 12px;
  white-space: nowrap;
  pointer-events: none;
  width: 100%;
}
:global(.poi-label__inner) {
  display: flex;
  align-items: center;
  gap: 10px;
}
:global(.poi-label__icon) {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f2f7;
  font-size: 14px;
}
:global(.poi-label__title) {
  font-weight: 700;
  color: #1b1f2a;
}

@media (max-width: 960px) {
  .infra__wrap {
    grid-template-columns: 1fr;
  }
  .panel {
    order: 2;
  }
  .map {
    order: 1;
    height: 460px;
  }
}
@media (max-width: 1024px) {
  :global(.badge) {
    padding: 8px 10px;
    border-radius: 11px;
  }
  :global(.badge b) {
    font-size: 16px;
  }
  :global(.badge span),
  :global(.badge__sub) {
    font-size: 11px;
  }
}
@media (max-width: 640px) {
  :global(.badge) {
    padding: 6px 8px;
    border-radius: 10px;
  }
  :global(.badge b) {
    font-size: 15px;
  }
  :global(.badge span),
  :global(.badge__sub) {
    font-size: 10px;
  }
}
</style>
