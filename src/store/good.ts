import { defineStore } from 'pinia'
import { ref } from 'vue'

// 初始化状态
type Igood = {
  id: number
  name: string
  description: string
  image: string
  time: string
}
const goodState: Igood[] = [
  {
    id: 0,
    name: '',
    description: '',
    image: '',
    time: '',
  },
]

export const useGoodStore = defineStore(
  'good',
  () => {
    // 定义农产品信息
    const good = ref<Igood[]>([...goodState])
    // 设置用户信息
    const setGood = (val: Igood) => {
      console.log('设置产品信息', val)

      const index = good.value.findIndex((item) => item.id === val.id)
      if (index !== -1) {
        // 更新现有商品
        good.value[index] = { ...good.value[index], ...val }
      } else {
        // 添加新商品
        good.value.push(val)
      }

      // 更新本地存储
      uni.setStorageSync('good', good)
    }

    // 删除信息
    const removeUserInfo = () => {
      good.value = { ...goodState }
      uni.removeStorageSync('good')
    }
    //获取
    const getGood = () => {
      return uni.getStorageSync('good') || []
    }
    return {
      good,
      setGood,
      getGood,
    }
  },
  {
    persist: true,
  },
)
