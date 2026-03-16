<script setup>
import { onMounted, ref, nextTick } from 'vue'
import Button from '@/components/Button.vue'

const variationsContainer = ref(null)

defineProps({
  items: Array,
  title: String,
})

onMounted(() => {
  nextTick(() => {
    if (!variationsContainer.value) return

    const nextEl = variationsContainer.value.querySelector('.m-variations__button-next--mobile')
    const prevEl = variationsContainer.value.querySelector('.m-variations__button-prev--mobile')
    const section = variationsContainer.value.closest('.m-variations')
    const desktopNextEl = section?.querySelector('.m-variations__button-next--desktop')
    const desktopPrevEl = section?.querySelector('.m-variations__button-prev--desktop')

    const swiper = new Swiper(variationsContainer.value, {
      loop: false,
      slidesPerView: 1, // по умолчанию один слайд
      spaceBetween: 20,
      navigation: {
        nextEl,
        prevEl,
      },
      breakpoints: {
        768: {
          // с 768px и выше – два слайда
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    })

    desktopNextEl?.addEventListener('click', () => swiper.slideNext())
    desktopPrevEl?.addEventListener('click', () => swiper.slidePrev())

    const syncDesktopDisabledState = () => {
      if (!desktopPrevEl || !desktopNextEl) return

      desktopPrevEl.classList.toggle('swiper-button-disabled', swiper.isBeginning)
      desktopNextEl.classList.toggle('swiper-button-disabled', swiper.isEnd)
    }

    syncDesktopDisabledState()
    swiper.on('slideChange', syncDesktopDisabledState)
    swiper.on('resize', syncDesktopDisabledState)
    swiper.on('breakpoint', syncDesktopDisabledState)
  })
})
</script>

<template>
  <div class="m-variations mt-110">
    <div class="container">
      <div class="m-variations__inner">
       
        <div class="m-variations__top swiper-top">
          <h2 class="m-variations__title default-title">{{ title }}</h2>
          <div class="swiper-controls desktop-only">
            <div class="swiper-button-prev m-variations__button-prev--desktop">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15.5L7.5 10.5L12.5 5.5"
                  stroke="white"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="swiper-button-next m-variations__button-next--desktop">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15.5L12.5 10.5L7.5 5.5"
                  stroke="white"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="m-variations__wrapper swiper" ref="variationsContainer">
          <div class="swiper-wrapper">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="m-variations__item swiper-slide"
            >
              <!--
                <div class="m-variations__icon">
                  <img :src="item.img" alt="" />
                </div>
              -->
              <p class="m-variations__subtitle">{{ item.title }}</p>
              <p class="m-variations__text">{{ item.text }}</p>
              <div class="m-variations__bottom">
                <div class="m-variations__lists">
                  <div
                    v-for="(sub, subIndex) in item.items"
                    :key="subIndex"
                    class="m-variations__inert"
                  >
                    <p class="m-variations__inert-title">{{ sub.title }}</p>
                    <p class="m-variations__inert-subtitle">{{ sub.text }}</p>
                  </div>
                </div> 
               <!--  <Button :none="true">Узнать подробности</Button>  -->
              </div>
            </div>
          </div>
          <div class="swiper-controls mobile-only">
            <div class="swiper-button-prev m-variations__button-prev--mobile">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15.5L7.5 10.5L12.5 5.5"
                  stroke="white"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p>листайте, чтобы увидеть больше</p>
            <div class="swiper-button-next m-variations__button-next--mobile">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15.5L12.5 10.5L7.5 5.5"
                  stroke="white"
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
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.m-variations {
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__inner {
  }

  &__wrapper .swiper-wrapper {
    // Swiper управляет layout через transform; не переопределяем на desktop.
  }
  // &__wrapper .swiper-slide {
  //   @media (min-width: 768px) and (max-width: 991px) {
  //     width: calc((100% - 20px) / 2) !important; // 20px = spaceBetween
  //   }
  // }
  &__item {
    background: var(--seryy);
    border-radius: 30px;
    padding: clamp(24px, vw(30px, $desktop), 30px);
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(30px, $desktop), 30px);
    height: auto;
    box-sizing: border-box;
    @media (min-width: $tab-inner) {
    }
  }
  &__icon {
    background: var(--color);
    border-radius: 20px 4px;
    width: clamp(50px, vw(64px, $desktop), 64px);
    height: clamp(50px, vw(64px, $desktop), 64px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__icon img {
    width: clamp(35px, vw(35px, $desktop), 35px);
    height: clamp(35px, vw(35px, $desktop), 35px);
  }
  &__subtitle {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &__text {
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--80);
  }
  &__bottom {
    margin-top: auto;
  }
  &__lists {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: clamp(12px, vw(16px, $desktop), 16px);
    column-gap: clamp(12px, vw(20px, $desktop), 20px);
    margin-bottom: clamp(20px, vw(30px, $desktop), 30px);
  }
  &__inert {
  }
  &__inert-title {
    font-weight: 600;
    font-size: clamp(20px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &__inert-subtitle {
    font-weight: 400;
    font-size: clamp(12px, vw(12px, $desktop), 12px);
    line-height: 140%;
    letter-spacing: 0.01em;
    color: var(--60);
  }
  &__bottom .btn {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
