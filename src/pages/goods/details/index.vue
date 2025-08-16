<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="space-y-4">
    <!-- 弹出框 -->
    <wd-popup v-model="showPopup" position="bottom" custom-style="background: #fff;height:200px">
      <wd-textarea
        v-model="inputValue"
        placeholder="写下你的评论..."
        min-h-3xl
        auto-height
        border
        :maxlength="100"
        size="large"
      />
      <view class="flex justify-end mt-2">
        <wd-button size="small" type="primary" @click="handleComment">发送</wd-button>
      </view>
    </wd-popup>
    {{ good.id }}
    <wd-swiper :list="good.files_url" v-model:current="current" class="p-5" />

    <view class="content w-95vw m-a space-y-4">
      <view class="title font-bold">{{ good.title }}</view>
      <view class="section leading-loose">
        {{ good.content }}
      </view>
      <view class="bottom flex px-2 items-center">
        <view class="flex-1">{{ formatTime(good.created_at) }}</view>
        <view class="flex gap-x-3 items-center">
          <view><i class="text-gray-300 i-uiw-heart-on"></i></view>
        </view>
      </view>
      <wd-divider></wd-divider>
      <view class="commentContainer space-y-5">
        <view>共{{ comment.total }}条评论</view>
        <view class="flex items-center">
          <!-- <wd-skeleton :row-col="[{ size: '70rpx', type: 'circle' }]" /> -->
          <wd-img
            :src="
              userStore.userInfo.avatar_path
                ? avatar(userStore.userInfo.avatar_path)
                : avatar('/static/images/default-avatar.png')
            "
            width="70rpx"
            height="70rpx"
            radius="50%"
          ></wd-img>
          <wd-input
            hide-cancel
            placeholder-left
            readonly
            v-model="inputValue"
            placeholder="         来发条评论吧\(^o^)/~"
            no-border
            custom-class=" m-l-5 !bg-gray-100 !w-70vw  !rounded-2xl"
            @click="() => (showPopup = !showPopup)"
          />
        </view>
        <wd-divider></wd-divider>
        <!-- 评论 -->
        <view class="publish" v-for="item in comment.list" :key="item.id">
          <view class="father">
            <view class="flex title gap-x-4">
              <view class="self-start flex-shrink-0">
                <wd-img :src="item.avatar" width="70rpx" height="70rpx" radius="50%" />
              </view>
              <view class="flex flex-col">
                <view class="name text-sm">{{ item.publisher_name }}</view>
                <view class="time text-xs text-gray-400">
                  {{ relTime(item.created_at) }}
                </view>
                <view>
                  <view class="flex">
                    <view class="comment text-base w-70vw whitespace-pre-line break-words">
                      {{ item.comment }}
                    </view>
                    <view><i class="text-gray-300 ml-3 i-uiw-heart-on"></i></view>
                  </view>
                  <view class="bottom flex gap-x-5">
                    <wd-button
                      @click="() => (showPopup = !showPopup)"
                      size="small"
                      type="text"
                      class=""
                    >
                      回复
                    </wd-button>
                    <wd-button
                      size="small"
                      type="text"
                      v-if="item.user_id === userInfo.id"
                      @click="deleteComment(item.id)"
                    >
                      删除
                    </wd-button>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="footer-space h-40rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import {
  getPublicGoodIdCommentQueryOptions,
  getPublicGoodIdQueryOptions,
  getPublicGoodId,
  getPublicGoodIdComment,
  postPublicGoodIdComment,
  deletePublicGoodCommentId,
} from '@/service/app'
import { useQuery } from '@tanstack/vue-query'
import { formatTime, relTime } from '@/utils/time'
import { useUserStore } from '@/store'
import { avatar, goodImg } from '@/utils/imges'
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const showPopup = ref(false)
const userStore = useUserStore()
const current = ref<number>(0)
const userInfo = uni.getStorageSync('userInfo')
const inputValue = ref('')
const itemId = ref('0')
const good = ref()
const comment = ref()
onLoad((options) => {
  itemId.value = options.id // 从 options 中提取 id
  getPublicGood()
  getComment()
})

// const { data: commentList, refetch } = useQuery({
//   ...getPublicGoodIdCommentQueryOptions({
//     params: { id: itemId as any },
//   }),
// })
// const { data: good, refetch: goodRefetch } = useQuery({
//   ...getPublicGoodIdQueryOptions({
//     params: { id: itemId as any },
//   }),
//   enabled: !!itemId,
// })
const getPublicGood = async () => {
  const res = await getPublicGoodId({ params: { id: itemId.value } })
  const new_files = res.data.files_url.map((img) => goodImg(img))
  good.value = { ...res.data, files_url: new_files }
}

//获得详细评论

//获得评论
const getComment = async () => {
  const res = await getPublicGoodIdComment({ params: { id: itemId.value } })
  console.log(res, 'ressss')

  const new_list = res.data.list.map((item) => {
    return {
      ...item,
      avatar: avatar(item.avatar),
    }
  })
  comment.value = {
    total: res.data.total,
    list: [...new_list],
  }
  console.log(comment.value)
}
//新建评论
const handleComment = async (id: string) => {
  if (!inputValue.value.trim()) return
  const res = await postPublicGoodIdComment({
    body: { comment: inputValue.value, reply_id: Number(id) | -1 },
    params: { id: itemId.value },
  })
  console.log(res)
  inputValue.value = ''
  showPopup.value = false // 发送后关闭弹窗

  getComment()
}
//删除评论
const deleteComment = async (id) => {
  const ok = await confirm()
  if (!ok) return
  const res = await deletePublicGoodCommentId({
    params: { id },
  })
  console.log(res)
  getComment()
}
//获取评论详情
const getCommentId = (id) => {}
//弹框
async function confirm() {
  try {
    await message.confirm({
      msg: '是否删除评论',
      title: '提示',
    })
    return true
  } catch {
    return false
  }
}
</script>

<style lang="scss" scoped></style>
