/*
 * @Author: Monve
 * @Date: 2022-06-07 19:53:04
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-08 10:30:32
 * @FilePath: /shopee-openapi-v2/src/push.ts
 */

import { ApiMethod, Get, Post } from "./utils/request"

type ConfigInfo = {
  callback_url: string, shut_time: number,
  blocked_shop_id: number[],
  push_config: {
    order_status: 0 | 1,
    order_tracking_no: 0 | 1,
    shop_update: 0 | 1,
    banned_item: 0 | 1,
    item_promotion: 0 | 1,
    reserved_stock_change: 0 | 1,
    brand_register_result: 0 | 1,
    promotion_update: 0 | 1,
    webchat_update: 0 | 1,
    open_api_authorization_expiry: 0 | 1,
    shop_authorization_canceled_push: 0 | 1,
    shop_authorization_push: 0 | 1,
  }

}

export class PushApi {

  @Get({ url: '/api/v2/push/get_push_config' })
  getPushConfig!: ApiMethod<{}, ConfigInfo>

  @Post({ url: '/api/v2/push/set_push_config' })
  setPushConfig!: ApiMethod<ConfigInfo, { status: string }>

}