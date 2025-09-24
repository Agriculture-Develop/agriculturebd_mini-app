<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '我的发帖',
  },
}
</route>

<template>
  <view class="">
    <goodContainer ref="good"></goodContainer>
  </view>
</template>

<script lang="ts" setup>
import GoodContainer from '@/pages/goods/components/goods/goodContainer.vue'
const good = ref()
onMounted(() => {
  good.value?.queryList(1, 1000, uni.getStorageSync('userInfo').id)
})
onShow(() => {
  good.value?.queryList(1, 1000, uni.getStorageSync('userInfo').id)
})
</script>

<style lang="scss" scoped>
//
</style>
