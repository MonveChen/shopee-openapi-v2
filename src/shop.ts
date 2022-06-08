/*
 * @Author: Monve
 * @Date: 2022-06-07 14:55:38
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-07 17:22:58
 * @FilePath: /shopee-openapi-v2/src/shop.ts
 */

import { ApiShopMethod, Get } from "./utils/request"


export class ShopApi {

  @Get({ url: '/api/v2/shop/get_shop_info' })
  getShopInfo!: ApiShopMethod<
    {},
    {
      shop_name: string, region: string,
      status: string, sip_affi_shops: {
        affi_shop_id: number,
        region: string
      }[],
      is_cb: boolean, is_cnsc: boolean,
      shop_cbsc: string, auth_time: number,
      expire_time: number, is_sip: boolean
    }
  >

}