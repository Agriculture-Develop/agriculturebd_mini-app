/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './user';
import * as API from './types';

/** 修改用户信息 PUT /admin/user/${param0} */
export function usePutAdminUserIdMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putAdminUserId,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除用户 DELETE /admin/user/${param0} */
export function useDeleteAdminUserIdMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteAdminUserId,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取用户列表 GET /admin/user/list */
export function getAdminUserListQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getAdminUserList(queryKey[1] as typeof options);
    },
    queryKey: ['getAdminUserList', options],
  });
}
