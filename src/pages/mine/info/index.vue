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
            <view class="row-field">
              <text class="field-label">昵称</text>
              <wd-input
                prop="name"
                type="nickname"
                clearable
                v-model="formData.nickname"
                placeholder="请输入昵称"
                class="form-input"
              />
            </view>
            <!-- 角色-->
            <view class="row-field">
              <text class="field-label">角色</text>
              <wd-radio-group
                v-model="formData.role"
                shape="button"
                :rules="[{ required: true, message: '请选择角色' }]"
              >
                <wd-radio value="农户">农户</wd-radio>
                <wd-radio value="供应商">供应商</wd-radio>
              </wd-radio-group>
            </view>
            <!-- 更换头像 -->

            <view class="row-field">
              <text class="field-label">更换头像</text>
              <wd-cell class="flex-1 justify-end">
                <button class="size-10 !p-0 rounded-full" @click="chooseImage">
                  <wd-img
                    :src="tempFile || avatar(formData.avatar)"
                    width="40px"
                    height="40px"
                    radius="50%"
                  ></wd-img>
                </button>
              </wd-cell>
            </view>
          </wd-cell-group>
        </wd-form>

        <!-- 操作按钮 -->
        <view class="form-actions flex justify-center">
          <wd-button type="primary" size="large" custom-class="submit-btn" @click="handleSubmit">
            保存修改
          </wd-button>
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
import { putPublicUser } from '@/service/app'
import { avatar, goodImg } from '@/utils/imges'

// 表单引用
const formRef = ref()
console.log(uploadFileUrl.USER_AVATAR)

// 用户信息
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 表单数据
const formData = ref({
  nickname: userInfo.value.nickname,
  avatar: userInfo.value.avatar_path,
  role: userInfo.value.role,
})
const tempFile = ref('')
// 提交表单
const handleSubmit = async () => {
  // 表单验证
  const valid = await formRef.value.validate()
  console.log(valid)

  if (!valid) return
  //上传头像
  if (tempFile.value) {
    await new Promise((resolve) => {
      uni.uploadFile({
        url: uploadFileUrl.USER_AVATAR,
        filePath: formData.value.avatar,
        name: 'file',
        success: async (uploadFileRes) => {
          const data = JSON.parse(uploadFileRes.data)
          // imgStr.value = data.data.url
          console.log(data.data.name, '上传成功')
          formData.value.avatar = data.data.name // 更新表单数据中的头像路径
          resolve(true)
        },
      })
    })
  }
  console.log('提交表单', formData.value)
  //修改用户信息
  await putPublicUser({ body: formData.value })
  userStore.getUserInfo()
  toast.success('修改完成')
}

//选择头像
const chooseImage = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      console.log(res)
      const tempFilePath = res.tempFiles[0].tempFilePath
      formData.value.avatar = tempFilePath
      tempFile.value = tempFilePath
    },
  })
}
//
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

.row-field {
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
