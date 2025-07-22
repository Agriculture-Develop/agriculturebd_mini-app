/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取图片信息 GET /files/${param0}/${param1} */
export async function getFilesTypesId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getFilesTypesIdParams;
  options?: CustomRequestOptions;
}) {
  const { types: param0, id: param1, ...queryParams } = params;

  return request<Record<string, unknown>>(`/files/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
