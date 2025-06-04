<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-navbar>
      <template #title>
        <view class="search-box">
          <wd-search v-model="keyword" hide-cancel />
        </view>
      </template>
    </wd-navbar>
    <view v-for="(item, index) in goodsList">
      <Goods :product="goodsList[index]" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import Goods from './components/goods/index.vue'
const { safeAreaInsets } = uni.getSystemInfoSync()
const keyword = ref<string>('搜索')
const value = ref<string>('')
const goodsList = ref([
  {
    id: 1,
    name: '美瞳',
    description: '用户的描述的美瞳',
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
    time: '2min前',
  },
  {
    id: 2,
    name: '手机壳',
    description: '用户的描述的手机壳',
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
    time: '5min前',
  },
  {
    id: 3,
    name: '耳机',
    description: '用户的描述的耳机',
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
    time: '10min前',
  },
])
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  :deep() {
    .wd-search {
      background: transparent !important;
      text-align: left;
      .uni-input-input {
        color: $uni-text-color !important;
      }
    }
  }
}
</style>
