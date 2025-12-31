<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="single__container">
    <div class="container">
      <h2>Описание статьи</h2>
      <p>
        Строительная компания МПК начала строительство своего первого дома в 2007 году. За 15 лет
        нашей усердной работы более 5000 семей стали счастливыми обладателями новых квартир в
        Калининграде и Зеленоградске. Наши дома украшают архитектуру славного курорта, и мы по праву
        заслужили звание ведущего застройщика Зеленоградска. Мы добились успеха и признания
        покупателей недвижимости, руководствуясь на первый взгляд простым правилами в своей работе,
        но неукоснительно следовать им удается далеко не всем компаниям. Вот наши преимущества:
      </p>
      <div class="single__container-term">
        <h3>Содержание статьи</h3>
        <ul>
          <li><a href="#">Название раздела</a></li>
          <li><a href="#">Название раздела</a></li>
          <li><a href="#">Название раздела</a></li>
        </ul>
      </div>
      <img src="/imgs/single/singleWrap.png" alt="" />
      <h2>Описание статьи</h2>
      <p>
        Строительная компания МПК начала строительство своего первого дома в 2007 году. За 15 лет
        нашей усердной работы более 5000 семей стали счастливыми обладателями новых квартир в
        Калининграде и Зеленоградске. Наши дома украшают архитектуру славного курорта, и мы по праву
        заслужили звание ведущего застройщика Зеленоградска.<br />
        Мы добились успеха и признания покупателей недвижимости, руководствуясь на первый взгляд
        простым правилами в своей работе, но неукоснительно следовать им удается далеко не всем
        компаниям. Вот наши преимущества:
      </p>
      <ul>
        <li>
          <span>
            <strong>По-настоящему комфортное жилье</strong>
            <p>
              Мы строим и реализуем по-настоящему комфортное жилье – квартиры в наших домах
              оборудованы автономным газовым отоплением, планировки обеспечивают удобство
              организации жизненного пространства.
            </p>
          </span>
        </li>
        <li>
          <span>
            <strong>По-настоящему комфортное жилье</strong>
            <p>
              Мы строим и реализуем по-настоящему комфортное жилье – квартиры в наших домах
              оборудованы автономным газовым отоплением, планировки обеспечивают удобство
              организации жизненного пространства.
            </p>
          </span>
        </li>
        <li>
          <span>
            <strong>По-настоящему комфортное жилье</strong>
            <p>
              Мы строим и реализуем по-настоящему комфортное жилье – квартиры в наших домах
              оборудованы автономным газовым отоплением, планировки обеспечивают удобство
              организации жизненного пространства.
            </p>
          </span>
        </li>
      </ul>
      <p>
        Выполняя обещания по развитию инфраструктуры наших домов, устанавливаем красочные и надежные
        элементы детских площадок, облагораживаем прилагающею территорию и наводим порядок на
        природных массивах, окружающих наши жилые комплексы, как например в городском парке напротив
        жилого комплекса по ул. Московской.
      </p>
      <div class="single__container-object">
        <img src="/imgs/single/object.png" alt="" />
        <div>
          <p class="single__container-object--title">ЖК “Калининград-Сити”</p>
          <p class="single__container-object--text">
            Описание. Выполняя обещания по развитию инфраструктуры наших домов, устанавливаем
            красочные и надежные элементы детских площадок, облагораживаем прилагающею территорию и
            наводим порядок на природных массивах, окружающих наши жилые комплексы, как например в
            городском парке напротив жилого комплекса по ул. Московской.
          </p>
        </div>
      </div>
      <div class="single__container-block">
        <h2>Заголовок ещё один</h2>
        <div class="single__container-block--wrapper">
          <p>
            Строительная компания МПК начала строительство своего первого дома в 2007 году. За
            15 лет нашей усердной работы более 5000 семей стали счастливыми обладателями новых
            квартир в Калининграде и Зеленоградске. Наши дома украшают архитектуру славного курорта,
            и мы по праву заслужили звание ведущего застройщика Зеленоградска. <br />
            <br />
            <br />

            За 15 лет нашей усердной работы более 5000 семей стали счастливыми обладателями новых
            квартир в Калининграде и Зеленоградске. Наши дома украшают архитектуру славного курорта,
            и мы по праву заслужили звание ведущего застройщика Зеленоградска
          </p>
          <img src="/imgs/single/singleWrap.png" alt="" />
        </div>
      </div>

      <div class="single__container-quote">
        <div class="single__container-quote--circle">
          <svg viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24.8609 24.9956C22.5652 24.9363 20.8574 24.0764 19.7375 22.4159C18.6737 20.6962 18.1417 18.68 18.1417 16.3672C18.1417 13.7579 18.6737 11.3562 19.7375 9.16207C20.8014 6.90862 22.1452 5.01097 23.769 3.46913C25.4488 1.86799 27.2406 0.711615 29.1444 0L32 4.53656C31.2161 5.01097 30.3762 5.69293 29.4803 6.58246C28.5844 7.41268 27.7725 8.33185 27.0446 9.33997C26.3167 10.2888 25.8128 11.208 25.5328 12.0975C26.6527 12.1568 27.6325 12.4533 28.4724 12.987C29.3123 13.5207 29.9843 14.262 30.4882 15.2108C30.9921 16.1003 31.2441 17.1974 31.2441 18.502C31.2441 20.6369 30.6002 22.2677 29.3123 23.3944C28.0805 24.5211 26.5967 25.0549 24.8609 24.9956ZM6.80315 24.9956C4.45144 24.9956 2.71566 24.1357 1.5958 22.4159C0.531934 20.6962 0 18.68 0 16.3672C0 13.7579 0.531934 11.3562 1.5958 9.16207C2.65967 6.90862 4.0035 5.01097 5.6273 3.46913C7.30709 1.86799 9.07087 0.711615 10.9186 0L13.7743 4.53656C13.0464 5.01097 12.2345 5.69293 11.3386 6.58246C10.4427 7.41268 9.6308 8.33185 8.90289 9.33997C8.17498 10.2888 7.67104 11.208 7.39108 12.0975C8.45494 12.1568 9.40683 12.4533 10.2467 12.987C11.1426 13.5207 11.8425 14.262 12.3465 15.2108C12.8504 16.1003 13.1024 17.1974 13.1024 18.502C13.1024 20.6369 12.4584 22.2677 11.1706 23.3944C9.88276 24.4618 8.42695 24.9956 6.80315 24.9956Z"
              fill="#3343A9"
            />
          </svg>
        </div>
        <div class="single__container-quote--text">
          <h3>Заголовок для цитаты</h3>
          <p>
            Выполняя обещания по развитию инфраструктуры наших домов, устанавливаем красочные и
            надежные элементы детских площадок, облагораживаем прилагающею территорию и наводим
            порядок на природных массивах, окружающих наши жилые комплексы, как например в городском
            парке напротив жилого комплекса по ул. Московской.
          </p>
        </div>
      </div>

      <div class="single__container-block single__container-block--left">
        <h2>Заголовок ещё один</h2>
        <div class="single__container-block--wrapper">
          <img src="/imgs/single/singleWrap.png" alt="" />
          <p>
            Строительная компания МПК начала строительство своего первого дома в 2007 году. За
            15 лет нашей усердной работы более 5000 семей стали счастливыми обладателями новых
            квартир в Калининграде и Зеленоградске. Наши дома украшают архитектуру славного курорта,
            и мы по праву заслужили звание ведущего застройщика Зеленоградска. <br />
            <br />
            <br />

            За 15 лет нашей усердной работы более 5000 семей стали счастливыми обладателями новых
            квартир в Калининграде и Зеленоградске. Наши дома украшают архитектуру славного курорта,
            и мы по праву заслужили звание ведущего застройщика Зеленоградска
          </p>
        </div>
      </div>
      <div class="single__container-table">
        <table class="single-table">
          <thead>
            <tr>
              <th>Заголовок столбца</th>
              <th>Заголовок столбца</th>
              <th>Заголовок столбца</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Выполняя обещания по развитию инфраструктуры наших домов, устанавливаем красочные и
                надежные элементы детских площадок, облагораживаем прилегающую территорию
              </td>
              <td>
                Выполняя обещания по развитию инфраструктуры наших домов, устанавливаем красочные и
                надежные элементы детских площадок, облагораживаем прилегающую территорию
              </td>
              <td>
                Выполняя обещания по развитию инфраструктуры наших домов, устанавливаем красочные и
                надежные элементы детских площадок, облагораживаем прилегающую территорию
              </td>
            </tr>
            <tr>
              <td>…вторая строка…</td>
              <td>…вторая строка…</td>
              <td>…вторая строка…</td>
            </tr>
            <tr>
              <td>…третья строка…</td>
              <td>…третья строка…</td>
              <td>…третья строка…</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.single__container {
  margin-top: clamp(60px, vw(110px, $desktop), 110px);
  font-family: var(--font-family);
  &-inner {
    @media (min-width: $tab-inner) {
    }
    @media (min-width: $desk) {
    }
  }
  & h2 {
    font-weight: 600;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
  }
  & p {
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
  }

  &-term {
    margin: clamp(45px, vw(60px, $desktop), 60px) 0;
    background: var(--seryy);
    border-radius: 30px;
    padding: clamp(30px, vw(40px, $desktop), 40px);
  }
  &-term h3 {
    font-weight: 600;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
  &-term ul {
    margin-top: clamp(20px, vw(24px, $desktop), 24px);
    display: flex;
    flex-direction: column;
    gap: clamp(12px, vw(16px, $desktop), 16px);
  }
  &-term ul li {
    list-style-type: decimal;
    list-style-position: inside;
  }
  &-term ul li::marker {
    color: var(--2);
  }
  &-term ul li a {
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: var(--80);
    &:hover {
      text-decoration: none;
    }
  }

  & .container > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 500px;
    border-radius: 30px;
    margin-bottom: clamp(45px, vw(60px, $desktop), 60px);
  }

  & .container > ul {
    margin: clamp(20px, vw(24px, $desktop), 24px) 0;
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(24px, $desktop), 24px);
  }
  & .container > ul li {
    list-style-type: disc;
    list-style-position: outside;
    margin-left: 20px;
  }
  & .container > ul li::marker {
    color: var(--2);
  }
  & .container > ul li span {
    display: flex;
    flex-direction: column;
    gap: clamp(8px, vw(8px, $desktop), 8px);
  }
  & .container > ul li span strong {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
  }
  & .container > ul li span p {
    font-weight: 400;
    font-size: clamp(17px, vw(21px, $desktop), 21px);
    line-height: 150%;
    color: var(--80);
  }

  &-object {
    margin-top: clamp(45px, vw(60px, $desktop), 60px);
    background: var(--seryy);
    border-radius: 30px;
    display: grid;
    grid-template-columns: 1fr;
    align-items: flex-start;
    // column-gap: clamp(15px, vw(20px, $desktop), 20px);
    // row-gap: clamp(15px, vw(20px, $desktop), 20px);

    @media (min-width: $tab-inner) {
    }
    @media (min-width: $desk) {
      grid-template-columns: clamp(325px, vw(325px, $desktop), 325px) 1fr;
      align-items: center;
    }
  }
  &-object img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    max-height: 200px;
  }
  &-object div {
    padding: clamp(20px, vw(20px, $desktop), 20px) clamp(40px, vw(40px, $desktop), 40px)
      clamp(20px, vw(20px, $desktop), 20px) clamp(20px, vw(20px, $desktop), 20px);
  }

  &-object--title {
    margin-bottom: clamp(10px, vw(12px, $desktop), 12px);
    font-weight: 600 !important;
    font-size: clamp(20px, vw(26px, $desktop), 26px) !important;
    line-height: 126% !important;
    color: var(--2) !important;
  }
  &-object--text {
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
  }
  &-block {
    margin: clamp(45px, vw(60px, $desktop), 60px) 0;
  }
  &-block--wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    @media (min-width: $tab-inner) {
      grid-template-columns: 1fr 1fr;
    }
  }
  &-block--wrapper p {
    order: 2;
    @media (min-width: $tab-inner) {
      order: 1;
    }
  }
  &-block--wrapper img {
    order: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    max-height: 360px;
    @media (min-width: $tab-inner) {
      order: 2;
    }
  }

  &-quote {
    display: flex;
    align-items: flex-start;
    gap: clamp(15px, vw(30px, $desktop), 30px);
    background: var(--seryy);
    border-radius: 30px;
    padding: clamp(20px, vw(30px, $desktop), 30px);
  }
  &-quote--circle {
    border-radius: 50%;
    background-color: #fff;
    min-width: clamp(36px, vw(60px, $desktop), 60px);
    min-height: clamp(36px, vw(60px, $desktop), 60px);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: clamp(20px, vw(35px, $desktop), 32px);
      height: clamp(15px, vw(25px, $desktop), 25px);
      min-height: 15px;
      min-width: 20px;
    }
  }
  &-quote--text {
    display: flex;
    flex-direction: column;
    gap: clamp(12px, vw(16px, $desktop), 16px);
  }
  &-quote--text h3 {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
}

.single__container-block--left .single__container-block--wrapper {
  img {
    order: 2;
    @media (min-width: $tab-inner) {
      order: 1;
    }
  }
  p {
    order: 1;
    @media (min-width: $tab-inner) {
      order: 2;
    }
  }
}
.single__container-table {
  margin-top: 24px;
  overflow: scroll;
  scrollbar-width: none;
}

.single-table {
  width: 100%;
  border-collapse: separate; // важно для скругления
  border-spacing: 0;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e1e4ea; // внешний бордер
  background: #fff;
}

/* шапка */
.single-table thead th {
  padding: clamp(16px, vw(24px, $desktop), 24px);
  font-weight: 600;
  font-size: clamp(16px, vw(19px, $desktop), 19px);
  line-height: 136%;
  letter-spacing: 0em;
  text-align: center;
  color: var(--100);
  background: #f1f2f6;
  border-bottom: 1px solid #e1e4ea;
  border-right: 1px solid #e1e4ea;
}

.single-table thead th:last-child {
  border-right: none;
}

/* закругления только у верхних углов */
.single-table thead th:first-child {
  border-top-left-radius: 16px;
}
.single-table thead th:last-child {
  border-top-right-radius: 16px;
}

/* тело таблицы */
.single-table tbody td {
  padding: clamp(16px, vw(24px, $desktop), 24px);
  font-weight: 400;
  font-size: clamp(17px, vw(20px, $desktop), 20px);
  line-height: 150%;
  color: var(--80);
  border-top: 1px solid #e1e4ea;
  border-right: 1px solid #e1e4ea;
}

.single-table tbody td:last-child {
  border-right: none;
}
</style>
