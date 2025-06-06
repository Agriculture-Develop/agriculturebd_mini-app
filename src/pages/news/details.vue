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
      <template #title>
        <view class="text-lg font-bold">新闻详情</view>
      </template>
    </wd-navbar>

    <view class="p-4">
      <!-- 文章头部 -->
      <view class="mb-6">
        <view class="text-xl font-bold mb-3">{{ news.title }}</view>
        <view class="flex items-center gap-3 text-gray-500 text-sm">
          <text>{{ news.author }}</text>
          <text>{{ news.date }}</text>
          <text>{{ news.views }} 阅读</text>
        </view>
      </view>

      <!-- 文章内容 -->
      <view class="mb-6">
        <text class="text-gray-700 leading-relaxed">{{ news.content }}</text>
      </view>

      <!-- 图片展示 -->
      <view class="mb-6">
        <view class="grid grid-cols-3 gap-2">
          <view v-for="(image, index) in news.images" :key="index" class="aspect-square">
            <image
              :src="image.url"
              :alt="image.caption"
              class="w-full h-full object-cover rounded-lg"
              mode="aspectFill"
            />
          </view>
        </view>
      </view>

      <!-- 标签 -->
      <view class="mb-6 flex flex-wrap gap-2">
        <wd-tag v-for="tag in news.tags" :key="tag" type="success" size="small">
          {{ tag }}
        </wd-tag>
      </view>

      <!-- 互动区域 -->
      <view class="mb-6 flex items-center gap-4">
        <wd-button :type="isLiked ? 'primary' : 'default'" size="small" @click="handleLike">
          <wd-icon :name="isLiked ? 'like-fill' : 'like'" class="mr-1" />
          {{ isLiked ? '已点赞' : '点赞' }} ({{ news.likes }})
        </wd-button>
        <wd-button size="small">
          <wd-icon name="share" class="mr-1" />
          分享
        </wd-button>
      </view>

      <!-- 评论区 -->
      <view class="mt-8">
        <view class="text-lg font-bold mb-4">评论区</view>

        <!-- 评论输入框 -->
        <view class="mb-6">
          <wd-textarea v-model="commentText" placeholder="写下你的评论..." :rows="3" />
          <view class="mt-2 flex justify-end">
            <wd-button type="primary" size="small" @click="handleComment">发表评论</wd-button>
          </view>
        </view>

        <!-- 评论列表 -->
        <view class="space-y-4">
          <view v-for="comment in comments" :key="comment.id" class="bg-gray-50 rounded-lg p-4">
            <view class="flex justify-between items-start mb-2">
              <text class="font-medium">{{ comment.user }}</text>
              <text class="text-gray-500 text-xs">{{ comment.time }}</text>
            </view>
            <text class="text-gray-700">{{ comment.content }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const { safeAreaInsets } = uni.getSystemInfoSync()

const news = ref({
  title: '茂名荔枝产业迎来丰收季，预计产量创新高',
  date: '2024-03-20',
  author: '茂名日报记者 李明',
  views: 1250,
  likes: 328,
  content: `茂名市荔枝种植面积达100万亩，今年预计产量将突破50万吨，创历史新高。当地政府积极推动荔枝产业升级，助力农民增收。通过引进新品种、推广新技术，茂名荔枝品质不断提升，市场竞争力显著增强。

在茂名市高州市根子镇，荔枝种植户张大叔告诉记者："今年荔枝长势特别好，预计产量比去年增加30%左右。这要归功于政府推广的新品种和新技术。"

据了解，茂名市近年来大力推广"妃子笑"、"白糖罂"等优质荔枝品种，并引入智能灌溉、无人机植保等现代化农业技术。同时，通过建立标准化种植基地，确保荔枝品质的稳定性。`,
  images: [
    {
      url: '/static/images/lingmeng.jpg',
      caption: '茂名荔枝种植基地',
    },
    {
      url: '/static/images/lingmeng.jpg',

      caption: '荔枝丰收场景',
    },
    {
      url: '/static/images/lingmeng.jpg',

      caption: '荔枝交易市场',
    },
  ],
  tags: ['产业动态', '荔枝产业', '农业科技', '乡村振兴'],
})

const isLiked = ref(false)
const commentText = ref('')
const comments = ref([
  {
    id: 1,
    user: '农民老王',
    content: '今年荔枝确实长得好，希望价格也能保持稳定。',
    time: '2024-03-20 10:30',
  },
  {
    id: 2,
    user: '农业专家',
    content: '茂名的荔枝产业升级做得很好，值得其他地区学习。',
    time: '2024-03-20 11:15',
  },
])

const handleLike = () => {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    news.value.likes++
    uni.showToast({
      title: '点赞成功',
      icon: 'success',
    })
  } else {
    news.value.likes--
    uni.showToast({
      title: '取消点赞',
      icon: 'none',
    })
  }
}

const handleComment = () => {
  if (!commentText.value.trim()) {
    uni.showToast({
      title: '请输入评论内容',
      icon: 'none',
    })
    return
  }

  comments.value.unshift({
    id: comments.value.length + 1,
    user: '游客',
    content: commentText.value,
    time: new Date().toLocaleString(),
  })

  commentText.value = ''
  uni.showToast({
    title: '评论成功',
    icon: 'success',
  })
}

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:deep(.wd-textarea) {
  --wot-textarea-padding: 0;
}
</style>
