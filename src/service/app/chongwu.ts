/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 修改宠物信息 PUT /pet */
export async function putPet({
  body,
  options,
}: {
  body: {};
  options?: CustomRequestOptions;
}) {
  return request<{ code: number; data: API.Pet }>('/pet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建宠物信息 POST /pet */
export async function postPet({
  body,
  options,
}: {
  body: {
    /** 宠物名 */
    name: string;
    /** 宠物销售状态 */
    status: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code: number; data: API.Pet }>('/pet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询宠物详情 GET /pet/${param0} */
export async function getPetId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPetIdParams;
  options?: CustomRequestOptions;
}) {
  const { petId: param0, ...queryParams } = params;

  return request<{ code: number; data: API.Pet }>(`/pet/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除宠物信息 DELETE /pet/${param0} */
export async function deletePetId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deletePetIdParams;
  options?: CustomRequestOptions;
}) {
  const { petId: param0, ...queryParams } = params;

  return request<{ code: number }>(`/pet/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据状态查找宠物列表 GET /pet/findByStatus */
export async function getFindByStatus({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getFindByStatusParams;
  options?: CustomRequestOptions;
}) {
  return request<API.Pet[]>('/pet/findByStatus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
