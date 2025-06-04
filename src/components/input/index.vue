<script setup lang="ts">
const value = ref<string>('')
</script>
<template>
  <wd-input
    custom-class="input"
    type="text"
    v-model="value"
    prefix-icon="search"
    placeholder="请输入..."
  />
</template>
<style lang="scss">
:deep(.input) {
  width: 80% !important;
  border-radius: 9999px !important;
  background-color: #e5e7eb !important;
  .wd-input__body {
    margin-left: 20rpx;
  }
  .wd-icon {
    background-color: transparent !important;
  }
  &::after {
    background-color: var(--wot-input-not-empty-border-color, transparent) !important;
  }
}
</style>
