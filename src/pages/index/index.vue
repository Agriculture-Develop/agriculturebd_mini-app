<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view :style="{ marginTop: safeAreaInsets?.top + 'px' }" class="space-y-4">
    <view
      class="h-35 flex items-center justify-start font-bold gap-x-5 bg-cover bg-no-repeat bg-center"
      :style="{ backgroundImage: 'url(/static/images/background.png)' }"
    >
      <image
        class="w-15 h-15 rounded-full m-l-3 m-t-(-10)"
        src="../../static/images/logo.png"
      ></image>
      <view class="text-(2xl green-700) m-t-(-15)">农产品小程序</view>
    </view>
    <!-- <view class="swiper mt-(-3)">
      <wd-swiper :list="swiperList" autoplay v-model:current="current"></wd-swiper>
    </view> -->
    <view class="tab-container relative">
      <view class="absolute left-0 translate-y--50% top-(21px) z-1 text-green text-2xl">
        新闻动态
      </view>
      <wd-tabs v-model="tab" custom-class="tabs" color="green">
        <block v-for="item in tabs" :key="item.name">
          <wd-tab :title="`${item.name}`">
            <view class="bg-green-50">
              <view
                v-for="(title, index) in item.title.slice(0, 5)"
                class="text-gray-700 h-10 w-80% flex justify-start items-center px-4"
                :key="title.id"
                @click="jumpNewsDetailsPage(title.id)"
              >
                <text class="text-ellipsis overflow-hidden whitespace-nowrap flex-shrink-0">
                  {{ title.title }}
                </text>
                <view v-if="index === 4" class="px-3">
                  <wd-button type="text" @click.stop="jumpNewsPage" custom-class="!block ">
                    查看更多
                  </wd-button>
                </view>
              </view>
            </view>
          </wd-tab>
        </block>
        <view class="absolute right-3 bottom-(-4) z-1"></view>
      </wd-tabs>
    </view>
    <goodContainer :show-all="false" />
    <view flex justify-center>
      <wd-button @click="jumpGoodsPage">查看全部</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import goodContainer from '../goods/components/goods/goodContainer.vue'
import { getAdminNewsListQueryOptions } from '@/service/app'
import { useQuery } from '@tanstack/vue-query'

// 将图片转为base64
backgroundImage: '../../static/images/background.png;base64,...'

const current = ref<number>(0)
const swiperList = ref(['/static/images/lingmeng.jpg', '/static/images/lingmeng.jpg'])
const tab = ref<number>(0)
defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//跳转对应的页面
const jumpNewsPage = (id) => {
  uni.navigateTo({ url: `/pages/news/index` })
}
const jumpGoodsPage = () => {
  uni.switchTab({ url: '/pages/goods/index' })
}
const jumpNewsDetailsPage = (id) => {
  uni.navigateTo({ url: `/pages/news/details?id=${id}` })
}
type Itabs = {
  name: string
  title?: any[]
}
const tabs = ref<Itabs[]>([
  { name: '新闻', title: [] },
  { name: '政策', title: [] },
])
// 使用 Vue Query 获取新闻数据
const { data } = useQuery(getAdminNewsListQueryOptions({ params: { author: 'amd' } }))
// await suspense()
// if (data.value?.data?.list) {
//   data.value.data.list.forEach((item) => {
//     console.log(item.type)
//     if (item.type === '新闻') {
//       tabs.value[0].title.push(item.title)
//     } else if (item.type === '政策') {
//       tabs.value[1].title.push(item.title)
//     }
//   })
//   console.log('新闻数据', tabs.value)
// }
watch(
  () => data.value,
  (newData) => {
    if (newData?.data?.list) {
      newData.data.list.forEach((item) => {
        if (item.type === '新闻') {
          tabs.value[0].title.push({ title: item.title, id: item.id })
        } else if (item.type === '政策') {
          tabs.value[1].title.push({ title: item.title, id: item.id })
        }
      })
    }
  },
  { immediate: true }, // 初始化时立即执行一次
)
</script>
<style lang="scss" scoped>
:deep(.tabs) {
  .wd-tabs__nav-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    .wd-tabs__nav-item {
    }
  }
}
</style>
