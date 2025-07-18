<route lang="json5">
{
  style: {
    navigationBarTitleText: '个人资料',
  },
}
</route>

<template>
  {{ JSON.stringify(userStore.userInfo) }}
  {{ formData }}
  <view class="profile-info-container">
    <view class="profile-card">
      <view class="form-wrapper">
        <wd-form ref="formRef" :model="formData" label-width="160rpx" class="profile-form">
          <wd-cell-group class="form-group">
            <!-- 昵称 -->
            <view class="sex-field">
              <text class="field-label">昵称</text>
              <wd-input
                prop="name"
                type="nickname"
                clearable
                v-model="formData.username"
                placeholder="请输入昵称"
                class="form-input"
              />
            </view>

            <!-- 角色-->
            <view class="sex-field">
              <text class="field-label">角色</text>
              <wd-radio-group
                v-model="formData.role"
                shape="button"
                :rules="[{ required: true, message: '请选择角色' }]"
              >
                <wd-radio :value="'1'">农户</wd-radio>
                <wd-radio :value="'0'">供应商</wd-radio>
              </wd-radio-group>
            </view>
            <!-- 更换头像 -->
            <view class="sex-field">
              <text class="field-label">更换头像</text>
              <wd-cell class="flex-1 justify-end">
                <button
                  class="size-10 !p-0 rounded-full"
                  open-type="chooseAvatar"
                  @chooseavatar="onChooseAvatar"
                >
                  <wd-img :src="formData.avatar" width="40px" height="40px" radius="50%"></wd-img>
                </button>
              </wd-cell>
            </view>
          </wd-cell-group>
        </wd-form>

        <!-- 操作按钮 -->
        <view class="form-actions">
          <wd-button type="primary" size="large" @click="handleSubmit">保存修改</wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toast } from '@/utils/toast'
import { updateInfo } from '@/api/login'
import { useUserStore } from '@/store'
import { useToast } from 'wot-design-uni'
import { uploadFileUrl, useUpload } from '@/utils/uploadFile'
import { storeToRefs } from 'pinia'
import { IUploadSuccessInfo } from '@/api/login.typings'

// 表单引用
const formRef = ref()

// 用户信息
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 表单数据
const formData = ref({
  username: userInfo.value.username,
  avatar: userInfo.value.avatar,
  id: userInfo.value.id,
  role: userInfo.value.role,
})

// 提交表单
const handleSubmit = async () => {
  // 表单验证
  const valid = await formRef.value.validate()
  if (!valid) return
  const avatar = formData.value.avatar
  const { run: uploadAvatar } = useUpload<IUploadSuccessInfo>(
    uploadFileUrl.USER_AVATAR,
    {},
    {
      onSuccess: (res) => useUserStore().getUserInfo,
    },
    avatar,
  )
  uploadAvatar()
  console.log('提交表单', formData.value)

  const { msg } = await updateInfo(formData.value)
  userStore.getUserInfo()
  toast.success(msg)
  console.log(userStore.userInfo)
}

// #ifndef MP-WEIXIN
// 上传头像
// const { run:uploadAvatar } = useUpload<IUploadSuccessInfo>(
//   uploadFileUrl.USER_AVATAR,
//   {},
//   {
//     onSuccess: (res) => useUserStore().getUserInfo(),
//   },
// )
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

// 微信小程序下选择头像事件
const onChooseAvatar = (e: any) => {
  console.log('选择头像', e.detail)
  const { avatarUrl } = e.detail
  formData.value.avatar = avatarUrl // 更新表单数据中的头像
  const { run: uploadAvatar } = useUpload<IUploadSuccessInfo>(
    uploadFileUrl.USER_AVATAR,
    {},
    {
      onSuccess: (res) => useUserStore().getUserInfo,
    },
    avatarUrl,
  )
  console.log('头像上传成功', avatarUrl, formData.value.avatar)
}

// #ifdef MP-WEIXIN
// 微信小程序下设置用户名
const getUserInfo = (e: any) => {
  console.log(e.detail)
}
// #endif
</script>

<style lang="scss" scoped>
.profile-info-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 30rpx;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.card-header {
  padding: 40rpx 30rpx 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.card-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  position: relative;
  display: inline-block;
  padding-bottom: 16rpx;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60rpx;
    height: 6rpx;
    background: linear-gradient(90deg, #4a7bff, #6a5acd);
    border-radius: 6rpx;
  }
}

.form-wrapper {
  padding: 30rpx;
}

.form-group {
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
}

.form-input {
  font-size: 30rpx;
}

.sex-field {
  display: flex;
  align-items: center;
  padding: 24rpx 30rpx;
  background-color: #ffffff;
}

.field-label {
  width: 160rpx;
  font-size: 30rpx;
  color: #333;
}

.radio-group {
  flex: 1;
  display: flex;
  gap: 20rpx;
}

.radio-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  border-radius: 12rpx;
  background-color: #f5f7fa;

  &:active {
    opacity: 0.8;
  }
}

.form-actions {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
}

.submit-btn {
  height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: 500;
  background: linear-gradient(135deg, #4a7bff, #6a5acd);
  box-shadow: 0 8rpx 16rpx rgba(74, 123, 255, 0.2);
  transition: all 0.3s ease;

  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 4rpx 8rpx rgba(74, 123, 255, 0.15);
  }
}

/* 基础样式 */
.profile-container {
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  background-color: #f7f8fa;
}
</style>
