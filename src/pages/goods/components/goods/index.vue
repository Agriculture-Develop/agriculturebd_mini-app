<template>
  <view class="goods">
    <view @click="jumpDetailsPage(product.id)">
      <view class="title flex items-center gap-1">
        <wd-skeleton theme="avatar" />
        <view class="title_mes flex items-center flex-col">
          <view class="name text-xl font-bold">{{ product.name }}</view>
          <view class="time text-gray-300 text-sm">{{ product.time }}</view>
        </view>
      </view>
      <view class="content space-y-2 py-4">
        <view>{{ product.description }}</view>
        <view>
          <wd-img
            class="goods-img"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            :width="100"
            :height="100"
            mode="aspectFill"
          />
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
const isActive = ref([false, false])
interface Product {
  id: number
  name: string
  description: string
  image: string
  time: string
}

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
