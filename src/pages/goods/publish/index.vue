<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: 'details',
  },
}
</route>

<template>
  <view>
    <wd-textarea v-model="value" placeholder="value" :maxlength="120" clearable show-word-limit />
    <wd-upload
      v-model:file-list="fileList"
      image-mode="aspectFill"
      :action="action"
      :before-upload="beforeUpload"
    ></wd-upload>
  </view>
  <wd-button @click="uploadMessage(msg)">click</wd-button>
  <wd-button @click="lod()">load</wd-button>

  {{ fileList }}
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToast, useMessage } from 'wot-design-uni'
import { useGoodStore } from '@/store'

type Igood = {
  id: number
  name: string
  description: string
  image: string
  time: string
}
const goodStore = useGoodStore()
const messageBox = useMessage()
const toast = useToast()
const value = ref<string>('这是一个测试的textarea组件')
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
  },
])

const action: string =
  'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'
const beforeUpload = ({ files, resolve }) => {
  messageBox
    .confirm({
      msg: '是否上传',
      title: '提示',
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      toast.show('取消上传操作')
    })
}
//上传信息
const msg = ref<Igood>({
  id: 1,
  name: 'xw',
  description: '1111111',
  image: '2222',
  time: '2025-1',
})
const uploadMessage = (msg) => {
  goodStore.setGood(msg)
}
const lod = () => {
  const msg = goodStore.getGood()
  console.log(msg)
}
</script>

<style lang="scss" scoped>
//
</style>
