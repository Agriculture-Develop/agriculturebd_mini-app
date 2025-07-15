/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './news';
import * as API from './types';

/** 提交新闻 POST /admin/news */
export function usePostAdminNewsMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAdminNews,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取新闻详情 GET /admin/news/${param0} */
export function getAdminNewsIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getAdminNewsIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getAdminNewsId(queryKey[1] as typeof options);
    },
    queryKey: ['getAdminNewsId', options],
  });
}

/** 修改新闻信息 PUT /admin/news/${param0} */
export function usePutAdminNewsIdMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putAdminNewsId,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除新闻 DELETE /admin/news/${param0} */
export function useDeleteAdminNewsIdMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteAdminNewsId,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取新闻列表 GET /admin/news/list */
export function getAdminNewsListQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getAdminNewsList(queryKey[1] as typeof options);
    },
    queryKey: ['getAdminNewsList', options],
  });
}

/** 设置新闻状态 PUT /admin/news/status/${param0} */
export function usePutAdminNewsStatusIdMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putAdminNewsStatusId,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
