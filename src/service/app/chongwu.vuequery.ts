/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './chongwu';
import * as API from './types';

/** 修改宠物信息 PUT /pet */
export function usePutPetMutation(options?: {
  onSuccess?: (value?: { code: number; data: API.Pet }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putPet,
    onSuccess(data: { code: number; data: API.Pet }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 新建宠物信息 POST /pet */
export function usePostPetMutation(options?: {
  onSuccess?: (value?: { code: number; data: API.Pet }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postPet,
    onSuccess(data: { code: number; data: API.Pet }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 查询宠物详情 GET /pet/${param0} */
export function getPetIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPetIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getPetId(queryKey[1] as typeof options);
    },
    queryKey: ['getPetId', options],
  });
}

/** 删除宠物信息 DELETE /pet/${param0} */
export function useDeletePetIdMutation(options?: {
  onSuccess?: (value?: { code: number }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deletePetId,
    onSuccess(data: { code: number }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 根据状态查找宠物列表 GET /pet/findByStatus */
export function getFindByStatusQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getFindByStatusParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getFindByStatus(queryKey[1] as typeof options);
    },
    queryKey: ['getFindByStatus', options],
  });
}
