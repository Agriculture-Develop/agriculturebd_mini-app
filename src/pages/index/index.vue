<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view :style="{ marginTop: safeAreaInsets?.top + 'px' }" class="space-y-4">
    <view class="bg-green-100 h-15 center">农产品小城序</view>
    <view class="swiper">
      <wd-swiper :list="swiperList" autoplay v-model:current="current"></wd-swiper>
    </view>
    <view class="tab-container relative">
      <view class="absolute left-0 top-2 z-1">新闻动态</view>
      <wd-tabs v-model="tab" custom-class="tabs" color="green">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content h-50 bg-green-50 flex flex-col items-center justify-around">
              <view v-for="int in 4">
                <view @click="jumpDetailsPage">title仅此是最大的吐蕃</view>
              </view>
            </view>
          </wd-tab>
        </block>
      </wd-tabs>
    </view>
    <view v-for="(item, index) in goodsList">
      <Goods :product="goodsList[index]" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import Goods from '../goods/components/goods/index.vue'
const current = ref<number>(0)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
])
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
const tab = ref<number>(0)
defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//跳转对应的页面
const jumpDetailsPage = (id) => {
  uni.navigateTo({ url: `/pages/news/index` })
}
</script>

<style lang="scss" scoped>
:deep(.tabs) {
  .wd-tabs__nav-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    .wd-tabs__nav-item {
      // background-color: red;
    }
  }
}
</style>
