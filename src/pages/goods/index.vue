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
      <template #title>
        <view class="search-box">
          <wd-search v-model="keyword" hide-cancel @search="handleSearch" />
        </view>
      </template>
    </wd-navbar>

    <!-- 根据搜索结果或全部数据渲染 -->
    <view v-for="(item, index) in filteredList" :key="item.id">
      <Goods :product="item" />
    </view>

    <!-- 无搜索结果提示 -->
    <view v-if="keyword && filteredList.length === 0" class="empty-tips">没有找到相关商品</view>
  </view>
</template>

<script lang="ts" setup>
import Goods from './components/goods/index.vue'
import { ref, computed } from 'vue'

const { safeAreaInsets } = uni.getSystemInfoSync()
const keyword = ref<string>('')

// 商品数据
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

// 计算属性实现过滤
const filteredList = computed(() => {
  if (!keyword.value.trim()) return goodsList.value

  const lowerKeyword = keyword.value.toLowerCase()
  return goodsList.value.filter((item) => item.description.toLowerCase().includes(lowerKeyword))
})

// 搜索处理函数
const handleSearch = () => {
  console.log('搜索关键词:', keyword.value)
  console.log('搜索结果:', filteredList.value)
}
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;

  :deep() {
    .wd-search {
      background: transparent !important;
      text-align: left;
      .uni-input-input {
        color: $uni-text-color !important;
      }
    }
  }
}

.empty-tips {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
