<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '发布',
  },
}
</route>

<template>
  <view>
    <view class="px-2">
      <wd-form ref="form" :model="model" :rules="rules" @submit="handleSubmit">
        <wd-input
          label="标题"
          size="large"
          label-width="10%"
          type="text"
          v-model="model.title"
          placeholder="请输入标题"
        />
        <wd-textarea
          v-model="model.content"
          placeholder="value"
          :maxlength="120"
          clearable
          show-word-limit
        />

        <wd-cell-group border>
          <wd-input
            label="名称"
            label-width="100px"
            prop="tag_name"
            clearable
            v-model="model.tag_name"
            placeholder="请输入名称"
          />
          <wd-input
            label="价格"
            label-width="100px"
            prop="tag_price"
            clearable
            v-model="model.tag_price"
            placeholder="价格"
          />
          <wd-input
            label="数量"
            label-width="100px"
            prop="tag_amount"
            clearable
            v-model="model.tag_weigh"
            placeholder="数量"
          />
        </wd-cell-group>
        <wd-upload
          multiple
          :max-count="3"
          v-model:file-list="model.files"
          :auto-upload="false"
          @change=""
        >
          <wd-button>选择图片</wd-button>
        </wd-upload>
        <view class="footer w-full">
          <wd-button type="primary" size="large" @click="handleSubmit" class="" block>
            提交
          </wd-button>
        </view>
      </wd-form>
      {{ model }}
      {{ form }}
    </view>
    <!-- <wd-upload
      v-model:file-list="fileList"
      image-mode="aspectFill"
      :action="action"
      :before-upload="beforeUpload"
    ></wd-upload> -->
  </view>

  <!-- {{ fileList }} -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToast, useMessage } from 'wot-design-uni'
import { UploadFile } from 'wot-design-uni/components/wd-upload/types'
const messageBox = useMessage()
const toast = useToast()
const value = ref<string>('输入段落信息输入段落信息输入段落信息输入段落信息输入段落信息')
const titleValue = ref<string>('输入标题')
const form = ref()
const model = reactive<{
  tag_name: string
  tag_weigh: string
  tag_price: string
  title: string
  content: string
  cover?: string
  files: UploadFile[]
}>({
  tag_name: '',
  tag_weigh: '',
  tag_price: '',
  title: '',
  content: '',
  cover: null,
  files: [],
})
const fileList = ref<any[]>([
  'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
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

//表单校验
const { success: showSuccess } = useToast()

const rules = {
  tagname: [{ required: true, message: '请填写名称' }],
  price: [{ required: true, message: '请填写价格' }],
  amount: [{ required: true, message: '请填写数量' }],
}

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过',
        })
        console.log('提交数据', model)
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
