<!-- components/Modal.vue -->
<template>
  <div class="modal__overlay" @click.self="emitClose">
    <div class="modal__content">
      <h2 class="modal__title">Получить индивидуальное предложение</h2>
      <p class="modal__subtitle">
        Менеджер свяжется с вами, чтобы ответить на все вопросы и показать готовые объекты
      </p>
      <button class="modal-close" @click="emitClose">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 4.5L4.5 13.5"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.5 4.5L13.5 13.5"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <form class="modal__form" @submit.prevent="submitForm">
        <div class="modal__fields">
          <div class="modal__field">
            <label class="modal__label" for="modal-name">Как вас зовут?</label>
            <input
             class="modal__input"
             type="text"
             id="modal-name"
             name="name"
             placeholder="Введите ваше имя"
             v-model="form.name"
             required
            />

          </div>

          <div class="modal__field">
            <label class="modal__label" for="modal-phone">Ваш телефон</label>
            <input
             v-phone-mask
             class="modal__input"
             type="tel"
             id="modal-phone"
             name="phone"
             placeholder="+7 (___) ___-__-__"
             v-model="form.phone"
            ref="phoneInput"
             required
           />
          </div>
        </div>
        <div ref="captchaContainer" class="modal__captcha"></div>
        <div class="modal__bottom">
          <button class="modal__submit" type="submit" :disabled="!noteChecked || isSubmitting">
            Отправить
          </button>

          <label class="modal__note">
            <input type="checkbox" class="modal__note-checkbox" v-model="noteChecked" required="" />
            <span>
              Нажимая кнопку,
             <router-link to="/politika-konfidenczialnosti">
                вы соглашаетесь с условиями обработки персональных данных
              </router-link>
              </span
            >
          </label>
        </div>
        <p class="modal__captcha-note">
          Форма защищена Yandex SmartCaptcha. Сервис может обрабатывать технические данные для
          защиты от автоматических отправок.
        </p>
        <p v-if="submitError" class="modal__status modal__status--error">{{ submitError }}</p>
        <p v-else-if="submitSuccess" class="modal__status modal__status--success">
          Заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const API_URL = import.meta.env.VITE_AKFEN_API_URL || 'https://admin-api.akfen39.ru/api'
const API_TOKEN = import.meta.env.VITE_AKFEN_API_TOKEN || 'mG7Hz6eYGwl07MW30nB2qYFWjtkUeWU38LstTdBvdIryrMsFk0YEJnYrp0KgqCWd'
const SMARTCAPTCHA_SITEKEY =
  import.meta.env.VITE_YANDEX_SMARTCAPTCHA_SITEKEY ||
  'ysc1_tBed9WJhXvIBpmLOpcujJGTyTI8CfADEMv6Kc3CZ023a2582'
const SMARTCAPTCHA_SCRIPT_SRC =
  'https://smartcaptcha.cloud.yandex.ru/captcha.js?render=onload&onload=onSmartCaptchaLoaded'

const emit = defineEmits(['close'])

const noteChecked = ref(false)
const phoneInput = ref(null)
const captchaContainer = ref(null)
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const isCaptchaReady = ref(false)

const form = ref({
  name: '',
  phone: '',
})

let captchaWidgetId = null
let submitAfterCaptcha = null

function getHeaders() {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`
  }
  return headers
}

const emitClose = () => {
  emit('close')
}

function validateForm() {
  const name = String(form.value.name || '').trim()
  const phoneRaw =
    String(form.value.phone || '').trim() ||
    String(phoneInput.value?.value || '').trim()
  const phoneDigits = phoneRaw.replace(/\D/g, '')

  if (!name || phoneDigits.length < 10) {
    submitError.value = 'Заполните имя и телефон.'
    return null
  }

  return {
    name,
    phone: phoneDigits.length ? phoneDigits : phoneRaw,
    page_url: window.location.href,
  }
}

function resetCaptcha() {
  if (window.smartCaptcha && captchaWidgetId !== null && typeof window.smartCaptcha.reset === 'function') {
    window.smartCaptcha.reset(captchaWidgetId)
  }
}

async function sendForm(data, captchaToken) {
  const payload = {
    ...data,
    smart_token: captchaToken,
    captcha_token: captchaToken,
    captcha_provider: 'yandex_smartcaptcha',
  }

  try {
    isSubmitting.value = true
    const response = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    submitSuccess.value = true
    form.value.name = ''
    form.value.phone = ''
    noteChecked.value = false
    setTimeout(() => {
      emitClose()
    }, 1800)
  } catch (error) {
    console.error(error)
    submitError.value = 'Не удалось отправить заявку. Попробуйте позже.'
    resetCaptcha()
  } finally {
    isSubmitting.value = false
    submitAfterCaptcha = null
  }
}

function loadCaptchaScript() {
  if (window.smartCaptcha) {
    return Promise.resolve(window.smartCaptcha)
  }

  if (window.__akfenSmartCaptchaPromise) {
    return window.__akfenSmartCaptchaPromise
  }

  window.__akfenSmartCaptchaPromise = new Promise((resolve, reject) => {
    window.onSmartCaptchaLoaded = () => {
      if (window.smartCaptcha) {
        resolve(window.smartCaptcha)
        return
      }

      reject(new Error('SmartCaptcha did not initialize'))
    }

    const existingScript = document.querySelector('script[data-smartcaptcha-script="true"]')
    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.src = SMARTCAPTCHA_SCRIPT_SRC
    script.defer = true
    script.dataset.smartcaptchaScript = 'true'
    script.onerror = () => reject(new Error('Failed to load SmartCaptcha script'))
    document.head.appendChild(script)
  })

  return window.__akfenSmartCaptchaPromise
}

async function ensureCaptcha() {
  if (!SMARTCAPTCHA_SITEKEY) {
    throw new Error('SmartCaptcha site key is not configured')
  }

  if (window.smartCaptcha && captchaWidgetId !== null) {
    isCaptchaReady.value = true
    return
  }

  const smartCaptcha = await loadCaptchaScript()

  if (!captchaContainer.value) {
    throw new Error('SmartCaptcha container is not available')
  }

  if (captchaWidgetId !== null) {
    return
  }

  captchaWidgetId = smartCaptcha.render(captchaContainer.value, {
    sitekey: SMARTCAPTCHA_SITEKEY,
    invisible: true,
    hl: 'ru',
    shieldPosition: 'bottom-right',
    callback: (token) => {
      if (!token || !submitAfterCaptcha) {
        return
      }

      const currentSubmit = submitAfterCaptcha
      submitAfterCaptcha = null
      currentSubmit(token)
    },
  })

  isCaptchaReady.value = true
}

const submitForm = async () => {
  if (isSubmitting.value) return

  submitError.value = ''
  submitSuccess.value = false

  const data = validateForm()
  if (!data) return

  try {
    await ensureCaptcha()
    submitAfterCaptcha = (token) => sendForm(data, token)
    window.smartCaptcha.execute(captchaWidgetId)
  } catch (error) {
    console.error(error)
    submitAfterCaptcha = null
    submitError.value = 'Не удалось инициализировать капчу. Попробуйте позже.'
  }
}

onMounted(() => {
  document.body.classList.add('lock')
  ensureCaptcha().catch((error) => {
    console.error(error)
  })
})

onUnmounted(() => {
  if (
    window.smartCaptcha &&
    captchaWidgetId !== null &&
    typeof window.smartCaptcha.destroy === 'function'
  ) {
    window.smartCaptcha.destroy(captchaWidgetId)
  }
  captchaWidgetId = null
  submitAfterCaptcha = null
  isCaptchaReady.value = false
  document.body.classList.remove('lock')
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/index';

// Оверлей
.modal__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12;
  // padding: clamp(3px, vw(4px, $desktop), 4px);
}

// Контейнер попапа
.modal__content {
  position: relative;
  background: #1e348c; // синий как в макете
  border-radius: 24px;
  padding: clamp(40px, vw(50px, $desktop), 50px) clamp(30px, vw(40px, $desktop), 40px);
  // min-width: 770px;
  color: #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);

  .modal__title {
    font-weight: 600;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    text-align: center;
    color: var(--color);
    margin-bottom: 16px;
  }

  .modal__subtitle {
    font-weight: 400;
    font-size: clamp(16px, vw(16px, $desktop), 18px);
    line-height: 146%;
    text-align: center;
    margin: 0 auto;
    color: var(--color);
    opacity: 0.8;
    max-width: 690px;
  }
}

// кнопка закрытия
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: clamp(30px, vw(30px, $desktop), 30px);
  height: clamp(30px, vw(30px, $desktop), 30px);
  background: transparent;
  border: 1px solid var(--color);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }

  svg {
    display: block;
  }
}

// форма
.modal__form {
  margin-top: clamp(20px, vw(30px, $desktop), 30px);
  display: flex;
  flex-direction: column;
  gap: clamp(20px, vw(24px, $desktop), 24px);
}

.modal__captcha {
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.modal__fields {
  display: flex;
  justify-content: space-between;
  gap: clamp(16px, vw(20px, $desktop), 20px);
  flex-direction: column;
  @media (min-width: $desk) {
    flex-direction: row;
  }
}

.modal__field {
  display: flex;
  flex-direction: column;
  gap: clamp(4px, vw(6px, $desktop), 6px);
  width: 100%;
}

.modal__label {
  font-weight: 400;
  font-size: clamp(14px, vw(15px, $desktop), 15px);
  line-height: 146%;
  color: var(--40);
}

// инпуты
.modal__input {
  width: 100%;
  padding: clamp(12px, vw(14px, $desktop), 14px) clamp(15px, vw(16px, $desktop), 16px);
  box-sizing: border-box;
  height: clamp(47px, vw(54px, $desktop), 54px);
  background: var(--color);
  border-radius: 12px;
  border: 1px solid var(--obvodka);
  outline: none;
  font-weight: 400;
  font-size: clamp(16px, vw(18px, $desktop), 18px);
  line-height: 146%;
  color: var(--60);

  &::placeholder {
    color: #999;
  }
}
.modal__bottom {
  display: flex;
  gap: clamp(20px, vw(20px, $desktop), 20px);
  align-items: center;
  flex-direction: column;
  @media (min-width: $desk) {
    flex-direction: row;
  }
}
// кнопка отправки
.modal__submit {
  width: 100%;
  padding-top: clamp(12px, vw(16px, $desktop), 16px);
  padding-bottom: clamp(12px, vw(16px, $desktop), 16px);
  flex: 1;
  margin-top: 10px;
  height: 56px;
  background: var(--1);
  border-radius: 16px;
  border: none;
  font-weight: 600;
  font-size: clamp(15px, vw(17px, $desktop), 17px);
  line-height: 146%;
  letter-spacing: 0em;
  color: var(--color);
  cursor: pointer;
  transition: 0.2s;

  @media (min-width: $desk) {
    width: auto;
  }

  &:hover {
    background: #c81d19;
  }
}

// Примечание
.modal__note {
  flex: 1;
  opacity: 0.6;
  font-weight: 400;
  font-size: clamp(14px, vw(15px, $desktop), 15px);
  line-height: 146%;
  color: var(--color);
  display: flex;
  align-items: flex-start;
  gap: 6px;
}
.modal__note span a {
  text-decoration: underline;
  display: inline;

  &:hover {
    text-decoration: none;
  }
}

.modal__note-checkbox {
  margin-top: 3px;
}

.modal__captcha-note {
  margin: -8px 0 0;
  font-weight: 400;
  font-size: 13px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.72);
}

.modal__status {
  margin: 0;
  font-weight: 400;
  font-size: clamp(14px, vw(15px, $desktop), 15px);
  line-height: 146%;
  color: var(--color);
  opacity: 0.9;
}

.modal__status--error {
  color: #ffb3b3;
}

.modal__status--success {
  color: #b8ffd0;
}
</style>
