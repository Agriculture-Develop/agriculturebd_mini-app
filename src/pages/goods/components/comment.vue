<template>
  <view class="publish">
    <!-- 当前评论 -->
    <view class="flex gap-x-4" :style="{ marginLeft: level * 20 + 'rpx' }">
      <wd-img :src="avatar(item.avatar)" width="70rpx" height="70rpx" radius="50%" />
      <view class="flex flex-col">
        <view class="name text-sm">{{ item.publisher_name }}</view>
        <view class="time text-xs text-gray-400">{{ relTime(item.created_at) }}</view>
        <view
          class="comment text-base w-70vw whitespace-pre-line break-words"
          v-if="item.reply_id === -1"
        >
          {{ item.comment }}
        </view>
        <view
          class="comment text-base w-70vw whitespace-pre-line break-words"
          v-if="item.reply_id !== -1"
        >
          <span class="text-3">回复</span>
          <span class="text-green-600 m-l-2">{{ item.reply_name }}</span>

          {{ item.comment }}
        </view>
        <view class="bottom flex gap-x-5">
          <wd-button @click="$emit('reply', item.id)" size="small" type="text">回复</wd-button>
          <wd-button
            v-if="item.user_id === userInfo.id"
            @click="$emit('delete', item.id)"
            size="small"
            type="text"
          >
            删除
          </wd-button>
        </view>
      </view>
    </view>
    <!-- 子评论递归 -->
    <CommentItem
      v-for="child in item.children"
      :key="child.id"
      :item="child"
      :level="1"
      @delete="emit('delete', $event)"
      @reply="emit('reply', $event)"
    />
    <wd-divider v-if="level === 0" />
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import CommentItem from './comment.vue'
import { relTime } from '@/utils/time'
import { avatar } from '@/utils/imges'

const userInfo = uni.getStorageSync('userInfo')

interface Comment {
  id: number
  reply_id: number
  publisher_name: string
  user_id: number
  avatar: string
  comment: string
  reply_name: string
  created_at: string
  children?: Comment[]
}

const props = defineProps<{
  item: Comment
  level?: number
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'reply', id: number): void
}>()

const level = props.level || 0
</script>
