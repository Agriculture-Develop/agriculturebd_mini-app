/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取图片信息 GET /files/${param0}/${param1} */
export async function getFilesTypesName({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getFilesTypesNameParams;
  options?: CustomRequestOptions;
}) {
  const { types: param0, name: param1, ...queryParams } = params;

  return request<Record<string, unknown>>(`/files/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 上传文件 POST /public/files/${param0} */
export async function postPublicFilesTypes({
  params,
  body,
  file,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.postPublicFilesTypesParams;
  body: {};
  file?: File;
  options?: CustomRequestOptions;
}) {
  const { types: param0, ...queryParams } = params;
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as { [key: string]: any })[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<{ code: number; msg: string; data: { name: string } }>(
    `/public/files/${param0}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { ...queryParams },
      data: formData,
      ...(options || {}),
    }
  );
}

/** 删除预览文件 DELETE /public/files/${param0}/${param1} */
export async function deletePublicFilesTypesName({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deletePublicFilesTypesNameParams;
  options?: CustomRequestOptions;
}) {
  const { types: param0, name: param1, ...queryParams } = params;

  return request<Record<string, unknown>>(`/public/files/${param0}/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
