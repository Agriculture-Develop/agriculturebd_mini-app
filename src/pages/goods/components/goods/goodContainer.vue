<template>
  <view v-for="(item, index) in visibleList" :key="item.id">
    <Goods :product="item" />
  </view>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { getPublicGoodListQueryOptions } from '@/service/app'
import Goods from './index.vue'
import { IUserInfoVo } from '@/api/user.typing'
import { getUserInfo } from '@/api/user'

const { data: goodList, refetch } = useQuery(
  getPublicGoodListQueryOptions({
    params: { title: '', count: 5, page: 1 },
  }),
)

const props = defineProps<{
  showAll?: boolean // 可选参数，默认 false
}>()
const goods = computed(() => goodList.value?.data.list ?? [])

// 用户ID列表计算属性（安全访问嵌套属性）
const userIds = computed(() => goods.value.map((item) => item.userid?.toString()))

const { data: usersData } = useQuery({
  queryKey: ['users', userIds],
  queryFn: async () => {
    const ids = userIds.value
    const responses = await Promise.all(ids.map((id) => getUserInfo(id)))
    return responses.map((res) => res.data)
  },
  enabled: computed(() => userIds.value.length > 0),
  staleTime: 5 * 60 * 1000,
})
// 4. 创建用户信息映射表
const userMap = computed(() => {
  if (!usersData.value) return {} // 避免 undefined
  return usersData.value.reduce(
    (map, user) => {
      map[user.id] = user
      return map
    },
    {} as Record<string, IUserInfoVo>,
  )
})

// 5. 正确合并数据
const combinedList = computed(() => {
  if (goods.value) {
    return goods.value.map((item) => {
      const user = userMap.value[item.userid.toString()]
      return {
        ...item, // 原始商品数据
        nickname: user?.nickname,
        avatar_path: user?.avatar_path,
        role: user?.role,
      }
    })
  }
})

const visibleList = computed(() => {
  return props.showAll ? combinedList.value : combinedList.value?.slice(0, 5)
})
</script>
