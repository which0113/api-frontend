// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** addChart POST /api/chart/add */
export async function addChartUsingPost(
  body: API.ChartAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/chart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteChart POST /api/chart/delete */
export async function deleteChartUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/chart/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** genChartByAi POST /api/chart/gen/async */
export async function genChartByAiUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genChartByAiUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

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

  return request<API.BaseResponseBiVO>('/api/chart/gen/async', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** getChartById GET /api/chart/get */
export async function getChartByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChartVO>('/api/chart/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listChartByPage GET /api/chart/list/page */
export async function listChartByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listChartByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChartVO>('/api/chart/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listChartByMyPage GET /api/chart/my/list/page */
export async function listChartByMyPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listChartByMyPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChartVO>('/api/chart/my/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateChart POST /api/chart/update */
export async function updateChartUsingPost(
  body: API.ChartUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/chart/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
