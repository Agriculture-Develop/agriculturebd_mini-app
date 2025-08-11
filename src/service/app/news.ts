/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 提交新闻 POST /admin/news */
export async function postAdminNews({
  body,
  cover,
  files,
  options,
}: {
  body: {
    title: string;
    category_id: number;
    content: string;
    /** 只能是(draft / reviewing) */
    status: string;
    abstract?: string;
    type?: string;
    keyword?: string[];
    source?: string;
  };
  cover?: File;
  files?: File;
  options?: CustomRequestOptions;
}) {
  const formData = new FormData();

  if (cover) {
    formData.append('cover', cover);
  }

  if (files) {
    formData.append('files', files);
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

  return request<{ code: number; msg: string }>('/admin/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
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
  cover,
  files,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.putAdminNewsIdParams;
  body: {
    title: string;
    category_id: number;
    content: string;
    /** 只能是(draft / reviewing) */
    status: string;
    abstract?: string;
    type?: string;
    keyword?: unknown[];
    source?: string;
  };
  cover?: File;
  files?: File;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;
  const formData = new FormData();

  if (cover) {
    formData.append('cover', cover);
  }

  if (files) {
    formData.append('files', files);
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

  return request<{ code: number; msg: string }>(`/admin/news/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: { ...queryParams },
    data: formData,
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
        files_url?: null;
        status?: string;
        author?: string;
        type?: '新闻' | '政策';
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
