/*
 * @Author: Monve
 * @Date: 2021-09-26 18:11:06
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-09 13:57:49
 * @FilePath: /shopee-openapi-v2/src/utils/request.ts
 */
import { sleep } from "@monvechen/sleep";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { api_config } from "./const";

export const axios_service = axios.create()

type BaseRes = { request_id: string, error: string, message: string }
type ShopReq = { shop_id: number, access_token: string }

export type ApiMethod<T = any, R = any> = (
  data: T,
  option?: AxiosRequestConfig<T>
) => Promise<AxiosResponse<BaseRes & R>>

export type ApiShopMethod<T = any, R = any> = (
  data: ShopReq & T,
  option?: AxiosRequestConfig<ShopReq & T>
) => Promise<AxiosResponse<BaseRes & R>>

export function createApiByMethod(method: Method) {
  return function (
    args: AxiosRequestConfig,
    request = axios_service
  ): PropertyDecorator {
    return function (target, name) {
      target.constructor.prototype[name as string] = function (
        data = {} as any,
        option?: AxiosRequestConfig<any>
      ) {
        async function req(dic: any, idx = 0): Promise<AxiosResponse<any, any>> {
          const result = await request(dic)
          if (result.data.error === 'system_busy') {
            if (idx < api_config.retries) {
              idx++
              await sleep(api_config.retryDelay(idx))
              return req(dic, idx)
            }
          }
          return result
        }
        const dic = { method, ...args, ...option }
        method === 'get' ? dic.params = data : dic.data = data
        const result = req(dic)
        return result
      }
      return target
    }
  }
}

export const Get = createApiByMethod('get')
export const Post = createApiByMethod('post')