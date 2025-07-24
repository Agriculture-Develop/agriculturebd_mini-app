import { defineStore } from 'pinia'
import { ref } from 'vue'
import {} from '@/service/app'

const newsDetails = ref([])
// 初始化状态
// export type Igood = {
//   id: number
//   name: string
//   description: string
//   image: string
//   time: string
//   userImg?: string
// }
// export type Itags = {
//   price: string
//   tagName: string
//   amount: string
// }
// const goodState: Igood[] = [
//   {
//     id: 0,
//     name: '',
//     description: '',
//     image: '',
//     time: '',
//     userImg: '',
//   },
// ]

export const useNewsStore = defineStore('news', () => {
  //标签
  // const tags = ref<Itags>({
  //   price: '',
  //   tagName: '',
  //   amount: '',
  // })
  // const setTags = (val: Itags) => {
  //   tags.value = { ...val }
  // }
  const getNewsDetails = async () => {
    const { loading, error, data, run } = useRequest(() => getAdminNewsId({ params: { id: '1' } }))

    // return data
    setTimeout(() => {
      return [
        {
          code: 200,
          msg: '成功',
          data: {
            id: 1,
            title: '新能源补贴政策延续，助力绿色产业发展',
            category_id: 1,
            category: '政策法规',
            abstract: '财政部宣布新能源补贴政策将延续至2026年，预计带动产业投资超5000亿元...',
            keyword: ['新能源', '补贴', '碳中和', '产业政策'],
            source: '经济日报',
            content:
              '<p>为促进绿色低碳发展，财政部今日发布通知明确新能源汽车购置补贴政策延续...</p>',
            cover_url: '/news/covers/energy_cover.jpg',
            files_url: ['/news/images/energy1.jpg', '/news/images/energy2.jpg'],
            status: 'published',
            author: '财经观察员',
            created_at: '2025-06-10T09:15:32+08:00',
            updated_at: '2025-06-10T09:15:32+08:00',
          },
        },
      ]
    }, 1000) // 模拟延时
  }

  return {
    getNewsDetails,
  }
})
