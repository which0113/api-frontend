// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUser Post /api/user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>('/api/user/add', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** banUser Post /api/user/ban */
export async function banUserUsingPost(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/ban', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userBindEmail Post /api/user/bind/login */
export async function userBindEmailUsingPost(
  body: API.UserBindEmailRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/bind/login', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userCheckIn Post /api/user/checkIn */
export async function userCheckInUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/checkIn', {
    method: 'Post',
    ...(options || {}),
  });
}

/** deleteUser Post /api/user/delete */
export async function deleteUserUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/delete', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailLogin Post /api/user/email/login */
export async function userEmailLoginUsingPost(
  body: API.UserEmailLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/email/login', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailRegister Post /api/user/email/register */
export async function userEmailRegisterUsingPost(
  body: API.UserEmailRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/user/email/register', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getCaptcha GET /api/user/getCaptcha */
export async function getCaptchaUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/getCaptcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUser GET /api/user/list */
export async function listUserUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserVO>('/api/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByPage GET /api/user/list/page */
export async function listUserByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserByPageUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO>('/api/user/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogin Post /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserLoginVO>('/api/user/login', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout Post /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/logout', {
    method: 'Post',
    ...(options || {}),
  });
}

/** normalUser Post /api/user/normal */
export async function normalUserUsingPost(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/normal', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userRegister Post /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/user/register', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userUnBindEmail Post /api/user/unbindEmail */
export async function userUnBindEmailUsingPost(
  body: API.UserUnBindEmailRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/unbindEmail', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser Post /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/update', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateVoucher Post /api/user/update/voucher */
export async function updateVoucherUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/update/voucher', {
    method: 'Post',
    ...(options || {}),
  });
}
