<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="space-y-4">
    <wd-swiper :list="good?.data.files_url" v-model:current="current" class="p-5" />

    <view class="content w-95vw m-a space-y-4">
      <view class="title font-bold">{{ good.data.title }}</view>
      <view class="section leading-loose">
        {{ good.data.content }}
      </view>
      <view class="bottom flex px-2 items-center">
        <view class="flex-1">{{ formatTime(good.data.created_at) }}</view>
        <view class="flex gap-x-3 items-center">
          <view><i class="text-gray-300 i-uiw-heart-on"></i></view>
        </view>
      </view>
      <wd-divider></wd-divider>
      <view class="commentContainer space-y-5">
        <view>共{{ commentList?.data.total }}条评论</view>
        <view class="flex items-center">
          <!-- <wd-skeleton :row-col="[{ size: '70rpx', type: 'circle' }]" /> -->
          <wd-img
            :src="
              userStore.userInfo.avatar_path
                ? userStore.userInfo.avatar_path
                : '/static/images/default-avatar.png'
            "
            width="70rpx"
            height="70rpx"
            radius="50%"
          ></wd-img>
          <wd-search
            class="flex-1"
            hide-cancel
            placeholder-left
            v-model="inputValue"
            placeholder="'来发条评论吧\(^o^)/~'"
            custom-class="input"
          />
        </view>
        <wd-divider></wd-divider>
        <!-- 评论 -->
        <view
          class="publish flex items-center gap-x-4"
          v-for="item in commentList?.data.list"
          :key="item.id"
        >
          <wd-img :src="item.avatar" width="90rpx" height="90rpx" radius="50%"></wd-img>
          <view>
            <view class="name text-sm">{{ item.publisher_name }}</view>
            <view class="flex items-center gap-x-2">
              <view class="comment w-50vw min-w-20vw text-sm">{{ item.comment }}</view>
              <view class="time self-start text-xs text-gray-400">
                {{ relTime(item.created_at) }}
              </view>
            </view>
          </view>
          <view><i class="text-gray-300 i-uiw-heart-on"></i></view>
        </view>
      </view>
    </view>
    <view class="footer-space h-40rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { getPublicGoodIdCommentQueryOptions, getPublicGoodIdQueryOptions } from '@/service/app'
import { useQuery } from '@tanstack/vue-query'
import { formatTime, relTime } from '@/utils/time'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const current = ref<number>(0)

const swiperList = ref(['/static/images/lingmeng.jpg', '/static/images/lingmeng.jpg'])
const inputValue = ref('')
const itemId = ref('')
onLoad((options) => {
  itemId.value = options.id // 从 options 中提取 id
  console.log(itemId.value, 'itemId')
})
const { data: commentList } = useQuery(
  getPublicGoodIdCommentQueryOptions({
    params: { id: itemId.value },
  }),
)
const { data: good } = useQuery(
  getPublicGoodIdQueryOptions({
    params: { id: itemId.value },
  }),
)
</script>

<style lang="scss" scoped>
:deep() {
  .input {
    .wd-icon {
      &::before {
        display: none !important;
      }
    }
  }
}
</style>
