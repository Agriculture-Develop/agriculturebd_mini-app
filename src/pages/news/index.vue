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
import { useRouter } from 'vue-router'

// 使用相对路径导入图片
const defaultImage = '/static/images/lingmeng.jpg'

interface NewsItem {
  id: number
  title: string
  date: string
  content: string
  imageUrl: string
  category: string
  views: number
}

interface SelectEvent {
  value: string
  selectedItems: any[]
}

const { safeAreaInsets } = uni.getSystemInfoSync()
const router = useRouter()

// 修改分类数据结构为 select-picker 需要的格式
const categoryColumns = [
  { value: '全部', label: '全部' },
  { value: '产业动态', label: '产业动态' },
  { value: '科技创新', label: '科技创新' },
  { value: '电商发展', label: '电商发展' },
  { value: '品牌建设', label: '品牌建设' },
]

const newsList = ref<NewsItem[]>([
  {
    id: 1,
    title: '茂名荔枝产业迎来丰收季，预计产量创新高',
    date: '2024-03-20',
    content:
      '茂名市荔枝种植面积达100万亩，今年预计产量将突破50万吨，创历史新高。当地政府积极推动荔枝产业升级，助力农民增收。通过引进新品种、推广新技术，茂名荔枝品质不断提升，市场竞争力显著增强。',
    imageUrl: defaultImage,
    category: '产业动态',
    views: 1250,
  },
  {
    id: 2,
    title: '茂名香蕉产业转型升级，打造智慧农业示范区',
    date: '2024-03-18',
    content:
      '茂名市启动香蕉产业智慧化改造项目，引入物联网技术，实现精准种植和智能管理，提升香蕉品质和产量。项目总投资达5000万元，预计带动周边农户增收30%以上。',
    imageUrl: defaultImage,
    category: '科技创新',
    views: 980,
  },
  {
    id: 3,
    title: '茂名农产品电商平台正式上线，助力农产品销售',
    date: '2024-03-15',
    content:
      '茂名市农产品电商平台正式运营，整合全市优质农产品资源，打通线上线下销售渠道，为农民提供便捷的销售平台。平台上线首月交易额突破1000万元，带动5000户农户增收。',
    imageUrl: defaultImage,
    category: '电商发展',
    views: 1560,
  },
  {
    id: 4,
    title: '茂名举办首届农产品品牌节，展示特色农产品',
    date: '2024-03-10',
    content:
      '茂名市举办首届农产品品牌节，集中展示荔枝、香蕉、龙眼等特色农产品。活动期间签订产销合作协议20余份，意向金额达2亿元。',
    imageUrl: defaultImage,
    category: '品牌建设',
    views: 890,
  },
  {
    id: 5,
    title: '茂名举办首届农产品品牌节，展示特色农产品',
    date: '2024-03-10',
    content:
      '茂名市举办首届农产品品牌节，集中展示荔枝、香蕉、龙眼等特色农产品。活动期间签订产销合作协议20余份，意向金额达2亿元。',
    imageUrl: defaultImage,
    category: '品牌建设',
    views: 890,
  },
  {
    id: 6,
    title: '茂名举办首届农产品品牌节，展示特色农产品',
    date: '2024-03-10',
    content:
      '茂名市举办首届农产品品牌节，集中展示荔枝、香蕉、龙眼等特色农产品。活动期间签订产销合作协议20余份，意向金额达2亿元。',
    imageUrl: defaultImage,
    category: '品牌建设',
    views: 890,
  },
])

const currentPage = ref(1)
const pageSize = ref(5)
const searchKeyword = ref('')
const selectedCategory = ref('全部')

const filteredNews = computed(() => {
  return newsList.value.filter((news) => {
    const matchKeyword =
      news.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
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
  return filteredNews.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / pageSize.value)
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

const handleDetialClick = (id: string) => {
  uni.navigateTo({
    url: `/pages/news/details?id=${id}`,
  })
}
</script>

<template>
  <view :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-navbar left-arrow @click-left="handleClickLeft">
      <template #title>
        <view class="text-lg font-bold">茂名农产品新闻</view>
      </template>
    </wd-navbar>

    <!-- 搜索和筛选区域 -->
    <view class="p-4 bg-white">
      <view class="flex gap-2 mb-4">
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
        class="mb-4 bg-white rounded-lg overflow-hidden shadow-sm"
      >
        <view class="p-4" @click="handleDetialClick(news.id.toString())">
          <view class="flex gap-4">
            <image
              :src="news.imageUrl"
              class="w-24 h-24 rounded-lg object-cover"
              mode="aspectFill"
            />
            <view class="flex-1">
              <view class="flex items-center gap-2 mb-2">
                <wd-tag type="success" size="small">{{ news.category }}</wd-tag>
                <text class="text-gray-500 text-xs">{{ news.views }} 阅读</text>
              </view>
              <view class="text-base font-medium mb-1 line-clamp-2">{{ news.title }}</view>
              <view class="text-gray-500 text-xs">{{ news.date }}</view>
              <view class="text-gray-600 text-sm mt-1 line-clamp-2">{{ news.content }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 分页 -->
    <view class="p-4 flex justify-center">
      <wd-pagination
        v-model="currentPage"
        :total="filteredNews.length"
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
