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
      <view class="absolute left-0 top-2 z-1 text-green text-2xl">新闻动态</view>
      <wd-tabs v-model="tab" custom-class="tabs" color="green">
        <block v-for="(item, index) in tabs" :key="item.name">
          <wd-tab :title="`${item.name}`">
            <view class="content h-50 bg-green-50 flex flex-col items-center justify-around">
              <view v-for="item in tabs[0].title">
                <view @click="jumpDetailsPage">{{ item }}</view>
              </view>
            </view>
          </wd-tab>
        </block>
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
import { getAdminNewsCategoriesList } from '@/service/app'
// 将图片转为base64
backgroundImage: '../../static/images/background.png;base64,...'

const current = ref<number>(0)

const swiperList = ref(['/static/images/lingmeng.jpg', '/static/images/lingmeng.jpg'])
const { loading, error, data, run } = useRequest(() => getAdminNewsCategoriesList({}), {
  immediate: true,
})
const tab = ref<number>(0)
defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//跳转对应的页面
const jumpDetailsPage = (id) => {
  uni.navigateTo({ url: `/pages/news/index` })
}
const jumpGoodsPage = () => {
  uni.switchTab({ url: '/pages/goods/index' })
}
type Itabs = {
  name: String
  title?: String
}
const tabs = ref<Itabs[]>([{ name: '新闻' }, { name: '政策' }])
const titleList = ref<string[]>([])

// 监听 data 变化
watch(
  () => data.value?.list,
  (newList) => {
    if (!newList) return
    // 清空并重新填充 titleList
    titleList.value = newList.map((item) => item.name)

    // 更新 tabs
    tabs.value = tabs.value.map((item, index) => ({
      ...item,
      title: titleList.value?.slice(0, 5), // 每个 tab 显示 3 个标题
    }))
  },
  { immediate: true },
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
