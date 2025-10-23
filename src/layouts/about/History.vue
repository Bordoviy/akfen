<script setup>
const historyInfo = [
  {
    date: '2003',
    title: 'Точка отсчета',
    text: 'Создание компании',
  },
  {
    date: '2007–2008',
    title: 'Начало пути',
    text: 'Начало сотрудничества с группой компаний «ПИК». Совместно были построены жилые комплексы на основе договоров генподряда и соинвестирования.',
  },
  {
    date: '2011',
    title: 'Наращивание объемов',
    text: 'Компания получила права на строительство ЖК «Солнечный город» в Калининграде после переуступки прав от «ПИК-регион». Важным условием стала передача 10% квартир городской администрации для социальных нужд (сироты, инвалиды, жители аварийного жилья).',
  },
  {
    date: '2015',
    title: 'Стремительное ускорение',
    text: 'Участие в решении проблемы обманутых дольщиков «Калининграджилстроя». Программа предусматривала обеспечение жильем 243 пострадавших до 2020 года',
  },
  {
    date: '2016',
    title: 'В числе лучших',
    text: 'Открытие школы школы греко-римской борьбы',
  },

  {
    date: 'Будущее',
    title: '',
    text: 'В планах «Акфен» - держать качество строительства на стабильно высоком уровне, развивать мощности. Большое внимание уделяется оптимизации архитектурно-планировочных решений, улучшению качества монолитных жилых построек. Основная задача компании - строительство комфортного жилья, украшающего весь облик города.',
  },
]
</script>

<template>
  <div class="history mt-110">
    <div class="container">
      <div class="history__inner">
        <h2 class="history__title">История <br />компании</h2>
        <div class="history__lists">
          <div class="history__list-item" v-for="(item, index) in historyInfo" :key="index">
            <div class="history__list-left">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.26172 8.09961V1.76914C9.26172 0.917423 9.96258 0.226898 10.8271 0.226898H15.687C16.5514 0.226898 17.2523 0.917423 17.2523 1.76914V4.11062C17.2523 6.3137 15.4397 8.09961 13.2037 8.09961H9.26172Z"
                  fill="red"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.26172 8.95737H15.687C16.5514 8.95737 17.2523 9.64789 17.2523 10.4996V15.2879C17.2523 16.1396 16.5514 16.8301 15.687 16.8301H13.3104C11.0744 16.8301 9.26172 15.0442 9.26172 12.8412V8.95737Z"
                  fill="red"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.39098 8.95737V15.2879C8.39098 16.1396 7.69011 16.8301 6.82565 16.8301H1.96572C1.10126 16.8301 0.400391 16.1396 0.400391 15.2879V12.9464C0.400391 10.7433 2.21304 8.95737 4.449 8.95737H8.39098Z"
                  fill="red"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.39098 8.09961H1.96572C1.10126 8.09961 0.400391 7.40908 0.400391 6.55737V1.76914C0.400391 0.917423 1.10126 0.226898 1.96572 0.226898H4.34238C6.57833 0.226898 8.39098 2.01281 8.39098 4.21578V8.09961Z"
                  fill="red"
                />
              </svg>

              <div class="history__list-left-inner">
                <p class="history__list-left-title">{{ item.date }}</p>
                <p class="history__list-left-subtitle">{{ item.title }}</p>
              </div>
            </div>
            <div class="history__list-right">
              <p class="history__list-right-text">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.history {
  &__inner {
    display: flex;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__title {
    font-weight: 600;
    font-size: clamp(30px, vw(30px, $desktop), 42px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
    flex: 1;
  }
  &__lists {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__list-item {
    display: flex;
    justify-content: space-between;
    gap: clamp(10px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__list-left {
    align-items: baseline;
    display: flex;
    gap: clamp(12px, vw(16px, $desktop), 16px);
    flex: 1;
    flex-direction: row;
  }
  &__list-left-title {
    font-weight: 600;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--1);
  }
  &__list-left-subtitle {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--60);
  }
  &__list-right {
    flex: 2;
  }
  &__list-right-text {
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--100);
  }
  &__list-left-inner {
    display: flex;
    flex-direction: row;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: column;
      gap: 2px;
      flex-wrap: nowrap;
      align-items: flex-start;
    }
  }
}
</style>
