<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: 'details',
  },
}
</route>

<template>
  <view>
    <view class="px-2">
      <wd-input
        label="标题"
        size="large"
        label-width="10%"
        type="text"
        v-model="titleValue"
        placeholder="请输入标题"
      />
      <wd-textarea v-model="value" placeholder="value" :maxlength="120" clearable show-word-limit />
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input
            label="名称"
            label-width="100px"
            prop="name"
            clearable
            v-model="model.tagName"
            placeholder="请输入名称"
            :rules="[{ required: true, message: '请填写名称' }]"
          />
          <wd-input
            label="价格"
            label-width="100px"
            prop="price"
            clearable
            v-model="model.price"
            placeholder="价格"
            :rules="[{ required: true, message: '请填写价格' }]"
          />
          <wd-input
            label="数量"
            label-width="100px"
            prop="amount"
            clearable
            v-model="model.amount"
            placeholder="数量"
            :rules="[{ required: true, message: '请填写数量' }]"
          />
        </wd-cell-group>
        <view class="footer w-full">
          <wd-button type="primary" size="large" @click="handleSubmit" class="" block>
            提交
          </wd-button>
        </view>
      </wd-form>
      {{ model }}
    </view>
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
import { Igood, Itags } from '@/store'

const goodStore = useGoodStore()
const messageBox = useMessage()
const toast = useToast()
const value = ref<string>('这是一个测试的textarea组件')
const titleValue = ref<string>('这是一个测试的title组件')

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
  const msg = goodStore.getGoods()
  console.log(msg)
}
//表单校验
const { success: showSuccess } = useToast()

const model = reactive<Itags>({
  tagName: '',
  price: '',
  amount: '',
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过',
        })
        goodStore.setTags(model)
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<style lang="scss" scoped>
//
</style>
