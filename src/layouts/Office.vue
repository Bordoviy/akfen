<script setup>
import { ref } from 'vue'

// const salesContainers = ref([])

// const salesCards = [
//   {
//     title: 'Коммерческие помещения',
//     price: '3,8 млн',
//     imgs: [
//       { img: '/imgs/sales/img1.png' },
//       { img: '/imgs/sales/img2.png' },
//       { img: '/imgs/sales/img1.png' },
//       { img: '/imgs/sales/img2.png' },
//     ],
//     categories: [
//       { title: 'ЖК "Янтарный"' },
//       { title: 'ЖК "Солнечный город"' },
//       { title: 'ЖК "Калининград-Сити"' },
//       { title: 'ЖД "Премьера"' },
//     ],
//     href: '#',
//   },

// ]
</script>

<template>
  <div class="office mt-110">
    <div class="container">
      <h2 class="office__title default-title">Офис продаж</h2>
      <div class="office__inner">
        <div class="office__address">
          <p class="office__address-title">Офис продаж</p>
          <p class="office__address-text">
            Калининград,<br />
            ул. Генерала Челнокова, дом 52
          </p>
        </div>
        <div class="office__info">
          <div class="office__info-schedule">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 18.3332C14.6022 18.3332 18.3332 14.6022 18.3332 9.99984C18.3332 5.39746 14.6022 1.6665 9.99984 1.6665C5.39746 1.6665 1.6665 5.39746 1.6665 9.99984C1.6665 14.6022 5.39746 18.3332 9.99984 18.3332Z"
                stroke="#BAB9BE"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 5V10L13.3333 11.6667"
                stroke="#BAB9BE"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            пн-пт: 9:15-18:00, сб: 10:00-15:00
          </div>
          <div class="office__info-mail">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33317 3.3335H16.6665C17.5832 3.3335 18.3332 4.0835 18.3332 5.00016V15.0002C18.3332 15.9168 17.5832 16.6668 16.6665 16.6668H3.33317C2.4165 16.6668 1.6665 15.9168 1.6665 15.0002V5.00016C1.6665 4.0835 2.4165 3.3335 3.33317 3.3335Z"
                stroke="#BAB9BE"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.3332 5L9.99984 10.8333L1.6665 5"
                stroke="#BAB9BE"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <a href="mailto:secretar@akfen39.ru">info@akfen39.ru</a>
          </div>
          <div class="office__info-flip">
            <a href="tel:+74012777747" class="office__info-flip-tel">+7 4012 77 7747</a>
            <span>
              <a href="https://t.me/akfen_39" target="_blank" rel="noopener noreferrer">
                <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.480756 7.29936L4.15924 8.67099L5.59321 13.2847C5.65555 13.5964 6.02964 13.6587 6.27902 13.4717L8.33646 11.7883C8.5235 11.6013 8.83525 11.6013 9.08463 11.7883L12.7631 14.4692C13.0125 14.6563 13.3866 14.5316 13.4489 14.2199L16.1922 1.12702C16.2545 0.815288 15.9428 0.503556 15.6311 0.62825L0.480756 6.48886C0.106675 6.61355 0.106675 7.17467 0.480756 7.29936ZM5.40617 7.98518L12.6384 3.55855C12.7631 3.4962 12.8878 3.68325 12.7631 3.74559L6.84014 9.29446C6.6531 9.4815 6.46606 9.73089 6.46606 10.0426L6.27902 11.5389C6.27902 11.726 5.96729 11.7883 5.90494 11.5389L5.15677 8.79569C4.96973 8.48395 5.09444 8.10987 5.40617 7.98518Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="https://wa.me/79114701905" target="_blank" rel="noopener noreferrer">
                <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.3415 2.65019C12.761 1.07519 10.6537 0.200195 8.42927 0.200195C3.80488 0.200195 0.0585357 3.93353 0.0585357 8.54186C0.0585357 10.0002 0.468293 11.4585 1.17073 12.6835L0 17.0002L4.44878 15.8335C5.67805 16.4752 7.02439 16.8252 8.42927 16.8252C13.0537 16.8252 16.8 13.0919 16.8 8.48353C16.7415 6.3252 15.9219 4.22519 14.3415 2.65019ZM12.4683 11.5169C12.2927 11.9835 11.4732 12.4502 11.0634 12.5085C10.7122 12.5669 10.2439 12.5669 9.77561 12.4502C9.48293 12.3335 9.07317 12.2169 8.60488 11.9835C6.49756 11.1085 5.15122 9.00853 5.03415 8.83353C4.91707 8.71686 4.1561 7.72519 4.1561 6.67519C4.1561 5.62519 4.68293 5.15853 4.85854 4.92519C5.03415 4.69186 5.26829 4.69186 5.4439 4.69186C5.56098 4.69186 5.73658 4.69186 5.85366 4.69186C5.97073 4.69186 6.14634 4.63353 6.32195 5.04186C6.49756 5.45019 6.90732 6.5002 6.96585 6.55853C7.02439 6.67519 7.02439 6.79186 6.96585 6.90853C6.90732 7.0252 6.84878 7.14186 6.7317 7.25853C6.61463 7.37519 6.49756 7.55019 6.43902 7.60853C6.32195 7.72519 6.20488 7.84186 6.32195 8.01686C6.43902 8.25019 6.84878 8.89186 7.49268 9.47519C8.31219 10.1752 8.9561 10.4085 9.19024 10.5252C9.42439 10.6419 9.54146 10.5835 9.65853 10.4669C9.77561 10.3502 10.1854 9.88353 10.3024 9.6502C10.4195 9.41686 10.5951 9.47519 10.7707 9.53353C10.9463 9.59186 12 10.1169 12.1756 10.2335C12.4098 10.3502 12.5268 10.4085 12.5854 10.4669C12.6439 10.6419 12.6439 11.0502 12.4683 11.5169Z"
                    fill="white"
                  />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.office {
  font-family: var(--font-family);
  &__inner {
    background: var(--seryy);
    border-radius: 24px;
    padding: clamp(24px, vw(40px, $desktop), 40px);
    gap: clamp(16px, vw(20px, $desktop), 20px);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      flex-direction: row;
    }
  }
  &__address {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
    }
  }
  &__address-title {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--40);
  }
  &__address-text {
    font-weight: 600;
    font-size: clamp(20px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    max-width: 100%;
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      max-width: 630px;
    }
  }
  &__info {
    flex: 1;
    display: inherit;
    flex-direction: column;
    gap: clamp(12px, vw(16px, $desktop), 16px);
  }
  &__info-schedule {
    display: flex;
    align-items: center;
    gap: clamp(8px, vw(8px, $desktop), 8px);
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--60);
  }
  &__info-mail {
    display: flex;
    align-items: center;
    gap: clamp(8px, vw(8px, $desktop), 8px);
  }
  &__info-mail:hover a {
    color: var(--1);
  }

  &__info-mail a {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--60);
  }
  &__info-flip {
    display: flex;
    align-items: center;
    gap: clamp(12px, vw(16px, $desktop), 16px);
  }
  &__info-flip-tel {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    letter-spacing: 0em;
    color: var(--100);
  }
  &__info-flip:hover {
    color: var(--1);
  }
  &__info-flip span {
    display: inherit;
    gap: clamp(9px, vw(10px, $desktop), 10px);
  }
  &__info-flip span a {
    width: clamp(28px, vw(32px, $desktop), 32px);
    height: clamp(28px, vw(32px, $desktop), 32px);
    border-radius: 100%;
  }
  &__info-flip span a {
    width: clamp(28px, vw(32px, $desktop), 32px);
    height: clamp(28px, vw(32px, $desktop), 32px);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__info-flip span a:nth-child(1) {
    background-color: #287cbc;
    svg {
      width: clamp(19px, vw(17px, $desktop), 17px);
      height: clamp(16px, vw(15px, $desktop), 15px);
    }
    &:hover {
      background-color: #3e94d5;
    }
  }
  &__info-flip span a:nth-child(2) {
    background-color: #477750;
    svg {
      width: clamp(17px, vw(17px, $desktop), 17px);
      height: clamp(19px, vw(17px, $desktop), 17px);
    }
    &:hover {
      background-color: #5d9967;
    }
  }
}
</style>
