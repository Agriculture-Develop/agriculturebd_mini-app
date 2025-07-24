/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 修改用户信息 PUT /admin/user/${param0} */
export async function putAdminUserId({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.putAdminUserIdParams;
  body: {
    nickname: string;
    role: number;
    status: number;
  };
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(`/admin/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /admin/user/${param0} */
export async function deleteAdminUserId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteAdminUserIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code: number; msg: string }>(`/admin/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户列表 GET /admin/user/list */
export async function getAdminUserList({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: {
        id: number;
        phone: string;
        nickname: string;
        avatar_path: string;
        role: string;
        status: string;
        created_at: string;
      }[];
    };
  }>('/admin/user/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改用户信息 PUT /public/user */
export async function putPublicUser({
  body,
  avatar,
  options,
}: {
  body: {
    nickname?: string;
    role?: string;
  };
  avatar?: File;
  options?: CustomRequestOptions;
}) {
  const formData = new FormData();

  if (avatar) {
    formData.append('avatar', avatar);
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

  return request<{ code: number; msg: string }>('/public/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /public/user/${param0} */
export async function getPublicUserId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPublicUserIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{
    code: number;
    msg: string;
    data: {
      id: number;
      phone: string;
      nickname: string;
      avatar_path: string;
      role: string;
      status: string;
      created_at: string;
    };
  }>(`/public/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 上传头像 POST /public/user/avatar */
export async function postPublicUserAvatar({
  body,
  avatar,
  options,
}: {
  body: {};
  avatar?: File;
  options?: CustomRequestOptions;
}) {
  const formData = new FormData();

  if (avatar) {
    formData.append('avatar', avatar);
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

  return request<{
    code: number;
    msg: string;
    data: Record<string, unknown>;
    avatar: string;
  }>('/public/user/avatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}
