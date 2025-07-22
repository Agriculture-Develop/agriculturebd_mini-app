/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './gongyou';
import * as API from './types';

/** 获取图片信息 GET /files/${param0}/${param1} */
export function getFilesTypesIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getFilesTypesIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getFilesTypesId(queryKey[1] as typeof options);
    },
    queryKey: ['getFilesTypesId', options],
  });
}
