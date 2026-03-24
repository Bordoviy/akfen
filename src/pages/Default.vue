<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
</script>

<template>
  <Breadcrumbs />
  <div class="default">
    <div class="container">
        <div class="default__wrapper">
             <a href="/files/Soglasie_na_obrabotku_fajlov_cookies AKFEN.pdf" target="_blank">Согласие на обработку файлов cookies АКФЕН</a>
             <a href="/files/Soglasie_na_obrabotku_personalnih_dannih_AKFEN.pdf" target="_blank">Согласие на обработку персональных данны АКФЕН</a>
             <a href="/files/Politika_v_otnoshenii_obrabotki_personalnih_dannih_AKFEN.pdf" target="_blank">Политика в отношении обработки персональных данных АКФЕН</a>
             <a href="/files/Polojenie_o_zaschite_personalnih_dannih_klientov_i_polzovatelei AKFEN.pdf" target="_blank">Положение о защите персональных данных клиентов и пользователей АКФЕН</a>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.default {
  &__wrapper{
    margin-top: clamp(30px, vw(40px, $desktop), 40px);
    display: flex;
    flex-direction: column;
    gap: 15px;

    a{
        text-decoration: underline;
        font-size: clamp(15px, vw(22px, $desktop), 22px);
        &:hover{
            text-decoration: none;
        }
    }
  }
  
}
</style>
