import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
import {history} from '@umijs/max';
import {message} from 'antd';

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}

/**
 * @name 请求拦截处理
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: process.env.NODE_ENV === 'production' ? "https://back.freefish.love/" : 'http://localhost:9001/',
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = localStorage.getItem("token");
      if (config && config.headers && token) {
        config.headers.token = JSON.parse(token);
      }
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const {data} = response as unknown as ResponseStructure;
      const {code} = data;
      const {pathname} = location;
      const loginPath = '/user/login';

      if (data && code === 0) {
        return response;
      } else {
        switch (code) {
          case 40001:
            if (!pathname.includes('/interfaceInfo/')) {
              message.error(data.message);
              history.push(loginPath);
            }
            break;
          case 40100:
            if (pathname !== '/'
              && pathname !== '/interface/list'
              && pathname !== '/user/login'
              && pathname !== '/user/register'
              && pathname !== '/analyse'
            ) {
              message.error(data.message);
              history.push(loginPath);
            }
            break;
          default:
            if (!pathname.includes('/interfaceInfo/')) {
              message.error(data.message);
            }
            break;
        }
      }
      return response;
    },
  ],
};
