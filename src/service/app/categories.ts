/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 创建新闻分类 POST /admin/news/categories */
export async function postAdminNewsCategories({
  body,
  options,
}: {
  body: {
    name: string;
    description: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code: number; msg: string }>('/admin/news/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改新闻分类 PUT /admin/news/categories/${param0} */
export async function putAdminNewsCategoriesId({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.putAdminNewsCategoriesIdParams;
  body: {
    /** 名称 */
    name: string;
    description: string;
  };
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(
    `/admin/news/categories/${param0}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 删除新闻分类 DELETE /admin/news/categories/${param0} */
export async function deleteAdminNewsCategoriesId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteAdminNewsCategoriesIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(
    `/admin/news/categories/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取分类列表 GET /admin/news/categories/list */
export async function getAdminNewsCategoriesList({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<{
    code: number;
    msg: string;
    data: { total: number; list: { name: string; description: string }[] };
  }>('/admin/news/categories/list', {
    method: 'GET',
    ...(options || {}),
  });
}
