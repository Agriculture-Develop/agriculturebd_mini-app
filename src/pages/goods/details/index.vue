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
    <wd-swiper :list="swiperList" v-model:current="current" class="p-5" />
    <view class="content w-95vw m-a space-y-4">
      <view class="title font-bold">标题</view>
      <view class="section leading-loose">
        段落段落 段落段落 段落段落 段落段落 段落段落 段落段落
      </view>
      <view class="bottom flex px-2 items-center">
        <view class="flex-1">20min</view>
        <view class="flex gap-x-3 items-center">
          <view><i class="text-gray-300 i-uiw-heart-on"></i></view>
        </view>
      </view>
      <wd-divider></wd-divider>
      <view class="commentContainer space-y-5">
        <view>共一条评论</view>
        <view class="flex items-center">
          <wd-skeleton :row-col="[{ size: '70rpx', type: 'circle' }]" />
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

        <view class="publish flex items-center gap-x-4" v-for="item in 6">
          <wd-skeleton :row-col="[{ size: '90rpx', type: 'circle' }]" class="self-start" />
          <view>
            <view class="name text-sm">微信用户</view>
            <view class="flex items-center gap-x-2">
              <view class="comment w-50vw min-w-20vw text-sm">用户的评论</view>
              <view class="time self-start text-xs text-gray-400">11min前</view>
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
const current = ref<number>(0)

const swiperList = ref(['/static/images/lingmeng.jpg', '/static/images/lingmeng.jpg'])
const inputValue = ref('')
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
