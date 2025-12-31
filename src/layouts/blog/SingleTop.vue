<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="single__top">
    <div class="container">
      <div class="single__top-inner">
        <div class="single__top-left">
          <h2 class="single__top-title">{{ items.title }}</h2>
          <p class="single__top-text">{{ items.text }}</p>
          <div class="single__top-split">
            <p class="single__top-date">{{ items.date }}</p>
            <svg
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2.5" r="2" fill="#3343A9" />
            </svg>
            <p class="single__top-time">{{ items.readtime }} мин чтение</p>
            <svg
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2.5" r="2" fill="#3343A9" />
            </svg>
            <p class="single__top-views">{{ items.views }} просмотров</p>
          </div>
        </div>
        <div class="single__top-right">
          <img :src="items.imgWrap" alt="" />
        </div>
      </div>
      <div class="single__top-author">
        <img :src="items.authorPhoto" alt="" />

        <div class="single__top-wrapper">
          <p class="single__top-tl">Автор статьи</p>
          <p class="single__top-ar">{{ items.author }}</p>
          <p class="single__top-tx">{{ items.descr }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.single__top {
  font-family: var(--font-family);
  &-inner {
    display: flex;
    gap: clamp(20px, vw(20px, $desktop), 20px);
    flex-direction: column;
    @media (min-width: $tab-inner) {
      flex-direction: row;
      align-items: flex-start;
    }
    @media (min-width: $desk) {
      align-items: normal;
    }
    // align-items: center;

    // max-height: 429px;
  }
  &-left {
    order: 2;
    flex: 1;
    border: 1px solid var(--obvodka);
    border-radius: 30px;
    padding: clamp(30px, vw(50px, $desktop), 50px);
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(35px, $desktop), 35px);

    @media (min-width: $tab-inner) {
      order: 1;
    }
  }
  &-right {
    flex: 1;
    order: 1;
    @media (min-width: $tab-inner) {
      order: 2;
    }
  }
  &-right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    max-height: 400px;
    min-height: 320px;
    @media (min-width: $tab-inner) {
      order: 2;
    }
  }

  &-title {
    font-weight: 600;
    font-size: clamp(26px, vw(36px, $desktop), 36px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
  }
  &-text {
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
  }
  &-split {
    display: flex;
    gap: clamp(10px, vw(16px, $desktop), 16px);
    align-items: center;
    flex-wrap: wrap;
  }
  &-date,
  &-time,
  &-views {
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--60);
  }

  &-author {
    margin-top: clamp(20px, vw(20px, $desktop), 20px);
    display: flex;
    gap: clamp(16px, vw(24px, $desktop), 24px);
    background: var(--seryy);
    border-radius: 30px;
    padding: clamp(14px, vw(16px, $desktop), 16px);
    align-items: flex-start;

    @media (min-width: $desk) {
      align-items: center;
    }
  }
  &-author img {
    border-radius: 20px;
    width: clamp(100px, vw(120px, $desktop), 120px);
    height: clamp(100px, vw(120px, $desktop), 120px);
  }
  &-tl {
    font-weight: 600;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 136%;
    letter-spacing: 0em;
    color: #b7bbbd;
    padding-bottom: clamp(12px, vw(20px, $desktop), 20px);
  }
  &-ar {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--100);
    padding-bottom: clamp(8px, vw(8px, $desktop), 8px);
  }
  &-tx {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
  }
}
</style>
