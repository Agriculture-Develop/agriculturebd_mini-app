<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    enablePullDownRefresh: true, // 启用原生下拉刷新
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

    <!-- 显示筛选结果或全部数据 -->
    <view v-for="(item, index) in showList" :key="item.id">
      <Goods :product="item" />
    </view>

    <!-- 无搜索结果提示 -->
    <view v-if="hasSearched && showList.length === 0" class="empty-tips">没有找到相关商品</view>
  </view>
</template>

<script lang="ts" setup>
import Goods from './components/goods/index.vue'
import { ref } from 'vue'
import { useGoodStore } from '@/store'

const { safeAreaInsets } = uni.getSystemInfoSync()
const keyword = ref<string>('')
const hasSearched = ref(false) // 标记是否执行过搜索
const searchResult = ref<any[]>([]) // 存储搜索结果
const goodStore = useGoodStore()
// 商品数据
// const tagList = ref([
//   {
//     name: '',
//     amount: '',
//     price: '',
//   },
// ])
//获取tags
const getTagsList = () => {
  return goodStore.getTags()
}

const getGoodsList = () => {
  return goodStore.getGoods()
}
const combineList = computed(() => {
  return getTagsList().map((item, index) => ({
    ...item,
    ...getGoodsList()[index], // 合并相同索引的对象
  }))
})

// 显示的数据（未搜索时显示全部，搜索后显示结果）
const showList = computed(() => {
  return hasSearched.value ? searchResult.value : combineList.value
})

// 搜索处理函数（只在点击搜索按钮时触发）
const handleSearch = () => {
  hasSearched.value = true

  if (!keyword.value.trim()) {
    // 如果关键词为空，显示全部数据
    searchResult.value = combineList.value
  } else {
    // 执行筛选
    const lowerKeyword = keyword.value.toLowerCase()

    searchResult.value = combineList.value.filter((item) =>
      item.description.toLowerCase().includes(lowerKeyword),
    )
  }

  console.log('搜索关键词:', keyword.value)
  console.log('搜索结果:', searchResult.value)
}
//下拉刷新

onPullDownRefresh(() => {
  console.log('触发下拉刷新')

  // 模拟异步请求2
  setTimeout(() => {
    // 重置搜索状态
    hasSearched.value = false
    keyword.value = ''
    // 停止下拉刷新动画
    uni.stopPullDownRefresh()
    // 显示刷新成功提示
    uni.showToast({
      title: '刷新成功',
      icon: 'success',
    })
  }, 1000)
})
</script>

<style lang="scss" scoped>
/* 保持原有样式不变 */
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
