<template>
  <view>
    <view v-for="(item, index) in goodList" :key="item.id">
      <Goods :product="item" :delete="isDelete" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getPublicGoodList, getPublicUserId } from '@/service/app'
import Goods from './index.vue'
import { IUserInfoVo } from '@/api/user.typing'
onMounted(() => {
  queryList(1, 6)
})
const goodList = ref()
const isDelete = ref(false)
const queryList = async (pageNo: number, pageSize: number, id?) => {
  const res = await getPublicGoodList({
    params: {
      title: '',
      page: pageNo,
      count: pageSize,
    },
  })
  console.log(res)

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
  if (id) {
    isDelete.value = true
    goodList.value = merged.filter((i) => i.userid == id)
    return
  } else goodList.value = merged
}
defineExpose({
  queryList,
})
</script>
