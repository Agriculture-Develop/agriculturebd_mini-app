import {
  login as _login,
  getUserInfo as _getUserInfo,
  wxLogin as _wxLogin,
  logout as _logout,
  getWxCode,
} from '@/api/login'
import {
  postAuthLoginPwd,
  postAuthLoginCode,
  putPublicUser,
  getPublicUserId,
  getPublicUser,
  postAuthRegister,
  postAuthCode,
} from '@/service/app'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from '@/utils/toast'
import { IUserInfoVo } from '@/api/login.typings'

// 初始化状态
const userInfoState: IUserInfoVo = {
  nickname: '微信用户',
  avatar_path: '/static/images/default-avatar.png',
  role: '农户',
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoVo>({ ...userInfoState })
    // 设置用户信息
    const setUserInfo = (val: IUserInfoVo) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      // if (!val.avatar_path) {
      //   val.avatar_path = userInfoState.avatar_path
      // }
      //  else {
      //   val.avatar_path = val.avatar_path
      // }
      userInfo.value = val
    }
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
    }
    /**
     * 用户登录
     * @param credentials 登录参数
     * @returns R<IUserLogin>
     */
    const login = async (credentials: { phone: string; password: string }) => {
      // const res = await _login(credentials)
      const res = await postAuthLoginPwd({ body: credentials })

      uni.setStorageSync('token', res.data.token)
      console.log('登录信息', res)
      // toast.success('登录成功')
      getUserInfo()
      return res
    }
    const codeLogin = async (credentials: { phone: string; auth_code: string }) => {
      // const res = await _login(credentials)
      const res = await postAuthLoginCode({ body: credentials })
      console.log('登录信息', res)
      // toast.success('登录成功')
      uni.setStorageSync('token', res.data.token)
      getUserInfo()
      return res
    }
    //注册
    const register = async (pas) => {
      const res = await postAuthRegister({ body: pas })
      toast.success('注册成功，请登录')
    }

    /**
     * 获取用户信息
     */
    const getUserInfo = async () => {
      const res = await getPublicUser({})
      const userInfo = res.data
      setUserInfo(userInfo)
      uni.setStorageSync('userInfo', userInfo)
      // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      return res
    }
    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      // _logout()
      removeUserInfo()
    }
    /**
     * 微信登录
     */
    const wxLogin = async () => {
      // 获取微信小程序登录的code
      const data = await getWxCode()
      console.log('微信登录code', data)

      const res = await _wxLogin(data)
      getUserInfo()
      return res
    }

    return {
      userInfo,
      login,
      wxLogin,
      getUserInfo,
      logout,
      codeLogin,
      register,
    }
  },
  {
    persist: true,
  },
)
