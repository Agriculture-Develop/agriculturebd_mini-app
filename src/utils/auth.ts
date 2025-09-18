// utils/auth.ts
export function setToken(token: string, expiresIn: number) {
  const now = Date.now()
  const expireAt = now + expiresIn * 1000
  uni.setStorageSync('token', token)
  uni.setStorageSync('token_expire_at', expireAt)

  // 自动清除
  setTimeout(() => {
    clearToken()
  }, expiresIn * 1000)
}

export function clearToken() {
  uni.removeStorageSync('token')
  uni.removeStorageSync('token_expire_at')
  uni.reLaunch({ url: '/pages/login/index' })
}

export function checkToken() {
  const token = uni.getStorageSync('token')
  const expireAt = uni.getStorageSync('token_expire_at')
  if (!token || Date.now() > expireAt) {
    clearToken()
    console.log('清除token')
  }
}
