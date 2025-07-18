<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>

<template>
  <view class="profile-container">
    <!-- {{ JSON.stringify(userStore.userInfo) }} -->
    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <!-- #ifdef MP-WEIXIN -->
      <button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <wd-img :src="userStore.userInfo.avatar" width="80px" height="80px" radius="50%"></wd-img>
      </button>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <view class="avatar-wrapper bg-red" @click="run">
        <wd-img :src="userStore.userInfo.avatar" width="100%" height="100%" radius="50%"></wd-img>
      </view>
      <!-- #endif -->
      <view class="user-details">
        <!-- #ifdef MP-WEIXIN -->
        <input
          type="nickname"
          class="weui-input"
          placeholder="请输入昵称"
          v-model="userStore.userInfo.username"
        />
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <view class="username">{{ userStore.userInfo.username }}</view>
        <!-- #endif -->
        <view class="user-id">ID: {{ userStore.userInfo.id }}</view>
      </view>
    </view>

    <!-- 功能区块 -->
    <view class="function-section">
      <view class="cell-group">
        <view class="group-title">账号管理</view>
        <wd-cell title="个人资料" is-link @click="handleProfileInfo">
          <template #icon>
            <wd-icon name="user" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="账号安全" is-link @click="handlePassword">
          <template #icon>
            <wd-icon name="lock-on" size="20px"></wd-icon>
          </template>
        </wd-cell>
      </view>
      <!-- 预览图片 -->
      <image
        v-if="previewImage"
        :src="previewImage"
        mode="aspectFit"
        style="width: 300px; height: 300px; border: 1px dashed #eee"
      />

      <view class="logout-button-wrapper">
        <wd-button type="error" v-if="hasLogin" block @click="handleLogout">退出登录</wd-button>
        <wd-button type="primary" v-else block @click="handleLogin">登录</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { useToast } from 'wot-design-uni'
import { uploadFileUrl, useUpload } from '@/utils/uploadFile'
import { storeToRefs } from 'pinia'
import { IUploadSuccessInfo } from '@/api/login.typings'

const userStore = useUserStore()

const toast = useToast()
const hasLogin = ref(false)

onShow((options) => {
  hasLogin.value = !!uni.getStorageSync('token')
  console.log('个人中心onShow', hasLogin.value, options)

  hasLogin.value && useUserStore().getUserInfo()
})
//预览图片
const previewImage = ref('')

const selectImage = () => {
  uni.chooseImage({
    count: 1, // 默认只选1张
    sizeType: ['original', 'compressed'], // 可以指定选择原图或压缩图
    sourceType: ['album', 'camera'], // 从相册或相机选择
    success: (res) => {
      // 获取临时路径并预览
      previewImage.value = res.tempFilePaths[0]
      console.log('本地临时路径:', res.tempFilePaths[0])
    },
    fail: (err) => {
      console.error('选择失败:', err)
      uni.showToast({ title: '选择图片失败', icon: 'none' })
    },
  })
}
// #ifndef MP-WEIXIN
// 上传头像
const { run } = useUpload<IUploadSuccessInfo>(
  uploadFileUrl.USER_AVATAR,
  {},
  {
    onSuccess: (res) => useUserStore().getUserInfo(),
  },
)
// #endif

// 微信小程序下登录
const handleLogin = async () => {
  // #ifdef MP-WEIXIN

  // 微信登录
  await userStore.wxLogin()
  hasLogin.value = true
  // #endif
  // #ifndef MP-WEIXIN
  uni.navigateTo({ url: '/pages/login/index' })
  // #endif
}

// #ifdef MP-WEIXIN

// 微信小程序下选择头像事件
const onChooseAvatar = (e: any) => {
  console.log('选择头像', e.detail)
  const { avatarUrl } = e.detail
  const { run } = useUpload<IUploadSuccessInfo>(
    uploadFileUrl.USER_AVATAR,
    {},
    {
      onSuccess: (res) => useUserStore().getUserInfo(),
    },
    avatarUrl,
  )
  run()
}
// #endif

// #ifdef MP-WEIXIN
// 微信小程序下设置用户名
const getUserInfo = (e: any) => {
  console.log(e.detail)
}
// #endif

// 个人资料
const handleProfileInfo = () => {
  uni.navigateTo({ url: `/pages/mine/info/index` })
}
// 账号安全
const handlePassword = () => {
  uni.navigateTo({ url: `/pages/mine/password/index` })
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useUserStore().logout()
        hasLogin.value = false
        // 执行退出登录逻辑
        toast.success('退出登录成功')
        // #ifdef MP-WEIXIN
        // 微信小程序，去首页
        // uni.reLaunch({ url: '/pages/index/index' })
        // #endif
        // #ifndef MP-WEIXIN
        // 非微信小程序，去登录页
        // uni.reLaunch({ url: '/pages/login/index' })
        // #endif
      }
    },
  })
}
</script>

<style lang="scss" scoped>
/* 基础样式 */
.profile-container {
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  background-color: #f7f8fa;
}
/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  padding: 40rpx;
  margin: 30rpx 30rpx 20rpx;
  background-color: #fff;
  border-radius: 24rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.avatar-wrapper {
  width: 160rpx;
  height: 160rpx;
  margin-right: 40rpx;
  overflow: hidden;
  border: 4rpx solid #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}
.avatar-button {
  height: 160rpx;
  padding: 0;
  margin-right: 40rpx;
  overflow: hidden;
  border: 4rpx solid #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}
.user-details {
  flex: 1;
}

.username {
  margin-bottom: 12rpx;
  font-size: 38rpx;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5rpx;
}

.user-id {
  font-size: 28rpx;
  color: #666;
}

.user-created {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #999;
}
/* 功能区块 */
.function-section {
  padding: 0 20rpx;
  margin-top: 20rpx;
}

.cell-group {
  margin-bottom: 20rpx;
  overflow: hidden;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.group-title {
  padding: 24rpx 30rpx 16rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #999;
  background-color: #fafafa;
}

:deep(.wd-cell) {
  border-bottom: 1rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  .wd-cell__title {
    margin-left: 5px;
    font-size: 32rpx;
    color: #333;
  }

  .cell-icon {
    margin-right: 20rpx;
    font-size: 36rpx;
  }
}
/* 退出登录按钮 */
.logout-button-wrapper {
  padding: 40rpx 30rpx;
}

:deep(.wd-button--danger) {
  height: 88rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  color: #fff;
  background-color: #f53f3f;
  border-radius: 44rpx;
}
</style>
