<script setup>
import Button from '@/components/Button.vue'
import { computed, ref, onMounted, nextTick } from 'vue'

/* --- только цифры: keydown + input sanitize --- */
function onNumericKeydown(e) {
  // Разрешаем спец-клавиши
  const ctrl = e.ctrlKey || e.metaKey
  const allowed = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
  ]
  if (allowed.includes(e.key) || ctrl) return

  // Разрешаем одну цифру
  if (/^\d$/.test(e.key)) return

  // Блокируем всё остальное
  e.preventDefault()
}
function onNumericInput(e, modelRef) {
  const el = e.target
  const before = el.value
  const digits = before.replace(/\D+/g, '')

  if (before !== digits) {
    // сохраняем позицию каретки
    const start = el.selectionStart ?? before.length
    const diff = before.length - digits.length

    el.value = digits // моментально меняем в поле
    modelRef.value = digits // синхронизируем v-model

    // возвращаем каретку на корректную позицию
    const pos = Math.max(start - diff, 0)
    el.setSelectionRange?.(pos, pos)
  } else {
    modelRef.value = digits
  }
}

/* входные */
const termOptions = [5, 10, 15, 20, 25, 30]

const priceStr = ref('10 586 489')
const downStr = ref('4 000 600')
const years = ref(30)

const useMatcap = ref(true)
const matcapStr = ref('1 254 800')

/* утилиты */
const onlyDigits = (s) => (s || '').toString().replace(/[^\d]/g, '')
const toNumber = (s) => Number(onlyDigits(s) || 0)
const fmtMoney = (n) => `${Math.max(0, Math.round(n)).toLocaleString('ru-RU')} ₽`
const fmtMonth = (n) => (isFinite(n) ? Math.round(n).toLocaleString('ru-RU') : '—') + ' ₽'
const normalize = (r) => (r.value = toNumber(r.value).toLocaleString('ru-RU'))

/* программы */
const programs = [
  { code: 'std', title: 'Базовая ипотека', type: 'flat', rate: 19.7 },
  { code: 'mil', title: 'Траншевая ипотека', type: 'flat', rate: 20 },
  // { code: 'sub1', title: 'Ипотека 3,5% на 1 год', type: 'ladder', subsidyRate: 3.5, baseRate: 26 },
  { code: 'fam', title: 'Семейная ипотека', type: 'flat', rate: 4.5 },
  { code: 'it', title: 'IT - ипотека', type: 'flat', rate: 6 },
]

/* базовые вычисления */
const price = computed(() => toNumber(priceStr.value))
const down = computed(() => toNumber(downStr.value))
const matcap = computed(() => (useMatcap.value ? toNumber(matcapStr.value) : 0))

const sumCredit = computed(() => Math.max(0, price.value - down.value - matcap.value))
const months = computed(() => Math.max(1, years.value * 12))

/* формулы */
function annuityPayment(S, annualRate, nMonths) {
  if (S <= 0 || nMonths <= 0) return 0
  const i = annualRate / 100 / 12
  if (i === 0) return S / nMonths
  const k = Math.pow(1 + i, nMonths)
  return (S * (i * k)) / (k - 1)
}
function remainingBalance(S, annualRate, nMonths, kPaid) {
  const i = annualRate / 100 / 12
  if (i === 0) return Math.max(0, S - (S / nMonths) * kPaid)
  const A = annuityPayment(S, annualRate, nMonths)
  const q = Math.pow(1 + i, kPaid)
  return Math.max(0, S * q - A * ((q - 1) / i))
}

/* данные для карточек */
const viewPrograms = computed(() => {
  const S = sumCredit.value
  const n = months.value
  return programs.map((p) => {
    if (p.type === 'flat') {
      return { ...p, payment: Math.round(annuityPayment(S, p.rate, n)) }
    } else {
      const firstPayment = annuityPayment(S, p.subsidyRate, n)
      const after12 = remainingBalance(S, p.subsidyRate, n, 12)
      const restMonths = Math.max(0, n - 12)
      const laterPayment = restMonths > 0 ? annuityPayment(after12, p.baseRate, restMonths) : 0
      return {
        ...p,
        firstYearPayment: Math.round(firstPayment),
        afterPayment: Math.round(laterPayment),
      }
    }
  })
})

/* swiper */
const actContainer = ref(null)
onMounted(() => {
  nextTick(() => {
    if (!actContainer.value) return
    new Swiper(actContainer.value, {
      spaceBetween: 20,
      loop: false,
      slidesPerView: 1,
      breakpoints: { 600: { slidesPerView: 2 }, 992: { slidesPerView: 3 } },
      navigation: {
        nextEl: actContainer.value.querySelector('.ac__button-next'),
        prevEl: actContainer.value.querySelector('.ac__button-prev'),
      },
    })
  })
})
</script>
<template>
  <section class="mortgage mt-110">
    <div class="container">
      <h2 class="default-title">Калькулятор ипотеки</h2>
      <p class="mortgage__title">
        Предоставляем выгодные условия приобретения жилья с возможностью субсидирования от
        застройщика.
      </p>

      <div class="mortgage__grid">
        <!-- левая панель -->
        <div class="form">
          <label class="field">
            <span>Стоимость квартиры, руб.</span>
            <input
              name="price"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              v-model="priceStr"
              @keydown="onNumericKeydown"
              @input="onNumericInput($event, priceStr)"
              @blur="normalize(priceStr)"
            />
          </label>

          <label class="field">
            <span>Первоначальный взнос</span>
            <input
              name="intend"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              v-model="downStr"
              @keydown="onNumericKeydown"
              @input="onNumericInput($event, downStr)"
              @blur="normalize(downStr)"
            />
          </label>

          <label class="field">
            <span>Срок кредита</span>
            <select v-model.number="years">
              <option v-for="y in termOptions" :key="y" :value="y">{{ y }} лет</option>
            </select>
          </label>

          <label class="checkbox">
            <input name="mat" type="checkbox" v-model="useMatcap" />
            <span>Хочу использовать маткапитал</span>
          </label>

          <label v-if="useMatcap" class="field">
            <span>Размер маткапитала, руб.</span>
            <input
              name="mal"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              v-model="matcapStr"
              @keydown="onNumericKeydown"
              @input="onNumericInput($event, matcapStr)"
              @blur="normalize(matcapStr)"
            />
          </label>

          <div class="summary">
            <span>Сумма кредита</span>
            <p>{{ fmtMoney(sumCredit) }}</p>
          </div>
        </div>

        <!-- карточки программ -->
        <div class="mortgage__cards swiper" ref="actContainer">
          <div class="mortgage__wrapper swiper-wrapper">
            <div class="mortgage__item swiper-slide" v-for="p in viewPrograms" :key="p.code">
              <h3 class="mortgage__item-title">{{ p.title }}</h3>

              <div class="mortgage__inner">
                <div class="mortgage__item-row">
                  <p class="mortgage__item-subtitle">Процентная ставка</p>
                  <p class="mortgage__item-subtext" v-if="p.type === 'flat'">
                    {{ p.rate }}% <span>весь срок</span>
                  </p>
                  <p class="mortgage__item-subextr" v-else>
                    <span>
                      3,5%
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 9L7.5 6L4.5 3"
                          stroke="#212026"
                          stroke-width="1.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      26% далее
                    </span>
                    <span>весь срок</span>
                  </p>
                </div>

                <div v-if="p.type === 'flat'" class="mortgage__item-row">
                  <p class="mortgage__item-subtitle">Ежемесячный платёж</p>
                  <p class="mortgage__item-subplan">
                    {{ fmtMonth(p.payment) }}
                    <span>первый год</span>
                  </p>
                </div>

                <div v-else class="mortgage__item-row row--col">
                  <p class="mortgage__item-subtitle">Ежемесячный платёж</p>
                  <div class="mortgage__item-stack">
                    <p class="mortgage__item-subtext">
                      {{ fmtMonth(p.firstYearPayment) }}
                      <span>первый год</span>
                    </p>
                    <p class="mortgage__item-subtext">
                      {{ fmtMonth(p.afterPayment) }}
                      <span>оставшийся срок</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-controls desktop-only">
            <div class="swiper-button-prev ac__button-prev">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="#212026"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p class="swiper-controls-split">листайте, чтобы увидеть больше</p>
            <div class="swiper-button-next ac__button-next">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="#212026"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';
.mortgage {
  background: var(--seryy);
  border-radius: 60px;
  padding: clamp(50px, vw(70px, $desktop), 70px) clamp(30px, vw(40px, $desktop), 40px);

  &__title {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
    margin-bottom: clamp(20px, vw(44px, $desktop), 44px);
  }
  &__grid {
    // display: grid;
    // grid-template-columns: clamp(320px, vw(325px, $desktop), 325px) 1fr;
    // gap: clamp(20px, vw(20px, $desktop), 20px);
    // align-items: start;
    display: flex;
    justify-content: space-between;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    flex-wrap: wrap;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      flex-wrap: nowrap;
    }
  }

  & .form {
    border: 1px solid #eef0f3;
    border-radius: 30px;
    padding: 0px 10px 0px 0px;
    display: grid;
    gap: clamp(16px, vw(16px, $desktop), 16px);
    width: 100%;

    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      min-width: clamp(325px, vw(325px, $desktop), 325px);
      width: auto;
    }
  }
  & .field {
    display: grid;
    gap: 6px;
  }
  & .field input,
  & .field select {
    height: clamp(50px, vw(55px, $desktop), 55px);
    border-radius: 12px;
    background: var(--color);
    border: 1px solid var(--color);
    padding: 0px 14px;
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--100);
  }
  & .field span {
    opacity: 0.6;
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--100);
  }
  & .checkbox {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 6px;
  }
  & .checkbox span {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--100);
  }
  & .summary {
    margin: 10px 0 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .summary span {
    opacity: 0.6;
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--100);
  }
  & .summary p {
    font-weight: 600;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 136%;
    letter-spacing: 0em;
    text-align: right;
    color: var(--100);
  }

  // .btn {
  //   height: 44px;
  //   border-radius: 12px;
  //   border: 1px solid #e5e7eb;
  //   background: #f5f6f8;
  //   padding: 0 14px;
  //   cursor: pointer;
  // }
  // .btn--primary {
  //   background: #e53935;
  //   border-color: #e53935;
  //   color: #fff;
  // }

  /* карточки */
  &__cards {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: visible;
    // display: grid;
    // grid-template-columns: repeat(3, minmax(0, 1fr));
    // gap: 16px;
    // align-items: stretch;
    // height: 100%;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      overflow: hidden;
      width: unset;
    }
  }
  &__wrapper {
    width: 100%;
  }
  &__item {
    background: transparent;
    border-radius: 24px;
    box-sizing: border-box;
    padding: clamp(24px, vw(30px, $desktop), 30px);
    border: 1px solid var(--obvodka);
    // width: clamp(320px, vw(325px, $desktop), 325px) !important;

    height: clamp(260px, vw(413px, $desktop), 413px);
  }
  &__item:hover {
    background: var(--color);
  }
  &__item-title {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
    margin-bottom: clamp(20px, vw(34px, $desktop), 34px);
  }
  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: clamp(140px, vw(240px, $desktop), 240px);
  }
  &__item-row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__item-subtitle {
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--100);
    opacity: 0.7;
  }
  &__item-subtext {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
    span {
      font-weight: 400;
      font-size: clamp(12px, vw(12px, $desktop), 12px);
      line-height: 129%;
      color: var(--100);
      opacity: 0.5;
    }
  }
  &__item-subextr {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 32px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
  }
  &__item-subextr span:first-child {
    display: flex;
    align-items: center;
    gap: clamp(6px, vw(8px, $desktop), 8px);
  }
  &__item-subextr span:last-child {
    font-weight: 400;
    font-size: clamp(12px, vw(12px, $desktop), 12px);
    line-height: 129%;
    color: var(--100);
    opacity: 0.5;
  }

  &__item-subplan {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
    display: flex;
    flex-direction: column;
    span {
      font-weight: 400;
      font-size: clamp(12px, vw(12px, $desktop), 12px);
      line-height: 129%;
      color: var(--100);
      opacity: 0.5;
    }
  }
  &__item-out {
  }

  & .row--col {
    display: block;
  }
  &__item-stack {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  & .swiper-controls {
    display: flex;
  }
  & .swiper .swiper-controls .swiper-button-prev,
  & .swiper .swiper-controls .swiper-button-next {
    border-radius: clamp(8px, vw(16px, $desktop), 16px);
    border: 1px solid var(--100);
    width: clamp(30px, vw(44px, $desktop), 44px);
    height: clamp(30px, vw(44px, $desktop), 44px);
  }
  & .swiper .swiper-controls .swiper-button-next,
  .swiper-button-prev {
    background-color: transparent;
  }
  & .swiper-controls-split {
    display: block;

    @media (min-width: $desk) {
      display: none;
    }
  }
}
</style>
