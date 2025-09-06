<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    enablePullDownRefresh: false, // 改为 false，由 z-paging 管理
  },
  needLogin: true,
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

    <z-paging
      ref="pagingRef"
      v-model="combinedList"
      @query="queryList"
      use-page-scroll
      show-refresh-loading
      i18n="zh-CN"
      auto
    >
      <template v-if="showList.length > 0">
        <view v-for="(item, index) in showList" :key="item.id">
          <Goods :product="item" />
        </view>
      </template>

      <!-- 无搜索结果提示 -->
      <view v-else-if="hasSearched" class="empty-tips">没有找到相关商品</view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { getPublicGoodList } from '@/service/app'
import { getUserInfo } from '@/api/user'
import { IUserInfoVo } from '@/api/user.typing'
import Goods from './components/goods/index.vue'

const keyword = ref('')
const hasSearched = ref(false)
const combinedList = ref<any[]>([])
const searchResult = ref<any[]>([])
const page = ref(1)
const count = 5
const pagingRef = ref()
const { safeAreaInsets } = uni.getSystemInfoSync()
onMounted(() => {
  pagingRef.value?.reload()
})

// 请求商品数据（原逻辑不变）
const queryList = async (pageNo: number, pageSize: number) => {
  try {
    const res = await getPublicGoodList({
      params: {
        title: '',
        page: pageNo,
        count: pageSize,
      },
    })

    const goods = res.data?.list ?? []
    const userIds = goods.map((g) => g.userid?.toString()).filter(Boolean)

    const userResponses = await Promise.all(userIds.map((id) => getUserInfo(id)))
    const userMap: Record<string, IUserInfoVo> = {}
    userResponses.forEach((res) => {
      if (res?.data) userMap[res.data.id] = res.data
    })

    const merged = goods.map((item) => {
      const user = userMap[item.userid?.toString()]
      return {
        ...item,
        nickname: user?.nickname,
        avatar_path: user?.avatar_path,
        role: user?.role,
      }
    })

    // 分页拼接（由 z-paging 控制）
    pagingRef.value.complete(merged)
  } catch (err) {
    console.error('数据请求失败:', err)
    pagingRef.value.complete(false)
  }
}

// 显示数据（搜索后显示筛选结果）
const showList = computed(() => {
  return hasSearched.value ? searchResult.value : combinedList.value
})

// 搜索功能（只筛选当前已加载的数据）
const handleSearch = async () => {
  hasSearched.value = true
  const kw = keyword.value.trim()

  if (!kw) {
    // 搜索框为空，恢复全部数据
    searchResult.value = combinedList.value
    return
  }

  try {
    // 请求后端搜索结果（只搜第一页）
    const res = await getPublicGoodList({
      params: {
        title: kw, // 把搜索词传到后端
        page: 1,
        count: 100, // 可按需调整，代表一次取多少
      },
    })

    const goods = res.data?.list ?? []
    const userIds = goods.map((g) => g.userid?.toString()).filter(Boolean)

    const userResponses = await Promise.all(userIds.map((id) => getUserInfo(id)))
    const userMap: Record<string, IUserInfoVo> = {}
    userResponses.forEach((res) => {
      if (res?.data) userMap[res.data.id] = res.data
    })

    const merged = goods.map((item) => {
      const user = userMap[item.userid?.toString()]
      return {
        ...item,
        nickname: user?.nickname,
        avatar_path: user?.avatar_path,
        role: user?.role,
      }
    })

    searchResult.value = merged
  } catch (error) {
    console.error('搜索失败:', error)
    searchResult.value = []
  }
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
