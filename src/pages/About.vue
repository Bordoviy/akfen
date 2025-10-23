<script setup>
import Office from '@/layouts/Office.vue'
import About from '@/layouts/About.vue'
import News from '@/layouts/News.vue'
import Other from '@/layouts/Other.vue'
import Appeal from '@/layouts/about/Appeal.vue'
import Planing from '@/layouts/about/Planing.vue'
import History from '@/layouts/about/History.vue'
import Default from '@/layouts/about/Default.vue'
import Projects from '@/layouts/about/Projects.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Tab from '@/components/Tab.vue'

function openVideo() {
  window.open(companyInfo.video.url, '_blank', 'noopener,noreferrer')
}

const companyInfo = {
  title: 'О компании',
  video: {
    title: 'Посмотрите видео о компании',
    text: 'Большой репортаж на России 1 “Вести подробности”, в котором осветили основные принципы компании и застройки проекта',
    url: 'https://rutube.ru/play/embed/2b64bc35994ea01949379eb77f2013ed/',
  },
  tabTitle: 'Реализованный проект «ЖК ЯНТАРНЫЙ»',
}
</script>

<template>
  <Breadcrumbs />
  <div class="company">
    <!--
      <h1 class="company__title main-title">{{ companyInfo.title }}</h1>

      <div class="company__inner">
        <img src="/imgs/company/123.jpg" alt="Фото компании" loading="lazy" decoding="async" />
         <div class="company__tab">
          <Tab :title="companyInfo.tabTitle" />
         </div>
      </div>
      -->
    <About :is-margin="false" />
    <div class="container">
      <div class="company__video">
        <div class="company__video-container">
          <p class="company__video-container-title">{{ companyInfo.video.title }}</p>
          <p class="company__video-container-text">{{ companyInfo.video.text }}</p>
        </div>
        <div
          class="company__video-wrapper"
          style="cursor: pointer"
          @click="openVideo"
          title="Открыть видео в новом окне"
        >
          <iframe
            :src="companyInfo.video.url"
            title="Видео о компании"
            frameborder="0"
            allow="clipboard-write; autoplay"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            style="pointer-events: none"
          ></iframe>
        </div>
      </div>
    </div>

    <Projects />

    <Appeal />
    <Planing />
    <Other :title="'Радость, которую мы уже подарили'"></Other>
    <History />
    <Default />
    <News></News>
    <Office />
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.company {
  &__title {
    margin-bottom: clamp(14px, vw(16px, $desktop), 16px);
  }
  &__inner {
    box-sizing: border-box;
    position: relative;
  }
  &__inner img {
    border-radius: 30px;
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;
    @media (min-width: $tab) {
      // Пустой медиазапрос
    }

    @media (min-width: $desk) {
      max-height: 730px;
      min-height: unset;
    }
  }
  &__tab {
    color: var(--color);
    position: absolute;
    // bottom: clamp(230px, vw(350px, $desktop), 375px);
    bottom: clamp(10px, vw(20px, $desktop), 20px);
    left: clamp(10px, vw(20px, $desktop), 20px);
    margin-right: 10px;
    @media (min-width: $tab) {
      margin-right: unset;
    }

    @media (min-width: $desk) {
    }
  }
  &__video {
    margin-top: clamp(20px, vw(40px, $desktop), 40px);
    display: flex;
    gap: clamp(19px, vw(20px, $desktop), 20px);
    align-items: center;
    background: var(--seryy);
    border-radius: clamp(50px, vw(70px, $desktop), 70px) 24px;
    padding: clamp(16px, vw(24px, $desktop), 24px);
    margin-left: auto;
    flex-direction: column;
    @media (min-width: $tab) {
      flex-direction: row;
    }
    @media (min-width: $desk) {
      max-width: clamp(660px, vw(900px, $desktop), 900px);
    }
  }
  &__video-container {
    padding: 0px clamp(20px, vw(30px, $desktop), 30px);
    flex: 1;
    order: 2;
    @media (min-width: $tab) {
      order: 1;
    }
    @media (min-width: $desk) {
      max-width: clamp(272px, vw(424px, $desktop), 424px);
    }
  }
  &__video-container-title {
    font-weight: 600;
    font-size: clamp(18px, vw(21px, $desktop), 21px);
    line-height: 136%;
    letter-spacing: 0em;
    color: var(--2);
    margin-bottom: clamp(11px, vw(12px, $desktop), 12px);
  }
  &__video-container-text {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--60);
  }
  &__video-wrapper {
    flex: 1;
    order: 1;
    width: 100%;
    @media (min-width: $tab) {
      order: 2;
    }
    @media (min-width: $desk) {
    }
  }
  &__video-wrapper iframe {
    border-radius: clamp(40px, vw(60px, $desktop), 60px) 16px;
    width: 100%;
    max-height: clamp(160px, vw(200px, $desktop), 200px);
    @media (min-width: $tab) {
    }
    @media (min-width: $desk) {
      max-width: clamp(272px, vw(424px, $desktop), 424px);
      min-height: clamp(160px, vw(200px, $desktop), 200px);
    }
  }
}
</style>
