<template>
  <view class="goods p-3">
    <wd-message-box />
    <view @click="jumpDetailsPage(product.id)">
      <view class="title flex items-center gap-1">
        <wd-skeleton theme="avatar" :loading="false">
          <wd-img round :src="avatar(product.avatar_path)" :width="70" :height="70"></wd-img>
        </wd-skeleton>

        <view class="title_mes flex flex-col">
          <view class="name text-xl font-bold">{{ product.nickname }}</view>
          <view class="time text-gray-300 text-sm">{{ formatTime(product.created_at) }}</view>
        </view>
        <view class="name text-xl font-bold gap-x-5">
          <wd-tag round type="success" class="m-l-3">{{ product.role }}</wd-tag>
        </view>
        <view @click.stop="confirm">
          <wd-button
            round
            type="text"
            size="large"
            class="p-l-4"
            v-if="product.userid === userInfo.id && props.delete"
          >
            删除帖子
          </wd-button>
        </view>
      </view>
      <view class="content space-y-2 py-4 font-bold">
        <view>{{ product.title }}</view>
        <view class="flex gap-3">
          <wd-img
            class="goods-img"
            customClass="flex-shrink-0"
            customImage="rounded-2xl"
            :src="goodImg(product.cover_url)"
            :width="100"
            :height="100"
            mode="aspectFill"
          />
          <view class="tagContainer flex flex-col m-l-5 gap-y-2">
            <view class="content ellipsis-3 font-400">{{ product.content }}</view>
            <view class="flex gap-x-2">
              <wd-tag
                type="primary"
                round
                customClass=" !flex !justify-center !items-center !text-center"
              >
                {{ product.tag_name }}
              </wd-tag>
              <wd-tag
                type="primary"
                round
                customClass="!flex !justify-center !items-center !text-center"
              >
                {{ product.tag_price }}
              </wd-tag>
              <wd-tag
                type="primary"
                round
                customClass="!flex !justify-center !items-center !text-center"
              >
                {{ product.tag_weigh }}
              </wd-tag>
            </view>
          </view>
        </view>
        <view class="icon text-gray-300 text-xl grid grid-cols-3 justify-items-center gap-2">
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
import { deletePublicGoodId, getPublicGoodIdComment } from '@/service/app'

import { avatar, goodImg } from '@/utils/imges'
import { formatTime } from '@/utils/time'
import { useMessage } from 'wot-design-uni'
const message = useMessage()
const emits = defineEmits(['get-goods'])
function confirm() {
  message
    .confirm({
      msg: '是否删除帖子',
      title: '删除',
    })
    .then(() => {
      console.log('点击了确定按钮')
      deletePost()

      uni.redirectTo({ url: '/pages/mine/post/index' })
    })
    .catch(() => {
      console.log('点击了取消按钮')
      emits('get-goods')
    })
}
const commentTotal = ref(0)

onMounted(async () => {
  const id = props.product.id
  commentTotal.value = await getComment(id)
})
const userInfo = uni.getStorageSync('userInfo')
const deletePost = async () => {
  const res = await deletePublicGoodId({ params: { id: String(props.product.id) } })
  // console.log(res, 'delete')
  console.log('delete')
}
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
  delete?: boolean
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
:deep(.tags) {
  color: red;
  background-color: blue;
}
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
