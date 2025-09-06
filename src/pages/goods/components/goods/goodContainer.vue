<template>
  <view>
    <view v-for="(item, index) in goodList" :key="item.id">
      <Goods :product="item" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { getPublicGoodListQueryOptions, getPublicGoodList, getPublicUserId } from '@/service/app'
import Goods from './index.vue'
import { IUserInfoVo } from '@/api/user.typing'
import { getUserInfo } from '@/api/user'
onLoad(() => {
  queryList(1, 6)
})
const goodList = ref()
const queryList = async (pageNo: number, pageSize: number) => {
  const res = await getPublicGoodList({
    params: {
      title: '',
      page: pageNo,
      count: pageSize,
    },
  })

  const goods = res.data?.list ?? []
  const userIds = goods.map((g) => g.userid?.toString()).filter(Boolean)

  const userResponses = await Promise.all(userIds.map((id) => getPublicUserId({ params: { id } })))
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
  goodList.value = merged
}
</script>
