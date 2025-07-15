/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './categories';
import * as API from './types';

/** 创建新闻分类 POST /admin/news/categories */
export function usePostAdminNewsCategoriesMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAdminNewsCategories,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 修改新闻分类 PUT /admin/news/categories/${param0} */
export function usePutAdminNewsCategoriesIdMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putAdminNewsCategoriesId,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除新闻分类 DELETE /admin/news/categories/${param0} */
export function useDeleteAdminNewsCategoriesIdMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteAdminNewsCategoriesId,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取分类列表 GET /admin/news/categories/list */
export function getAdminNewsCategoriesListQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getAdminNewsCategoriesList(queryKey[1] as typeof options);
    },
    queryKey: ['getAdminNewsCategoriesList', options],
  });
}
