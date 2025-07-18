<template>
  <view class="goods p-3">
    <view @click="jumpDetailsPage(product.id)">
      <view class="title flex items-center gap-1">
        <wd-skeleton theme="avatar" :loading="false">
          <wd-img round :src="product.userImg" :width="70" :height="70"></wd-img>
        </wd-skeleton>
        <view class="title_mes flex items-center flex-col">
          <view class="name text-xl font-bold">{{ product.name }}</view>
          <view class="time text-gray-300 text-sm">{{ product.time }}</view>
        </view>
        <view class="name text-xl font-bold">
          <wd-tag round type="success" class="m-l-3">农户</wd-tag>
        </view>
      </view>
      <view class="content space-y-2 py-4">
        <view>{{ product.description }}</view>
        <view class="flex gap-3">
          <wd-img
            class="goods-img"
            :src="product.image"
            :width="100"
            :height="100"
            mode="aspectFill"
          />
          <view class="tagContainer flex-1">
            <wd-tag type="success" round class="m-2">{{ product.amount }}</wd-tag>
            <wd-tag type="success" round class="m-2">{{ product.tagName }}</wd-tag>
            <wd-tag type="success" round class="m-2">{{ product.price }}</wd-tag>
          </view>
        </view>
        <view
          @click.stop
          class="icon text-gray-300 text-xl grid grid-cols-3 justify-items-center gap-2"
        >
          <wd-badge modelValue="1" type="primary">
            <i class="i-ep-comment"></i>
          </wd-badge>
          <i class="i-ep-star" :class="{ active: isActive[0] }" @click="toggleIcon(0)"></i>
          <i class="i-uiw-like-o" :class="{ active: isActive[1] }" @click="toggleIcon(1)"></i>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { Itags, Igood } from '@/store/good'
type Product = Itags & Igood
const isActive = ref([false, false])

const props = defineProps<{
  product: Product // 必传
}>()

//跳转对应的页面
const jumpDetailsPage = (id) => {
  uni.navigateTo({ url: `/pages/goods/details/index` })
}
//切换icon
const toggleIcon = (index) => {
  isActive.value[index] = !isActive.value[index]
  console.log(index, isActive.value)
}
</script>

<style lang="scss" scoped>
.active {
  color: $uni-color-success;
}
</style>
