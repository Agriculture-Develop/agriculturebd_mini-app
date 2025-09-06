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
    <wd-popup
      v-model="showPopup"
      position="bottom"
      custom-style="background: #fff;height:200px"
      class="flex"
    >
      <view class="flex items-center gap-2 p-2">
        <wd-textarea
          v-model="inputValue"
          placeholder="写下你的评论..."
          auto-height
          border
          :maxlength="100"
          size="large"
          custom-class="w-80vw"
        />
        <wd-button size="small" type="primary" @click="handleComment">发送</wd-button>
      </view>
    </wd-popup>
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
        <view>共{{ commentTotal }}条评论</view>
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
        <view>
          <CommentItem
            v-for="item in comment"
            :key="item.id"
            :item="item"
            :level="0"
            @delete="deleteComment($event)"
            @reply="openReplyPopup($event)"
          ></CommentItem>
        </view>
      </view>
    </view>

    <view class="footer-space h-40rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import {
  getPublicGoodId,
  getPublicGoodIdComment,
  postPublicGoodIdComment,
  deletePublicGoodCommentId,
  getPublicGoodCommentId,
} from '@/service/app'
import { useQuery } from '@tanstack/vue-query'
import { formatTime, relTime } from '@/utils/time'
import { useUserStore } from '@/store'
import { avatar, goodImg } from '@/utils/imges'
import { useMessage } from 'wot-design-uni'
import CommentItem from '@/pages/goods/components/comment.vue'

const message = useMessage()
const showPopup = ref(false)
const userStore = useUserStore()
const current = ref<number>(0)
const inputValue = ref('')
const itemId = ref('0')
const replyId = ref(-1) // 回复的评论ID，默认-1表示不是回复
const good = ref()
const comment = ref()
const commentTotal = ref(0)
onLoad((options) => {
  itemId.value = options.id // 从 options 中提取 id
  getPublicGood()
  getComment()
})

const getPublicGood = async () => {
  const res = await getPublicGoodId({ params: { id: itemId.value } })
  const new_files = res.data.files_url.map((img) => goodImg(img))
  good.value = { ...res.data, files_url: new_files }
}
//打开pop

const openReplyPopup = (id: number) => {
  replyId.value = id // 记住要回复哪条评论
  console.log(replyId.value)
  showPopup.value = true // 打开弹窗
}
//查看评论详情
const getCommentItem = async (id) => {
  if (!id || id === -1) return '' // 防止无效 id
  const res = await getPublicGoodCommentId({
    params: { id },
  })
  return res.data.publisher_name
}
//获得评论
const getComment = async () => {
  const res = await getPublicGoodIdComment({ params: { id: itemId.value } })
  console.log(res, 'ressss')

  const new_list = await Promise.all(
    res.data.list.map(async (item) => {
      return {
        ...item,
        reply_name: await getCommentItem(item.reply_id),
      }
    }),
  )
  commentTotal.value = res.data.total
  comment.value = {
    total: res.data.total,
    list: [...new_list],
  }
  console.log(comment.value)
  comment.value = buildCommentTree(comment.value.list)
  console.log(comment.value, 'tree')
}
//新建评论
const handleComment = async () => {
  if (!inputValue.value.trim()) return

  const res = await postPublicGoodIdComment({
    body: { comment: inputValue.value, reply_id: Number(replyId.value) },
    params: { id: itemId.value },
  })
  console.log(res)
  inputValue.value = ''
  showPopup.value = false // 发送后关闭弹窗
  getComment()
}

//整合评论
function buildCommentTree(list) {
  const map: Record<number, any> = {}
  const tree: any[] = []

  // 建立映射表
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] }
  })

  // 组装树结构
  list.forEach((item) => {
    if (item.reply_id === -1) {
      tree.push(map[item.id])
    } else {
      if (map[item.reply_id]) {
        map[item.reply_id].children.push(map[item.id])
      }
    }
  })

  // 递归删除空 children
  function clean(node: any) {
    if (node.children && node.children.length === 0) {
      delete node.children
    } else if (node.children) {
      node.children.forEach(clean)
    }
  }
  tree.forEach(clean)

  return tree
}

//删除评论
const deleteComment = async (id) => {
  console.log(id)

  const ok = await confirm()
  if (!ok) return
  const res = await deletePublicGoodCommentId({
    params: { id },
  })
  console.log(res)
  getComment()
}
//获取评论详情
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
