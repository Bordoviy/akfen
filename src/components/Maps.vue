<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

/** ключ и данные */
const API_KEY = '66a13e6b-4231-44ac-91c1-a692c3828e41'
const COORDS = [54.7172, 20.4729]
const ADDRESS = 'Калининград, ул. Генерала Челнокова, 52'
const PHONE_RAW = '+74012777747'
const PHONE_PRETTY = '+7 4012 77 7747'

/** refs / state */
const mapEl = ref(null)
const isSheetOpen = ref(false)
const isMobile = ref(false)

let mapInstance = null
let placemark = null
let scriptEl = null
let mq // matchMedia
let cleanupResize

/** загрузка API Яндекс.Карт */
function loadYandexMaps() {
  return new Promise((resolve, reject) => {
    if (window.ymaps?.ready) {
      window.ymaps.ready(resolve)
      return
    }
    scriptEl = document.createElement('script')
    scriptEl.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`
    scriptEl.async = true
    scriptEl.onload = () => window.ymaps.ready(resolve)
    scriptEl.onerror = reject
    document.head.appendChild(scriptEl)
  })
}

function openSheet() {
  isSheetOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeSheet() {
  isSheetOpen.value = false
  document.body.style.overflow = ''
}

async function initMap() {
  await loadYandexMaps()
  const ymaps = window.ymaps

  mapInstance = new ymaps.Map(
    mapEl.value,
    { center: COORDS, zoom: 16, controls: ['zoomControl', 'fullscreenControl'] },
    { searchControlProvider: 'yandex#search' },
  )
  mapInstance.behaviors.disable('scrollZoom')

  /** HTML для балуна (используем на десктопе) */
  const balloonHTML = `
    <div class="balloon">
      <div class="balloon__title">Офис продаж для ЖК</div>
      <div class="balloon__subtitle">${ADDRESS}</div>
      <div class="balloon__time">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M9.999 18.333C14.602 18.333 18.333 14.602 18.333 10C18.333 5.398 14.602 1.667 9.999 1.667C5.397 1.667 1.666 5.398 1.666 10C1.666 14.602 5.397 18.333 9.999 18.333Z" stroke="#BAB9BE" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 5V10L13.333 11.667" stroke="#BAB9BE" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        пн-пт 9:15–18:00, сб-вс 10:00–15:00
      </div>
      <a class="balloon__email" href="mailto:secretar@akfen39.ru">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3.333 3.333H16.666C17.583 3.333 18.333 4.083 18.333 4.999V15C18.333 15.916 17.583 16.666 16.666 16.666H3.333C2.416 16.666 1.666 15.916 1.666 15V4.999C1.666 4.083 2.416 3.333 3.333 3.333Z" stroke="#BAB9BE" stroke-width="1.2"/>
          <path d="M18.333 5L10 10.833L1.666 5" stroke="#BAB9BE" stroke-width="1.2"/>
        </svg>
        info@akfen39.ru
      </a>
      <a class="balloon__tel" href="tel:${PHONE_RAW}">${PHONE_PRETTY}</a>
      <div class="balloon__socials">
        <a href="https://t.me/akfen_39" target="_blank" rel="noopener" class="balloon__social balloon__social--tg" aria-label="Telegram">
          <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.47978 7.29924L4.15826 8.67087L5.59223 13.2845C5.65458 13.5963 6.02866 13.6586 6.27805 13.4716L8.33549 11.7882C8.52253 11.6012 8.83427 11.6012 9.08366 11.7882L12.7621 14.4691C13.0115 14.6562 13.3856 14.5315 13.4479 14.2197L16.1912 1.1269C16.2535 0.815166 15.9418 0.503434 15.6301 0.628128L0.47978 6.48873C0.105698 6.61343 0.105698 7.17455 0.47978 7.29924ZM5.4052 7.98505L12.6374 3.55843C12.7621 3.49608 12.8868 3.68312 12.7621 3.74547L6.83917 9.29434C6.65213 9.48138 6.46508 9.73077 6.46508 10.0425L6.27805 11.5388C6.27805 11.7259 5.96631 11.7882 5.90396 11.5388L5.15579 8.79556C4.96875 8.48383 5.09346 8.10975 5.4052 7.98505Z" fill="white" />
</svg>
        </a>
        <a href="https://wa.me/79114701905" target="_blank" rel="noopener" class="balloon__social balloon__social--wa" aria-label="WhatsApp">
         <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.3415 2.64995C12.761 1.07495 10.6537 0.199951 8.42927 0.199951C3.80488 0.199951 0.0585357 3.93328 0.0585357 8.54162C0.0585357 9.99995 0.468293 11.4583 1.17073 12.6833L0 17L4.44878 15.8333C5.67805 16.475 7.02439 16.825 8.42927 16.825C13.0537 16.825 16.8 13.0916 16.8 8.48328C16.7415 6.32495 15.9219 4.22495 14.3415 2.64995ZM12.4683 11.5166C12.2927 11.9833 11.4732 12.45 11.0634 12.5083C10.7122 12.5666 10.2439 12.5666 9.77561 12.45C9.48293 12.3333 9.07317 12.2166 8.60488 11.9833C6.49756 11.1083 5.15122 9.00828 5.03415 8.83328C4.91707 8.71662 4.1561 7.72495 4.1561 6.67495C4.1561 5.62495 4.68293 5.15828 4.85854 4.92495C5.03415 4.69162 5.26829 4.69162 5.4439 4.69162C5.56098 4.69162 5.73658 4.69162 5.85366 4.69162C5.97073 4.69162 6.14634 4.63328 6.32195 5.04162C6.49756 5.44995 6.90732 6.49995 6.96585 6.55828C7.02439 6.67495 7.02439 6.79162 6.96585 6.90828C6.90732 7.02495 6.84878 7.14162 6.7317 7.25828C6.61463 7.37495 6.49756 7.54995 6.43902 7.60828C6.32195 7.72495 6.20488 7.84162 6.32195 8.01662C6.43902 8.24995 6.84878 8.89162 7.49268 9.47495C8.31219 10.1749 8.9561 10.4083 9.19024 10.525C9.42439 10.6416 9.54146 10.5833 9.65853 10.4666C9.77561 10.3499 10.1854 9.88328 10.3024 9.64995C10.4195 9.41662 10.5951 9.47495 10.7707 9.53328C10.9463 9.59162 12 10.1166 12.1756 10.2333C12.4098 10.35 12.5268 10.4083 12.5854 10.4666C12.6439 10.6416 12.6439 11.0499 12.4683 11.5166Z" fill="white" />
</svg>
        </a>
      </div>
    </div>
  `

  placemark = new ymaps.Placemark(
    COORDS,
    { hintContent: ADDRESS, balloonContent: balloonHTML },
    {
      preset: 'islands#redDotIcon',
      balloonCloseButton: true,
      balloonMaxWidth: 380,
      hideIconOnBalloonOpen: false,
    },
  )
  mapInstance.geoObjects.add(placemark)

  /** медиазапрос: мобилка или нет */
  mq = window.matchMedia('(max-width: 600px)')
  const applyMode = () => {
    const wasMobile = isMobile.value
    isMobile.value = mq.matches

    // включаем/выключаем встроенный балун у метки
    placemark.options.set('hasBalloon', !isMobile.value)

    // закрыть, если вдруг открыт, чтобы не залипал при переключении
    const b = placemark.balloon
    if (b && b.isOpen()) b.close()

    // если перешли с мобилки на десктоп — открыть балун
    if (wasMobile && !isMobile.value) {
      setTimeout(() => placemark.balloon.open(), 0)
    }
  }
  applyMode()
  mq.addEventListener?.('change', applyMode)
  cleanupResize = () => mq.removeEventListener?.('change', applyMode)

  // автo-открыть балун на десктопе при первом рендере
  if (!isMobile.value) {
    placemark.balloon.open()
  }

  /** клик по метке — разное поведение для мобилок/десктопа */
  placemark.events.add('click', () => {
    if (isMobile.value) {
      openSheet()
    } else {
      placemark.balloon.open()
    }
  })
}

onMounted(() => {
  if (typeof window !== 'undefined') initMap().catch(console.error)
  // Esc закрывает шит
  const onKey = (e) => {
    if (e.key === 'Escape') closeSheet()
  }
  window.addEventListener('keydown', onKey)
  // сохранить, чтобы снять в beforeUnmount
  cleanupResize = ((prev) => () => {
    prev?.()
    window.removeEventListener('keydown', onKey)
  })(cleanupResize)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  cleanupResize?.()
  if (mapInstance) {
    mapInstance.destroy()
    mapInstance = null
  }
})
</script>

<template>
  <div class="container mt-110">
    <h2 class="default-title">Офис продаж</h2>
    <div ref="mapEl" class="yandex-map"></div>
  </div>

  <!-- Bottom-sheet (мобилка) -->
  <teleport to="body">
    <div v-if="isSheetOpen" class="sheet" role="dialog" aria-modal="true">
      <div class="sheet__backdrop" @click="closeSheet"></div>
      <div class="sheet__panel" @click.stop>
        <div class="sheet__grab" aria-hidden="true"></div>

        <div class="balloon">
          <div class="balloon__title">Офис продаж для ЖК</div>
          <div class="balloon__subtitle">{{ ADDRESS }}</div>

          <div class="balloon__time">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M9.999 18.333C14.602 18.333 18.333 14.602 18.333 10C18.333 5.398 14.602 1.667 9.999 1.667C5.397 1.667 1.666 5.398 1.666 10C1.666 14.602 5.397 18.333 9.999 18.333Z"
                stroke="#BAB9BE"
                stroke-width="1.2"
              />
              <path
                d="M10 5V10L13.333 11.667"
                stroke="#BAB9BE"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            пн-пт 9:15–18:00, сб-вс 10:00–15:00
          </div>

          <a class="balloon__email" href="mailto:secretar@akfen39.ru">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M3.333 3.333H16.666C17.583 3.333 18.333 4.083 18.333 4.999V15C18.333 15.916 17.583 16.666 16.666 16.666H3.333C2.416 16.666 1.666 15.916 1.666 15V4.999C1.666 4.083 2.416 3.333 3.333 3.333Z"
                stroke="#BAB9BE"
                stroke-width="1.2"
              />
              <path d="M18.333 5L10 10.833L1.666 5" stroke="#BAB9BE" stroke-width="1.2" />
            </svg>
            info@akfen39.ru
          </a>

          <a class="balloon__tel" :href="`tel:${PHONE_RAW}`">{{ PHONE_PRETTY }}</a>

          <div class="balloon__socials">
            <a
              href="https://t.me/akfen_39"
              target="_blank"
              rel="noopener"
              class="balloon__social balloon__social--tg"
              aria-label="Telegram"
            >
              <svg
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47978 7.29924L4.15826 8.67087L5.59223 13.2845C5.65458 13.5963 6.02866 13.6586 6.27805 13.4716L8.33549 11.7882C8.52253 11.6012 8.83427 11.6012 9.08366 11.7882L12.7621 14.4691C13.0115 14.6562 13.3856 14.5315 13.4479 14.2197L16.1912 1.1269C16.2535 0.815166 15.9418 0.503434 15.6301 0.628128L0.47978 6.48873C0.105698 6.61343 0.105698 7.17455 0.47978 7.29924ZM5.4052 7.98505L12.6374 3.55843C12.7621 3.49608 12.8868 3.68312 12.7621 3.74547L6.83917 9.29434C6.65213 9.48138 6.46508 9.73077 6.46508 10.0425L6.27805 11.5388C6.27805 11.7259 5.96631 11.7882 5.90396 11.5388L5.15579 8.79556C4.96875 8.48383 5.09346 8.10975 5.4052 7.98505Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href="https://wa.me/79114701905"
              target="_blank"
              rel="noopener"
              class="balloon__social balloon__social--wa"
              aria-label="WhatsApp"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3415 2.64995C12.761 1.07495 10.6537 0.199951 8.42927 0.199951C3.80488 0.199951 0.0585357 3.93328 0.0585357 8.54162C0.0585357 9.99995 0.468293 11.4583 1.17073 12.6833L0 17L4.44878 15.8333C5.67805 16.475 7.02439 16.825 8.42927 16.825C13.0537 16.825 16.8 13.0916 16.8 8.48328C16.7415 6.32495 15.9219 4.22495 14.3415 2.64995ZM12.4683 11.5166C12.2927 11.9833 11.4732 12.45 11.0634 12.5083C10.7122 12.5666 10.2439 12.5666 9.77561 12.45C9.48293 12.3333 9.07317 12.2166 8.60488 11.9833C6.49756 11.1083 5.15122 9.00828 5.03415 8.83328C4.91707 8.71662 4.1561 7.72495 4.1561 6.67495C4.1561 5.62495 4.68293 5.15828 4.85854 4.92495C5.03415 4.69162 5.26829 4.69162 5.4439 4.69162C5.56098 4.69162 5.73658 4.69162 5.85366 4.69162C5.97073 4.69162 6.14634 4.63328 6.32195 5.04162C6.49756 5.44995 6.90732 6.49995 6.96585 6.55828C7.02439 6.67495 7.02439 6.79162 6.96585 6.90828C6.90732 7.02495 6.84878 7.14162 6.7317 7.25828C6.61463 7.37495 6.49756 7.54995 6.43902 7.60828C6.32195 7.72495 6.20488 7.84162 6.32195 8.01662C6.43902 8.24995 6.84878 8.89162 7.49268 9.47495C8.31219 10.1749 8.9561 10.4083 9.19024 10.525C9.42439 10.6416 9.54146 10.5833 9.65853 10.4666C9.77561 10.3499 10.1854 9.88328 10.3024 9.64995C10.4195 9.41662 10.5951 9.47495 10.7707 9.53328C10.9463 9.59162 12 10.1166 12.1756 10.2333C12.4098 10.35 12.5268 10.4083 12.5854 10.4666C12.6439 10.6416 12.6439 11.0499 12.4683 11.5166Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>

        <button type="button" class="sheet__close" @click="closeSheet">Закрыть</button>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
@import '../assets/styles/index';

/* карта */
.yandex-map {
  width: 100%;
  height: clamp(439px, vw(630px, $desktop), 630px);
  border-radius: 30px;
  overflow: hidden;
}

/* контент (общий для балуна и шита) */
.sheet,
.balloon {
  max-width: 100%;
  font-family: 'Onest';
}
.balloon__title {
  font-weight: 400;
  font-size: 14px;
  color: #9aa0a6;
  margin: 0 0 8px;
}
.balloon__subtitle {
  font-weight: 600;
  font-size: 16px;
  color: #1f1f1f;
  line-height: 1.35;
  margin: 0 0 12px;
}
.balloon__time {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6f7785;
  font-size: 14px;
  margin: 8px 0 12px;
}
.balloon__email {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6f7785;
  font-size: 14px;
  text-decoration: none;
  margin: 0 0 12px;
}
.balloon__tel {
  display: inline-block;
  font-weight: 700;
  color: #1f1f1f;
  text-decoration: none;
  margin: 0 0 12px;
}
.balloon__socials {
  display: flex;
  gap: 10px;
}
.balloon__social {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.balloon__social--tg {
  background: #287cbc;
}
.balloon__social--wa {
  background: #477750;
}

/* сброс встроенных стилей балуна */
.ymaps-2-1-79-balloon__content {
  font: unset !important;
  padding: 10px !important;
}

/* ===== bottom-sheet ===== */
.sheet {
  position: fixed;
  inset: 0;
  z-index: 10000;
}
.sheet__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
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
  padding: 14px 16px 16px;
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
.sheet__grab {
  width: 48px;
  height: 5px;
  border-radius: 999px;
  background: #e5e7eb;
  margin: 4px auto 10px;
}
.sheet__close {
  margin-left: auto;
  margin-top: 6px;
  display: inline-flex;
  padding: 8px 12px;
  font-size: 13px;
  color: #4b5563;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
}
.sheet__close:hover {
  background: #e9ecef;
}

/* мобилка */
@media (max-width: 600px) {
  .yandex-map {
    height: 340px;
    border-radius: 16px;
  }
}
/* десктоп — если вдруг откроется шит, сделаем его карточкой */
@media (min-width: 601px) {
  .sheet__panel {
    width: 560px;
    margin: 0 auto;
    bottom: 24px;
    border-radius: 16px;
  }
}
</style>
