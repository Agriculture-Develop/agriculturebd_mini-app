/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './gongyou';
import * as API from './types';

/** 获取图片信息 GET /files/${param0}/${param1} */
export function getFilesTypesNameQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getFilesTypesNameParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getFilesTypesName(queryKey[1] as typeof options);
    },
    queryKey: ['getFilesTypesName', options],
  });
}

/** 上传文件 POST /public/files/${param0} */
export function usePostPublicFilesTypesMutation(options?: {
  onSuccess?: (value?: {
    code: number;
    msg: string;
    data: { name: string };
  }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postPublicFilesTypes,
    onSuccess(data: { code: number; msg: string; data: { name: string } }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除预览文件 DELETE /public/files/${param0}/${param1} */
export function useDeletePublicFilesTypesNameMutation(options?: {
  onSuccess?: (value?: Record<string, unknown>) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deletePublicFilesTypesName,
    onSuccess(data: Record<string, unknown>) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
