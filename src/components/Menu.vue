<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  isOpen: Boolean,
})

const activeIndex = ref(null)
const setActive = (index) => (activeIndex.value = index)

// --- состояние и ссылки ---
const isMobile = ref(false)
const isSubmenuOpen = ref(false)

const firstMenuItemRef = ref(null)
const submenuRef = ref(null)
const backdropRef = ref(null)

let listenersBound = false
let hideTimeout = null

// --- десктопный hover ---
function bindHoverListeners() {
  if (listenersBound) return
  const menuItem = firstMenuItemRef.value
  const submenu = submenuRef.value
  const backdrop = backdropRef.value
  if (!menuItem || !submenu || !backdrop) return

  const showSubmenu = () => {
    clearTimeout(hideTimeout)
    submenu.style.opacity = '1'
    submenu.style.visibility = 'visible'
    backdrop.style.opacity = '0.8'
    backdrop.style.visibility = 'visible'
  }

  const hideSubmenu = () => {
    hideTimeout = setTimeout(() => {
      submenu.style.opacity = '0'
      submenu.style.visibility = 'hidden'
      backdrop.style.opacity = '0'
      backdrop.style.visibility = 'hidden'
    }, 200)
  }

  menuItem.addEventListener('mouseenter', showSubmenu)
  menuItem.addEventListener('mouseleave', hideSubmenu)
  submenu.addEventListener('mouseenter', showSubmenu)
  submenu.addEventListener('mouseleave', hideSubmenu)
  backdrop.addEventListener('mouseenter', showSubmenu)
  backdrop.addEventListener('mouseleave', hideSubmenu)

  // ссылки на обработчики для снятия
  menuItem._hoverHandlers = { showSubmenu, hideSubmenu }
  submenu._hoverHandlers = { showSubmenu, hideSubmenu }
  backdrop._hoverHandlers = { showSubmenu, hideSubmenu }
  listenersBound = true
}

function unbindHoverListeners() {
  if (!listenersBound) return
  const menuItem = firstMenuItemRef.value
  const submenu = submenuRef.value
  const backdrop = backdropRef.value
  if (menuItem && menuItem._hoverHandlers) {
    menuItem.removeEventListener('mouseenter', menuItem._hoverHandlers.showSubmenu)
    menuItem.removeEventListener('mouseleave', menuItem._hoverHandlers.hideSubmenu)
  }
  if (submenu && submenu._hoverHandlers) {
    submenu.removeEventListener('mouseenter', submenu._hoverHandlers.showSubmenu)
    submenu.removeEventListener('mouseleave', submenu._hoverHandlers.hideSubmenu)
  }
  if (backdrop && backdrop._hoverHandlers) {
    backdrop.removeEventListener('mouseenter', backdrop._hoverHandlers.showSubmenu)
    backdrop.removeEventListener('mouseleave', backdrop._hoverHandlers.hideSubmenu)
  }
  listenersBound = false
}

function updateMode() {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth < 1024

  // переключение режимов
  if (isMobile.value) {
    // снимаем десктопные слушатели
    unbindHoverListeners()
    // скрываем десктопное «плавающее» подменю
    const submenu = submenuRef.value
    const backdrop = backdropRef.value
    if (submenu && backdrop) {
      submenu.style.opacity = ''
      submenu.style.visibility = ''
      backdrop.style.opacity = ''
      backdrop.style.visibility = ''
    }
  } else {
    // ставим слушатели для hover
    nextTick(bindHoverListeners)
    // на десктопе мобильное состояние не нужно
    isSubmenuOpen.value = false
  }

  // если сменили режим, очищаем таймер
  if (wasMobile !== isMobile.value && hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

onMounted(() => {
  updateMode()
  window.addEventListener('resize', updateMode)
  if (!isMobile.value) bindHoverListeners()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMode)
  unbindHoverListeners()
  if (hideTimeout) clearTimeout(hideTimeout)
})

// --- мобилка: клик по первому пункту ---
function toggleSubmenu(e) {
  if (!isMobile.value) return
  // не навигируем по пустому маршруту
  if (e) e.preventDefault()
  isSubmenuOpen.value = !isSubmenuOpen.value
}

const emit = defineEmits(['request-close'])
// закрытие при клике по карточке
function close() {
  if (isMobile.value) {
    isSubmenuOpen.value = false
    emit('request-close') // ← попросим Header закрыть бургер
  } else {
    const submenu = submenuRef.value
    const backdrop = backdropRef.value
    if (submenu && backdrop) {
      submenu.style.opacity = '0'
      submenu.style.visibility = 'hidden'
      backdrop.style.opacity = '0'
      backdrop.style.visibility = 'hidden'
    }
  }
}

const menuItems = [
  { title: 'Объекты', to: '', isRouterLink: true, children: [] },
  { title: 'О компании', to: '/about', isRouterLink: true },
  { title: 'Контакты', to: '/contacts', isRouterLink: true },
]

const housingCards = [
  {
    title: 'ЖК "Калининград-Сити"',
    address: 'г. Калининград, Гайдара 90',
    price: 'от 5 700 000',
    image: '/imgs/projects/1.jpg',
    id: 'kaliningrad-city',
  },
  {
    title: 'ЖК “Sun City“”',
    address: 'г. Калининград, Елизаветинская, 47',
    price: 'от 6 732 600',
    image: '/imgs/projects/5.jpg',
    id: 'sun-city',
  },
  {
    title: 'ЖК “МореLife“',
    address: 'г. Пионерский, ул. Новоставского',
    price: 'от 7 000 000',
    image: '/imgs/projects/9.jpg',
    id: '',
  },
  {
    title: 'ЖК “Avrora“',
    address: 'Гурьевск, ул Ленина',
    price: 'от 6 451 050',
    image: '/imgs/projects/13.jpg',
    id: 'avrora',
  },
]
</script>

<template>
  <nav class="navbar" :class="{ active: isOpen }">
    <ul class="menu">
      <template v-for="(item, index) in menuItems" :key="index">
        <li class="menu-item" :ref="index === 0 ? (el) => (firstMenuItemRef = el) : null">
          <!-- Первый пункт: по клику на мобилке, hover на десктопе -->
          <RouterLink
            v-if="item.isRouterLink"
            :to="item.to || '#'"
            :class="{ active: activeIndex === index }"
            @click="
              index === 0
                ? toggleSubmenu($event)
                : isMobile
                  ? emit('request-close')
                  : setActive(index)
            "
          >
            {{ item.title }}
          </RouterLink>
          <a v-else :href="item.href" class="menu-item__link">{{ item.title }}</a>

          <!-- Подложка (только десктоп) -->
          <div
            class="menu__inner-wrapper"
            :ref="index === 0 ? (el) => (backdropRef = el) : null"
            v-if="!isMobile"
          ></div>

          <!-- Подменю -->
          <div
            v-if="index === 0"
            :class="['submenu', { open: isSubmenuOpen }]"
            :ref="(el) => (submenuRef = el)"
            v-show="isMobile ? isSubmenuOpen : true"
          >
            <div class="housing-cards">
              <component
                v-for="(card, cIdx) in housingCards"
                :key="cIdx"
                :is="card.id ? 'router-link' : 'div'"
                v-bind="card.id ? { to: `/projects/${card.id}` } : {}"
                @click="card.id ? close() : null"
                class="housing-cards__item"
              >
                <div class="housing-cards__wrapper">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    class="housing-cards__img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="housing-cards__info">
                  <h2 class="housing-cards__title">{{ card.title }}</h2>
                  <p class="housing-cards__address">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 7.36869C13.3334 11.3283 8.00008 14.7222 8.00008 14.7222C8.00008 14.7222 2.66675 11.3283 2.66675 7.36869C2.66675 6.01849 3.22865 4.7236 4.22885 3.76887C5.22904 2.81414 6.58559 2.27778 8.00008 2.27778C9.41457 2.27778 10.7711 2.81414 11.7713 3.76887C12.7715 4.7236 13.3334 6.01849 13.3334 7.36869Z"
                        fill="#BAB9BE"
                      />
                      <path
                        d="M7.99995 9.38889C8.98179 9.38889 9.77772 8.59295 9.77772 7.61111C9.77772 6.62927 8.98179 5.83333 7.99995 5.83333C7.01811 5.83333 6.22217 6.62927 6.22217 7.61111C6.22217 8.59295 7.01811 9.38889 7.99995 9.38889Z"
                        fill="white"
                      />
                    </svg>
                    {{ card.address }}
                  </p>
                  <span class="housing-cards__price">{{ card.price }}</span>
                </div>
              </component>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.navbar {
  display: none;
  margin-bottom: 40px;

  @media (min-width: $desk) {
    display: flex;
    margin-bottom: 0;
  }
}
.header__inner.active .navbar {
  display: block;
  @media (min-width: $desk) {
    display: none;
  }
}
.menu {
  display: flex;
  gap: clamp(20px, vw(24px, $desktop), 24px);
}
.header__inner.active .menu {
  flex-direction: column;
}

.menu__inner-wrapper {
  overflow: hidden;
  position: absolute;
  top: 78px;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: var(--100);
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
}

/* Десктопное плавающее подменю (hover) */
.submenu {
  position: absolute;
  top: 82px;
  left: 0;
  right: 0;
  width: 100%;
  background: var(--color);
  border-radius: 30px;
  z-index: 3;
  display: flex;
  gap: 16px;
  max-width: clamp(1012px, vw(1400px, $desktop), 1880px);
  margin: 0 auto;
  padding: clamp(25px, vw(30px, $desktop), 30px);
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
}

/* МОБИЛКА: подменю должно быть видимым блоком внутри меню */
@media (max-width: 1023.98px) {
  .submenu {
    position: static;
    background: transparent;
    border-radius: 0;
    padding: 0;
    margin-top: 10px;
    opacity: 1;
    visibility: visible; /* базово видимое, скрываем через v-show */
  }
  .submenu:not(.open) {
    display: none;
  }
  .menu__inner-wrapper {
    display: none;
  }
}

/* .header__inner.active .submenu { display: none; } */

/* Карточки — без изменений */
.housing-cards {
  max-height: 330px;
  overflow-x: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(365px, 1fr));
  gap: clamp(15px, vw(16px, $desktop), 16px);
  width: 100%;
  @media (min-width: $desk-inner) {
    max-width: 1485px;
  }
}
.housing-cards__item {
  display: flex;
  gap: clamp(8px, vw(8px, $desktop), 8px);
}
.housing-cards__item:hover .housing-cards__title {
  color: var(--1);
}
.housing-cards__wrapper {
  overflow: hidden;
  border-radius: 18px;
}
.housing-cards__img {
  width: 100%;
  height: 100%;
  max-width: clamp(60px, vw(70px, $desktop), 70px);
  object-fit: cover;
  transition: transform 0.3s ease;
  transform-origin: center center;
}
.housing-cards__info {
  font-family: var(--font-family);
  display: inherit;
  flex-direction: column;
  gap: 2px;
}
.housing-cards__title {
  font-weight: 600;
  font-size: clamp(15px, vw(17px, $desktop), 17px);
  line-height: 136%;
  letter-spacing: 0em;
  color: var(--color);
  @media (min-width: $desk-inner) {
    color: var(--100);
  }
}
.housing-cards__address {
  display: inherit;
  align-items: center;
  gap: 4px;
  font-weight: 400;
  font-size: clamp(14px, vw(15px, $desktop), 15px);
  line-height: 146%;
  color: var(--color);
  @media (min-width: $desk-inner) {
    color: var(--60);
  }
}
.housing-cards__price {
  font-weight: 400;
  font-size: clamp(14px, vw(15px, $desktop), 15px);
  line-height: 146%;
  color: var(--color);
  @media (min-width: $desk-inner) {
    color: var(--100);
  }
}

.menu-item {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(15px, vw(15px, $desktop), 15px);
  line-height: 146%;
  color: var(--100);
}
.menu > .menu-item > a {
  align-items: center;
  display: inline-flex;
  gap: 6px;
}
.header__inner.active .menu-item {
  font-size: clamp(18px, vw(20px, $desktop), 20px);
  line-height: 126%;
  color: var(--color);
}
.menu-item:hover {
  color: var(--1);
}

/* Иконка для первого пункта*/
.menu > .menu-item:nth-child(1) > a::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: contain;
  flex-shrink: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='17' height='16' fill='none' viewBox='0 0 17 16'><path d='M5.8335 4H14.5002M5.8335 8H14.5002M5.8335 12H14.5002M2.5 4H2.50667M2.5 8H2.50667M2.5 12H2.50667' stroke='%23DA1A1F' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/></svg>");
}
.header__inner.active > .menu-item:nth-child(1) > a::before {
  width: 24px;
  height: 24px;
}
.header__inner.active .menu-item:nth-child(1) > a::before {
  background-image: url('data:image/svg+xml;utf8,<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6.5H21" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12.5H21" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 18.5H21" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 6.5H3.01" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12.5H3.01" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 18.5H3.01" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>');
}

/* для v-show мобильного состояния */
.submenu.open {
  opacity: 1 !important;
  visibility: visible !important;
}
</style>
