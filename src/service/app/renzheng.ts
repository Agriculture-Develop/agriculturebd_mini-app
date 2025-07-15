/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 发送手机验证码 POST /auth/code */
export async function postAuthCode({
  body,
  options,
}: {
  body: {};
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/auth/code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码登录 POST /auth/login/code */
export async function postAuthLoginCode({
  body,
  options,
}: {
  body: {};
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/auth/login/code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 密码登录 POST /auth/login/pwd */
export async function postAuthLoginPwd({
  body,
  options,
}: {
  body: {};
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/auth/login/pwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 PUT /auth/password */
export async function putAuthPassword({
  body,
  options,
}: {
  body: {};
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/auth/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册账号 POST /auth/register */
export async function postAuthRegister({
  body,
  options,
}: {
  body: {};
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
