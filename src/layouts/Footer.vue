<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const count = ref(0)

const footerMenu = [
  {
    title: 'Проекты',
    links: [
      { title: 'Огни Калининграда', to: '/projects/ogni-kaliningrada', isRouterLink: true },
      { title: 'ЖК Елизаветинский', to: '/projects/elizavetinskiy', isRouterLink: true },
      { title: 'Пионерский берег', to: '/projects/pionerskiy-bereg', isRouterLink: true },
      { title: 'Аврора', to: '/projects/avrora', isRouterLink: true },
      // { title: 'Аврора', href: '#' },
      // { title: 'Объекты', to: '/contacts', isRouterLink: true },
      // { title: 'Подобрать квартиру', to: '/contacts', isRouterLink: true },
      // { title: 'Трейд-ин', to: '/contacts', isRouterLink: true },
    ],
  },
  {
    title: 'О компании',
    links: [
      { title: 'О компании', to: '/about', isRouterLink: true },
      // { title: 'Субсидии', to: '/contacts', isRouterLink: true },
      // { title: 'Faq', to: '/contacts', isRouterLink: true },
      // { title: 'Новости', href: 'https://example.com/news' }, // внешняя ссылка
    ],
  },
  {
    title: 'Для клиентов',
    links: [
      // { title: 'Ипотека', to: '/contacts', isRouterLink: true },
      { title: 'Контакты', to: '/contacts', isRouterLink: true },
      // { title: 'Партнёрство', to: '/contacts', isRouterLink: true },
    ],
  },
]
</script>

<template>
  <div class="footer mt-110">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__top">
          <div class="footer__main">
            <RouterLink to="/">
              <img src="/imgs/new-logo.svg" alt="" loading="lazy" decoding="async" class="footer__logo common-logo" />
            </RouterLink>

            <div class="footer__additional">
              <div class="footer__additional-social">
                <a href="https://wa.me/79114701905" target="_blank" rel="noopener noreferrer">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.7378 3.25312C14.0585 1.57968 11.8195 0.649994 9.4561 0.649994C4.54268 0.649994 0.562194 4.61666 0.562194 9.51302C0.562194 11.0625 0.997561 12.612 1.7439 13.9135L0.5 18.5L5.22683 17.2604C6.53293 17.9422 7.96342 18.3141 9.4561 18.3141C14.3695 18.3141 18.35 14.3474 18.35 9.45104C18.2878 7.15781 17.4171 4.92656 15.7378 3.25312ZM13.7476 12.674C13.561 13.1698 12.6902 13.6656 12.2549 13.7276C11.8817 13.7896 11.3841 13.7896 10.8866 13.6656C10.5756 13.5417 10.1402 13.4177 9.64269 13.1698C7.40366 12.2401 5.97317 10.0089 5.84878 9.82291C5.72439 9.69895 4.91586 8.64531 4.91586 7.52968C4.91586 6.41406 5.47561 5.91822 5.6622 5.67031C5.84878 5.42239 6.09756 5.42239 6.28415 5.42239C6.40854 5.42239 6.59512 5.42239 6.71951 5.42239C6.8439 5.42239 7.03049 5.36041 7.21707 5.79427C7.40366 6.22812 7.83903 7.34375 7.90122 7.40573C7.96342 7.52968 7.96342 7.65364 7.90122 7.7776C7.83903 7.90156 7.77683 8.02552 7.65244 8.14947C7.52805 8.27343 7.40366 8.45937 7.34146 8.52135C7.21707 8.64531 7.09268 8.76927 7.21707 8.9552C7.34146 9.20312 7.77683 9.88489 8.46098 10.5047C9.33171 11.2484 10.0159 11.4964 10.2646 11.6203C10.5134 11.7443 10.6378 11.6823 10.7622 11.5583C10.8866 11.4344 11.322 10.9385 11.4463 10.6906C11.5707 10.4427 11.7573 10.5047 11.9439 10.5667C12.1305 10.6286 13.25 11.1865 13.4366 11.3104C13.6854 11.4344 13.8098 11.4964 13.872 11.5583C13.9341 11.7443 13.9341 12.1781 13.7476 12.674Z"
                      fill="white" />
                  </svg>
                </a>
                <a href="https://t.me/akfen_39" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.947998 7.31796L4.85638 8.77532L6.37998 13.6773C6.44622 14.0086 6.84368 14.0748 7.10866 13.8761L9.29469 12.0875C9.49342 11.8888 9.82464 11.8888 10.0896 12.0875L13.998 14.936C14.263 15.1347 14.6604 15.0022 14.7267 14.671L17.6414 0.759854C17.7076 0.428636 17.3764 0.0974219 17.0452 0.229909L0.947998 6.4568C0.550537 6.58929 0.550537 7.18548 0.947998 7.31796ZM6.18125 8.04664L13.8655 3.34335C13.998 3.27711 14.1305 3.47584 13.998 3.54209L7.70485 9.43776C7.50612 9.63649 7.30738 9.90146 7.30738 10.2327L7.10866 11.8225C7.10866 12.0213 6.77744 12.0875 6.71119 11.8225L5.91626 8.90781C5.71753 8.57659 5.85004 8.17913 6.18125 8.04664Z"
                      fill="white" />
                  </svg>
                </a>
              </div>
              <a href="tel:+7 4012 777747" class="footer__additional-tel">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.6665 11.28V13.28C14.6672 13.4657 14.6292 13.6494 14.5548 13.8196C14.4804 13.9897 14.3713 14.1424 14.2345 14.2679C14.0977 14.3934 13.9362 14.489 13.7603 14.5485C13.5844 14.608 13.398 14.63 13.2131 14.6133C11.1617 14.3904 9.19113 13.6894 7.45979 12.5667C5.84901 11.5431 4.48335 10.1774 3.45979 8.56667C2.33311 6.82747 1.63195 4.84733 1.41313 2.78667C1.39647 2.60231 1.41838 2.41651 1.47746 2.24108C1.53654 2.06566 1.63151 1.90446 1.7563 1.76775C1.8811 1.63103 2.033 1.5218 2.20232 1.44701C2.37164 1.37222 2.55469 1.33351 2.73979 1.33333H4.73979C5.06333 1.33015 5.37699 1.44472 5.6223 1.65569C5.86761 1.86666 6.02784 2.15963 6.07313 2.48C6.15754 3.12004 6.31409 3.74848 6.53979 4.35333C6.62949 4.59195 6.6489 4.85127 6.59573 5.10059C6.54256 5.3499 6.41903 5.57874 6.23979 5.76L5.39313 6.60667C6.34216 8.2757 7.7241 9.65763 9.39313 10.6067L10.2398 9.76C10.4211 9.58076 10.6499 9.45723 10.8992 9.40406C11.1485 9.35089 11.4078 9.3703 11.6465 9.46C12.2513 9.6857 12.8797 9.84225 13.5198 9.92667C13.8436 9.97235 14.1394 10.1355 14.3508 10.385C14.5622 10.6345 14.6746 10.953 14.6665 11.28Z"
                    fill="#212026" />
                </svg>
                +7 4012 777747
              </a>
            </div>
          </div>
          <div class="footer__menu">
            <div class="footer__list-wrapper" v-for="(section, index) in footerMenu" :key="index">
              <p>{{ section.title }}</p>
              <ul>
                <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
                  <RouterLink v-if="link.isRouterLink" :to="link.to">{{ link.title }}</RouterLink>
                  <a v-else :href="link.href">{{ link.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="footer__left">
            <p class="footer__bottom-text">2003 - 2026 © Строительная компания</p>
          </div>
          <div class="footer__right">
            <p class="footer__bottom-text">
              Все права на публикуемые на сайте материалы принадлежат АО СЗ "АКФЕН". ОГРН
              1037728055331 <br />
              ИНН 7728306340. Любая информация, представленная на данном сайте, носит исключительно
              информационный характер и ни при каких условиях не является публичной офертой,
              определяемой положениями статьи 437 ГК РФ.
            </p>
            <div class="footer__right-span">
              <router-link  :to="`/politika-konfidenczialnosti`" class="footer__bottom-text footer__bottom-text-line">
                Политика конфиденциальности
              </router-link>
            
              <a href="https://almond-media.ru/" class="footer__bottom-text footer__bottom-text-line"
                target="_blank">Создание и продвижение сайта - Almond Media</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.footer {
  background: var(--seryy);
  border-radius: 60px 60px 0 0;

  &__inner {
    padding: clamp(30px, vw(40px, $desktop), 40px) 30px;

    @media (min-width: $tab) {
      padding: clamp(30px, vw(40px, $desktop), 40px) 40px;
    }

    @media (min-width: $desk) {
      padding: clamp(30px, vw(40px, $desktop), 40px) 10px;
    }
  }

  &__logo {
    width: 100%;
    max-width: 180px;

    @media (min-width: $desk) {
      max-width: 230px;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    gap: clamp(30px, vw(40px, $desktop), 40px);
    padding-bottom: clamp(24px, vw(34px, $desktop), 34px);
    border-bottom: 1px solid var(--color);
    flex-direction: column;

    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      flex-direction: row;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: clamp(30px, vw(40px, $desktop), 40px);
    padding-top: clamp(24px, vw(34px, $desktop), 34px);

    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      flex-direction: row;
    }
  }

  &__main {
    display: inherit;
    flex-direction: column;
    justify-content: space-between;
    max-width: 100%;
    flex: 1;

    @media (min-width: $desk) {
      max-width: 420px;
    }
  }

  &__logo {
    padding-bottom: clamp(20px, vw(60px, $desktop), 90px);

    @media (min-width: $desk) {
      padding-bottom: clamp(20px, vw(90px, $desktop), 90px);
    }
  }

  &__additional {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color);
    padding-top: clamp(20px, vw(60px, $desktop), 90px);

    @media (min-width: $desk) {
      padding-top: clamp(20px, vw(90px, $desktop), 90px);
    }
  }

  &__additional-social {
    display: inherit;
    gap: clamp(10px, vw(12px, $desktop), 12px);

    a {
      position: relative;
      border-radius: 100%;
      width: clamp(30px, vw(34px, $desktop), 34px);
      height: clamp(30px, vw(34px, $desktop), 34px);
      // display: flex;
      // align-items: center;
      // justify-content: center;

      svg {
        position: absolute;
        top: 50%;
      }

      &:first-child {
        background-color: #477750;

        svg {
          width: clamp(17px, vw(19px, $desktop), 19px);
          height: clamp(17px, vw(19px, $desktop), 19px);
          left: 50%;
          transform: translate(-45%, -50%);
        }

        &:hover {
          background-color: #5d9967;
        }
      }

      &:last-child {
        background-color: #287cbc;

        svg {
          width: clamp(16px, vw(18px, $desktop), 18px);
          height: clamp(14px, vw(18px, $desktop), 16px);
          left: 45%;
          transform: translate(-50%, -50%);
        }

        &:hover {
          background-color: #3e94d5;
        }
      }
    }
  }

  &__additional-tel {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: clamp(21px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }

  &__additional-tel:hover {
    color: var(--1);
  }

  &__menu {
    display: grid;
    flex: 2;
    grid-template-columns: 1fr;

    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      grid-template-columns: repeat(3, 1fr);
      column-gap: clamp(30px, vw(40px, $desktop), 40px);
    }
  }

  &__list-wrapper {
    p {
      margin-bottom: clamp(8px, vw(12px, $desktop), 12px);
      font-family: var(--font-family);
      font-weight: 400;
      font-size: clamp(15px, vw(16px, $desktop), 16px);
      line-height: 146%;
      color: var(--40);
    }

    ul {
      column-count: 2;
      gap: clamp(6px, vw(8px, $desktop), 8px);
      column-gap: 20px;
      row-gap: 12px;

      @media (min-width: $tab) {
        column-count: 4;
      }

      @media (min-width: $desk) {
        display: flex;
        flex-direction: column;
        column-gap: 0;
      }

      li {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: clamp(15px, vw(16px, $desktop), 16px);
        line-height: 146%;
        color: var(--100);
      }

      li:hover {
        color: var(--1);
      }
    }
  }

  &__list-wrapper:not(:first-child) {
    margin-top: 24px;

    @media (min-width: $tab) {}

    @media (min-width: $desk) {
      margin-top: 0;
    }
  }

  &__left {
    flex: 1;
    max-width: 420px;
  }

  &__right {
    flex: 2;
  }

  &__bottom-text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--60);
  }

  &__bottom-text-line {
    text-decoration: underline;
  }

  &__bottom-text-line:hover {
    text-decoration: none;
  }

  &__right-span {
    margin-top: clamp(15px, vw(16px, $desktop), 16px);
    display: flex;
    gap: clamp(12px, vw(30px, $desktop), 30px);
    flex-direction: column;

    @media (min-width: $tab) {
      flex-direction: row;
    }
  }
}
</style>
