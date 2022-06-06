/*
 * @Author: Monve
 * @Date: 2022-06-02 10:28:39
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-06 14:12:36
 * @FilePath: /shopee-openapi-v2/src/chat.ts
 */

import { ApiMethod, Post } from "./utils/request"


export class ChatApi {

  @Post({ url: '/api/v2/auth/token/get' })
  getAccesstoken!: ApiMethod<
    { code: string; shop_id: number, partner_id: number, main_account_id?: number },
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