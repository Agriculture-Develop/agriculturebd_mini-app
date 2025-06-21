<template>
  <view v-for="(item, index) in visibleList" :key="item.id">
    <Goods :product="item" />
  </view>
</template>

<script lang="ts" setup>
import Goods from './index.vue'
import { Itags, useGoodStore, Igood } from '@/store'

const goodStore = useGoodStore()
const getTagsList = (): Itags[] => {
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
const props = defineProps<{
  showAll?: boolean // 可选参数，默认 false
}>()

const visibleList = computed(() => {
  return props.showAll ? combineList.value : combineList.value.slice(0, 3)
})
</script>
