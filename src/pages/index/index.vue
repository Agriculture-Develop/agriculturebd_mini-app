<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
  needLogin: true,
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
            <view class="bg-green-100 !min-h-20 rounded-3xl overflow-hidden">
              <view
                v-for="(title, index) in item.title.slice(0, 5)"
                class="text-gray-700 h-10 w-90% flex justify-between items-center px-4"
                :key="title.id"
                @click.stop="jumpNewsDetailsPage(title.id)"
              >
                <text class="text-ellipsis overflow-hidden whitespace-nowrap font-bold">
                  {{ title.title }}
                </text>
                <view v-if="index === item.title.slice(0, 5).length - 1" @click.stop="jumpNewsPage">
                  <wd-button type="text">查看更多</wd-button>
                </view>
              </view>
            </view>
          </wd-tab>
        </block>
        <view class="absolute right-3 bottom-(-4) z-1"></view>
      </wd-tabs>
    </view>
    <goodContainer ref="good" @get-goods="getPublicGoodList" />
    <view flex justify-center>
      <wd-button @click="jumpGoodsPage" hairline plain>查看全部</wd-button>
    </view>
  </view>
  <view class="content">
    <!-- #ifdef MP-WEIXIN -->
    <ws-wx-privacy id="privacy-popup"></ws-wx-privacy>
    <!-- #endif -->
    <!-- <button @click="doRequire">模拟隐私接口</button> -->
  </view>
</template>

<script lang="ts" setup>
import goodContainer from '../goods/components/goods/goodContainer.vue'
import { getAdminNewsList } from '@/service/app'

const current = ref<number>(0)
const swiperList = ref(['/static/images/lingmeng.jpg', '/static/images/lingmeng.jpg'])
const tab = ref<number>(0)
const good = ref()
onMounted(async () => {
  doRequire()
})
onShow(() => {
  good.value?.queryList(1, 6)
  console.log(onShow)
})
const getPublicGoodList = () => {
  good.value?.queryList(1, 6)
  console.log('获取商品列表')
}
function doRequire() {
  // #ifdef MP-WEIXIN
  ;(uni as any).requirePrivacyAuthorize({
    success: () => {
      console.log('同意')
      // 用户同意授权
      // 继续小程序逻辑
    },
    fail: () => {
      console.log('拒绝')
    }, // 用户拒绝授权
    complete: () => {},
  })
  // #endif
}
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
const getNews = async () => {
  const res = await getAdminNewsList({ params: {} })
  res.data.list.forEach((item) => {
    if (item.types === '新闻') tabs.value[0].title.push({ title: item.title, id: item.id })
    else if (item.types === '政策') tabs.value[1].title.push({ title: item.title, id: item.id })
  })
  console.log(tabs.value)
}
getNews()
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
