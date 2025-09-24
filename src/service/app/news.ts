/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 提交新闻 POST /admin/news */
export async function postAdminNews({
  body,
  options,
}: {
  body: {
    title: string;
    category_id: number;
    content: string;
    /** 只能填审核中和直接发布 */
    status: string;
    cover_url: string;
    /** 只能填 新闻和政策 */
    types?: string;
    files_url?: string[];
    abstract?: string;
    keyword?: string[];
    source?: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code: number; msg: string }>('/admin/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取新闻详情 GET /admin/news/${param0} */
export async function getAdminNewsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getAdminNewsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{
    code: number;
    msg: string;
    data: {
      id: number;
      title: string;
      category_id: number;
      abstract: string;
      keyword: string[];
      source: string;
      content: string;
      cover_url: string;
      files_url: string[];
      status: string;
      author: string;
      created_at: string;
      updated_at: string;
    };
    type: string;
  }>(`/admin/news/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改新闻信息 PUT /admin/news/${param0} */
export async function putAdminNewsId({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.putAdminNewsIdParams;
  body: {
    title: string;
    category_id: string;
    content: string;
    status: string;
    cover_trl: string;
    files: string[];
    abstract: string;
    types: string;
    keyword: string[];
    source: string;
  };
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(`/admin/news/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除新闻 DELETE /admin/news/${param0} */
export async function deleteAdminNewsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteAdminNewsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(`/admin/news/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取新闻列表 GET /admin/news/list */
export async function getAdminNewsList({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getAdminNewsListParams;
  options?: CustomRequestOptions;
}) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: {
        id?: number;
        title?: string;
        category_id?: number;
        category?: string;
        abstract?: string;
        keyword?: string[];
        source?: string;
        content?: string;
        cover_url?: string;
        files_url?: string[];
        status?: string;
        author?: string;
        types?: string;
        created_at?: string;
        updated_at?: string;
      }[];
    };
  }>('/admin/news/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置新闻状态 PUT /admin/news/status/${param0} */
export async function putAdminNewsStatusId({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.putAdminNewsStatusIdParams;
  body: {
    status: string;
  };
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(
    `/admin/news/status/${param0}`,
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
