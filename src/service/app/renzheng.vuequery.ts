/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './renzheng';
import * as API from './types';

/** 发送手机验证码 POST /auth/code */
export function usePostAuthCodeMutation(options?: {
  onSuccess?: (value?: Record<string, unknown>) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAuthCode,
    onSuccess(data: Record<string, unknown>) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 验证码登录 POST /auth/login/code */
export function usePostAuthLoginCodeMutation(options?: {
  onSuccess?: (value?: Record<string, unknown>) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAuthLoginCode,
    onSuccess(data: Record<string, unknown>) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 密码登录 POST /auth/login/pwd */
export function usePostAuthLoginPwdMutation(options?: {
  onSuccess?: (value?: Record<string, unknown>) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAuthLoginPwd,
    onSuccess(data: Record<string, unknown>) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 修改密码 PUT /auth/password */
export function usePutAuthPasswordMutation(options?: {
  onSuccess?: (value?: Record<string, unknown>) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putAuthPassword,
    onSuccess(data: Record<string, unknown>) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 注册账号 POST /auth/register */
export function usePostAuthRegisterMutation(options?: {
  onSuccess?: (value?: Record<string, unknown>) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAuthRegister,
    onSuccess(data: Record<string, unknown>) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
