/*
 * @Author: Monve
 * @Date: 2022-03-10 11:46:01
 * @LastEditors: Monve
 * @LastEditTime: 2022-07-01 16:51:56
 * @FilePath: /shopee-openapi-v2/src/index.ts
 */

import { api_config, BASE_URL } from "./utils/const"
import { ApiMethod, axios_service, Post } from "./utils/request"
import { signRequest } from "./utils/sign"
import * as queryString from "query-string"
import { ChatApi } from "./chat"
import { ShopApi } from "./shop"
import { VoucherApi } from "./voucher"
import { ProductApi } from "./product"
import { OrderApi } from "./order"
import { LogisticsApi } from "./logistics"
import { PaymentApi } from "./payment"
import { ReturnsApi } from "./returns"
import { PublicApi } from "./public"
import { PushApi } from "./push"
import axios, { AxiosResponse } from "axios"

type CONFIG = {
  partner_id: string | number,
  partner_key: string,
  is_dev: boolean,
  redirect: string
} & Partial<typeof api_config>

class ShopeeOpenApi {
  public partner_id: number
  private partner_key: string
  private is_dev: boolean
  private redirect: string
  public product = new ProductApi()
  public shop = new ShopApi()
  public order = new OrderApi()
  public logistics = new LogisticsApi()
  public payment = new PaymentApi()
  public returns = new ReturnsApi()
  public public = new PublicApi()
  public push = new PushApi()
  public chat = new ChatApi()
  public vocher = new VoucherApi()
  constructor() {
    const results = [(res: AxiosResponse<any, any>) => res, (error: any) => {
      if (error.response && error.response.data) {
        return error.response
      }
      throw error
    }]
    function tsS() {
      return Math.round(new Date().getTime() / 1000)
    }
    this.chat.uploadImage = ({ shop_id, access_token, file }) => {
      const url = this.generateParamsString('/api/v2/sellerchat/upload_image', tsS(), access_token, shop_id)
      return axios.post(url, file, {
        baseURL: this.is_dev ? BASE_URL.test : BASE_URL.live,
        headers: { ...file.getHeaders() }
      }).then(...results)
    }
    axios_service.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers['Content-Type'] = "application/json"
        config.baseURL = this.is_dev ? BASE_URL.test : BASE_URL.live
        const system_params = {
          partner_id: this.partner_id, timestamp: tsS()
        }
        const data = {
          ...(config.method === 'get' ? config.params : config.data)
        }
        const { timestamp } = system_params
        const { access_token, shop_id } = data
        delete config.params?.access_token
        delete config.params?.shop_id
        config.data = toJson(config.data)
        config.url = this.generateParamsString(config.url || '', timestamp, access_token, shop_id)
        return config
      },
      error => {
        console.log(error)
        Promise.reject(error)
      }
    )

    axios_service.interceptors.response.use(...results)
  }

  setAppConfig = ({
    partner_id, partner_key, is_dev, redirect, retries = 0,
    retryDelay = (retryCount: number) => Math.pow(retryCount, 2) * 1000
  }: CONFIG) => {
    this.partner_id = Number(partner_id)
    this.partner_key = partner_key
    this.is_dev = is_dev
    this.redirect = redirect
    api_config.retries = retries
    api_config.retryDelay = retryDelay
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
      expire_in: number,
      merchant_id_list?: number[], shop_id_list?: number[]
    }
  >

  @Post({ url: '/api/v2/auth/access_token/get' })
  refreshAccessToken!: ApiMethod<
    { refresh_token: string, partner_id: number } &
    ({ shop_id: number } | { merchant_id: number }),
    {
      refresh_token: string, access_token: string,
      expire_in: number, partner_id: number,
      shop_id?: number, merchant_id?: number
    }
  >

}

function toJson(data: any) {
  if (data !== undefined) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
      .replace(/"(-?\d+)n"/g, (_, a) => a);
  }
  return data
}

export default new ShopeeOpenApi()