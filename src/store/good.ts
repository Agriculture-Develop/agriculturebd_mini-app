import { defineStore } from 'pinia'
import { ref } from 'vue'
import lingmeng from '/src/static/images/lingmeng.jpg'
import userImg from '@/static/images/avatar.jpg'
// 初始化状态
export type Igood = {
  id: number
  name: string
  description: string
  image: string
  time: string
  userImg?: string
}
export type Itags = {
  price: string
  tagName: string
  amount: string
}
const goodState: Igood[] = [
  {
    id: 0,
    name: '',
    description: '',
    image: '',
    time: '',
    userImg: '',
  },
]

export const useGoodStore = defineStore(
  'good',
  () => {
    //标签
    const tags = ref<Itags>({
      price: '',
      tagName: '',
      amount: '',
    })
    const setTags = (val: Itags) => {
      tags.value = { ...val }
    }
    const getTags = () => {
      return [
        {
          price: '¥12.8/斤',
          tagName: '新疆哈密瓜',
          amount: '5斤装',
        },
        {
          price: '¥6.5/斤',
          tagName: '山东红富士苹果',
          amount: '10斤箱装',
        },
        {
          price: '¥3.2/斤',
          tagName: '有机菠菜',
          amount: '500g/捆',
        },
        {
          price: '¥88/袋',
          tagName: '五常大米',
          amount: '10kg',
        },
      ]
    }
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
      uni.setStorageSync('good', tags)
    }

    // 删除信息
    const removeUserInfo = () => {
      good.value = { ...goodState }
      uni.removeStorageSync('good')
    }
    //获取
    const getGoods = (): Igood[] => {
      return [
        {
          id: 1,
          name: '农户老王',
          description: '天然无添加，柠檬清香，健康首选！VC 爆棚，泡水美白，居家必备！',
          image: lingmeng,
          userImg: userImg,
          time: '2min前',
        },
        {
          id: 2,
          name: '农户老王',
          description: '天然无添加，柠檬清香，健康首选！VC 爆棚，泡水美白，居家必备！',
          image: lingmeng,
          userImg: userImg,
          time: '2min前',
        },

        {
          id: 3,
          name: '手机壳',
          description: '天然无添加，柠檬清香，健康首选！VC 爆棚，泡水美白，居家必备！',
          image: lingmeng,
          time: '5min前',
        },
        {
          id: 4,
          name: '耳机',
          image: lingmeng,
          description: '这是一个大西瓜！',

          time: '10min前',
        },
      ]
    }
    return {
      tags,
      good,
      getTags,
      setGood,
      getGoods,
      setTags,
    }
  },
  {
    persist: true,
  },
)
