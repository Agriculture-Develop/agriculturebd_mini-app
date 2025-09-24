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
      <template #left>
        <wd-icon name="arrow-left" @click="handleBack" />
      </template>
      <template #title>新闻详情</template>
    </wd-navbar>

    <view class="p-4">
      <!-- 文章头部 -->
      <view class="mb-6">
        <view class="text-xl font-bold mb-3">{{ data?.title }}</view>
        <view class="flex items-center justify-start gap-3 text-gray-500 text-sm">
          <text class="whitespace-nowrap">{{ data?.source }}</text>
          <text class="whitespace-nowrap">{{ data?.created_at }}</text>
        </view>
      </view>
      <!-- 标签 -->
      <view class="mb-6 flex flex-wrap gap-2">
        <wd-tag
          v-for="tag in data?.keyword"
          :key="tag"
          type="success"
          round
          custom-class=" !h-4 !text-sm !flex !items-center !justify-center"
        >
          {{ tag }}
        </wd-tag>
      </view>
      <!-- 图片展示 -->
      <view class="flex flex-wrap gap-2 justify-center">
        <view
          v-for="(image, index) in data?.files_url"
          :key="index"
          class="flex-1 basis-[30%] max-w-[30%] aspect-square justify-center"
        >
          <image
            :src="newsImg(image)"
            class="w-full h-full object-cover rounded-lg"
            mode="aspectFill"
          />
        </view>
      </view>

      <!-- 文章内容 -->
      <view class="mb-6">
        <!-- <text >{{ data?.content }}</text> -->
        <rich-text :nodes="data?.content" class="text-gray-700 leading-relaxed">
          {{ data?.content }}
        </rich-text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAdminNewsId } from '@/service/app'
import { onLoad } from '@dcloudio/uni-app'
import { newsImg } from '@/utils/imges'
const { safeAreaInsets } = uni.getSystemInfoSync()

const itemId = ref('')
onLoad((options) => {
  itemId.value = options.id // 从 options 中提取 id
  console.log(itemId.value, 'itemId')
  run()
})
const { loading, error, data, run } = useRequest(
  () => getAdminNewsId({ params: { id: itemId.value } }),
  {
    immediate: false,
  },
)

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:deep(.wd-textarea) {
  --wot-textarea-padding: 0;
}
</style>
