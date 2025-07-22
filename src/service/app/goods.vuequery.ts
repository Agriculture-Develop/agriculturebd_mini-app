/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './goods';
import * as API from './types';

/** 新建供需帖子 POST /public/good */
export function usePostPublicGoodMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postPublicGood,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取供需详情 GET /public/good/${param0} */
export function getPublicGoodIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getPublicGoodId(queryKey[1] as typeof options);
    },
    queryKey: ['getPublicGoodId', options],
  });
}

/** 删除供需帖子 DELETE /public/good/${param0} */
export function useDeletePublicGoodIdMutation(options?: {
  onSuccess?: (value?: Record<string, unknown>) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deletePublicGoodId,
    onSuccess(data: Record<string, unknown>) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取评论列表 GET /public/good/${param0}/comment */
export function getPublicGoodIdCommentQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodIdCommentParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getPublicGoodIdComment(queryKey[1] as typeof options);
    },
    queryKey: ['getPublicGoodIdComment', options],
  });
}

/** 新建评论 POST /public/good/${param0}/comment */
export function usePostPublicGoodIdCommentMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postPublicGoodIdComment,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取评论详情 GET /public/good/comment/${param0} */
export function getPublicGoodCommentIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodCommentIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getPublicGoodCommentId(queryKey[1] as typeof options);
    },
    queryKey: ['getPublicGoodCommentId', options],
  });
}

/** 删除评论 DELETE /public/good/comment/${param0} */
export function useDeletePublicGoodCommentIdMutation(options?: {
  onSuccess?: (value?: { code: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deletePublicGoodCommentId,
    onSuccess(data: { code: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取供需列表 获取供需列表 GET /public/good/list */
export function getPublicGoodListQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodListParams;
  body: {
    title?: string;
    page?: number;
    count?: number;
  };
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getPublicGoodList(queryKey[1] as typeof options);
    },
    queryKey: ['getPublicGoodList', options],
  });
}
