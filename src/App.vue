<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { checkToken } from './utils/auth'

onLaunch(() => {
  // const token = uni.getStorageSync('token')

  // if (!token || token == undefined) {
  //   // 未登录 → 跳转登录页
  //   uni.reLaunch({ url: '/pages/login/index' })
  // } else {
  //   // 已登录 → 跳首页
  //   uni.reLaunch({ url: '/pages/index/index' })
  // }

  checkToken()

  // console.log('App Launch, token:', token)
})

onShow(() => {
  const token = uni.getStorageSync('token')
  if (!token) {
    // uni.reLaunch({ url: '/pages/login/index' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
body {
  background-color: antiquewhite;
}
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
