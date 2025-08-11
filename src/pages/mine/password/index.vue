<route lang="json5">
{
  style: {
    navigationBarTitleText: '修改密码',
  },
}
</route>

<template>
  <view class="profile-info-container">
    <view class="profile-card">
      <view class="form-wrapper">
        <wd-form ref="formRef" :model="formData" label-width="160rpx" class="profile-form">
          <wd-cell-group class="form-group">
            <!-- 昵称 -->
            <view class="sex-field">
              <text class="field-label">手机号</text>
              <wd-input
                prop="phone"
                clearable
                v-model="formData.phone"
                placeholder="请输入手机号"
                :rules="[{ required: true, pattern: phoneRegex, message: '请填写正确的手机号' }]"
                class="form-input"
              />
            </view>
            <view class="sex-field">
              <text class="field-label">新密码</text>
              <wd-input
                prop="password"
                clearable
                v-model="formData.password"
                placeholder="请输入新密码"
                show-password
                :rules="[
                  {
                    required: true,
                    pattern: alphaNumRegex,
                    message: '请输入必须同时包含字母和数字且长度6-20位的密码',
                  },
                ]"
                class="form-input"
              />
            </view>
            <view class="sex-field">
              <text class="field-label">验证码</text>
              <wd-input
                prop="auth_code"
                clearable
                v-model="formData.auth_code"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请输入验证码' }]"
                class="form-input"
              >
                <template #suffix>
                  <wd-button @click="getCode" size="small">获取验证码</wd-button>
                </template>
              </wd-input>
            </view>
          </wd-cell-group>
        </wd-form>

        <!-- 操作按钮 -->
        <view class="form-actions flex">
          <wd-button type="primary" size="large" @click="handleSubmit">保存修改</wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import { showToast, toast } from '@/utils/toast'
import { postAuthCode, putAuthPassword } from '@/service/app'
import { useToast } from 'wot-design-uni'
const { success: showSuccess, error: showError } = useToast()
// 表单引用
const formRef = ref()
const phoneRegex = /^1[3-9]\d{9}$/
const alphaNumRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/
// 用户信息

// 表单数据
const formData = ref({
  phone: '',
  password: '',
  auth_code: '',
})
//获取验证码
const getCode = async () => {
  if (!phoneRegex.test(formData.value.phone)) {
    showError('请输入正确的手机号')
    return
  }
  const res = await postAuthCode({ body: { phone: formData.value.phone } })
}
// 提交表单
const handleSubmit = async () => {
  // 表单验证
  const valid = await formRef.value.validate()
  if (!valid) return
  const res = await putAuthPassword({ body: formData.value })
  if (res.code !== 200) {
    showError(res.msg)
    return
  }
  await useUserStore().logout()
  showSuccess('修改成功，请重新登录')
  // 跳转到首页或重定向页面
  uni.redirectTo({ url: '/pages/mine/index' })
}
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
  justify-content: center;
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
</style>
