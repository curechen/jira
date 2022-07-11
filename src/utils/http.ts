/**
 * 用 fetch 封装请求方法
 */
import qs from "qs"
import * as auth from '../auth-provider';
import { useAuth } from '../context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string,
  data?: object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET', // 这里只是默认配置，如果后面自定义配置里有写的话会被覆盖
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      // console.log(response);
      if (response.status === 401) { // "A token must be provided" 未授权 Unauthorized
        await auth.logout()
        window.location.reload()
        return Promise.reject({message: '请重新登录'})
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export const useHttp = () => { // 二次封装会自动带上 token
  const {user} = useAuth()
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
  // return (endpoint: string, config: Config) => http(endpoint, {...config, token: user?.token})
}