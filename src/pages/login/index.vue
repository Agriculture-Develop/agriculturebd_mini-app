<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="login-container">
    <!-- 背景装饰元素 -->
    <view class="bg-decoration bg-circle-1"></view>
    <view class="bg-decoration bg-circle-2"></view>
    <view class="bg-decoration bg-circle-3"></view>

    <view class="login-header">
      <image class="login-logo" :src="appLogo" mode="aspectFit"></image>
      <view class="login-title">{{ appTitle }}</view>
    </view>
    <view class="login-form">
      <view class="welcome-text">欢迎登录</view>
      <view class="login-desc">请输入您的账号和密码</view>
      <view class="login-input-group">
        <view class="input-wrapper">
          <wd-input
            v-model="loginForm.phone"
            prefix-icon="user"
            placeholder="请输入手机号"
            clearable
            class="login-input"
            :border="false"
            required
          ></wd-input>
          <view class="input-bottom-line"></view>
        </view>
        <!-- 密码和验证码 -->
        <view class="input-wrapper" v-if="registerIf || !loginMode">
          <wd-input
            v-model="loginForm.password"
            prefix-icon="lock-on"
            placeholder="请输入密码"
            clearable
            show-password
            class="login-input"
            :border="false"
            required
          ></wd-input>
          <view class="input-bottom-line"></view>
        </view>
        <view class="input-wrapper" v-if="registerIf || loginMode">
          <wd-input
            v-model="loginForm.auth_code"
            placeholder="请输入验证码"
            clearable
            class="login-input"
            :border="false"
            required
          >
            <template #suffix>
              <wd-button @click="getCode">获取验证码</wd-button>
            </template>
          </wd-input>
          <view class="input-bottom-line"></view>
        </view>
      </view>
      <view class="mb-1 text-(green-600 3) flex justify-between">
        <wd-button
          size="small"
          type="text"
          @click="
            () => {
              registerIf = false

              loginMode = !loginMode
            }
          "
        >
          {{ !loginMode ? '验证码登录' : '密码登录' }}
        </wd-button>
        <wd-button
          size="small"
          type="text"
          @click="
            () => {
              registerIf = !registerIf
            }
          "
        >
          {{ !registerIf ? '前往注册账号' : '返回登录' }}
        </wd-button>
      </view>
      <!-- 登录按钮组 -->
      <view class="login-buttons">
        <!-- 账号密码登录按钮 -->
        <wd-button
          type="primary"
          size="large"
          block
          @click="!registerIf ? handleAccount() : handleAccountRegister()"
          class="account-login-btn"
        >
          <wd-icon name="right" size="18px" class="login-icon"></wd-icon>
          {{ !registerIf ? '登录' : '注册' }}
        </wd-button>
        log: {{ loginMode }}reg:{{ registerIf }}
      </view>
    </view>
    <!-- 隐私协议勾选 -->
    <view class="privacy-agreement">
      <wd-checkbox
        v-model="agreePrivacy"
        shape="square"
        class="privacy-checkbox"
        active-color="var(--wot-color-theme, #1989fa)"
      >
        <view class="agreement-text">
          我已阅读并同意
          <!-- <text class="agreement-link" @click.stop="handleAgreement('user')">《用户协议》</text>
          和
          <text class="agreement-link" @click.stop="handleAgreement('privacy')">《隐私政策》</text> -->
        </view>
      </wd-checkbox>
    </view>
    <view class="login-footer"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { isMpWeixin } from '@/utils/platform'
import { ILoginForm } from '@/api/login'
import { isTableBar } from '@/utils/index'
import { ICaptcha } from '@/api/login.typings'
import { postAuthCode, postAuthRegister } from '@/service/app'
import { useToast } from 'wot-design-uni'
const redirectRoute = ref('')
const { success: showSuccess, error: showError } = useToast()
// 获取环境变量
const appTitle = ref(import.meta.env.VITE_APP_TITLE || 'Unibest Login')
const appLogo = ref(import.meta.env.VITE_APP_LOGO || '/static/logo.svg')
const loginMode = ref(false)
const registerIf = ref(false)
const phoneRegex = /^1[3-9]\d{9}$/
const alphaNumRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/
// 初始化store
const userStore = useUserStore()
// 路由位置

// 登录表单数据
const loginForm = ref({
  phone: '13250527308',
  password: 'chen123456',
  auth_code: '',
})
// 隐私协议勾选状态
const agreePrivacy = ref(true)

// 页面加载完毕时触发
//注册
const handleAccountRegister = async () => {
  if (!phoneRegex.test(loginForm.value.phone)) {
    showError('请输入正确的手机号')
    return
  }
  if (!alphaNumRegex.test(loginForm.value.password)) {
    showError('请输入必须同时包含字母和数字且长度6-20位的密码')
    return
  }
  const res = await postAuthRegister({
    body: {
      auth_code: loginForm.value.auth_code,
      phone: loginForm.value.phone,
      password: loginForm.value.password,
    },
  })

  if (res.code !== 200) {
    showError(res.msg)
  }
  showSuccess('注册成功，请登录')
  console.log(res)
}
//获取验证码
const getCode = async () => {
  if (!phoneRegex.test(loginForm.value.phone)) {
    showError('请输入正确的手机号')
    return
  }
  const res = await postAuthCode({ body: { phone: loginForm.value.phone } })
  console.log(res)
}
//登录
const handleAccount = () => {
  if (!loginMode.value) handleAccountLogin()
  else handleAccountCode()
}
// 账号密码登录
const handleAccountLogin = async () => {
  // if (!agreePrivacy.value) {
  //   toast.error('请阅读同意协议')
  //   return
  // }
  // // 表单验证
  if (!alphaNumRegex.test(loginForm.value.password)) {
    showError('请输入必须同时包含字母和数字且长度6-20位的密码')
    return
  }
  if (!phoneRegex.test(loginForm.value.phone)) {
    showError('请输入正确的手机号')
    return
  }

  // 执行登录
  console.log(loginForm.value)

  const res = await userStore.login(loginForm.value)
  if (res.code !== 200) {
    showError(res.msg || '登录失败')
    return
  }
  // 跳转到首页或重定向页面
  const targetUrl = redirectRoute.value || '/pages/index/index'
  if (isTableBar(targetUrl)) {
    uni.switchTab({ url: targetUrl })
  } else {
    uni.redirectTo({ url: targetUrl })
  }
}
//验证码登录
const handleAccountCode = async () => {
  // if (!agreePrivacy.value) {
  //   toast.error('请阅读同意协议')
  //   return
  // }

  // 表单验证
  if (!phoneRegex.test(loginForm.value.phone)) {
    showError('请输入正确的手机号')
    return
  }
  if (!loginForm.value.auth_code) {
    showError('请输入验证码')
    return
  }

  // 执行登录

  const res = await userStore.codeLogin(loginForm.value)

  if (res.code !== 200) {
    showError(res.msg || '登录失败')
    return
  }
  // 跳转到首页或重定向页面
  const targetUrl = redirectRoute.value || '/pages/index/index'
  if (isTableBar(targetUrl)) {
    uni.switchTab({ url: targetUrl })
  } else {
    uni.redirectTo({ url: targetUrl })
  }
}
// 微信登录
const handleWechatLogin = async () => {
  // 微信登录
  await userStore.wxLogin()
  // 跳转到首页或重定向页面
  const targetUrl = redirectRoute.value || '/pages/index/index'
  if (isTableBar(targetUrl)) {
    uni.switchTab({ url: targetUrl })
  } else {
    uni.redirectTo({ url: targetUrl })
  }
}
</script>

<style lang="scss" scoped>
/* 验证码输入框样式 */
.captcha-wrapper {
  .captcha-input {
    :deep(.wd-input__suffix) {
      margin-right: 0;
      padding-right: 0;
    }
  }

  .captcha-image {
    width: 100px;
    height: 36px;
    margin-left: 10px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
      pointer-events: none;
    }

    &:active {
      opacity: 0.8;
      transform: scale(0.96);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
  }
}

.login-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 70rpx;
  background-color: #ffffff;
  background-image: linear-gradient(
    135deg,
    rgba(25, 137, 250, 0.05) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  position: relative;
  overflow: hidden;
}

/* 背景装饰元素 */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(25, 137, 250, 0.05), rgba(25, 137, 250, 0.1));
  z-index: 0;
  pointer-events: none;
}

.bg-circle-1 {
  width: 500rpx;
  height: 500rpx;
  top: -200rpx;
  right: -200rpx;
  opacity: 0.6;
}

.bg-circle-2 {
  width: 400rpx;
  height: 400rpx;
  bottom: 10%;
  left: -200rpx;
  opacity: 0.4;
}

.bg-circle-3 {
  width: 300rpx;
  height: 300rpx;
  bottom: -100rpx;
  right: 10%;
  opacity: 0.3;
  background: linear-gradient(135deg, rgba(7, 193, 96, 0.05), rgba(7, 193, 96, 0.1));
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120rpx;
  animation: fadeInDown 0.8s ease-out;

  .login-logo {
    width: 200rpx;
    height: 200rpx;
    border-radius: 36rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
      box-shadow: 0 6rpx 15rpx rgba(0, 0, 0, 0.1);
    }
  }

  .login-title {
    margin-top: 30rpx;
    font-size: 46rpx;
    font-weight: bold;
    color: #333333;
    letter-spacing: 3rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  }
}

.login-form {
  flex: 1;
  margin-top: 70rpx;
  animation: fadeIn 0.8s ease-out 0.2s both;

  .welcome-text {
    margin-bottom: 16rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #333333;
    text-align: center;
    letter-spacing: 1rpx;
  }

  .login-desc {
    margin-bottom: 70rpx;
    font-size: 28rpx;
    color: #888888;
    text-align: center;
  }

  .login-input-group {
    margin-bottom: 40rpx;
    position: relative;
    z-index: 1;

    .input-wrapper {
      position: relative;
      margin-bottom: 50rpx;
      transition: all 0.3s ease;
      border-radius: 16rpx;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
      }

      .login-input {
        padding: 12rpx 20rpx;
        background-color: rgba(245, 247, 250, 0.7);
        border-radius: 16rpx;
        transition: all 0.3s ease;

        :deep(.wd-input__inner) {
          font-size: 30rpx;
          color: #333333;
        }

        :deep(.wd-input__placeholder) {
          font-size: 28rpx;
          color: #aaaaaa;
        }

        &:focus-within {
          background-color: rgba(245, 247, 250, 0.95);
          box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);
          transform: translateY(-3rpx);
        }
      }

      .input-bottom-line {
        position: absolute;
        bottom: -2rpx;
        left: 5%;
        width: 90%;
        height: 2rpx;
        background: linear-gradient(
          to right,
          transparent,
          var(--wot-color-theme, #1989fa),
          transparent
        );
        transition: transform 0.4s ease;
        transform: scaleX(0);
        opacity: 0.8;
      }

      &:focus-within .input-bottom-line {
        transform: scaleX(1);
      }

      .input-icon {
        margin-right: 16rpx;
        color: #666666;
        transition: color 0.3s ease;
      }

      &:focus-within .input-icon {
        color: var(--wot-color-theme, #1989fa);
      }
    }
  }

  .login-buttons {
    display: flex;
    flex-direction: column;
    gap: 36rpx;

    .account-login-btn {
      height: 96rpx;
      margin-top: 20rpx;
      font-size: 32rpx;
      font-weight: 500;
      letter-spacing: 2rpx;
      border-radius: 48rpx;
      box-shadow: 0 10rpx 20rpx rgba(25, 137, 250, 0.25);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      .login-icon {
        margin-right: 8rpx;
        opacity: 0.8;
        transition: all 0.3s ease;
      }

      &:active {
        box-shadow: 0 5rpx 10rpx rgba(25, 137, 250, 0.2);
        transform: scale(0.98);

        .login-icon {
          transform: translateX(3rpx);
        }
      }
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 24rpx 0;

      .divider-line {
        flex: 1;
        height: 1px;
        background-color: #eeeeee;
      }

      .divider-text {
        padding: 0 24rpx;
        font-size: 24rpx;
        color: #999999;
      }
    }

    .wechat-login-btn {
      height: 96rpx;
      font-size: 32rpx;
      color: #07c160;
      border-color: #07c160;
      border-radius: 48rpx;
      transition: all 0.3s ease;

      .wechat-icon {
        margin-right: 12rpx;
      }

      &:active {
        background-color: rgba(7, 193, 96, 0.08);
        transform: scale(0.98);
      }
    }
  }
}

.privacy-agreement {
  display: flex;
  justify-content: center;
  margin: 30rpx 0 40rpx;
  animation: fadeIn 0.8s ease-out 0.4s both;

  .privacy-checkbox {
    display: flex;
    align-items: center;
  }

  .agreement-text {
    font-size: 26rpx;
    line-height: 1.6;
    color: #666666;

    .agreement-link {
      padding: 0 4rpx;
      font-weight: 500;
      color: var(--wot-color-theme, #1989fa);
      transition: all 0.3s ease;

      &:active {
        opacity: 0.8;
        transform: scale(0.98);
      }
    }
  }
}

.login-footer {
  padding: 50rpx 0;
  margin-top: auto;
}

/* 添加动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
