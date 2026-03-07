<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Menu from '@/components/Menu.vue'
import Modal from '@/components/Modal.vue'

const isOpen = ref()
const isModal = ref(false)
const isMobile = ref(window.innerWidth < 992)

function handleResize() {
  isMobile.value = window.innerWidth < 992
}
// const handleResize = () => {
//   isMobile.value = window.innerWidth < 992
// }

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(isOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : ''
})

function toggle() {
  isOpen.value = !isOpen.value
}
function toggleModal() {
  isModal.value = !isModal.value
}
</script>

<template>
  <div class="header">
    <div class="container">
      <div class="header__inner" :class="{ active: isOpen }">
        <RouterLink to="/">
          <img
            src="/imgs/new-logo.svg"
            alt=""
            class="header__logo common-logo"
            loading="lazy"
            decoding="async"
          />
        </RouterLink>

        <Menu :is-open="isOpen" @request-close="isOpen = false" />

        <div class="header__additional">
          <a href="tel:+7 4012 777747" class="header__additional-tel">
            <span class="header__additional-tel-wrapper">
              <!-- Мобильная иконка -->
              <svg
                v-if="!isOpen && isMobile"
                class="header__additional-clap"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- мобильный путь -->
                <path
                  d="M14.6669 11.28V13.28C14.6677 13.4657 14.6297 13.6494 14.5553 13.8196C14.4809 13.9897 14.3718 14.1424 14.235 14.2679C14.0982 14.3934 13.9367 14.489 13.7608 14.5485C13.5849 14.608 13.3985 14.63 13.2136 14.6133C11.1622 14.3904 9.19161 13.6894 7.46028 12.5667C5.8495 11.5431 4.48384 10.1774 3.46028 8.56667C2.3336 6.82747 1.63244 4.84733 1.41361 2.78667C1.39695 2.60231 1.41886 2.41651 1.47795 2.24108C1.53703 2.06566 1.63199 1.90446 1.75679 1.76775C1.88159 1.63103 2.03348 1.5218 2.20281 1.44701C2.37213 1.37222 2.55517 1.33351 2.74028 1.33333H4.74028C5.06382 1.33015 5.37748 1.44472 5.62279 1.65569C5.8681 1.86666 6.02833 2.15963 6.07361 2.48C6.15803 3.12004 6.31458 3.74848 6.54028 4.35333C6.62998 4.59195 6.64939 4.85127 6.59622 5.10059C6.54305 5.3499 6.41952 5.57874 6.24028 5.76L5.39361 6.60667C6.34265 8.2757 7.72458 9.65763 9.39361 10.6067L10.2403 9.76C10.4215 9.58076 10.6504 9.45723 10.8997 9.40406C11.149 9.35089 11.4083 9.3703 11.6469 9.46C12.2518 9.6857 12.8802 9.84225 13.5203 9.92667C13.8441 9.97235 14.1399 10.1355 14.3513 10.385C14.5627 10.6345 14.6751 10.953 14.6669 11.28Z"
                  fill="#3343A9"
                />
              </svg>

              <!-- Десктопная иконка -->
              <svg
                v-if="!isOpen && !isMobile"
                class="header__additional-clap"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- десктопный путь -->
                <path
                  d="M14.6665 11.28V13.28C14.6672 13.4657 14.6292 13.6494 14.5548 13.8196C14.4804 13.9897 14.3713 14.1424 14.2345 14.2679C14.0977 14.3934 13.9362 14.489 13.7603 14.5485C13.5844 14.608 13.398 14.63 13.2131 14.6133C11.1617 14.3904 9.19113 13.6894 7.45979 12.5667C5.84901 11.5431 4.48335 10.1774 3.45979 8.56667C2.33311 6.82747 1.63195 4.84733 1.41313 2.78667C1.39647 2.60231 1.41838 2.41651 1.47746 2.24108C1.53654 2.06566 1.63151 1.90446 1.7563 1.76775C1.8811 1.63103 2.033 1.5218 2.20232 1.44701C2.37164 1.37222 2.55469 1.33351 2.73979 1.33333H4.73979C5.06333 1.33015 5.37699 1.44472 5.6223 1.65569C5.86761 1.86666 6.02784 2.15963 6.07313 2.48C6.15754 3.12004 6.31409 3.74848 6.53979 4.35333C6.62949 4.59195 6.6489 4.85127 6.59573 5.10059C6.54256 5.3499 6.41903 5.57874 6.23979 5.76L5.39313 6.60667C6.34216 8.2757 7.7241 9.65763 9.39313 10.6067L10.2398 9.76C10.4211 9.58076 10.6499 9.45723 10.8992 9.40406C11.1485 9.35089 11.4078 9.3703 11.6465 9.46C12.2513 9.6857 12.8797 9.84225 13.5198 9.92667C13.8436 9.97235 14.1394 10.1355 14.3508 10.385C14.5622 10.6345 14.6746 10.953 14.6665 11.28Z"
                  fill="#212026"
                />
              </svg>

              <!-- Иконка при открытом состоянии -->
              <svg
                v-if="isOpen"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.0004 16.92V19.92C22.0016 20.1985 21.9445 20.4741 21.8329 20.7293C21.7214 20.9845 21.5577 21.2136 21.3525 21.4018C21.1473 21.5901 20.905 21.7335 20.6412 21.8227C20.3773 21.9119 20.0978 21.945 19.8204 21.92C16.7433 21.5856 13.7874 20.5341 11.1904 18.85C8.77425 17.3146 6.72576 15.2661 5.19042 12.85C3.5004 10.2412 2.44866 7.27097 2.12042 4.17997C2.09543 3.90344 2.1283 3.62474 2.21692 3.3616C2.30555 3.09846 2.44799 2.85666 2.63519 2.6516C2.82238 2.44653 3.05023 2.28268 3.30421 2.1705C3.5582 2.05831 3.83276 2.00024 4.11042 1.99997H7.11042C7.59573 1.9952 8.06621 2.16705 8.43418 2.48351C8.80215 2.79996 9.0425 3.23942 9.11042 3.71997C9.23704 4.68004 9.47187 5.6227 9.81042 6.52997C9.94496 6.8879 9.97408 7.27689 9.89433 7.65086C9.81457 8.02482 9.62928 8.36809 9.36042 8.63998L8.09042 9.90997C9.51398 12.4135 11.5869 14.4864 14.0904 15.91L15.3604 14.64C15.6323 14.3711 15.9756 14.1858 16.3495 14.1061C16.7235 14.0263 17.1125 14.0554 17.4704 14.19C18.3777 14.5285 19.3204 14.7634 20.2804 14.89C20.7662 14.9585 21.2098 15.2032 21.527 15.5775C21.8441 15.9518 22.0126 16.4296 22.0004 16.92Z"
                  fill="white"
                />
              </svg>
            </span>
            <p class="header__additional-tel-num">+7 4012 777747</p>
          </a>
          <div class="header__additional-social">
            <a href="https://wa.me/79114701905" target="_blank" rel="noopener noreferrer">
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7378 3.25312C14.0585 1.57968 11.8195 0.649994 9.4561 0.649994C4.54268 0.649994 0.562194 4.61666 0.562194 9.51302C0.562194 11.0625 0.997561 12.612 1.7439 13.9135L0.5 18.5L5.22683 17.2604C6.53293 17.9422 7.96342 18.3141 9.4561 18.3141C14.3695 18.3141 18.35 14.3474 18.35 9.45104C18.2878 7.15781 17.4171 4.92656 15.7378 3.25312ZM13.7476 12.674C13.561 13.1698 12.6902 13.6656 12.2549 13.7276C11.8817 13.7896 11.3841 13.7896 10.8866 13.6656C10.5756 13.5417 10.1402 13.4177 9.64269 13.1698C7.40366 12.2401 5.97317 10.0089 5.84878 9.82291C5.72439 9.69895 4.91586 8.64531 4.91586 7.52968C4.91586 6.41406 5.47561 5.91822 5.6622 5.67031C5.84878 5.42239 6.09756 5.42239 6.28415 5.42239C6.40854 5.42239 6.59512 5.42239 6.71951 5.42239C6.8439 5.42239 7.03049 5.36041 7.21707 5.79427C7.40366 6.22812 7.83903 7.34375 7.90122 7.40573C7.96342 7.52968 7.96342 7.65364 7.90122 7.7776C7.83903 7.90156 7.77683 8.02552 7.65244 8.14947C7.52805 8.27343 7.40366 8.45937 7.34146 8.52135C7.21707 8.64531 7.09268 8.76927 7.21707 8.9552C7.34146 9.20312 7.77683 9.88489 8.46098 10.5047C9.33171 11.2484 10.0159 11.4964 10.2646 11.6203C10.5134 11.7443 10.6378 11.6823 10.7622 11.5583C10.8866 11.4344 11.322 10.9385 11.4463 10.6906C11.5707 10.4427 11.7573 10.5047 11.9439 10.5667C12.1305 10.6286 13.25 11.1865 13.4366 11.3104C13.6854 11.4344 13.8098 11.4964 13.872 11.5583C13.9341 11.7443 13.9341 12.1781 13.7476 12.674Z"
                  fill="white"
                />
              </svg>
            </a>
            <a href="https://t.me/akfen_39" target="_blank" rel="noopener noreferrer">
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.947998 7.31796L4.85638 8.77532L6.37998 13.6773C6.44622 14.0086 6.84368 14.0748 7.10866 13.8761L9.29469 12.0875C9.49342 11.8888 9.82464 11.8888 10.0896 12.0875L13.998 14.936C14.263 15.1347 14.6604 15.0022 14.7267 14.671L17.6414 0.759854C17.7076 0.428636 17.3764 0.0974219 17.0452 0.229909L0.947998 6.4568C0.550537 6.58929 0.550537 7.18548 0.947998 7.31796ZM6.18125 8.04664L13.8655 3.34335C13.998 3.27711 14.1305 3.47584 13.998 3.54209L7.70485 9.43776C7.50612 9.63649 7.30738 9.90146 7.30738 10.2327L7.10866 11.8225C7.10866 12.0213 6.77744 12.0875 6.71119 11.8225L5.91626 8.90781C5.71753 8.57659 5.85004 8.17913 6.18125 8.04664Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
        <button
          class="header__burger"
          :class="{ open: isOpen }"
          @click="toggle"
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.header {
  // height: clamp(65px, vw(75px, $desktop), 75px);
  // position: relative;
  position: fixed;
  width: 100%;
  // max-width: clamp(300px, vw(1380px, $desktop), 1860px);
  // height: 100%;

  z-index: 5;
  background-color: var(--color);
  padding-top: clamp(12px, vw(20px, $desktop), 20px);
  padding-bottom: clamp(12px, vw(20px, $desktop), 20px);

  border-bottom: 1px solid var(--color);

  // padding: clamp(12px, vw(20px, $desktop), 20px) 0;

  & .container {
    // @media (min-width: $desk) {
    //   background: none;
    // }
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__inner.active {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    background: var(--2);
    padding: 40px 30px;
    align-items: flex-start;
    justify-content: start;
    z-index: 10;
  }
  &__logo img {
    width: 100%;
    max-width: 132px;
    @media (min-width: $tab) {
      max-width: 100%;
    }
  }
  &__inner.active .header__logo {
    display: none;
  }

  &__additional {
    display: inherit;
    gap: clamp(10px, vw(20px, $desktop), 20px);
    align-items: center;
  }
  // &__inner.active .header__additional {
  //   gap: clamp(10px, vw(20px, $desktop), 20px);
  // }

  &__additional-tel-wrapper {
    background: var(--seryy);
    border-radius: 100px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      background: none;
    }
  }

  &__inner.active .header__additional-tel-wrapper {
    background: none;
  }

  &__additional-tel {
    display: inherit;
    align-items: center;
    gap: clamp(3px, vw(6px, $desktop), 6px);
    font-family: var(--font-family);
    font-weight: 600;
    font-size: clamp(16px, vw(19px, $desktop), 19px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
  }
  &__additional-tel:hover {
    color: var(--1);
  }
  &__inner .header__additional-tel-num {
    display: none;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      display: bf;
    }
  }
  &__inner.active .header__additional-tel-num {
    font-size: clamp(18px, vw(20px, $desktop), 20px);
    color: var(--color);
    line-height: 126%;
  }
  &__inner.active .header__additional-tel-num {
    display: block;
  }

  &__additional-social {
    display: inherit;
    gap: clamp(5px, vw(10px, $desktop), 10px);

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
  &__burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      display: none;
    }
    span {
      display: block;
      height: 2px;
      width: 20px;
      background-color: var(--100);
      border-radius: 2px;
      transition: all 0.3s ease;
    }
  }
  &__burger.open {
    position: absolute;
    right: clamp(75px, vw(120px, $desktop), 120px);
    top: 15px;
    border-radius: 100%;
    border: 1px solid var(--color);
    width: 30px;
    height: 30px;
    align-items: center;
    span {
      background-color: var(--color);
      width: 18px;
    }
  }

  /* Анимация превращения в крестик */
  &__burger.open span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  &__burger.open span:nth-child(2) {
    opacity: 0;
  }
  &__burger.open span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }
}
</style>
