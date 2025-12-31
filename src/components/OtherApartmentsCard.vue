<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div v-for="ap in items" :key="ap.id" class="apart__card swiper-slide">
    <div class="apart__card-inner">
      <div class="apart__card-head">
        <div class="apart__card-plan">
          <img :src="ap.img" :alt="ap.id" loading="lazy" decoding="async" />
          <span v-if="ap.promo" class="apart__card-badge">-10%</span>
        </div>
      </div>

      <div class="apart__card-top">
        <a href="#" @click.prevent class="apart__card-title"
          >{{ ap.rooms }}-х комнатная квартира <span>{{ ap.area }} м2</span></a
        >

        <div class="apart__card-specgrid">
          <p>{{ ap.area }} м2</p>
          <svg
            width="3"
            height="3"
            viewBox="0 0 3 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#DADAE7" />
          </svg>
          <p>{{ ap.rooms }} комн.</p>
          <svg
            width="3"
            height="3"
            viewBox="0 0 3 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#DADAE7" />
          </svg>
          <p>{{ ap.floor }} из {{ ap.floorsTotal }} этаж</p>
        </div>
      </div>

      <div class="apart__card-prices">
        <div class="apart__card-prices--wrapper">
          <p class="apart__card-price apart__card-price--sale">{{ ap.price }} руб.</p>
          <p class="apart__card-price apart__card-price--old">{{ ap.priceSale }} руб.</p>
        </div>
        <p class="apart__card-hint">в ипотеку от 18 245 руб.</p>
      </div>
      <div class="apart__card-loc">
        <p>ЖК «{{ ap.project }}»</p>
        <span>
          <p>{{ ap.city }}</p>
          <p>{{ ap.address }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.apart__card {
  background: var(--color);
  border-radius: 30px;
  overflow: hidden;
  //   padding: clamp(20px, vw(24px, $desktop), 24px) clamp(24px, vw(30px, $desktop), 30px);

  @media (min-width: $tab-inner) {
  }
  &-inner {
    padding: clamp(20px, vw(24px, $desktop), 24px) clamp(24px, vw(30px, $desktop), 30px);
    display: flex;
    flex-direction: column;
    gap: clamp(14px, vw(16px, $desktop), 16px);
  }

  &-head {
    // display: flex;
    // flex-direction: column;
    // gap: 8px;
    // align-items: center;
  }
  &-plan {
    position: relative;
    // width: 100%;
    // aspect-ratio: 4/5;
    overflow: hidden;
  }
  &-plan img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  &-badge {
    position: absolute;
    left: 12px;
    top: 12px;
    background: #ff3b30;
    color: #fff;
    border-radius: 10px;
    padding: clamp(4px, vw(4px, $desktop), 4px) clamp(8px, vw(10px, $desktop), 10px);
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--color);
  }

  &-top {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: clamp(8px, vw(10px, $desktop), 10px);
  }
  &-title {
    display: inherit;
    flex-direction: column;
    font-weight: 600;
    font-size: clamp(17px, vw(26px, $desktop), 26px);
    line-height: 126%;
    color: var(--100);
  }
  &-specgrid {
    display: flex;
    gap: clamp(6px, vw(16px, $desktop), 16px);
    align-items: center;

    & p {
      font-weight: 400;
      font-size: clamp(13px, vw(15px, $desktop), 15px);
      line-height: 146%;
      color: var(--60);
    }
  }

  &-prices {
    display: flex;
    gap: clamp(2px, vw(2px, $desktop), 2px);
    flex-direction: column;

    @media (min-width: $desk) {
    }
  }
  &-prices--wrapper {
    display: flex;
    gap: clamp(4px, vw(5px, $desktop), 5px);
    align-items: center;
  }
  &-price--sale {
    font-weight: 600;
    font-size: clamp(16px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--1);
  }
  &-price--old {
    font-weight: 400;
    font-size: clamp(13px, vw(15px, $desktop), 15px);
    line-height: 146%;
    text-decoration: line-through;
    color: var(--60);
  }
  &-hint {
    font-weight: 400;
    font-size: clamp(13px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--60);
  }
  &-loc {
    display: flex;
    flex-direction: column;
    span {
      display: inherit;
      gap: clamp(3px, vw(3px, $desktop), 3px);
    }
  }
  &-loc > p:first-child {
    font-weight: 600;
    font-size: clamp(13px, vw(15px, $desktop), 15px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
  }
  &-loc span p {
    font-weight: 400;
    font-size: clamp(13px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--60);
  }
}
</style>
