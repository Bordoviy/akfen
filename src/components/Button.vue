<script setup>
defineProps({
  // href: {
  //   type: String,
  //   required: true,
  // },
  none: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <a :href="href" :class="['btn btn-default', { 'btn-none': none }]">
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
@import '../assets/styles/index';

.btn-default {
  background: var(--1);
  border-radius: 16px;
  padding: clamp(12px, vw(14.2px, $desktop), 14.2px) clamp(20px, vw(28px, $desktop), 28px);
  font-weight: 600;
  font-size: clamp(15px, vw(17px, $desktop), 17px);
  line-height: 146%;
  letter-spacing: 0em;
  color: var(--color);
  border: 1px solid transparent;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
}
.btn-default:hover {
  background: #fff;
  color: #000;
  border: 1px solid #fff;
}
.btn-none {
  background-color: transparent;
  border: 1px solid var(--100);
  color: var(--100);
  cursor: pointer;
}
.btn-none:hover {
  background: var(--1);
  border: 1px solid transparent;
  color: var(--color);
}
.m-variations .btn-none {
  border-radius: 8px;
  padding: clamp(12px, vw(14px, $desktop), 14px) clamp(20px, vw(20px, $desktop), 20px);
}
</style>
