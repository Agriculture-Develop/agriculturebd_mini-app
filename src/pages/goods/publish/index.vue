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
          placeholder="请输入内容"
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
            placeholder="香蕉"
          />
          <wd-input
            label="价格"
            label-width="100px"
            prop="tag_price"
            clearable
            v-model="model.tag_price"
            placeholder="3.5元/斤"
          />
          <wd-input
            label="数量"
            label-width="100px"
            prop="tag_weigh"
            clearable
            v-model="model.tag_weigh"
            placeholder="10斤"
          />
        </wd-cell-group>
        <view class="flex items-center gap-x-4">
          <view>上传封面图片</view>
          <view>
            <wd-upload
              :rules="[{ required: true, message: '请上传封面' }]"
              :limit="1"
              name="file"
              v-model:file-list="coverList"
              :action="uploadFileUrl.GOOD_FILES"
              @remove="handleRemove"
            ></wd-upload>
          </view>
        </view>
        <view class="flex items-center gap-x-4">
          <view>上传帖子图片</view>

          <wd-upload
            multiple
            :limit="3"
            name="file"
            v-model:file-list="fileList"
            :action="uploadFileUrl.GOOD_FILES"
            @remove="handleRemove"
          ></wd-upload>
        </view>
        <view class="footer w-full">
          <wd-button type="primary" size="large" @click="handleSubmit" class="" block>
            提交
          </wd-button>
        </view>
      </wd-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToast, useMessage } from 'wot-design-uni'
import { UploadFile } from 'wot-design-uni/components/wd-upload/types'
import { uploadFileUrl } from '@/utils/uploadFile'
import { deletePublicFilesTypesName, postPublicGood } from '@/service/app'
const messageBox = useMessage()
const toast = useToast()

const form = ref()
const model = reactive<{
  tag_name: string
  tag_weigh: string
  tag_price: string
  title: string
  content: string
  cover: string
  files: string[]
}>({
  tag_name: '',
  tag_weigh: '',
  tag_price: '',
  title: '',
  content: '',
  cover: '',
  files: [],
})

const fileList = ref<UploadFile[]>([])
const coverList = ref<UploadFile[]>([])

//表单校验
const { success: showSuccess, error: showError } = useToast()

const rules = {
  tag_name: [{ required: true, message: '请填写名称' }],
  tag_price: [{ required: true, message: '请填写价格' }],
  tag_weigh: [{ required: true, message: '请填写数量' }],
}

//获取图片信息

function handleChange({ fileList: files }) {
  fileList.value = files
  console.log('文件列表', fileList.value)
  files.forEach((f) => {
    console.log('真实接口返回:', f.response)
  })
}
function handleRemove({ file }) {
  console.log('删除文件', file)

  const res = JSON.parse(file.response as string)?.data?.name
  console.log(res, '删除的文件名')

  deletePublicFilesTypesName({ params: { types: 'good', name: res } }).then((res) => {
    console.log('删除成功', res)
  })
}
const reset = () => {
  model.tag_name = ''
  model.tag_weigh = ''
  model.tag_price = ''
  model.title = ''
  model.content = ''
  model.cover = ''
  model.files = []
  coverList.value = []
  fileList.value = []
}

async function handleSubmit() {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (fileList.value.length === 0 || coverList.value.length === 0) {
        showError({
          msg: '请上传封面或图片',
        })
        return
      }
      if (valid) {
        console.log(fileList.value, 'fileList')
        console.log(coverList.value, 'coverList')
        fileList.value.map((item) => {
          const name = JSON.parse(item.response as string)?.data?.name
          console.log(name, 'name')

          model.files.push(name)
          console.log(name, model.files)
        })
        const res = JSON.parse(coverList.value[0].response as string)?.data?.name
        model.cover = res
        console.log(model.cover, 'cover')
        console.log(model.files, 'files')

        await postPublicGood({ body: model })
        console.log('提交数据', model)

        showSuccess({
          msg: '发布成功',
        })
        reset()
        // uni.switchTab({ url: '/pages/index/index' })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
//test
</script>

<style lang="scss" scoped>
//
</style>
