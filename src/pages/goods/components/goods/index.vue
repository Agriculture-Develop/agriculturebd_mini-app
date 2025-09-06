<template>
  <view class="goods p-3">
    <view @click="jumpDetailsPage(product.id)">
      <view class="title flex items-center gap-1">
        <wd-skeleton theme="avatar" :loading="false">
          <wd-img round :src="avatar(product.avatar_path)" :width="70" :height="70"></wd-img>
        </wd-skeleton>
        <view class="title_mes flex flex-col">
          <view class="name text-xl font-bold">{{ product.nickname }}</view>
          <view class="time text-gray-300 text-sm">{{ formatTime(product.created_at) }}</view>
        </view>
        <view class="name text-xl font-bold">
          <wd-tag round type="success" class="m-l-3">{{ product.role }}</wd-tag>
        </view>
      </view>
      <view class="content space-y-2 py-4">
        <view>{{ product.title }}</view>
        <view class="flex gap-3">
          <wd-img
            class="goods-img"
            :src="goodImg(product.cover_url)"
            :width="100"
            :height="100"
            mode="aspectFill"
          />
          <view class="tagContainer flex-1">
            <wd-tag type="success" round class="m-2">{{ product.tag_name }}</wd-tag>
            <wd-tag type="success" round class="m-2">{{ product.tag_price }}</wd-tag>
            <wd-tag type="success" round class="m-2">{{ product.tag_weigh }}</wd-tag>
          </view>
        </view>
        <view
          @click.stop
          class="icon text-gray-300 text-xl grid grid-cols-3 justify-items-center gap-2"
        >
          <wd-badge :modelValue="commentTotal" type="primary">
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
import { getPublicGoodIdComment } from '@/service/app'
import { avatar, goodImg } from '@/utils/imges'
import { formatTime } from '@/utils/time'
const commentTotal = ref(0)

onMounted(async () => {
  const id = props.product.id
  commentTotal.value = await getComment(id)
})
const getComment = async (id) => {
  const res = await getPublicGoodIdComment({ params: { id: id } })
  console.log(res.data.total)
  return res.data.total
}
type Product = {
  id: number
  userid: number
  created_at: string
  title: string
  content: string
  tag_name: string
  tag_weigh: string
  tag_price: string
  cover_url: string
  like: string
  nickname: string
  avatar_path: string
  role: string
}
const isActive = ref([false, false])

const props = defineProps<{
  product: Product // 必传
}>()

//跳转对应的页面
const jumpDetailsPage = (id) => {
  uni.navigateTo({ url: `/pages/goods/details/index?id=${id}` })
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
