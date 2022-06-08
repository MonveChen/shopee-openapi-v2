/*
 * @Author: Monve
 * @Date: 2022-06-07 19:50:56
 * @LastEditors: Monve
 * @LastEditTime: 2022-06-08 11:38:47
 * @FilePath: /shopee-openapi-v2/src/logistics.ts
 */

import { ApiShopMethod, Get } from "./utils/request"


export class LogisticsApi {

  @Get({ url: '/api/v2/logistics/get_tracking_info' })
  getShopInfo!: ApiShopMethod<
    { order_sn: string, package_number?: string },
    {
      response: {
        order_sn: string,
        package_number: string,
        logistics_status: string,
        tracking_info: {
          update_time: string,
          description: string,
          logistics_status: string
        }[]
      }
    }
  >

}