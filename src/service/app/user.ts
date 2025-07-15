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
        role: number;
        status: number;
        created_at: string;
      }[];
    };
  }>('/admin/user/list', {
    method: 'GET',
    ...(options || {}),
  });
}
