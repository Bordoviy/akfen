<script setup>
import { onMounted, ref } from 'vue'

const COOKIE_CONSENT_KEY = 'akfen-cookie-consent'

const isVisible = ref(false)

function acceptCookies() {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
  isVisible.value = false
}

onMounted(() => {
  isVisible.value = localStorage.getItem(COOKIE_CONSENT_KEY) !== 'accepted'
})
</script>

<template>
  <Transition name="cookie-banner">
    <aside v-if="isVisible" class="cookie-banner" aria-live="polite" aria-label="Уведомление об использовании cookie">
      <div class="cookie-banner__content">
        <p class="cookie-banner__title">
          Этот сайт использует файлы cookie для улучшения вашего пользовательского опыта.
        </p>
        <p class="cookie-banner__text">
          Продолжая использование сайта, вы соглашаетесь на использование файлов cookie в соответствии с нашей
          <a
            href="https://akfen39.ru/politika-konfidenczialnosti"
            target="_blank"
            rel="noopener noreferrer"
            class="cookie-banner__link"
          >
            политикой конфиденциальности
          </a>
          . Если вы не согласны с использованием файлов cookie, вы можете изменить настройки своего браузера, чтобы
          ограничить или заблокировать их использование.
        </p>
      </div>

      <button type="button" class="cookie-banner__button" @click="acceptCookies">
        Принять и закрыть
      </button>
    </aside>
  </Transition>
</template>

<style scoped lang="scss">
@import '../assets/styles/index';

.cookie-banner-enter-active,
.cookie-banner-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.cookie-banner-enter-from,
.cookie-banner-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.cookie-banner {
  max-width: 1400px;
  position: fixed;
  left: clamp(10px, vw(20px, $desktop), 20px);
  right: clamp(10px, vw(20px, $desktop), 20px);
  bottom: clamp(10px, vw(20px, $desktop), 20px);
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: clamp(18px, vw(24px, $desktop), 24px);
  border: 1px solid rgba(33, 32, 38, 0.12);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 20px 60px rgba(33, 32, 38, 0.14);
  backdrop-filter: blur(14px);

  @media (min-width: $desk) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__content {
    max-width: 980px;
  }

  &__title {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 1.25;
    color: var(--100);
  }

  &__text {
    font-family: var(--second-family);
    font-weight: 400;
    font-size: clamp(14px, vw(16px, $desktop), 16px);
    line-height: 1.5;
    color: var(--80);
  }

  &__link {
    color: var(--2);
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      text-decoration: none;
    }
  }

  &__button {
    flex-shrink: 0;
    align-self: flex-start;
    min-width: 100%;
    border: 0;
    border-radius: 16px;
    padding: 16px 24px;
    background: var(--2);
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.2;
    color: var(--color);
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background: #26358d;
    }

    &:active {
      transform: translateY(1px);
    }

    @media (min-width: $tab) {
      min-width: 240px;
    }

    @media (min-width: $desk) {
      align-self: center;
    }
  }
}
</style>
