/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 新建供需帖子 POST /public/good */
export async function postPublicGood({
  body,
  options,
}: {
  body: {
    /** ID 编号 */
    title: string;
    content: string;
    cover: string;
    files?: string[];
    tag_name?: string;
    tag_weigh?: string;
    tag_price?: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code: number; msg: string }>('/public/good', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供需详情 GET /public/good/${param0} */
export async function getPublicGoodId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{
    code: number;
    msg: string;
    data: {
      id: number;
      user_id: number;
      title: string;
      content: string;
      cover_url: string;
      files_url: string[];
      publisher_name: string;
      created_at: string;
      like: string;
      tags: { name: string; price: string; weight: string };
    };
  }>(`/public/good/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除供需帖子 DELETE /public/good/${param0} */
export async function deletePublicGoodId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deletePublicGoodIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/public/good/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取评论列表 GET /public/good/${param0}/comment */
export async function getPublicGoodIdComment({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodIdCommentParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: {
        avatar: string;
        id: string;
        publisher_name: string;
        comment: string;
        role: string;
        like: string;
        created_at: string;
        userid: string;
        reply_id: string;
      }[];
    };
  }>(`/public/good/${param0}/comment`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 新建评论 POST /public/good/${param0}/comment */
export async function postPublicGoodIdComment({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.postPublicGoodIdCommentParams;
  body: {
    comment: string;
    reply_id:number;
  };
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(
    `/public/good/${param0}/comment`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取评论详情 GET /public/good/comment/${param0} */
export async function getPublicGoodCommentId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodCommentIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{
    code: number;
    msg: string;
    data: {
      avatar: string;
      id: string;
      publisher_name: string;
      comment: string;
      role: string;
      like: string;
      created_at: string;
    };
  }>(`/public/good/comment/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 删除评论 DELETE /public/good/comment/${param0} */
export async function deletePublicGoodCommentId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deletePublicGoodCommentIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: string }>(`/public/good/comment/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取供需列表 获取供需列表 GET /public/good/list */
export async function getPublicGoodList({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicGoodListParams;
  options?: CustomRequestOptions;
}) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: {
        id: number;
        userid: number;
        created_at: string;
        title: string;
        content: string;
        tag_name: string;
        tag_weigh: string;
        tag_price: string;
        cover_url: string;
        like: string;
      }[];
    };
  }>('/public/good/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
