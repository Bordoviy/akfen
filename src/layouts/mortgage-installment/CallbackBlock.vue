<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Button from '@/components/Button.vue'

defineProps({
  isblue: { type: Boolean, default: false },
})

const name = ref('')

const noteChecked = ref(false)

const handleSubmit = () => {
  // здесь можно повесить отправку формы / запрос
  // console.log('callback form:', { name: name.value, phone: phone.value })
}
</script>

<template>
  <div class="m-callback mt-110" :class="{ 'm-callback--blue': isblue }">
    <div class="m-callback__inner">
      <div class="m-callback__info">
        <h2 class="m-callback__title">
          Задайте вопросы,<br />
          которые у вас остались
        </h2>
        <p class="m-callback__subtitle">
          Менеджер свяжется с вами, чтобы ответить на все <br />
          вопросы и дать рекомендации
        </p>
      </div>

      <form class="m-callback__form" @submit.prevent="handleSubmit">
        <div class="m-callback__fields">
          <div class="m-callback__field">
            <label class="m-callback__label" for="cb-name">Как вас зовут?</label>
            <input
              id="cb-name"
              v-model="name"
              type="text"
              class="m-callback__input"
              placeholder="Введите ваше имя"
            />
          </div>

          <div class="m-callback__field">
            <label class="m-callback__label" for="cb-phone">Ваш телефон</label>
            <input
              id="cb-phone"
              v-phone-mask
              type="tel"
              name="phone"
              class="m-callback__input"
              placeholder="+7 (___) ___-__-__"
            />
          </div>
        </div>

        <div class="m-callback__bottom">
          <button class="m-callback__submit" type="submit" :disabled="!noteChecked">
            Заказать консультацию
          </button>

          <div>
            <input type="checkbox" class="modal__note-checkbox" v-model="noteChecked" required="" />
            <span>
              Нажимая кнопку,
              <a href="#">вы соглашаетесь с условиями обработки персональных данных</a>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/index.scss';

.m-callback {
  margin: 0 auto;

  @media (min-width: $tab) {
    max-width: clamp(320px, vw(1400px, $desktop), 1880px);
  }
  @media (min-width: $desk) {
    //
  }
  &__inner {
    background: var(--seryy);
    border-radius: 24px;
    padding: clamp(24px, vw(36px, $desktop), 36px) clamp(20px, vw(40px, $desktop), 40px);
    display: flex;
    flex-direction: column;
    gap: clamp(20px, vw(30px, $desktop), 30px);

    @media (min-width: $desk) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__info {
    // max-width: 420px;
    flex: 1;
  }

  &__title {
    font-weight: 600;
    font-size: clamp(24px, vw(32px, $desktop), 32px);
    line-height: 121%;
    letter-spacing: -0.01em;
    color: var(--100);
    margin-bottom: clamp(8px, vw(10px, $desktop), 10px);
    text-align: center;

    @media (min-width: $desk) {
      text-align: left;
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--80);
    text-align: center;
    @media (min-width: $desk) {
      text-align: left;
    }
  }

  &__form {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: clamp(16px, vw(20px, $desktop), 20px);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: clamp(16px, vw(20px, $desktop), 20px);

    @media (min-width: $tab-inner) {
      flex-direction: row;
    }
  }

  &__field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(4px, vw(6px, $desktop), 6px);
  }

  &__label {
    font-weight: 400;
    font-size: clamp(13px, vw(14px, $desktop), 14px);
    line-height: 146%;
    color: var(--40);
  }

  &__input {
    width: 100%;
    height: clamp(44px, vw(52px, $desktop), 52px);
    padding: clamp(12px, vw(14px, $desktop), 14px) clamp(14px, vw(16px, $desktop), 16px);
    border-radius: 12px;
    border: 1px solid var(--obvodka);
    background: #fff;
    box-sizing: border-box;
    font-size: clamp(15px, vw(16px, $desktop), 16px);
    line-height: 146%;
    color: var(--100);

    &::placeholder {
      color: var(--40);
    }
  }

  &__bottom {
    display: grid;
    gap: clamp(16px, vw(20px, $desktop), 20px);
    align-items: center;
    grid-template-columns: 1fr;

    @media (min-width: $tab) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__submit {
    border: none;
    cursor: pointer;
    background: var(--1);
    border-radius: 16px;
    padding: clamp(12px, vw(14px, $desktop), 14px) clamp(28px, vw(36px, $desktop), 36px);
    font-weight: 600;
    font-size: clamp(15px, vw(17px, $desktop), 17px);
    line-height: 146%;
    color: var(--color);
    white-space: nowrap;
    transition: 0.2s;

    &:hover {
      background: #c81d19;
    }
  }

  &__note {
    // max-width: 260px;
    font-weight: 400;
    font-size: clamp(12px, vw(14px, $desktop), 14px);
    line-height: 146%;
    color: var(--60);
    text-align: center;

    @media (min-width: $tab) {
      text-align: left;
    }
  }
  &__bottom div {
    display: flex;
    align-items: flex-start;
    gap: 6px;
  }
  &__bottom div span {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: clamp(14px, vw(15px, $desktop), 15px);
    line-height: 146%;
    color: var(--color);
    opacity: 0.6;
  }

  &__bottom div span a {
    display: inline;
    text-decoration: underline;
    display: inline;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
  .modal__note-checkbox {
    margin-top: 3px;
  }
}

.m-callback--blue {
  .m-callback__inner {
    background: var(--2);
  }
  .m-callback__title {
    color: var(--color);
  }
  .m-callback__subtitle {
    color: var(--color);
    opacity: 0.8;
  }
}
</style>
