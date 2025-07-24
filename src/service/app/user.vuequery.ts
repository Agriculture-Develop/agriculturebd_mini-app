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

/** 修改用户信息 PUT /public/user */
export function usePutPublicUserMutation(options?: {
  onSuccess?: (value?: { code: number; msg: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putPublicUser,
    onSuccess(data: { code: number; msg: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取用户信息 GET /public/user/${param0} */
export function getPublicUserIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicUserIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getPublicUserId(queryKey[1] as typeof options);
    },
    queryKey: ['getPublicUserId', options],
  });
}

/** 上传头像 POST /public/user/avatar */
export function usePostPublicUserAvatarMutation(options?: {
  onSuccess?: (value?: {
    code: number;
    msg: string;
    data: Record<string, unknown>;
    avatar: string;
  }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postPublicUserAvatar,
    onSuccess(data: {
      code: number;
      msg: string;
      data: Record<string, unknown>;
      avatar: string;
    }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
