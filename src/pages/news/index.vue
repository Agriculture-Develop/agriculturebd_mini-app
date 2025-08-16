<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    layout: 'default',
  },
}
</route>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { getAdminNewsListQueryOptions } from '@/service/app'
import { useQuery } from '@tanstack/vue-query'

// 使用相对路径导入图片
const defaultImage = '/static/images/lingmeng.jpg'

interface SelectEvent {
  value: string
  selectedItems: any[]
}

const { safeAreaInsets } = uni.getSystemInfoSync()
// const { loading, error, data, run } = useRequest(
//   () => getAdminNewsList({ params: { author: 'admin' } }),
//   {
//     immediate: true,
//   },
// )
const { data: newsList } = useQuery(getAdminNewsListQueryOptions({ params: { author: '' } }))
// 修改分类数据结构为 select-picker 需要的格式

const categoryColumns = [
  { value: '全部', label: '全部' },
  { value: '产业动态', label: '产业动态' },
  { value: '科技创新', label: '科技创新' },
  { value: '电商发展', label: '电商发展' },
  { value: '品牌建设', label: '品牌建设' },
  { value: '政策法规', label: '政策法规' },
]

const currentPage = ref(1)
const pageSize = ref(6)
const searchKeyword = ref('')
const selectedCategory = ref('全部')

const filteredNews = computed(() => {
  return newsList.value?.data?.list.filter((news) => {
    const matchKeyword = news.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    news.content.toLowerCase().includes(searchKeyword.value.toLowerCase())
    const matchCategory =
      selectedCategory.value === '全部' || news.category === selectedCategory.value
    return matchKeyword && matchCategory
  })
})
//跳转回去
function handleClickLeft() {
  uni.navigateBack()
}
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredNews.value?.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value?.length / pageSize.value)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleSearch = () => {
  currentPage.value = 1
  uni.showToast({
    title: '搜索完成',
    icon: 'success',
  })
}

const handleCategoryChange = (event: SelectEvent) => {
  selectedCategory.value = event.value
  currentPage.value = 1
  uni.showToast({
    title: `已选择：${event.value}`,
    icon: 'none',
  })
}

const handleDetailsClick = (id: string) => {
  uni.navigateTo({
    url: `/pages/news/details?id=${id}`,
  })
}
</script>

<template>
  <view :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-navbar left-arrow @click-left="handleClickLeft">
      <template #title>茂名农产品新闻</template>
    </wd-navbar>
    <!-- 搜索和筛选区域 -->
    <view class="p-2 bg-white">
      <view class="flex gap-2">
        <wd-search v-model="searchKeyword" placeholder="搜索新闻..." class="flex-1" />
        <wd-select-picker
          v-model="selectedCategory"
          :columns="categoryColumns"
          class="w-32"
          @confirm="handleCategoryChange"
          type="radio"
        />
      </view>
    </view>

    <!-- 新闻列表 -->
    <view class="p-4">
      <view
        v-for="news in paginatedNews"
        :key="news.id"
        class="mb-2 bg-white rounded-lg overflow-hidden shadow-sm"
      >
        <view class="" @click="handleDetailsClick(news.id.toString())">
          <view class="flex gap-1 items-center">
            <image
              :src="news.cover_url"
              class="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              mode="aspectFill"
            />
            <view class="flex-1 text-ellipsis whitespace-nowrap overflow-hidden">
              <view
                class="text-base font-medium mb-1 text-ellipsis whitespace-nowrap overflow-hidden w-full"
              >
                {{ news.title }}
              </view>
              <view class="text-gray-500 w-full text-xs flex gap-3">
                {{ news.created_at }}
                <wd-tag type="primary" plain custom-class=" overflow-hidden">
                  {{ news.category }}
                </wd-tag>
              </view>

              <view
                class="text-gray-600 text-sm mt-1 text-ellipsis line-clamp-3 overflow-hidden w-50"
              >
                {{ news.content }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 分页 -->
    <view class="p-2 flex justify-center">
      <wd-pagination
        v-model="currentPage"
        :total="filteredNews?.length"
        :page-size="pageSize"
        @change="handlePageChange"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-search) {
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  background: transparent !important;
}
</style>
