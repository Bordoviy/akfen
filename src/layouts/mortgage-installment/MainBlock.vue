<script setup>
import Button from '@/components/Button.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import Mortgage from '@/pages/Mortgage.vue'
import Modal from '@/components/Modal.vue'

const isModal = ref(false)

function toggleModal() {
  isModal.value = !isModal.value
}

// import { onMounted, nextTick } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  btn: {
    type: String,
    required: true,
  },
})

// const Maintance = [
//   {
//     title: 'Ипотека - возможность исполнить мечту',
//     description:
//       'Уникальные ипотечные программы и специальные условия от ведущих банков. Просто заполните анкету и получите одобрение. Всего один шаг, и квартира будет ваша.',
//     img: '/imgs/rc/27.jpg',
//     items: [
//       {
//         title: '98% одобрений',
//         text: 'высокая вероятность получить ипотеку',
//       },
//       {
//         title: '37 партнёров',
//         text: 'подберём лучшие условия для вас в банках',
//       },
//     ],
//   },
// ]

// const route = useRoute()
// const project = computed(() => allProjects.find((p) => p.id === route.params.id))
</script>

<template>
  <div class="m-block">
    <div class="m-block__inner">
      <div class="m-block__main">
        <div class="m-block__main-top">
          <h1 class="m-block__main-title">{{ title }}</h1>
          <p class="m-block__main-descr">{{ description }}</p>
          <div class="m-block__main-btns">
            <Button :href="'#mortgage'">{{ btn }}</Button>
            <!--
<Button :none="true" @click.prevent="toggleModal">
  Получить консультацию
</Button>
-->
            <Modal v-if="isModal" @close="toggleModal"></Modal>
          </div>
        </div>
        <div class="m-block__main-split">
          <div class="m-block__main-item" v-for="(item, i) in items" :key="i">
            <p class="m-block__main-item-title">{{ item.title }}</p>
            <p class="m-block__main-item-text">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="m-block__wrapper">
        <img :src="img" alt="" class="m-block__img" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/styles/index.scss';

.m-block {
  width: 100%;
  margin: 0 auto;

  @media (min-width: $tab) {
    max-width: clamp(320px, vw(1400px, $desktop), 1880px);
  }

  @media (min-width: $desk) {
    //
  }

  & .container {
    padding: 0;
  }

  &__inner {
    border-radius: 30px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background: linear-gradient(196deg, #eef1ff 0%, #5a7ce4 100%);

    @media (min-width: $tab) {}

    @media (min-width: $desk) {
      flex-direction: row;
      background: linear-gradient(88deg, #eef1ff 0%, #5a7ce4 100%);
    }
  }

  &__main {
    max-width: 670px;
    padding: clamp(30px, vw(60px, $desktop), 60px);
    flex: 1;
    margin: 0 auto;

    @media (min-width: $tab) {}

    @media (min-width: $desk) {
      margin: 0;
      padding: clamp(30px, vw(60px, $desktop), 60px) 0 clamp(30px, vw(60px, $desktop), 60px) clamp(30px, vw(60px, $desktop), 60px);
    }
  }

  &__wrapper {
    flex: 1;
    // @media (min-width: $tab) {
    // }
    // @media (min-width: $desk) {
    //   flex: 1.8;
    // }
  }

  &__main-top {
    display: flex;
    gap: clamp(16px, vw(24px, $desktop), 24px);
    flex-direction: column;
    margin-bottom: clamp(30px, vw(80px, $desktop), 80px);
  }

  &__main-title {
    font-weight: 600;
    font-size: clamp(30px, vw(42px, $desktop), 42px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
    text-align: center;

    @media (min-width: $desk) {
      text-align: left;
    }
  }

  &__main-descr {
    font-weight: 400;
    font-size: clamp(17px, vw(20px, $desktop), 20px);
    line-height: 150%;
    color: var(--80);
    text-align: center;

    @media (min-width: $desk) {
      text-align: left;
    }
  }

  &__main-btns {
    display: flex;
    justify-content: space-between;
    gap: clamp(12px, vw(16px, $desktop), 16px);
    flex-direction: column;

    @media (min-width: $tab) {
      flex-direction: row;
    }
  }

  &__main-btns .btn:first-child:hover {
    background-color: transparent;
    border: 1px solid #000;
  
  }

  &__main-btns .btn {
    max-width: 300px;
    @media (min-width: $tab) {
      width: 100%;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 278px;

    // @media (min-width: $tab) {
    //   max-height: 332px;
    // }
    @media (min-width: $desk) {
      object-position: left;
      max-height: 100%;
      min-height: clamp(332px, vw(616px, $desktop), 616px);
      max-height: 718px;
    }
  }

  &__main-split {
    display: flex;
    gap: clamp(18px, vw(20px, $desktop), 20px);
    justify-content: space-between;
    flex-direction: column;

    @media (min-width: $mob) {
      flex-direction: row;
    }
  }

  &__main-item {
    width: 100%;

    @media (min-width: $tab) {}

    @media (min-width: $desk) {
      max-width: clamp(150px, vw(265px, $desktop), 265px);
    }
  }

  &__main-item-title {
    font-weight: 400;
    font-size: clamp(26px, vw(30px, $desktop), 30px);
    line-height: 117%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(4px, vw(4px, $desktop), 4px);
    text-align: center;

    @media (min-width: $desk) {
      text-align: left;
    }
  }

  &__main-item-text {
    font-weight: 400;
    font-size: clamp(16px, vw(18px, $desktop), 18px);
    line-height: 146%;
    color: var(--80);
    text-align: center;

    @media (min-width: $desk) {
      text-align: left;
    }
  }
}
</style>
