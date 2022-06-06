/*
 * @Author: Monve
 * @Date: 2022-03-10 11:46:01
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-06 19:54:35
 * @FilePath: /shopee-openapi-v2/src/index.ts
 */

import { BASE_URL } from "./utils/const"
import { ApiMethod, axios_service, Post } from "./utils/request"
import { signRequest } from "./utils/sign"
import * as queryString from "query-string"
import { ChatApi } from "./chat"

interface CONFIG {
  partner_id: string | number,
  partner_key: string,
  is_dev: boolean,
  redirect: string
}

class ShopeeOpenApi {
  private partner_id: number
  private partner_key: string
  private is_dev: boolean
  private redirect: string
  public chat: ChatApi
  constructor() {
    this.chat = new ChatApi()
    axios_service.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers['Content-Type'] = "application/json"
        config.baseURL = this.is_dev ? BASE_URL.test : BASE_URL.live
        const system_params = {
          partner_id: this.partner_id, timestamp: Math.round(new Date().getTime() / 1000)
        }
        const data = {
          ...(config.method === 'get' ? config.params : config.data)
        }
        const { timestamp } = system_params
        const { access_token, shop_id } = data
        config.url = this.generateParamsString(config.url || '', timestamp, access_token, shop_id)
        config.method === 'get' ? config.params = data
          : config.data = data
        return config
      },
      error => {
        console.log(error)
        Promise.reject(error)
      }
    )

    axios_service.interceptors.response.use((res) => res, (error) => {
      if (error.response && error.response.data) {
        return error.response
      }
      throw error
    })
  }

  setAppConfig = ({ partner_id, partner_key, is_dev, redirect }: CONFIG) => {
    this.partner_id = Number(partner_id)
    this.partner_key = partner_key
    this.is_dev = is_dev
    this.redirect = redirect
  }

  private generateParamsString(path: string, timestamp: number, access_token?: string, shop_id?: number): string {
    const params = [
      this.partner_id.toString(),
      path,
      timestamp.toString()
    ]
    if (access_token && shop_id) {
      params.push(access_token, shop_id.toString())
    }
    const sign = signRequest(this.partner_key, params);
    let json: { [key: string]: string | number } = {
      partner_id: this.partner_id,
      timestamp,
      sign
    }
    if (shop_id && access_token) {
      json = { ...json, shop_id, access_token }
    }
    return `${path}?${queryString.stringify(json)}`;
  }

  private generateLink(path: string): string {
    const origin = this.is_dev ? BASE_URL.test : BASE_URL.live
    const timestamp = Math.round(new Date().getTime() / 1000)
    const url = this.generateParamsString(path, timestamp)
    return `${origin}${url}&redirect=${this.redirect}`;
  }

  getAuthLink(): string {
    return this.generateLink('/api/v2/shop/auth_partner')
  }

  getUnAuthLink(): string {
    return this.generateLink('/api/v2/shop/cancel_auth_partner')
  }

  @Post({ url: '/api/v2/auth/token/get' })
  getAccesstoken!: ApiMethod<
    { code: string, partner_id: number } &
    ({ shop_id: number } | { main_account_id: number }),
    {
      refresh_token: string, access_token: string,
      expire_in: number, message: string,
      merchant_id_list?: number[], shop_id_list?: number[]
    }
  >

  @Post({ url: '/api/v2/auth/access_token/get' })
  refreshAccessToken!: ApiMethod<
    { refresh_token: string },
    {
      refresh_token: string, access_token: string,
      expire_in: number, partner_id: number,
      shop_id?: number, merchant_id?: number
    }
  >

}

export default new ShopeeOpenApi()