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

      <!-- 文章内容 -->
      <view class="mb-6">
        <!-- <text >{{ data?.content }}</text> -->
        <rich-text :nodes="data?.content" class="text-gray-700 leading-relaxed">
          {{ data?.content }}
        </rich-text>
      </view>

      <!-- 图片展示 -->
      <view class="mb-6">
        <view class="grid grid-cols-3 gap-2">
          <view v-for="(image, index) in data?.files_url" :key="index" class="aspect-square">
            <image
              :src="newsImg(image)"
              class="w-full h-full object-cover rounded-lg"
              mode="aspectFill"
            />
          </view>
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
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAdminNewsId } from '@/service/app'
import { onLoad } from '@dcloudio/uni-app'
import { newsImg } from '@/utils/imges'
const { safeAreaInsets } = uni.getSystemInfoSync()

// const news = ref({
//   title: '茂名荔枝产业迎来丰收季，预计产量创新高',
//   date: '2024-03-20',
//   author: '茂名日报记者 李明',
//   views: 1250,
//   likes: 328,
//   content: `茂名市荔枝种植面积达100万亩，今年预计产量将突破50万吨，创历史新高。当地政府积极推动荔枝产业升级，助力农民增收。通过引进新品种、推广新技术，茂名荔枝品质不断提升，市场竞争力显著增强。

// 在茂名市高州市根子镇，荔枝种植户张大叔告诉记者："今年荔枝长势特别好，预计产量比去年增加30%左右。这要归功于政府推广的新品种和新技术。"

// 据了解，茂名市近年来大力推广"妃子笑"、"白糖罂"等优质荔枝品种，并引入智能灌溉、无人机植保等现代化农业技术。同时，通过建立标准化种植基地，确保荔枝品质的稳定性。`,
//   images: [
//     {
//       url: '/static/images/lingmeng.jpg',
//       caption: '茂名荔枝种植基地',
//     },
//     {
//       url: '/static/images/lingmeng.jpg',

//       caption: '荔枝丰收场景',
//     },
//     {
//       url: '/static/images/lingmeng.jpg',

//       caption: '荔枝交易市场',
//     },
//   ],
//   tags: ['产业动态', '荔枝产业', '农业科技', '乡村振兴'],
// })
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
